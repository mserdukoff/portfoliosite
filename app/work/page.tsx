import type { Metadata } from "next";
import { CaseSection } from "@/components/case-study";
import { WorkArt } from "@/components/header-art";
import { Experience, Impact, SelectedWork, Skills } from "@/components/home/work";
import { SectionPage } from "@/components/section-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <SectionPage section="work" lead={site.homepageLead} art={<WorkArt />}>
      <SelectedWork />
      <CaseSection id="impact" code="01" title="Impact">
        <Impact />
      </CaseSection>
      <CaseSection id="experience" code="02" title="Experience">
        <Experience />
      </CaseSection>
      <CaseSection id="skills" code="03" title="Skills">
        <Skills />
      </CaseSection>
    </SectionPage>
  );
}
