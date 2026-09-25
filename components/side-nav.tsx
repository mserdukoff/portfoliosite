"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SideNav({ className }: { className?: string }) {
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
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }
      if (window.scrollY < window.innerHeight * 0.25) {
        setActiveId(nav[0].id);
        return;
      }
      for (const section of sections) {
        if (section.el.getBoundingClientRect().top + window.scrollY <= trigger) {
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
    <nav aria-label="Sections" className={className}>
      <ol className="flex flex-col gap-1">
        {nav.map((item, i) => {
          const active = isHome && activeId === item.id;
          const href = isHome ? `#${item.id}` : `/#${item.id}`;

          return (
            <li key={item.id}>
              <Link
                href={href}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "group flex items-center gap-3 py-0.5 font-mono text-[12px] transition-colors duration-300",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground/55 hover:text-muted-foreground"
                )}
              >
                <span className="w-5 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "h-px bg-current transition-all duration-300",
                    active ? "w-10" : "w-6 group-hover:w-8"
                  )}
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
