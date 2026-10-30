"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monogram } from "@/components/monogram";
import { SiteNav } from "@/components/site-nav";
import { place, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const isHome = usePathname() === "/";

  return (
    <header
      className={cn(
        "page flex flex-wrap items-start justify-between gap-x-10 gap-y-5 pb-6 pt-5 sm:pt-7",
        isHome && "lg:hidden"
      )}
    >
      <div className="flex items-start gap-5">
        <Link href="/" aria-label={`${site.name}, home`} className="text-[2.1rem] transition-colors hover:text-seal">
          <Monogram />
        </Link>
        <div className="caps pt-1 text-[10px] leading-[1.7]">
          <p>{place.name}</p>
          <p className="text-muted-foreground">
            {place.lat}&nbsp;&nbsp;{place.lon}
          </p>
        </div>
      </div>
      <SiteNav className="pt-2 text-[11px]" />
    </header>
  );
}
