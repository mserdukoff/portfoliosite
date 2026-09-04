"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { BrowserFrame } from "@/components/browser-frame";
import { ParseTree } from "@/components/parse-tree";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { fadeUp, stagger } from "@/lib/motion";
import { projects } from "@/lib/site";
import { cn } from "@/lib/utils";

export function FeaturedWork() {
  const reduced = useReducedMotion();
  const wheelbase = projects.find((project) => project.slug === "wheelbase");
  const grammario = projects.find((project) => project.slug === "grammario");

  if (!wheelbase || !grammario) return null;

  return (
    <motion.div
      className="grid gap-4"
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={stagger}
    >
      <motion.div variants={fadeUp} className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary opacity-[0.14] blur-3xl"
        />
        <motion.article
          whileHover={reduced ? undefined : { y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="card-elevated grid items-center gap-8 overflow-hidden rounded-2xl bg-foreground px-6 py-8 text-background sm:px-8 sm:py-10 lg:grid-cols-[1fr_minmax(0,22rem)]"
        >
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{wheelbase.status}</Badge>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-background/55">
                {wheelbase.subtitle}
              </span>
            </div>
            <h2 className="mt-4 font-heading text-4xl tracking-tight sm:text-5xl">
              {wheelbase.title}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-background/75">
              {wheelbase.blurb}
            </p>
            <a
              href={wheelbase.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-6 bg-background text-foreground hover:bg-background/90"
              )}
            >
              Open live site
            </a>
          </div>
          <BrowserFrame label="wheelbase.io" tone="dark" contentClassName="p-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wheelbase-preview.png"
              alt="Wheelbase homepage: The hardest worker in the car business"
              className="block w-full"
            />
          </BrowserFrame>
        </motion.article>
      </motion.div>

      <motion.div variants={fadeUp} className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary opacity-[0.1] blur-3xl"
        />
        <motion.article
          whileHover={reduced ? undefined : { y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="card-elevated grid items-center gap-8 overflow-hidden rounded-2xl border border-border bg-card px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1fr_minmax(0,24rem)]"
        >
          <div>
            <div className="flex items-center gap-2">
              <Badge>{grammario.status}</Badge>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {grammario.subtitle}
              </span>
            </div>
            <h2 className="mt-4 font-heading text-4xl tracking-tight sm:text-5xl">
              {grammario.title}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
              {grammario.blurb}
            </p>
            <Link
              href="/work/grammario"
              className={cn(buttonVariants({ size: "lg" }), "mt-6")}
            >
              Read the case study
            </Link>
          </div>
          <BrowserFrame label="grammario.ai/analyze">
            <ParseTree />
          </BrowserFrame>
        </motion.article>
      </motion.div>
    </motion.div>
  );
}
