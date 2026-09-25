"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { DitherField, ink } from "@/components/dither-plate";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Site",
    links: [
      { label: "Work", href: "/#work" },
      { label: "Experience", href: "/#experience" },
      { label: "About", href: "/#about" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "Email", href: `mailto:${site.email}` },
      { label: "GitHub ↗", href: site.github },
      { label: "LinkedIn ↗", href: site.linkedin },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
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
    <footer ref={ref} className="relative mt-24 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 border-t border-foreground/80 pt-10 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-sm">
            <p className="font-heading text-2xl tracking-tight">{site.name}</p>
            <p className="mt-3 text-[14px] leading-6 text-muted-foreground">
              {site.role} in {site.location}. Building Wheelbase and Lociros,
              creator of Grammario.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-3 gap-10 sm:gap-16">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2 text-[14px] text-muted-foreground">
                  {column.links.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="hover:text-foreground">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-wrap justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>42.3601° N, 71.0589° W</span>
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{ y: bandY }}
        className="relative mt-8 h-56 sm:h-72 [mask-image:linear-gradient(to_bottom,transparent,black_45%)]"
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
