import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { label: "Writing", href: "/journal" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const linkClass = "hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="wrap pb-6">
        <div aria-hidden className="ruler" />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-mono text-[11px] text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((item) => (
              <Link key={item.label} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
            <a href={site.github} className={linkClass}>
              GitHub ↗
            </a>
            <a href={site.linkedin} className={linkClass}>
              LinkedIn ↗
            </a>
            <a href={site.x} className={linkClass}>
              X ↗
            </a>
            <a href={`mailto:${site.email}`} className={linkClass}>
              Email
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
