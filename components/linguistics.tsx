import Link from "next/link";
import { MousePointerClick } from "lucide-react";
import { Panel, PanelTitle } from "@/components/case-study";
import { LanguageRadar } from "@/components/language-radar";
import { projectIcon } from "@/components/project-icons";
import { Reveal } from "@/components/reveal";
import { languages, type LinguisticsTopic, projects, site } from "@/lib/site";

export function Topic({
  topic,
  demo,
}: {
  topic: LinguisticsTopic;
  demo?: { title: string; node: React.ReactNode };
}) {
  return (
    <>
      <Reveal className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="max-w-[62ch] text-[14px] leading-7 text-[#c7d2d9]">{topic.summary}</p>
          {topic.examples.length ? (
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {topic.examples.map((example) => (
                <li key={example.text} className="py-4">
                  <p className="text-[clamp(1.375rem,2.6vw,1.875rem)] leading-snug">
                    <bdi lang={example.lang} dir={example.dir}>
                      {example.text}
                    </bdi>
                  </p>
                  <p className="mt-1.5 font-mono text-[11px] leading-5 text-muted-foreground">{example.gloss}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <ul className="grid content-start gap-3">
          {topic.applied.map((item) => {
            const project = projects.find((entry) => entry.slug === item.project);
            if (!project?.caseStudy) return null;
            return (
              <li key={item.project}>
                <Link href={project.caseStudy} className="panel">
                  <p className="panel-head">
                    <PanelTitle icon={projectIcon(project.slug)} title={`In ${project.title}`} />
                    <span aria-hidden className="text-muted-foreground">→</span>
                  </p>
                  <p className="border-t border-border px-2.5 py-3 text-[13px] leading-6 text-foreground/85">{item.body}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>
      {demo ? (
        <Panel icon={MousePointerClick} title={demo.title} className="mt-8">
          <div className="px-4 py-6 sm:px-6">{demo.node}</div>
        </Panel>
      ) : null}
    </>
  );
}

export function SpokenLanguages() {
  return (
    <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,22rem)] lg:items-center lg:gap-12">
      <div>
        <p className="max-w-[62ch] text-[14px] leading-7 text-[#c7d2d9]">{site.aboutLanguages}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {languages.map((language) => (
            <li key={language.name} className="panel px-2.5 py-2">
              <p className="flex items-baseline justify-between gap-2 font-mono text-[12px]">
                {language.name}
                <span className="text-[10px] text-muted-foreground">{language.level}</span>
              </p>
              <span aria-hidden className="relative mt-2 block h-1.5 bg-foreground/10">
                <span
                  className="absolute inset-y-0 left-0 bg-[#8a9aa6]"
                  style={{ width: `${language.score}%` }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <LanguageRadar className="mx-auto w-full max-w-xs" fontSize={12} />
    </div>
  );
}
