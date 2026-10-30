import Image from "next/image";
import bust from "@/public/collage/bust-cutout.webp";
import globe from "@/public/collage/globe.webp";
import map from "@/public/collage/map.webp";
import { hero, place } from "@/lib/site";
import { cn } from "@/lib/utils";

type PlateProps = {
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
};

/** Night relief map with a survey ring and a fix on home. */
export function MapPlate({ className, style, sizes = "40vw" }: PlateProps) {
  return (
    <div aria-hidden className={cn("relative overflow-hidden bg-navy-deep text-paper", className)} style={style}>
      <Image src={map} alt="" fill sizes={sizes} placeholder="blur" className="object-cover opacity-90" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        fill="none"
        stroke="currentColor"
      >
        <ellipse cx="78" cy="46" rx="58" ry="44" strokeOpacity="0.28" strokeWidth="0.25" />
        <line x1="66" y1="0" x2="66" y2="100" strokeOpacity="0.18" strokeWidth="0.2" strokeDasharray="1 1.4" />
        <rect x="60" y="13" width="12" height="9" strokeOpacity="0.5" strokeWidth="0.25" />
        <line x1="66" y1="15.5" x2="66" y2="19.5" strokeOpacity="0.7" strokeWidth="0.25" />
        <line x1="63.5" y1="17.5" x2="68.5" y2="17.5" strokeOpacity="0.7" strokeWidth="0.25" />
      </svg>
      <p className="caps absolute left-[76%] top-[13%] text-[length:max(9px,0.62em)] leading-[1.7] text-paper/75">
        {place.lat.replace("° N", "")}
        <br />
        {place.lon.replace("° W", "")}
      </p>
    </div>
  );
}

/** What I build, set over the night side of the planet. */
export function FocusPlate({ className, style, sizes = "30vw" }: PlateProps) {
  return (
    <div className={cn("relative overflow-hidden bg-navy-deep text-paper", className)} style={style}>
      <Image src={globe} alt="" fill sizes={sizes} placeholder="blur" className="object-cover object-right-bottom" />
      <ul className="caps relative space-y-[0.55em] p-[1.6em] leading-snug text-paper/85">
        {hero.focus.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/** Marble bust stepping out of a navy block. */
export function BustPlate({ className, sizes = "40vw" }: PlateProps) {
  return (
    <div className={cn("relative [container-type:inline-size]", className)}>
      <div className="absolute bottom-0 left-[26%] right-0 top-[14%] bg-navy" />
      <span aria-hidden className="absolute left-[3%] top-[6%] aspect-square w-[11%] rounded-full bg-seal/80 mix-blend-multiply" />
      <Image
        src={bust}
        alt="Classical marble bust in profile"
        sizes={sizes}
        placeholder="blur"
        className="relative z-10 ml-[6%] h-auto w-[44%]"
      />
    </div>
  );
}
