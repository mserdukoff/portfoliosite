"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { BrowserFrame } from "@/components/browser-frame";
import { DitherField, ink } from "@/components/dither-plate";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { easeOut, fadeUp } from "@/lib/motion";
import { grammarioLanguages, projects } from "@/lib/site";
import { cn } from "@/lib/utils";

const textLink =
  "inline-flex items-center gap-2 px-1 text-sm underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current";

// Rides the parent card's reveal. Never starts clipped, so a missed
// intersection can't leave the preview invisible.
const rise = {
  hidden: { y: 20 },
  show: { y: 0, transition: { duration: 0.8, delay: 0.12, ease: easeOut } },
};

function ScrollReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={rise} className="w-full">
      {children}
    </motion.div>
  );
}

function MetaRow({
  label,
  items,
  className,
}: {
  label: string;
  items: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("font-mono text-[11px] leading-5", className)}>
      <p className="opacity-70">{label}</p>
      <p className="mt-1.5">{items.join("  /  ")}</p>
    </div>
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
        className="relative overflow-hidden rounded-sm bg-foreground text-background"
      >
        <DitherField
          colorBack={ink.deep}
          colorFront="#1d2d80"
          shape="simplex"
          size={3}
          speed={0.12}
          scale={0.6}
        />
        <div className="relative grid items-center gap-10 px-6 pb-10 pt-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <span className="index-chip border-background/25 bg-background/10 text-background/75">
              01
            </span>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Badge className="bg-background text-foreground">
                {wheelbase.status}
              </Badge>
              <span className="font-mono text-[12px] text-background/60">
                {wheelbase.subtitle}
              </span>
            </div>
            <h3 className="mt-4 font-heading text-5xl tracking-tight sm:text-6xl">
              {wheelbase.title}
            </h3>
            <p className="mt-4 max-w-sm text-[15px] leading-7 text-background/75">
              {wheelbase.blurb}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={wheelbase.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-background px-4 text-foreground hover:bg-background/90"
                )}
              >
                Open wheelbase.io ↗
              </a>
              <Link href="#experience" className={cn(textLink, "text-background/85")}>
                View details <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <div className="lg:pt-6">
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
        </div>
        <div className="relative flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-background/15 px-6 py-4 font-mono text-[11px] text-background/75 sm:px-8">
          <span className="text-background/55">
            Tech
          </span>
          <span>{wheelbase.stack.join("  /  ")}</span>
        </div>
      </motion.article>

      <motion.article
        {...reveal}
        className="theme-lociros relative grid overflow-hidden rounded-sm border border-border bg-card text-foreground lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
      >
        <DitherField
          colorBack="#f6ecd8"
          colorFront="#eddcbd"
          shape="warp"
          size={2}
          speed={0.08}
          scale={0.8}
        />
        <span
          aria-hidden
          lang="ja"
          className="pointer-events-none absolute -bottom-8 left-[38%] hidden select-none font-heading text-[11rem] leading-none text-primary/[0.07] lg:block"
        >
          読
        </span>
        <div className="relative px-6 pb-8 pt-6 sm:px-8">
          <span className="index-chip border-primary bg-primary text-primary-foreground">
            02
          </span>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge className="bg-foreground text-background">
              {lociros.status}
            </Badge>
            <span className="eyebrow">{lociros.subtitle}</span>
          </div>
          <h3 className="mt-4 font-heading text-5xl tracking-tight">
            {lociros.title}
          </h3>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-muted-foreground">
            {lociros.blurb}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={lociros.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-foreground px-4 text-background hover:bg-foreground/90"
              )}
            >
              Open lociros.com ↗
            </a>
            {lociros.repo ? (
              <a href={lociros.repo} className={cn(textLink, "text-muted-foreground hover:text-primary")}>
                Source <span aria-hidden>↗</span>
              </a>
            ) : null}
          </div>
          <MetaRow
            label="Languages · A1–B2"
            items={["Japanese", "Arabic", "Italian", "Russian"]}
            className="mt-10 border-t border-border pt-5 text-muted-foreground"
          />
        </div>
        <div className="relative flex items-center border-t border-border bg-muted/50 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <div className="w-full">
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
        </div>
      </motion.article>

      <motion.article
        {...reveal}
        className="theme-grammario-card relative grid overflow-hidden rounded-sm bg-foreground text-background lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
      >
        <DitherField
          colorBack="#3f1571"
          colorFront="#582493"
          shape="wave"
          size={3}
          speed={0.1}
          scale={0.7}
        />
        <div className="relative px-6 pb-8 pt-6 sm:px-8 lg:order-2">
          <span className="index-chip border-background/25 bg-background/10 text-background/75">
            03
          </span>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge className="bg-background text-foreground">
              {grammario.status}
            </Badge>
            <span className="font-mono text-[12px] text-background/60">
              {grammario.subtitle}
            </span>
          </div>
          <h3 className="mt-4 font-heading text-5xl tracking-tight">
            {grammario.title}
          </h3>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-background/75">
            {grammario.blurb}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={grammario.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-background px-4 text-foreground hover:bg-background/90"
              )}
            >
              Open grammario.ai ↗
            </a>
            <Link
              href="/work/grammario"
              className={cn(textLink, "text-background/85")}
            >
              Case study <span aria-hidden>→</span>
            </Link>
          </div>
          <MetaRow
            label="Languages"
            items={grammarioLanguages.map((language) => language.name)}
            className="mt-10 border-t border-background/15 pt-5 text-background/75"
          />
        </div>
        <div className="relative flex items-center p-6 sm:p-8 lg:order-1">
          <ScrollReveal>
            <BrowserFrame
              label="grammario.ai"
              className="theme-grammario w-full border-background/25 text-foreground"
              contentClassName="p-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/grammario-preview.png"
                alt="Grammario homepage: See the grammar you missed, beside an Italian example analysis that catches a gender agreement mistake"
                className="block w-full"
              />
            </BrowserFrame>
          </ScrollReveal>
        </div>
      </motion.article>
    </div>
  );
}
