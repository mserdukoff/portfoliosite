import { EasterEgg } from "@/components/easter-egg";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-background focus:px-3 focus:py-2 focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>
      <SiteHeader />
      <div id="content" className="flex flex-1 flex-col">
        {children}
      </div>
      <SiteFooter />
      <EasterEgg />
    </div>
  );
}
