import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, SectionHead } from "@/components/page-header";
import { MapPlate } from "@/components/plates";
import { Reveal } from "@/components/reveal";
import { certifications, education, experience, impact, projects, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Experience, measured impact, and case studies from production AI and full-stack work.",
};

export default function WorkPage() {
  const caseStudies = projects.filter((project) => project.caseStudy);

  return (
    <div className="page">
      <PageHeader
        index="01"
        label="Work"
        title="Work"
        lead={<p>{site.homepageLead}</p>}
        art={<MapPlate className="aspect-[4/3] text-[13px]" sizes="(min-width: 1024px) 45vw, 100vw" />}
      />

      <section className="mt-10">
        <SectionHead index="I — Experience" title="Where I have shipped" className="border-t-0 pt-0" />
        <ol className="mt-4">
          {experience.map((item) => (
            <li
              key={item.org}
              className="grid gap-4 border-b border-border py-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12"
            >
              <div className="caps text-[10px] leading-[2] text-muted-foreground">
                <p className="text-ink">{item.period}</p>
                <p>{item.place}</p>
                {item.caseStudy ? (
                  <Link href={item.caseStudy} className="link-rule mt-3 inline-block text-ink">
                    Case study →
                  </Link>
                ) : null}
              </div>
              <div>
                <h3 className="font-heading text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight tracking-[-0.015em]">
                  {item.role}
                </h3>
                <p className="mt-1 text-[16px] text-muted-foreground">
                  {item.org}
                  {item.product && item.href ? (
                    <>
                      {" · "}
                      <a href={item.href} className="link-rule hover:text-ink">
                        {item.product} ↗
                      </a>
                    </>
                  ) : null}
                </p>
                <p className="mt-5 max-w-3xl text-[17px] leading-[1.65] text-ink/85">{item.summary}</p>
                <ul className="mt-5 max-w-3xl space-y-2.5 text-[16px] leading-[1.6] text-ink/75">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex gap-4">
                      <span aria-hidden className="mt-[0.75em] h-px w-4 shrink-0 bg-seal" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="caps mt-6 text-[9.5px] leading-[1.9] text-muted-foreground">
                  {item.stack.join("  ·  ")}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-24">
        <SectionHead index="II — Impact" title="Measured, not estimated" />
        <Reveal>
          <ul className="cell-grid cell-grid-3 mt-4 grid sm:grid-cols-2 xl:grid-cols-3">
            {impact.map((item) => (
              <li key={item.label}>
                <p className="font-heading text-[clamp(2.4rem,4vw,3.2rem)] leading-none tracking-[-0.03em] text-navy">
                  {item.value}
                </p>
                <p className="caps mt-3 text-[10px] text-ink">{item.label}</p>
                <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mt-24">
        <SectionHead index="III — Case studies" title="The long versions" />
        <ul className="mt-4">
          {caseStudies.map((project, index) => (
            <li key={project.slug}>
              <Link
                href={project.caseStudy!}
                className="group grid gap-3 border-b border-border py-7 sm:grid-cols-[4rem_minmax(0,16rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
              >
                <span className="caps text-[10px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-heading text-[2rem] leading-none tracking-[-0.015em] transition-colors group-hover:text-seal">
                  {project.title}
                </span>
                <span className="text-[16px] leading-[1.55] text-ink/75">{project.blurb}</span>
                <span aria-hidden className="text-xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24 grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <SectionHead index="IV — Education" title="Study" />
          <ol className="mt-4">
            {education.map((item) => (
              <li key={item.school} className="grid gap-2 border-b border-border py-7 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
                <p className="caps pt-1 text-[10px] text-muted-foreground">{item.period}</p>
                <div>
                  <p className="font-heading text-[1.4rem] leading-snug">{item.degree}</p>
                  <p className="mt-1 text-[15px] text-muted-foreground">{item.school}</p>
                  <p className="mt-3 max-w-2xl text-[15px] leading-[1.6] text-ink/70">{item.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <SectionHead index="V — Certificates" title="Coursework" />
          <ul className="mt-4">
            {certifications.map((item) => (
              <li key={item.name} className="border-b border-border py-4">
                <p className="text-[16px] leading-snug">{item.name}</p>
                <p className="caps mt-1.5 text-[9.5px] text-muted-foreground">{item.issuer}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
