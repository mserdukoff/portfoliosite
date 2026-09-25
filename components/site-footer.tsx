"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { DitherField, ink } from "@/components/dither-plate";
import { site } from "@/lib/site";

const links = [
  { label: "Journal", href: "/journal" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const bandY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 80, 0]);

  return (
    <footer ref={ref} className="relative mt-16 overflow-hidden">
      <div className="mx-auto w-full max-w-[76rem] px-5 sm:px-8 xl:px-12">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-foreground/80 pt-6 font-mono text-[11px] text-muted-foreground">
          <span className="lg:hidden">
            © {new Date().getFullYear()} {site.name}
          </span>
          <nav aria-label="Footer" className="flex gap-5">
            {links.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
            <a href={site.github} className="hover:text-foreground lg:hidden">
              GitHub ↗
            </a>
            <a href={site.linkedin} className="hover:text-foreground lg:hidden">
              LinkedIn ↗
            </a>
          </nav>
          <span>42.3601° N, 71.0589° W</span>
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{ y: bandY }}
        className="relative mt-8 h-44 sm:h-56 [mask-image:linear-gradient(to_bottom,transparent,black_45%)]"
      >
        <DitherField
          shape="warp"
          colorBack={ink.paper}
          colorFront={ink.cobalt}
          size={3}
          speed={0.14}
          scale={0.55}
        />
      </motion.div>
    </footer>
  );
}
