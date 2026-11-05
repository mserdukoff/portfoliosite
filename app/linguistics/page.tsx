import type { Metadata } from "next";
import { CaseSection } from "@/components/case-study";
import { LinguisticsArt } from "@/components/header-art";
import { SpokenLanguages, Topic } from "@/components/linguistics";
import { SectionPage } from "@/components/section-page";
import { linguistics, linguisticsLead } from "@/lib/site";

export const metadata: Metadata = {
  title: "Linguistics",
  description:
    "Morphology, syntax, agreement, typology, writing systems, and graded input: the linguistics behind Grammario and Lociros.",
};

export default function LinguisticsPage() {
  return (
    <SectionPage section="linguistics" lead={linguisticsLead} art={<LinguisticsArt />}>
      <nav aria-label="Topics" className="flex flex-wrap gap-2 font-mono text-[12px]">
        {linguistics.map((topic) => (
          <a key={topic.id} href={`#${topic.id}`} className="border border-border px-3 py-1.5 transition-colors hover:border-foreground">
            {topic.title}
          </a>
        ))}
        <a href="#languages" className="border border-border px-3 py-1.5 transition-colors hover:border-foreground">
          Languages I speak
        </a>
      </nav>
      {linguistics.map((topic, i) => (
        <CaseSection key={topic.id} id={topic.id} code={String(i + 1).padStart(2, "0")} title={topic.title}>
          <Topic topic={topic} />
        </CaseSection>
      ))}
      <CaseSection id="languages" code={String(linguistics.length + 1).padStart(2, "0")} title="Languages I speak">
        <SpokenLanguages />
      </CaseSection>
    </SectionPage>
  );
}
