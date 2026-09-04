"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Token = {
  id: string;
  text: string;
  pos: string;
  note: string;
};

type Arc = {
  from: number;
  to: number;
  label: string;
};

const tokens: Token[] = [
  { id: "l", text: "L'", pos: "Pronoun", note: "Object clitic. Stands in for the person being made to speak." },
  { id: "ho", text: "ho", pos: "Auxiliary", note: "Present of avere. Builds the passato prossimo." },
  { id: "fatta", text: "fatta", pos: "Past participle", note: "Agrees in gender with the clitic. The structural head of the clause." },
  { id: "parlare", text: "parlare", pos: "Infinitive", note: "The caused action. Depends on fatta." },
  { id: "in", text: "in", pos: "Preposition", note: "Marks the language as an oblique." },
  { id: "italiano", text: "italiano", pos: "Noun", note: "What is being spoken." },
];

const arcs: Arc[] = [
  { from: 0, to: 2, label: "obj" },
  { from: 1, to: 2, label: "aux" },
  { from: 3, to: 2, label: "xcomp" },
  { from: 4, to: 5, label: "case" },
  { from: 5, to: 3, label: "obl" },
];

const COL = 72;
const ORIGIN_X = 36;
const BASE_Y = 118;

function center(index: number) {
  return ORIGIN_X + index * COL;
}

function arcPath(from: number, to: number) {
  const x1 = center(from);
  const x2 = center(to);
  const mid = (x1 + x2) / 2;
  const span = Math.abs(x2 - x1);
  const lift = Math.min(86, 28 + span * 0.28);
  return `M ${x1} ${BASE_Y - 18} Q ${mid} ${BASE_Y - 18 - lift} ${x2} ${BASE_Y - 18}`;
}

export function ParseTree({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(2);
  const token = tokens[active];

  return (
    <div className={cn("select-none", className)}>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        Click a word
      </p>
      <svg
        viewBox="0 0 432 128"
        className="mt-2 h-auto w-full"
        role="img"
        aria-label="Dependency tree for the Italian sentence L'ho fatta parlare in italiano"
      >
        {arcs.map((arc, i) => {
          const related = arc.from === active || arc.to === active;
          return (
            <g key={`${arc.label}-${arc.from}`}>
              <motion.path
                d={arcPath(arc.from, arc.to)}
                fill="none"
                stroke="currentColor"
                strokeWidth={related ? 1.6 : 1}
                className={related ? "text-primary" : "text-border"}
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
              />
              <text
                x={(center(arc.from) + center(arc.to)) / 2}
                y={BASE_Y - 18 - Math.min(86, 28 + Math.abs(center(arc.to) - center(arc.from)) * 0.28) / 2 - 6}
                textAnchor="middle"
                className={related ? "fill-primary" : "fill-muted-foreground"}
                fontSize="9"
                fontFamily="var(--font-geist-mono)"
              >
                {arc.label}
              </text>
            </g>
          );
        })}
        {tokens.map((item, index) => {
          const x = center(index);
          const on = index === active;
          return (
            <g key={item.id}>
              <circle
                cx={x}
                cy={BASE_Y}
                r={on ? 5 : 3.5}
                className={on ? "fill-primary" : "fill-foreground"}
              />
            </g>
          );
        })}
      </svg>
      <div className="-mx-1 mt-1 flex justify-between px-1">
        {tokens.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "min-w-0 flex-1 rounded-md px-1 py-2 text-center font-heading text-sm transition-colors",
              index === active
                ? "text-primary"
                : "text-foreground/70 hover:text-foreground"
            )}
            aria-pressed={index === active}
          >
            {item.text}
          </button>
        ))}
      </div>
      <div className="mt-3 min-h-[4.5rem] border-t border-border pt-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {token.pos}
        </p>
        <p className="mt-1 text-sm leading-6 text-foreground/80">{token.note}</p>
      </div>
    </div>
  );
}
