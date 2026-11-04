"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > 24);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const active = nav.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  )?.id;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 h-[var(--bar-h)] border-b transition-colors duration-200",
        scrolled ? "border-border bg-background" : "border-transparent"
      )}
    >
      <div className="wrap flex h-full items-center gap-3 sm:gap-[clamp(1rem,4vw,3.5rem)]">
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          lang="cu"
          className="shrink-0 text-[2.5rem] leading-none text-foreground/85 transition-colors hover:text-foreground sm:text-[2.75rem]"
          style={{ fontFamily: "var(--font-pochaevsk)" }}
        >
          М
        </Link>
        <nav aria-label="Primary" className="no-scrollbar min-w-0 overflow-x-auto">
          <ol className="flex gap-2 font-mono text-[10px] sm:gap-[clamp(0.75rem,3vw,3rem)] sm:text-[13px]">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={active === item.id ? "page" : undefined}
                  className={cn(
                    "block whitespace-nowrap border-b py-1.5 transition-colors",
                    active === item.id
                      ? "border-foreground text-foreground"
                      : "border-transparent text-foreground/80 hover:border-border hover:text-foreground"
                  )}
                >
                  <span className="hidden text-muted-foreground sm:inline">
                    [{item.code}]{" "}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <p className="ml-auto hidden whitespace-pre font-mono text-[12px] tabular-nums text-muted-foreground xl:block">
          {site.coordinates}
        </p>
      </div>
    </header>
  );
}
