"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const SCRAMBLE_POOL =
  "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯабвгдежзийклмнопрстуфхцчшщэюя";

function randomChar() {
  return SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
}

type Cell = { char: string; settled: boolean };

export function NameDecode() {
  const from = site.cyrillicName;
  const to = site.name;
  const length = Math.max(from.length, to.length);

  const [cells, setCells] = useState<Cell[]>(() =>
    Array.from({ length }, (_, i) => ({ char: from[i] ?? "", settled: false }))
  );
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const plan = Array.from({ length }, (_, i) => {
      if (reduceMotion) return { start: 0, end: 0, target: to[i] ?? "" };
      const start = i * 2 + 14 + Math.floor(Math.random() * 6);
      const end = start + 8 + Math.floor(Math.random() * 12);
      return { start, end, target: to[i] ?? "" };
    });

    let frame = 0;
    let raf = 0;
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      let allDone = true;
      setCells((prev) =>
        prev.map((cell, i) => {
          const { start, end, target } = plan[i];
          if (frame >= end) return { char: target, settled: true };
          allDone = false;
          if (frame >= start) return { char: randomChar(), settled: false };
          return cell;
        })
      );
      frame += 1;
      if (!allDone) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [from, to, length]);

  return (
    <span className="inline-block">
      <span aria-hidden="true">
        {cells.map((cell, i) => (
          <span key={i} className={cell.settled ? undefined : "text-primary"}>
            {cell.char}
          </span>
        ))}
      </span>
      <span className="sr-only">{to}</span>
    </span>
  );
}
