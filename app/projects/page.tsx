import type { Metadata } from "next";
import Image from "next/image";
import { GithubActivity } from "@/components/github-activity";
import { PageHeader, SectionHead } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { WorkPlate } from "@/components/work-plate";
import hilltown from "@/public/collage/hilltown.webp";
import { formatDate, openSource, projects, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Products in production, ML and systems experiments, and a fix merged into pandas.",
};

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <figure className="min-w-0">
      <figcaption className="caps text-[9.5px] text-muted-foreground">{label}</figcaption>
      <pre className="mt-2 overflow-x-auto bg-navy-deep px-5 py-4 font-mono text-[12px] leading-5 text-paper/85">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export default function ProjectsPage() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <div className="page">
      <PageHeader
        index="02"
        label="Projects"
        title="Projects"
        lead={
          <p>
            Three products in production, a handful of ML and systems experiments, and a fix merged into
            pandas.
          </p>
        }
        art={
          <div className="relative aspect-[16/9]">
            <Image src={hilltown} alt="" fill preload sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        }
      />

      <section className="mt-10">
        <SectionHead index="I — In production" title="Products" className="border-t-0 pt-0" />
        <div className="mt-10 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <Reveal key={project.slug} className="flex">
              <WorkPlate project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHead
          index="II — Experiments"
          title="More projects"
          action={
            <a href={site.github} className="link-rule">
              GitHub ↗
            </a>
          }
        />
        <ul className="cell-grid cell-grid-3 mt-4 grid sm:grid-cols-2 xl:grid-cols-3">
          {rest.map((project) => (
            <li key={project.slug} id={project.slug} className="flex scroll-mt-8 flex-col">
              <p className="caps text-[9.5px] text-muted-foreground">{project.period}</p>
              <h3 className="mt-2 font-heading text-[1.65rem] leading-tight tracking-[-0.01em]">
                {project.repo ? (
                  <a href={project.repo} className="hover:text-seal">
                    {project.title} <span className="text-base">↗</span>
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink/75">{project.summary}</p>
              {project.highlights ? (
                <ul className="mt-4 space-y-1.5 text-[14px] leading-[1.5] text-ink/80">
                  {project.highlights.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden className="mt-[0.55em] size-1 shrink-0 rounded-full bg-seal" />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="caps mt-auto pt-5 text-[9.5px] leading-[1.9] text-muted-foreground">
                {project.stack.slice(0, 4).join("  ·  ")}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <GithubActivity />
        </div>
      </section>

      <section className="mt-24">
        <SectionHead
          id="open-source"
          index="III — Open source"
          title="A clearer error in pandas"
          action={
            <a href={openSource.href} className="link-rule">
              PR #{openSource.pr} ↗
            </a>
          }
        />
        <Reveal className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="max-w-xl space-y-5 text-[17px] leading-[1.65] text-ink/85">
              {openSource.story.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <dl className="caps mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-border pt-5 text-[9.5px] sm:grid-cols-4">
              <div>
                <dt className="text-muted-foreground">Repo</dt>
                <dd className="mt-1.5 normal-case tracking-normal">{openSource.repo}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Closes</dt>
                <dd className="mt-1.5">
                  <a href={openSource.issueHref} className="link-rule">
                    #{openSource.issue}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Diff</dt>
                <dd className="mt-1.5">{openSource.diff}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Merged</dt>
                <dd className="mt-1.5">{formatDate(openSource.merged)}</dd>
              </div>
            </dl>
          </div>
          <div className="space-y-5">
            <CodeBlock label="Before" code={openSource.before} />
            <CodeBlock label="Fix · pandas/plotting/_matplotlib/core.py" code={openSource.fix} />
            <CodeBlock label="After" code={openSource.after} />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
