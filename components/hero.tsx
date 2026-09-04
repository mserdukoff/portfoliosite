"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { LocalClock } from "@/components/local-clock";
import { fadeUp, stagger } from "@/lib/motion";
import { projects, site } from "@/lib/site";

export function Hero() {
  const wheelbase = projects.find((project) => project.slug === "wheelbase");

  return (
    <section id="hero" className="scroll-mt-10 pb-10 pt-16 sm:pb-12 sm:pt-20">
      <motion.div initial={false} animate="show" variants={stagger}>
        <motion.p
          variants={fadeUp}
          className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
        >
          <span className="relative inline-flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          {site.status} · {site.location}
          <span className="text-muted-foreground/50">·</span>
          <LocalClock />
        </motion.p>

        <motion.div variants={fadeUp} className="mt-6 max-w-lg space-y-4">
          <h1 className="text-lg leading-8 text-muted-foreground">
            Matt here — I write software meant to hold up under real use,
            not just look good in a demo.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Building{" "}
            {wheelbase?.href ? (
              <a
                href={wheelbase.href}
                className="text-foreground underline-offset-4 hover:underline"
              >
                Wheelbase
              </a>
            ) : (
              "Wheelbase"
            )}
            , a dealership operations platform. Creator of{" "}
            <Link
              href="/work/grammario"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Grammario
            </Link>
            , a grammar analyzer for six languages.
          </p>
          <p className="text-lg leading-8 text-muted-foreground">
            Available for new opportunities — reach out any time.
          </p>
          <p className="text-lg leading-8 text-muted-foreground">
            <a
              href={site.github}
              className="text-foreground underline-offset-4 hover:underline"
            >
              GitHub
            </a>{" "}
            has the code, the{" "}
            <Link
              href="/journal"
              className="text-foreground underline-offset-4 hover:underline"
            >
              journal
            </Link>{" "}
            has the write-ups, and my inbox is always open —{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              say hello
            </a>
            .
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
