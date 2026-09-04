import Link from "next/link";
import { SideNav } from "@/components/side-nav";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Link
        href="/"
        aria-label={site.shortName}
        lang="cu"
        className="fixed left-5 top-5 z-40 text-3xl leading-none text-foreground/85 transition-colors hover:text-foreground sm:left-8 sm:top-6"
        style={{ fontFamily: "var(--font-pochaevsk)" }}
      >
        М
      </Link>
      <SideNav />
      <div id="content" className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}
