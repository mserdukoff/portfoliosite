import Image from "next/image";
import Link from "next/link";
import { Manuscripts } from "@/components/hero/manuscripts";
import { Monogram } from "@/components/monogram";
import { FocusPlate, MapPlate } from "@/components/plates";
import { SiteNav } from "@/components/site-nav";
import bust from "@/public/collage/bust-cutout.webp";
import clouds from "@/public/collage/clouds.webp";
import coast from "@/public/collage/coast.webp";
import hilltown from "@/public/collage/hilltown.webp";
import jet from "@/public/collage/jet.webp";
import temple from "@/public/collage/temple.webp";
import { hero, place, site } from "@/lib/site";
import { torn } from "@/lib/torn";

/** Position on the 3:2 poster, in percent, plus a settle-in delay. */
function at(x: number, y: number, w?: number, h?: number, delay = 0) {
  return {
    left: `${x}%`,
    top: `${y}%`,
    ...(w !== undefined && { width: `${w}%` }),
    ...(h !== undefined && { height: `${h}%` }),
    "--d": `${delay}ms`,
  } as React.CSSProperties;
}

const sheet = torn(7, { top: true, right: true }, 1.1, 48);
const steppedEdge =
  "polygon(0 0, 100% 0, 100% 100%, 16% 100%, 16% 94%, 9% 94%, 9% 86%, 4% 86%, 4% 74%, 0 74%)";

export function HeroCollage() {
  return (
    <section aria-label="Introduction" className="mx-auto hidden w-[min(100%,150svh)] lg:block">
      <div className="relative aspect-[3/2] overflow-hidden bg-paper [container-type:inline-size] *:absolute">
        {/* Upper left: the coast and the masthead. */}
        <div className="settle aspect-[16/9]" style={at(0, 2.5, 53)}>
          <Image src={coast} alt="" fill preload sizes="55vw" className="object-cover" />
        </div>
        <Link href="/" aria-label={`${site.name}, home`} className="settle text-[length:2.7cqw] hover:text-seal" style={at(2.2, 3.4)}>
          <Monogram />
        </Link>
        <div className="settle caps text-[length:max(9px,0.7cqw)] leading-[1.8]" style={at(11.6, 3)}>
          <p>{place.name}</p>
          <p className="text-muted-foreground">
            {place.lat}&nbsp;&nbsp;{place.lon}
          </p>
        </div>
        <div className="settle aspect-[9/16]" style={at(-3.6, 26, 15, undefined, 120)}>
          <Image src={temple} alt="" fill sizes="16vw" className="object-cover" />
        </div>

        {/* The torn sheet the name is printed on. */}
        <div className="drop-shadow-[0_-1px_1px_rgb(30_28_25/0.18)]" style={at(9.4, 31, 41.8, 45)}>
          <div className="size-full bg-paper" style={{ clipPath: sheet }} />
        </div>

        {/* Upper right: navy survey plate, clouds, nav. */}
        <MapPlate
          className="settle text-[length:1cqw]"
          sizes="30vw"
          style={{ ...at(52, 0, 28.6, 58, 80), clipPath: steppedEdge }}
        />
        <div className="settle" style={at(80.6, 0, 10.2, 30.5, 160)}>
          <Image src={clouds} alt="" fill sizes="11vw" placeholder="blur" className="object-cover" />
        </div>
        <div className="settle text-[length:max(10px,0.74cqw)]" style={at(91.8, 8.6, undefined, undefined, 200)}>
          <SiteNav orientation="vertical" />
        </div>
        <div className="settle" style={at(78.4, 30.5, 11.8, 14.5, 220)}>
          <Image src={jet} alt="" fill sizes="13vw" placeholder="blur" className="object-cover" />
        </div>
        <div className="settle overflow-hidden bg-navy" style={at(90.2, 30.5, 9.8, 14.5, 260)}>
          <Image src={clouds} alt="" fill sizes="10vw" className="object-cover object-bottom opacity-35 mix-blend-luminosity" />
        </div>
        <div className="settle hairline-grid grid place-items-center bg-navy text-paper/60" style={at(75.4, 56, 4.4, 12, 300)}>
          <span aria-hidden className="text-[length:1.4cqw] leading-none">+</span>
        </div>
        <FocusPlate className="settle text-[length:max(9px,0.72cqw)]" sizes="22vw" style={at(78.4, 45, 21.6, 30.5, 320)} />

        {/* Lower middle: hill town, manuscripts. */}
        <div className="settle aspect-[16/9]" style={at(48.6, 58.2, 33.5, undefined, 280)}>
          <Image src={hilltown} alt="" fill sizes="34vw" className="object-cover" />
        </div>
        <div className="settle" style={at(49.6, 22.5, 22.4, 43.5, 200)}>
          <Manuscripts className="size-full" />
        </div>
        <Link
          href="/work"
          className="settle caps group flex items-center justify-between border-b border-ink/60 pb-[0.7cqw] text-[length:max(10px,0.82cqw)] hover:border-seal hover:text-seal"
          style={at(79, 88.6, 14, undefined, 460)}
        >
          Explore my work
          <span aria-hidden className="text-[1.4em] leading-none transition-transform group-hover:translate-x-1">→</span>
        </Link>

        {/* Lower left: navy block and bust. */}
        <div className="settle bg-navy" style={at(15.4, 74, 37.2, 26, 240)} />
        <span aria-hidden className="settle aspect-square rounded-full bg-seal/80 mix-blend-multiply" style={at(5.6, 74.5, 5.2, undefined, 340)} />
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="settle aspect-square text-[#8f939b]"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.45"
          style={at(34.6, 71.5, 11, undefined, 380)}
        >
          <circle cx="50" cy="50" r="38" />
          <line x1="50" y1="4" x2="50" y2="96" />
          <line x1="4" y1="62" x2="96" y2="62" />
          <path d="M50 12 L18 74 L82 74 Z" strokeOpacity="0.7" />
        </svg>
        <div className="settle" style={at(9.6, 73.2, 16.4, undefined, 300)}>
          <Image src={bust} alt="Classical marble bust in profile" sizes="18vw" placeholder="blur" className="h-auto w-full" />
        </div>
        <div className="settle caps flex items-center gap-[0.8cqw] text-[length:max(9px,0.7cqw)]" style={at(2.4, 93.6, undefined, undefined, 500)}>
          01
          <span aria-hidden className="h-px w-[5cqw] bg-ink" />
        </div>

        {/* The name, on top of everything it overlaps. */}
        <div className="settle" style={at(17, 33.4, 31.5, undefined, 60)}>
          <h1 className="font-slavonic text-[length:6.5cqw] font-normal leading-[0.95]">
            Matt
            <br />
            Serdukoff
          </h1>
          <p className="caps mt-[1.7cqw] text-[length:max(9px,0.8cqw)] leading-[2]">
            {hero.disciplines.map((row) => (
              <span key={row.join()} className="block">
                {row.join("  ×  ")}
              </span>
            ))}
          </p>
          <p className="mt-[1.3cqw] text-[length:max(12px,1.27cqw)] leading-[1.5] text-ink/90">{hero.intro}</p>
        </div>
        <span aria-hidden className="h-px bg-ink/45" style={at(43.6, 47.6, 6.4)} />
        <span aria-hidden className="aspect-square rounded-full border border-ink/60" style={at(48.7, 68.8, 0.75)} />
      </div>
    </section>
  );
}
