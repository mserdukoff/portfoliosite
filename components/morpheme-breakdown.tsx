"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TextMorph } from "@/components/arc/text-morph/text-morph";
import { easeOut, useStillMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Morpheme = {
  text: string;
  label: string;
  gloss: string;
  note: string;
  /** Drops the label a row from sm up; below sm every other label drops. */
  drop?: boolean;
};

const morphemes: Morpheme[] = [
  { text: "bil", label: "root: “know”", gloss: "know", note: "The verb stem. Everything after it is a suffix." },
  { text: "me", label: "negation", gloss: "not know", note: "Negation. Becomes -ma after a back vowel." },
  { text: "di", label: "past tense", gloss: "did not know", note: "Definite past. Shifts to -dı, -du, or -dü with vowel harmony." },
  { text: "y", label: "buffer letter", gloss: "did not know", note: "Keeps the vowel of -di from running into the suffix after it.", drop: true },
  { text: "se", label: "“if”", gloss: "if he/she did not know", note: "Conditional. Turns the statement into a condition." },
  { text: "n", label: "second person", gloss: "if you did not know", note: "Person ending. Says who did not know.", drop: true },
];

export function MorphemeBreakdown({ className }: { className?: string }) {
  const still = useStillMotion();
  const [active, setActive] = useState(morphemes.length - 1);
  const current = morphemes[active];

  return (
    <div className={cn("select-none", className)}>
      <div
        role="group"
        aria-label="bilmediysen, split into its suffixes"
        className="flex justify-center pb-24"
      >
        {morphemes.map((piece, index) => {
          const on = index === active;
          const built = index <= active;
          return (
            <motion.button
              key={piece.text}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={on}
              aria-label={`${piece.text}, ${piece.label}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={still ? { duration: 0 } : { duration: 0.6, delay: index * 0.08, ease: easeOut }}
              className="group relative cursor-pointer"
            >
              <span
                className={cn(
                  "block border border-primary/35 px-[0.04em] font-heading text-[clamp(1.875rem,8.5vw,5rem)] leading-[1.05] tracking-[-0.02em] transition-colors",
                  index > 0 && "-ml-px",
                  on
                    ? "relative z-10 border-primary bg-primary/10 text-primary"
                    : built
                      ? "text-foreground group-hover:bg-muted"
                      : "text-foreground/30 group-hover:bg-muted"
                )}
              >
                {piece.text}
              </span>
              <span
                className={cn(
                  "absolute left-1/2 top-full w-max max-w-[3.25rem] -translate-x-1/2 sm:max-w-[6.5rem] text-center text-[11px] leading-4 transition-colors sm:text-[13px]",
                  index % 2 ? "mt-12" : "mt-2.5",
                  piece.drop ? "sm:mt-11" : "sm:mt-2.5",
                  on ? "text-primary" : "text-muted-foreground"
                )}
              >
                {index % 2 || piece.drop ? (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-1/2 -top-10 h-9 w-px -translate-x-1/2 bg-primary/35 sm:-top-8 sm:h-7",
                      !piece.drop && "sm:hidden",
                      !(index % 2) && "hidden sm:block"
                    )}
                  />
                ) : null}
                {piece.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="min-h-[6.5rem] border-t border-border pt-4" aria-live="polite">
        <p className="font-heading text-2xl tracking-tight sm:text-3xl">
          {morphemes.map((piece, index) =>
            index <= active ? (
              <span key={piece.text} className={index === active ? "text-primary" : undefined}>
                {piece.text}
              </span>
            ) : null
          )}
          <span className="text-muted-foreground"> = </span>
          <span className="arc">
            <TextMorph>{`“${current.gloss}”`}</TextMorph>
          </span>
        </p>
        <p className="mt-2 text-sm leading-6 text-foreground/80">{current.note}</p>
      </div>
    </div>
  );
}
