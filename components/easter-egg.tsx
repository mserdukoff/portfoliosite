"use client";

import {
  AnimatePresence,
  motion,
  useAnimate,
  useReducedMotion,
} from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const BREAK_EVENT = "mserdukoff:kind-of-works";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const TARGETS = [
  "#content section > *",
  "#content article",
  "#content .cell-grid > *",
  "header nav li",
  "footer > *",
  "[data-breakable]",
].join(", ");

const REFUSALS = ["Ship it", "No.", "Not like this.", "Absolutely not."];

const CHECKS = [
  "Re-aligning the grid",
  "Re-hanging the cards",
  "Checking Lociros is still A2",
  "Re-parsing Grammario's trees",
  "Running the test suite",
];

const CHECK_MS = 380;

type Saved = {
  el: HTMLElement;
  translate: string;
  rotate: string;
  transformOrigin: string;
  transition: string;
};

type Phase = "idle" | "broken" | "fixing" | "fixed";

let announced = false;

function collectTargets() {
  const all = Array.from(
    document.querySelectorAll<HTMLElement>(TARGETS),
  ).filter(
    (el) =>
      el.offsetParent !== null || getComputedStyle(el).position === "fixed",
  );
  // Only the innermost matches move, so rotations don't compound.
  return all.filter(
    (el) => !all.some((other) => other !== el && el.contains(other)),
  );
}

function glitch(el: HTMLElement, delay = 0) {
  el.classList.remove("glitching");
  void el.offsetWidth;
  el.style.animationDelay = `${delay}ms`;
  el.classList.add("glitching");
  window.setTimeout(() => {
    el.classList.remove("glitching");
    el.style.animationDelay = "";
  }, delay + 320);
}

function flashScan(el: HTMLElement | null) {
  if (!el) return;
  el.style.setProperty("--scan-at", `${10 + Math.random() * 75}%`);
  el.classList.remove("is-flashing");
  void el.offsetWidth;
  el.classList.add("is-flashing");
}

function inView(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

export function EasterEgg() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [checksDone, setChecksDone] = useState(0);
  const [refusals, setRefusals] = useState(0);
  const [shipScope, animateShip] = useAnimate<HTMLButtonElement>();
  const saved = useRef<Saved[]>([]);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const scanRef = useRef<HTMLDivElement>(null);

  const restoreNow = useCallback(() => {
    saved.current.forEach(({ el, ...style }) => {
      Object.assign(el.style, style);
      el.style.removeProperty("--sag-x");
      el.style.removeProperty("--sag-y");
      el.style.animationDelay = "";
      el.classList.remove("glitching");
    });
    saved.current = [];
  }, []);

  const breakPage = useCallback(() => {
    if (saved.current.length) return;
    clearTimers();
    const targets = collectTargets();
    const motionless = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    saved.current = targets.map((el) => ({
      el,
      translate: el.style.translate,
      rotate: el.style.rotate,
      transformOrigin: el.style.transformOrigin,
      transition: el.style.transition,
    }));

    const sag = () =>
      targets.forEach((el, i) => {
        const direction = Math.random() < 0.5 ? -1 : 1;
        const angle = direction * (1.5 + Math.random() * 6);
        const drop = 6 + Math.random() * 38 + (Math.random() < 0.12 ? 70 : 0);
        const drift = Math.random() * 16 - 8;
        const delay = Math.min(i * 22, 700);
        el.style.transformOrigin = angle > 0 ? "top left" : "top right";
        el.style.transition = motionless
          ? "none"
          : `translate 1s cubic-bezier(0.5, 0, 0.75, 0) ${delay}ms, rotate 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`;
        el.style.setProperty("--sag-x", `${drift}px`);
        el.style.setProperty("--sag-y", `${drop}px`);
        el.style.rotate = `${angle}deg`;
      });

    targets.forEach((el) => {
      el.style.setProperty("--sag-x", "0px");
      el.style.setProperty("--sag-y", "0px");
      el.style.translate = "var(--sag-x) var(--sag-y)";
    });

    if (motionless) {
      sag();
    } else {
      targets.filter(inView).forEach((el) => glitch(el, Math.random() * 140));
      later(() => flashScan(scanRef.current), 40);
      later(sag, 420);
    }

    setRefusals(0);
    setChecksDone(0);
    setPhase("broken");
  }, []);

  const fixPage = useCallback(() => {
    if (!saved.current.length) return;
    clearTimers();
    setPhase("fixing");
    setChecksDone(0);
    CHECKS.forEach((_, i) =>
      later(() => setChecksDone(i + 1), CHECK_MS * (i + 1)),
    );

    const motionless = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!motionless) {
      saved.current
        .filter(({ el }) => inView(el))
        .forEach(({ el }) => glitch(el, Math.random() * 200));
      flashScan(scanRef.current);
    }

    const repairAt = CHECK_MS * 2;
    later(() => {
      const items = [...saved.current].reverse();
      items.forEach(({ el }, i) => {
        const delay = Math.min(i * 14, 500);
        el.style.transition = motionless
          ? "none"
          : `translate 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, rotate 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`;
        el.style.setProperty("--sag-x", "0px");
        el.style.setProperty("--sag-y", "0px");
        el.style.rotate = "0deg";
      });
    }, repairAt);

    const doneAt = CHECK_MS * (CHECKS.length + 1);
    later(
      () => {
        restoreNow();
        setPhase("fixed");
      },
      Math.max(doneAt, repairAt + 1300),
    );
    later(() => setPhase("idle"), Math.max(doneAt, repairAt + 1300) + 2600);
  }, [restoreNow]);

  const shake = () => {
    if (!reduced && shipScope.current) {
      animateShip(
        shipScope.current,
        { x: [0, -7, 7, -5, 5, -2, 0] },
        { duration: 0.45 },
      );
    }
  };

  const refuse = () => {
    setRefusals((n) => Math.min(n + 1, REFUSALS.length - 1));
    shake();
  };

  useEffect(() => {
    if (announced) return;
    announced = true;
    console.log(
      "%cМ%c  Something on this page only kind of works. Or try ↑ ↑ ↓ ↓ ← → ← → B A",
      "font: 28px serif; color: #2a44b8;",
      "font: 12px ui-monospace, monospace; color: #13205e;",
    );
  }, []);

  useEffect(() => {
    let progress = 0;
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable=true]")) return;
      if (event.key === "Escape" && saved.current.length) {
        fixPage();
        return;
      }
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      progress =
        key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        breakPage();
      }
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener(BREAK_EVENT, breakPage);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(BREAK_EVENT, breakPage);
    };
  }, [breakPage, fixPage]);

  const [brokenOn, setBrokenOn] = useState(pathname);
  if (brokenOn !== pathname) {
    setBrokenOn(pathname);
    setPhase("idle");
  }

  useEffect(
    () => () => {
      clearTimers();
      restoreNow();
    },
    [pathname, restoreNow],
  );

  useEffect(() => {
    if (phase !== "broken" || reduced) return;
    let id = 0;
    const tick = () => {
      const pool = saved.current.filter(({ el }) => inView(el));
      const count =
        1 + Math.floor(Math.random() * 3) + (Math.random() < 0.15 ? 5 : 0);
      for (let i = 0; i < count && pool.length; i++) {
        glitch(pool[Math.floor(Math.random() * pool.length)].el, i * 45);
      }
      if (Math.random() < 0.35) flashScan(scanRef.current);
      id = window.setTimeout(tick, 350 + Math.random() * 1100);
    };
    id = window.setTimeout(tick, 1500);
    return () => clearTimeout(id);
  }, [phase, reduced]);

  const exhausted = refusals === REFUSALS.length - 1;

  return (
    <>
      <div
        ref={scanRef}
        aria-hidden
        className="glitch-scan pointer-events-none fixed inset-0 z-40"
      />
      <AnimatePresence>
        {phase !== "idle" ? (
          <motion.aside
            role="status"
            aria-live="polite"
            initial={
              reduced
                ? false
                : { opacity: 0, y: 24, clipPath: "inset(100% 0 0 0)" }
            }
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="fixed bottom-5 right-5 z-50 w-[19rem] overflow-hidden rounded-sm bg-foreground text-background shadow-[0_18px_50px_-20px_rgb(19_32_94/0.6)] sm:bottom-8 sm:right-8"
          >
            <div className="flex items-center justify-between border-b border-background/15 px-4 py-2 font-mono text-[11px] text-background/60">
              <span>build #4f2a</span>
              <span className="flex items-center gap-1.5">
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5",
                    phase === "fixed"
                      ? "bg-background"
                      : "animate-pulse bg-background/60",
                  )}
                />
                {phase === "broken" && "kind of works"}
                {phase === "fixing" && "fixing"}
                {phase === "fixed" && "passing"}
              </span>
            </div>

            {phase === "broken" ? (
              <div className="px-4 pb-4 pt-4">
                <p className="glitch-text font-heading text-3xl leading-none tracking-tight">
                  It kind of works.
                </p>
                <p className="mt-3 text-[13px] leading-5 text-background/70">
                  Most of it renders. Some of it is on the floor.
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={fixPage}
                    className="rounded-sm bg-background px-3 py-1.5 text-[13px] font-medium text-foreground transition-opacity hover:opacity-90"
                  >
                    Fix it
                  </button>
                  <button
                    ref={shipScope}
                    type="button"
                    onClick={refuse}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") shake();
                    }}
                    aria-disabled={exhausted}
                    className={cn(
                      "rounded-sm border border-background/25 px-3 py-1.5 text-[13px] text-background/80",
                      exhausted &&
                        "cursor-not-allowed text-background/40 line-through",
                    )}
                  >
                    {REFUSALS[refusals]}
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 pb-4 pt-4">
                <ul className="space-y-1.5 font-mono text-[11px]">
                  {CHECKS.map((check, i) => (
                    <li
                      key={check}
                      className={cn(
                        "flex gap-2 transition-colors duration-300",
                        i < checksDone
                          ? "text-background"
                          : "text-background/35",
                      )}
                    >
                      <span aria-hidden className="w-3">
                        {i < checksDone ? "✓" : "·"}
                      </span>
                      {check}
                    </li>
                  ))}
                </ul>
                <p
                  className={cn(
                    "mt-4 font-heading text-2xl leading-none tracking-tight transition-opacity duration-500",
                    phase === "fixed" ? "opacity-100" : "opacity-0",
                  )}
                >
                  Now it ships.
                </p>
              </div>
            )}
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
