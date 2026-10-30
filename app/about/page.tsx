import type { Metadata } from "next";
import Link from "next/link";
import { ContactActions } from "@/components/contact-actions";
import { LanguageRadar } from "@/components/language-radar";
import { PageHeader, SectionHead } from "@/components/page-header";
import { BustPlate } from "@/components/plates";
import { Reveal } from "@/components/reveal";
import { languages, programmingLanguages, site, skills } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "AI and software engineer working where language, data, and real-world systems meet.",
};

export default function AboutPage() {
  return (
    <div className="page">
      <PageHeader
        index="04"
        label="About"
        title="About"
        art={<BustPlate className="mx-auto max-w-xl" sizes="(min-width: 1024px) 22vw, 50vw" />}
      />

      <section className="mt-16">
        <Reveal className="max-w-2xl space-y-6 text-[18px] leading-[1.7] text-ink/85">
          <p className="first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-[4.4rem] first-letter:leading-[0.85] first-letter:text-seal">
            I&apos;m an AI and software engineer in {site.location}. At Hime I build Wheelbase end to end, from
            Postgres security policies to the retrieval layer to the React app dealers use every day. On my own I
            built Grammario and Lociros, NLP products for language learners, and at the Massachusetts Executive
            Office for Administration and Finance I built AWS Bedrock pipelines that translate financial documents
            without breaking their layout.
          </p>
          <p>{site.homepageClose}</p>
          <p>{site.aboutClose}</p>
          <p>
            When Wheelbase ingestion got too slow in Python, I{" "}
            <Link href="/writings/new-challenges-new-languages" className="link-rule">
              learned Go
            </Link>{" "}
            and rewrote it. I also{" "}
            <Link href="/projects#open-source" className="link-rule">
              fixed a small pandas plotting bug
            </Link>{" "}
            that was merged upstream. Outside of code I read history, science, and philosophy, and I&apos;m usually
            partway through learning another language.
          </p>
        </Reveal>
      </section>

      <section id="languages" className="mt-24 scroll-mt-8">
        <SectionHead index="I — Languages" title="Languages" />
        <Reveal className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
          <div>
            <p className="max-w-2xl text-[18px] leading-[1.7] text-ink/85">{site.aboutLanguages}</p>
            <ul className="mt-10 grid grid-cols-2 border-t border-border sm:grid-cols-3 lg:grid-cols-4">
              {languages.map((language) => (
                <li key={language.name} className="border-b border-border py-5 pr-4">
                  <p lang={language.lang} className="font-heading text-[1.75rem] leading-none">
                    {language.native}
                  </p>
                  <p className="caps mt-3 text-[9.5px] text-muted-foreground">
                    {language.name} · {language.level}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <LanguageRadar className="mx-auto w-full max-w-xs" fontSize={12} />
        </Reveal>
      </section>

      <section id="skills" className="mt-24 scroll-mt-8">
        <SectionHead index="II — Toolkit" title="Skills" />
        <ul className="mt-8 flex flex-wrap gap-2">
          {programmingLanguages.map((language) => (
            <li key={language} className="caps bg-navy px-2.5 py-1.5 text-[10px] text-paper">
              {language}
            </li>
          ))}
        </ul>
        <ul className="cell-grid cell-grid-3 mt-8 grid border-t border-border sm:grid-cols-2 xl:grid-cols-3">
          {skills.map((group) => (
            <li key={group.area} className="flex flex-col">
              <h3 className="font-heading text-[1.5rem] leading-tight">{group.area}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">{group.proof}</p>
              <p className="caps mt-auto pt-5 text-[9.5px] leading-[2] text-ink/75">{group.tools.join("  ·  ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="mt-24 scroll-mt-8">
        <SectionHead index="III — Contact" title="Write to me" />
        <p className="mt-6 max-w-xl text-[18px] leading-[1.65] text-ink/80">
          {site.status} in AI engineering, ML, data, and software engineering, {site.scope}. US citizen, no
          sponsorship needed.
        </p>
        <div className="mt-8">
          <ContactActions />
        </div>
      </section>
    </div>
  );
}
