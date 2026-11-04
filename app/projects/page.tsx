import type { Metadata } from "next";
import { CaseSection } from "@/components/case-study";
import { GithubActivity } from "@/components/github-activity";
import { ProjectsArt } from "@/components/header-art";
import { OpenSource, Projects } from "@/components/home/projects";
import { SectionPage } from "@/components/section-page";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <SectionPage section="projects" art={<ProjectsArt />}>
      <Projects />
      <CaseSection id="open-source" code="01" title="Open source">
        <OpenSource />
      </CaseSection>
      <CaseSection id="activity" code="02" title="Activity">
        <div className="mt-6">
          <GithubActivity />
        </div>
      </CaseSection>
    </SectionPage>
  );
}
