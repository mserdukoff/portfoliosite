/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import {
  experience,
  grammarioLanguages,
  impact,
  programmingLanguages,
  projects,
  skills,
} from "@/lib/site";

const actionLink =
  "font-mono text-[12px] text-muted-foreground underline decoration-foreground/25 underline-offset-4 hover:text-foreground hover:decoration-primary";

const features = [
  {
    slug: "wheelbase",
    code: "W-01",
    accent: "var(--orange)",
    site: "wheelbase.io",
    image: "/wheelbase-preview.png",
    width: 1100,
    height: 368,
    alt: "Wheelbase homepage: The hardest worker in the car business",
    facts: [
      { value: "80%+", label: "less DB load after the Go rewrite" },
      { value: "66", label: "tables under Row Level Security" },
      { value: "3", label: "surfaces: web, desktop, mobile" },
    ],
  },
  {
    slug: "lociros",
    code: "L-02",
    accent: "var(--teal)",
    site: "lociros.com",
    image: "/lociros-preview.png",
    width: 1650,
    height: 904,
    alt: "Lociros homepage: Graded readers where A2 is actually A2, beside an A2 Japanese passage with one word tapped open for its reading and grammar",
    facts: [
      { value: "A1–B2", label: "CEFR levels, enforced by validators" },
      { value: "4", label: "Japanese, Arabic, Italian, Russian" },
    ],
  },
  {
    slug: "grammario",
    code: "G-03",
    accent: "var(--blue)",
    site: "grammario.ai",
    image: "/grammario-preview.png",
    width: 1100,
    height: 603,
    alt: "Grammario homepage: See the grammar you missed, beside an Italian example analysis that catches a gender agreement mistake",
    facts: [
      { value: "9s → 4s", label: "analysis latency" },
      { value: String(grammarioLanguages.length), label: "languages, one strategy per family" },
    ],
  },
];

function Feature({ feature }: { feature: (typeof features)[number] }) {
  const project = projects.find((item) => item.slug === feature.slug);
  if (!project) return null;
  return (
    <Reveal>
      <article
        id={project.slug}
        className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12"
        style={{ "--row-accent": feature.accent } as React.CSSProperties}
      >
        <div className="flex flex-col">
          <p className="font-mono text-[12px] text-[var(--row-accent)]">
            {feature.code} <span className="text-muted-foreground">· {project.period}</span>
          </p>
          <h2 className="mt-3 font-heading text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-none tracking-[-0.01em]">
            {project.title}
          </h2>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.75] text-[#b9c6ce]">
            {project.blurb}
          </p>
          <ul className="mt-5 max-w-[52ch] space-y-1.5 text-[13px] leading-5 text-foreground/85">
            {project.highlights?.map((point) => (
              <li key={point} className="flex gap-2.5">
                <span aria-hidden className="mt-[0.45rem] size-1 shrink-0 bg-[var(--row-accent)]" />
                {point}
              </li>
            ))}
          </ul>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
            {feature.facts.map((fact) => (
              <div key={fact.label} className="max-w-36">
                <dd className="font-heading text-2xl leading-none text-[var(--row-accent)]">{fact.value}</dd>
                <dt className="mt-1.5 font-mono text-[10px] leading-4 text-muted-foreground">{fact.label}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-7 flex flex-wrap gap-2 font-mono text-[12px] lg:mt-auto lg:pt-7">
            <Link
              href={project.caseStudy ?? "/work"}
              className="hud-btn"
            >
              Case study <span aria-hidden>→</span>
            </Link>
            <a
              href={project.href}
              className="border border-border px-3 py-2 transition-colors hover:border-foreground"
            >
              {feature.site} <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
        <figure className="brackets min-w-0 self-center p-2">
          <figcaption className="flex justify-between px-1 pb-2 font-mono text-[10px] text-muted-foreground">
            <span>[{feature.code}] {feature.site}</span>
            <span>Live product</span>
          </figcaption>
          <img
            src={feature.image}
            width={feature.width}
            height={feature.height}
            alt={feature.alt}
            loading="lazy"
            className="block h-auto w-full border border-border"
          />
          <p className="px-1 pt-2 font-mono text-[10px] leading-4 text-muted-foreground">
            {project.stack.join(" · ")}
          </p>
        </figure>
      </article>
    </Reveal>
  );
}

export function SelectedWork() {
  return (
    <div className="-mt-10">
      {features.map((feature) => (
        <Feature key={feature.slug} feature={feature} />
      ))}
    </div>
  );
}

export function Impact() {
  return (
    <ul className="mt-6 border-t border-border">
      {impact.map((item) => (
        <li
          key={item.label}
          className="grid gap-x-8 gap-y-1.5 border-b border-border py-5 lg:grid-cols-[11rem_16rem_minmax(0,1fr)] lg:items-baseline"
        >
          <p className="font-heading text-[clamp(1.75rem,2.6vw,2.25rem)] leading-none tracking-[-0.02em] text-primary">
            {item.value}
          </p>
          <h3 className="font-mono text-[12px] font-normal">{item.label}</h3>
          <p className="max-w-[72ch] text-[13px] leading-6 text-muted-foreground">{item.detail}</p>
        </li>
      ))}
    </ul>
  );
}

export function Experience() {
  return (
    <ol className="mt-6 border-t border-border">
      {experience.map((item) => (
        <li
          key={item.org}
          className="grid gap-x-8 gap-y-3 border-b border-border py-8 lg:grid-cols-[11rem_minmax(0,1fr)]"
        >
          <div className="font-mono text-[11px] leading-5 text-muted-foreground">
            <p className="text-primary">{item.period}</p>
            <p>{item.place}</p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-normal leading-tight">{item.role}</h3>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {item.org}
              {item.product && item.href ? (
                <>
                  {" · "}
                  <a href={item.href} className="hover:text-primary">
                    {item.product} ↗
                  </a>
                </>
              ) : null}
            </p>
            <p className="mt-3 max-w-[86ch] text-[13px] leading-6 text-[#b9c6ce]">{item.summary}</p>
            <ul className="mt-4 max-w-[86ch] space-y-2 text-[13px] leading-6 text-foreground/80">
              {item.highlights.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7rem] h-px w-3 shrink-0 bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="font-mono text-[11px] leading-5 text-muted-foreground">
                {item.stack.join(" · ")}
              </p>
              {item.caseStudy ? (
                <Link href={item.caseStudy} className={actionLink}>
                  Read the case study
                </Link>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Skills() {
  return (
    <>
      <ul className="mt-6 flex flex-wrap gap-1.5">
        {programmingLanguages.map((language) => (
          <li key={language} className="bg-primary px-2 py-1 font-mono text-[12px] text-primary-foreground">
            {language}
          </li>
        ))}
      </ul>
      <ul className="mt-6 border-t border-border">
        {skills.map((group) => (
          <li
            key={group.area}
            className="grid gap-x-8 gap-y-2 border-b border-border py-5 lg:grid-cols-[14rem_minmax(0,1fr)]"
          >
            <h3 className="font-mono text-[12px] font-normal">{group.area}</h3>
            <div>
              <p className="max-w-[86ch] text-[13px] leading-6 text-[#b9c6ce]">{group.proof}</p>
              <p className="mt-2 font-mono text-[11px] leading-5 text-muted-foreground">
                {group.tools.join(" · ")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
