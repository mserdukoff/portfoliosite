/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Pencil, User } from "lucide-react";
import { Panel } from "@/components/case-study";
import { DitherBust } from "@/components/dither-plate";
import { Reveal } from "@/components/reveal";
import { certifications, education, site } from "@/lib/site";

const inlineLink =
  "text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-primary";

export function About() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
      <Reveal className="max-w-[62ch] space-y-5 text-[14px] leading-7 text-[#c7d2d9]">
        <p>
          I&apos;m an AI and software engineer in {site.location}. At Hime I
          build Wheelbase end to end, from Postgres security policies to the
          retrieval layer to the React app dealers use every day. On my own I
          built Grammario and Lociros, NLP products for language learners, and
          at the Massachusetts Executive Office for Administration and Finance
          I built AWS Bedrock pipelines that translate financial documents
          without breaking their layout.
        </p>
        <p>{site.homepageClose}</p>
        <p>{site.aboutClose}</p>
        <p>
          I learn fast by building. Wheelbase ingestion got too slow in Python,
          so I{" "}
          <Link href="/journal/new-challenges-new-languages" className={inlineLink}>
            learned Go
          </Link>{" "}
          and rewrote it. I picked up a pandas plotting bug and{" "}
          <Link href="/projects#open-source" className={inlineLink}>
            got the fix merged upstream
          </Link>
          . Outside of code I read history and science, and I am always partway
          through learning{" "}
          <Link href="/linguistics" className={inlineLink}>
            another language
          </Link>
          .
        </p>
      </Reveal>

      <div className="grid content-start gap-3 sm:grid-cols-2">
        <Panel icon={User} title="Portrait" className="self-start">
          <div className="grid-lines relative aspect-square overflow-hidden">
            <svg aria-hidden viewBox="0 0 300 300" className="absolute inset-0 size-full text-teal/45" fill="none" stroke="currentColor" strokeWidth=".8">
              <circle cx="150" cy="150" r="128" strokeDasharray="3 5" />
              <circle cx="150" cy="150" r="92" />
              <path d="M0 150H300M150 0V300" opacity=".4" />
            </svg>
            <DitherBust className="absolute inset-0" />
          </div>
        </Panel>
        <Panel icon={Pencil} title="Serpent" meta="Pencil" className="self-start">
          <div className="specimen-light flex aspect-square items-center p-3">
            <img
              src="/art/serpent.webp"
              width={900}
              height={714}
              alt="Pencil drawing: two faces in profile, turned away from each other, each wrapped in the coils of a serpent. A cobra rises from one head; a blunt, featureless shape rises from the other."
              loading="lazy"
              className="block h-auto w-full"
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}

export function Record() {
  return (
    <ol className="mt-6 border-t border-border">
      {education.map((item) => (
        <li
          key={item.school}
          className="grid gap-x-8 gap-y-2 border-b border-border py-5 lg:grid-cols-[11rem_minmax(0,1fr)]"
        >
          <p className="font-mono text-[11px] leading-5 text-primary">{item.period}</p>
          <div>
            <h3 className="font-heading text-[17px] font-normal leading-snug">{item.degree}</h3>
            <p className="mt-1 text-[13px] text-muted-foreground">{item.school}</p>
            <p className="mt-2 max-w-[86ch] text-[13px] leading-6 text-[#b9c6ce]">{item.note}</p>
          </div>
        </li>
      ))}
      <li className="grid gap-x-8 gap-y-2 border-b border-border py-5 lg:grid-cols-[11rem_minmax(0,1fr)]">
        <p className="font-mono text-[11px] leading-5 text-primary">Certifications</p>
        <ul className="space-y-2.5">
          {certifications.map((item) => (
            <li key={item.name} className="text-[13px] leading-snug">
              {item.name}
              <span className="block text-[12px] text-muted-foreground">{item.issuer}</span>
            </li>
          ))}
        </ul>
      </li>
    </ol>
  );
}
