import Image from "next/image";
import Link from "next/link";
import { Manuscripts } from "@/components/hero/manuscripts";
import { BustPlate, FocusPlate, MapPlate } from "@/components/plates";
import coast from "@/public/collage/coast.webp";
import { hero } from "@/lib/site";
import { torn } from "@/lib/torn";

const sheet = torn(19, { top: true }, 3, 30);

export function HeroStacked() {
  return (
    <section aria-label="Introduction" className="page lg:hidden">
      <div className="relative -mx-5 aspect-[16/9] sm:-mx-8">
        <Image src={coast} alt="" fill preload sizes="100vw" className="object-cover" />
      </div>

      <div className="relative -mx-5 -mt-[14%] bg-paper px-5 pt-10 sm:-mx-8 sm:px-8" style={{ clipPath: sheet }}>
        <h1 className="font-slavonic text-[clamp(3.2rem,15vw,6rem)] font-normal leading-[0.95]">
          Matt
          <br />
          Serdukoff
        </h1>
        <p className="caps mt-6 text-[10.5px] leading-[2]">
          {hero.disciplines.map((row) => (
            <span key={row.join()} className="block">
              {row.join("  ×  ")}
            </span>
          ))}
        </p>
        <p className="mt-5 max-w-xl text-[17px] leading-[1.6] text-ink/90">{hero.intro}</p>
        <Link
          href="/work"
          className="caps group mt-9 flex max-w-xs items-center justify-between border-b border-ink/60 pb-2 text-[11px] hover:text-seal"
        >
          Explore my work
          <span aria-hidden className="text-base transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4">
        <Manuscripts className="aspect-[4/5]" />
        <MapPlate className="aspect-[4/5] text-[13px]" sizes="50vw" />
        <BustPlate className="col-span-2 mt-6" sizes="60vw" />
        <FocusPlate className="col-span-2 aspect-[16/9] text-[10.5px] sm:aspect-[21/9]" sizes="100vw" />
      </div>
    </section>
  );
}
