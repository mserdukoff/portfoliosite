import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-sm text-[13px] leading-6 text-muted-foreground">
          {site.metadata}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <Mail className="size-3" />
            Email
          </a>
          <a
            href={site.github}
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            GitHub
            <ArrowUpRight className="size-3" />
          </a>
          <a
            href={site.linkedin}
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            LinkedIn
            <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
