"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DitherBust } from "@/components/dither-plate";
import { BREAK_EVENT } from "@/components/easter-egg";
import { LocalClock } from "@/components/local-clock";
import { NameDecode } from "@/components/name-decode";
import { SideNav } from "@/components/side-nav";
import { fadeUp, stagger } from "@/lib/motion";
import { projects, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const BREAK_PHRASE = "kind of works";
const [quoteLead, quoteTail] = site.quote.split(BREAK_PHRASE);

const link =
  "text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-primary";

export function SiteSidebar() {
  const isHome = usePathname() === "/";
  const reduced = useReducedMotion();
  const wheelbase = projects.find((project) => project.slug === "wheelbase");
  const Name = isHome ? motion.h1 : motion.p;
  return (
    <motion.header
      initial={false}
      animate="show"
      variants={stagger}
      className="no-scrollbar relative flex *:shrink-0 flex-col overflow-hidden border-b border-border px-5 pb-8 pt-5 sm:px-8 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:w-[var(--rail-w)] lg:overflow-y-auto lg:border-b-0 lg:border-r lg:pb-6 lg:pt-6"
    >
      <span
        aria-hidden="true"
        lang="cu"
        style={{ fontFamily: "var(--font-pochaevsk)" }}
        className="pointer-events-none absolute -right-10 top-[38%] -z-10 hidden select-none text-[26rem] leading-none text-primary/[0.06] lg:block"
      >
        М
      </span>

      <div className="flex items-start justify-between gap-4">
        <Link
          href="/"
          aria-label={site.shortName}
          lang="cu"
          className="text-3xl leading-none text-foreground/85 transition-colors hover:text-foreground"
          style={{ fontFamily: "var(--font-pochaevsk)" }}
        >
          М
        </Link>
        <div className="text-right font-mono text-[11px] leading-4 text-muted-foreground">
          <p>{site.location}</p>
          <p className="flex items-center justify-end gap-1.5">
            <span aria-hidden className="size-1.5 bg-primary" />
            <LocalClock />
          </p>
        </div>
      </div>

      <motion.p
        variants={fadeUp}
        className="mt-10 font-mono text-[12px] text-primary lg:mt-14"
      >
        {site.role}
      </motion.p>
      <Name
        variants={fadeUp}
        data-breakable
        className="mt-3 font-heading text-[clamp(2.6rem,4vw,3.4rem)] leading-[0.95] tracking-[-0.025em] text-foreground"
      >
        <NameDecode />
      </Name>

      <motion.div
        variants={fadeUp}
        className={cn(
          "mt-6 max-w-md space-y-4 text-[15px] leading-6 text-muted-foreground",
          !isHome && "hidden lg:block"
        )}
      >
        <p className="text-foreground/85">
          I write software that holds up under real use, for problems where
          getting it wrong has consequences.
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
      </motion.div>

      <motion.div variants={fadeUp} className="hidden lg:block">
        <SideNav className="mt-10" />
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="-mx-8 mt-6 hidden min-h-44 flex-1 lg:flex"
      >
        <div data-breakable className="flex flex-1">
          <DitherBust className="h-full min-h-44 flex-1" />
        </div>
      </motion.div>

      <figure
        data-breakable
        className={cn("mt-8 lg:mt-6", !isHome && "hidden lg:block")}
      >
        <span aria-hidden className="block h-px w-8 bg-foreground/60" />
        <blockquote className="mt-4 font-heading text-xl leading-snug tracking-tight text-foreground/90">
          &ldquo;{quoteLead}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(BREAK_EVENT))}
            title="Does it?"
            className="inline cursor-pointer text-left underline decoration-primary/40 decoration-dotted underline-offset-4 transition-[color,rotate] duration-300 hover:rotate-[-1.5deg] hover:text-primary hover:decoration-primary focus-visible:text-primary"
          >
            {BREAK_PHRASE}
          </button>
          {quoteTail}&rdquo;
        </blockquote>
      </figure>

      <div className="mt-8 hidden font-mono text-[11px] text-muted-foreground lg:block">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="mt-2 flex gap-2">
          <a href={site.github} className="hover:text-foreground">
            GitHub
          </a>
          <span aria-hidden>/</span>
          <a href={site.linkedin} className="hover:text-foreground">
            LinkedIn
          </a>
          <span aria-hidden>/</span>
          <a href={`mailto:${site.email}`} className="hover:text-foreground">
            Email
          </a>
        </p>
      </div>
    </motion.header>
  );
}
