"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SideNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    if (!isHome) return;

    const sections = nav.flatMap((item) => {
      const el = document.getElementById(item.id);
      return el ? [{ id: item.id, el }] : [];
    });
    if (sections.length === 0) return;

    function updateActive() {
      const trigger = window.scrollY + window.innerHeight * 0.2;
      let current: (typeof nav)[number]["id"] = nav[0].id;
      for (const section of sections) {
        if (section.el.offsetTop <= trigger) {
          current = section.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    }

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [isHome]);

  return (
    <nav
      aria-label="Sections"
      className="pointer-events-none fixed top-1/2 z-40 hidden -translate-y-1/2 min-[1440px]:block"
      style={{ left: "max(1.5rem, calc(50% - 36rem - 7.5rem))" }}
    >
      <ul className="pointer-events-auto flex flex-col gap-1.5">
        {nav.map((item) => {
          const active = isHome && activeId === item.id;
          const href = isHome ? `#${item.id}` : `/#${item.id}`;

          return (
            <li key={item.id}>
              <Link
                href={href}
                className={cn(
                  "group flex items-center gap-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground/50 hover:text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "h-px bg-current transition-all duration-300",
                    active ? "w-4" : "w-2 group-hover:w-3"
                  )}
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
