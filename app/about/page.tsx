/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { CaseSection } from "@/components/case-study";
import { About, Languages, Record } from "@/components/home/about";
import { SectionPage } from "@/components/section-page";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <SectionPage
      section="about"
      bare
      art={
        <img
          src="/art/castle-header.webp"
          width={900}
          height={462}
          fetchPriority="high"
          alt="Colored-pencil drawing: a hand spraying a grinning paint can in front of a cracked castle gate, under a sign reading Матвей Сердюков."
          className="block h-auto w-full"
        />
      }
    >
      <About />
      <CaseSection id="languages" code="01" title="Languages">
        <Languages />
      </CaseSection>
      <CaseSection id="record" code="02" title="Record">
        <Record />
      </CaseSection>
    </SectionPage>
  );
}
