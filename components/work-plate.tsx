import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import grammario from "@/public/grammario-preview.png";
import lociros from "@/public/lociros-preview.png";
import wheelbase from "@/public/wheelbase-preview.png";
import type { Project } from "@/lib/site";
import { cn } from "@/lib/utils";

const previews: Record<string, { image: StaticImageData; alt: string }> = {
  wheelbase: { image: wheelbase, alt: "Wheelbase homepage: The hardest worker in the car business" },
  lociros: {
    image: lociros,
    alt: "Lociros homepage: Every word has depth, beside an engraved cliff of Japanese words graded A1 to B2",
  },
  grammario: {
    image: grammario,
    alt: "Grammario homepage: See the grammar you missed, beside an Italian example analysis",
  },
};

const numerals = ["I", "II", "III", "IV", "V", "VI"];

export function WorkPlate({ project, index, className }: { project: Project; index: number; className?: string }) {
  const preview = previews[project.slug];
  const href = project.caseStudy ?? project.href ?? "#";
  const domain = project.href?.replace(/^https?:\/\//, "");

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link href={href} className="block" aria-label={`${project.title} case study`}>
        <div className="hairline-grid relative overflow-hidden bg-navy px-[7%] pb-[8%] pt-[11%] text-paper">
          <div className="caps absolute inset-x-[7%] top-[3.5%] flex justify-between text-[9.5px] text-paper/60">
            <span>Plate {numerals[index]}</span>
            <span>{domain}</span>
          </div>
          {preview ? (
            <Image
              src={preview.image}
              alt={preview.alt}
              sizes="(min-width: 1024px) 30vw, 90vw"
              placeholder="blur"
              className="relative aspect-[16/10] w-full object-cover object-top shadow-[0_18px_40px_-18px_rgb(0_0_0/0.7)] transition-transform duration-500 ease-out group-hover:-translate-y-1"
            />
          ) : null}
        </div>
      </Link>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-heading text-[1.9rem] leading-none tracking-[-0.015em]">
          <Link href={href} className="hover:text-seal">
            {project.title}
          </Link>
        </h3>
        <span className="caps text-[10px] text-muted-foreground">{project.period}</span>
      </div>
      <p className="mt-3 text-[16px] leading-[1.6] text-ink/80">{project.blurb ?? project.summary}</p>
      <p className="caps mt-4 text-[9.5px] leading-[1.9] text-muted-foreground">
        {project.stack.slice(0, 5).join("  ·  ")}
      </p>
      <div className="caps mt-auto flex gap-6 pt-5 text-[10.5px]">
        {project.caseStudy ? (
          <Link href={project.caseStudy} className="link-rule">
            Case study →
          </Link>
        ) : null}
        {project.href ? (
          <a href={project.href} className="link-rule text-muted-foreground hover:text-ink">
            {domain} ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}
