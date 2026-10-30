import Image from "next/image";
import Link from "next/link";
import { LocalClock } from "@/components/local-clock";
import { Monogram } from "@/components/monogram";
import map from "@/public/collage/map.webp";
import { nav, place, site } from "@/lib/site";

const elsewhere = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-28 overflow-hidden bg-navy-deep text-paper">
      <Image
        src={map}
        alt=""
        aria-hidden
        sizes="60vw"
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-[70%] object-cover opacity-45 [mask-image:linear-gradient(to_right,transparent,black_60%)]"
      />
      <div className="page relative grid gap-14 py-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:py-20">
        <div>
          <p className="caps text-[10.5px] text-paper/55">Correspondence</p>
          <p className="mt-5 max-w-xl font-heading text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.015em]">
            {site.status} in AI engineering, ML, data, and software engineering.
          </p>
          <p className="mt-4 max-w-md text-[16px] leading-[1.6] text-paper/70">
            {site.scope.charAt(0).toUpperCase() + site.scope.slice(1)}. US citizen, no sponsorship needed.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-baseline gap-3 border-b border-paper/40 pb-1.5 font-heading text-[clamp(1.25rem,2vw,1.6rem)] italic transition-colors hover:border-seal hover:text-[#e7a48f]"
          >
            {site.email}
            <span aria-hidden className="not-italic">→</span>
          </a>
        </div>

        <div className="caps grid grid-cols-2 gap-10 text-[10.5px] leading-[2.1]">
          <div>
            <p className="text-paper/45">Index</p>
            <ul className="mt-3">
              <li>
                <Link href="/" className="hover:text-[#e7a48f]">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#e7a48f]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-paper/45">Elsewhere</p>
            <ul className="mt-3">
              {elsewhere.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-[#e7a48f]">
                    {item.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 border-t border-paper/15 pt-5 text-paper/60">
            <p>{place.name}</p>
            <p>
              {place.lat}&nbsp;&nbsp;{place.lon}
            </p>
            <p className="mt-1 text-paper/80">
              <LocalClock />
            </p>
          </div>
        </div>
      </div>
      <div className="page relative flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 py-5 caps text-[10px] text-paper/50">
        <span className="flex items-center gap-4">
          <Monogram className="text-[1.4rem] normal-case tracking-normal text-paper/80" />© {new Date().getFullYear()}{" "}
          {site.name}
        </span>
        <span className="flex gap-6">
          <Link href="/privacy" className="hover:text-paper">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-paper">
            Terms
          </Link>
        </span>
      </div>
    </footer>
  );
}
