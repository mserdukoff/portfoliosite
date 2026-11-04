"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const SCRAMBLE_POOL =
  "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯабвгдежзийклмнопрстуфхцчшщэюя";

function randomChar() {
  return SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
}

type Cell = { char: string; settled: boolean };

// Decodes word by word, so each word holds its own line while it scrambles.
const fromWords = site.cyrillicName.split(" ");
const toWords = site.name.split(" ");
const widths = toWords.map((word, i) =>
  Math.max(word.length, fromWords[i]?.length ?? 0)
);
const offsets = widths.map((_, i) =>
  widths.slice(0, i).reduce((sum, width) => sum + width, 0)
);
const from = fromWords.map((word, i) => word.padEnd(widths[i])).join("");
const to = toWords.map((word, i) => word.padEnd(widths[i])).join("");

export function NameDecode() {
  const [cells, setCells] = useState<Cell[]>(() =>
    Array.from(from, (char) => ({ char, settled: false }))
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const plan = Array.from(to, (target, i) => {
      if (reduceMotion) return { start: 0, end: 0, target };
      const start = i * 2 + 14 + Math.floor(Math.random() * 6);
      const end = start + 8 + Math.floor(Math.random() * 12);
      return { start, end, target };
    });

    // Clocked in elapsed time, so a busy main thread can't stretch the decode.
    const began = performance.now();
    let raf = 0;
    function tick(now: number) {
      const frame = Math.floor((now - began) / 16);
      setCells((prev) =>
        prev.map((cell, i) => {
          const { start, end, target } = plan[i];
          if (frame >= end) return { char: target, settled: true };
          if (frame >= start) return { char: randomChar(), settled: false };
          return cell;
        })
      );
      if (!plan.every((p) => frame >= p.end)) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <span aria-hidden="true">
        {widths.map((width, word) => (
          <span key={word} className="block whitespace-pre">
            {cells.slice(offsets[word], offsets[word] + width).map((cell, i) => (
              <span key={i} className={cell.settled ? undefined : "text-primary"}>
                {cell.char}
              </span>
            ))}
            {word === widths.length - 1 ? <span className="cursor" /> : null}
          </span>
        ))}
      </span>
      <span className="sr-only">{site.name}</span>
    </>
  );
}
