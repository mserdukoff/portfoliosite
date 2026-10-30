"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav({
  orientation = "horizontal",
  className,
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  const pathname = usePathname();
  const vertical = orientation === "vertical";

  return (
    <nav aria-label="Primary" className={className}>
      {vertical ? (
        <span aria-hidden className="mb-[1.4em] block size-[0.7em] rounded-full border border-current opacity-70" />
      ) : null}
      <ol className={cn("flex", vertical ? "flex-col gap-[1.15em]" : "flex-wrap gap-x-6 gap-y-2")}>
        {nav.map((item, index) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href} className={cn(vertical && "relative")}>
              {vertical && index > 0 ? (
                <span aria-hidden className="absolute -top-[0.75em] left-0 h-px w-[0.9em] bg-current opacity-35" />
              ) : null}
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="caps group inline-flex items-baseline gap-[1.4em] transition-colors hover:text-seal"
              >
                <span className="opacity-55">{String(index + 1).padStart(2, "0")}</span>
                <span
                  className={cn(
                    "decoration-seal underline-offset-[0.45em]",
                    active ? "underline" : "group-hover:underline"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
