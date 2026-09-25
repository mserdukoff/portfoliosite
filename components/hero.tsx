"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { DitherPortrait } from "@/components/dither-plate";
import { LocalClock } from "@/components/local-clock";
import { NameDecode } from "@/components/name-decode";
import { fadeUp, stagger } from "@/lib/motion";
import { projects, site } from "@/lib/site";

const link = "text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-primary";

export function Hero() {
  const wheelbase = projects.find((project) => project.slug === "wheelbase");
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const markY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative scroll-mt-10 pb-14 pt-20 sm:pb-20 sm:pt-24"
    >
      <motion.span
        aria-hidden="true"
        lang="cu"
        style={{ y: markY, fontFamily: "var(--font-pochaevsk)" }}
        className="pointer-events-none absolute -left-4 -top-16 -z-10 select-none text-[clamp(16rem,34vw,28rem)] leading-none text-primary/[0.07]"
      >
        М
      </motion.span>

      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-20">
        <motion.div initial={false} animate="show" variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1"
          >
            <span aria-hidden className="size-1.5 bg-primary" />
            {site.status} · {site.location}
            <span className="text-muted-foreground/50">·</span>
            <LocalClock />
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6">
            <h1 className="font-heading text-[clamp(3rem,8.5vw,6rem)] leading-[0.95] tracking-[-0.025em] text-foreground">
              <NameDecode />
            </h1>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
              {site.role}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 max-w-lg space-y-4 text-lg leading-8 text-muted-foreground"
          >
            <p>
              I write software that holds up under real use, for problems
              where getting it wrong has consequences.
            </p>
            <p>
              Building{" "}
              {wheelbase?.href ? (
                <a href={wheelbase.href} className={link}>
                  Wheelbase
                </a>
              ) : (
                "Wheelbase"
              )}
              , a dealership operations platform, and{" "}
              <a href="https://lociros.com" className={link}>
                Lociros
              </a>
              , graded readers checked against their level. Creator of{" "}
              <Link href="/work/grammario" className={link}>
                Grammario
              </Link>
              , a grammar analyzer for six languages.
            </p>
            <p>
              Open to new roles. The code is on{" "}
              <a href={site.github} className={link}>
                GitHub
              </a>
              , the write-ups are in the{" "}
              <Link href="/journal" className={link}>
                journal
              </Link>
              , and{" "}
              <a href={`mailto:${site.email}`} className={link}>
                my inbox
              </a>{" "}
              is open.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: plateY }}
          initial={reduced ? false : { opacity: 0, clipPath: "inset(100% 0 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[18rem] lg:mx-0 lg:max-w-none"
        >
          <DitherPortrait />
        </motion.div>
      </div>
    </section>
  );
}
