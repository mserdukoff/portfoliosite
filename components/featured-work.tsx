"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BrowserFrame } from "@/components/browser-frame";
import { DitherField, ink } from "@/components/dither-plate";
import { ParseTree } from "@/components/parse-tree";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";
import { projects } from "@/lib/site";
import { cn } from "@/lib/utils";

function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div ref={ref} style={reduced ? undefined : { clipPath, y }}>
      {children}
    </motion.div>
  );
}

export function FeaturedWork() {
  const reduced = useReducedMotion();
  const wheelbase = projects.find((project) => project.slug === "wheelbase");
  const lociros = projects.find((project) => project.slug === "lociros");
  const grammario = projects.find((project) => project.slug === "grammario");

  if (!wheelbase || !lociros || !grammario) return null;

  const reveal = {
    initial: reduced ? false : ("hidden" as const),
    whileInView: "show" as const,
    viewport: { once: true, margin: "-60px" },
    variants: fadeUp,
  };

  return (
    <div className="grid gap-6">
      <motion.article
        {...reveal}
        className="relative grid items-center gap-10 overflow-hidden rounded-sm bg-foreground px-6 py-10 text-background sm:px-10 sm:py-12 lg:grid-cols-[1fr_minmax(0,26rem)]"
      >
        <DitherField
          colorBack={ink.deep}
          colorFront="#1d2d80"
          shape="simplex"
          size={3}
          speed={0.12}
          scale={0.6}
        />
        <div className="relative">
          <div className="flex items-center gap-3">
            <Badge className="bg-background text-foreground">
              {wheelbase.status}
            </Badge>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-background/60">
              {wheelbase.subtitle}
            </span>
          </div>
          <h3 className="mt-5 font-heading text-5xl tracking-tight sm:text-6xl">
            {wheelbase.title}
          </h3>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-background/75">
            {wheelbase.blurb}
          </p>
          <a
            href={wheelbase.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-7 bg-background px-4 text-foreground hover:bg-background/90"
            )}
          >
            Open wheelbase.io ↗
          </a>
        </div>
        <div className="relative">
          <ScrollReveal>
            <BrowserFrame label="wheelbase.io" tone="dark" contentClassName="p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/wheelbase-preview.png"
                alt="Wheelbase homepage: The hardest worker in the car business"
                className="block w-full"
              />
            </BrowserFrame>
          </ScrollReveal>
        </div>
      </motion.article>

      <motion.article
        {...reveal}
        className="grid items-center gap-10 rounded-sm border border-border bg-card px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,28rem)_1fr]"
      >
        <div className="lg:order-2">
          <div className="flex items-center gap-3">
            <Badge>{lociros.status}</Badge>
            <span className="eyebrow tracking-[0.14em]">{lociros.subtitle}</span>
          </div>
          <h3 className="mt-5 font-heading text-5xl tracking-tight sm:text-6xl">
            {lociros.title}
          </h3>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
            {lociros.blurb}
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Japanese / Arabic / Italian / Russian · A1–B2
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={lociros.href}
              className={cn(buttonVariants({ size: "lg" }), "px-4")}
            >
              Open lociros.com ↗
            </a>
            {lociros.repo ? (
              <a
                href={lociros.repo}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-4")}
              >
                Source on GitHub ↗
              </a>
            ) : null}
          </div>
        </div>
        <div className="lg:order-1">
          <ScrollReveal>
            <BrowserFrame label="lociros.com" contentClassName="p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/lociros-preview.png"
                alt="Lociros homepage: Every word has depth, beside an engraved cliff of Japanese words graded A1 to B2"
                className="block w-full"
              />
            </BrowserFrame>
          </ScrollReveal>
        </div>
      </motion.article>

      <motion.article
        {...reveal}
        className="grid items-center gap-10 rounded-sm border border-border bg-card px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_minmax(0,26rem)]"
      >
        <div>
          <div className="flex items-center gap-3">
            <Badge>{grammario.status}</Badge>
            <span className="eyebrow tracking-[0.14em]">
              {grammario.subtitle}
            </span>
          </div>
          <h3 className="mt-5 font-heading text-5xl tracking-tight sm:text-6xl">
            {grammario.title}
          </h3>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
            {grammario.blurb}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/work/grammario"
              className={cn(buttonVariants({ size: "lg" }), "px-4")}
            >
              Read the case study
            </Link>
            <a
              href={grammario.href}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-4")}
            >
              grammario.ai ↗
            </a>
          </div>
        </div>
        <BrowserFrame label="grammario.ai/analyze">
          <ParseTree />
        </BrowserFrame>
      </motion.article>
    </div>
  );
}
