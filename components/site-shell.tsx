import { SiteFooter } from "@/components/site-footer";
import { SiteSidebar } from "@/components/site-sidebar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <SiteSidebar />
      <div className="lg:pl-[var(--rail-w)]">
        <div
          id="content"
          className="mx-auto w-full max-w-[76rem] px-5 sm:px-8 xl:px-12"
        >
          {children}
        </div>
        <SiteFooter />
      </div>
    </div>
  );
}
