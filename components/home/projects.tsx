import { FolderGit2 } from "lucide-react";
import { PanelTitle } from "@/components/case-study";
import { projectIcon } from "@/components/project-icons";
import { Reveal } from "@/components/reveal";
import { formatDate, openSource, projects, site } from "@/lib/site";

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <figure className="min-w-0">
      <figcaption className="font-mono text-[11px] text-muted-foreground">{label}</figcaption>
      <pre className="mt-2 overflow-x-auto border border-border bg-card px-4 py-3.5 font-mono text-[12px] leading-5 text-foreground/85">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export function Projects() {
  const rest = projects.filter((project) => !project.featured);

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {rest.map((project) => (
        <li key={project.slug} id={project.slug} className="panel flex flex-col">
          <p className="panel-head">
            <PanelTitle icon={projectIcon(project.slug)} title={project.period} />
            {project.repo ? <span aria-hidden className="text-muted-foreground">↗</span> : null}
          </p>
          <div className="flex flex-1 flex-col border-t border-border p-4">
            <h2 className="font-heading text-xl font-normal leading-tight">
              {project.repo ? (
                <a href={project.repo} className="hover:text-primary">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h2>
            <p className="mt-3 text-[13px] leading-6 text-[#b9c6ce]">{project.summary}</p>
            {project.highlights ? (
              <ul className="mt-4 space-y-1.5 text-[12px] leading-5 text-foreground/80">
                {project.highlights.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span aria-hidden className="mt-[0.4rem] size-1 shrink-0 bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-auto pt-5 font-mono text-[11px] text-muted-foreground">
              {project.stack.slice(0, 4).join(" · ")}
            </p>
          </div>
        </li>
      ))}
      <li className="contents">
        <a href={site.github} className="panel flex flex-col">
          <p className="panel-head">
            <PanelTitle icon={FolderGit2} title="Everything else" />
            <span aria-hidden className="text-muted-foreground">↗</span>
          </p>
          <div className="flex flex-1 items-center border-t border-border p-4 font-heading text-xl">
            github.com/mserdukoff
          </div>
        </a>
      </li>
    </ul>
  );
}

export function OpenSource() {
  return (
    <Reveal className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-12">
      <div>
        <h3 className="font-heading text-2xl font-normal leading-tight">A clearer error in pandas</h3>
        <div className="mt-4 max-w-[60ch] space-y-4 text-[14px] leading-7 text-[#c7d2d9]">
          {openSource.story.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-4 font-mono text-[11px]">
          <div>
            <dt className="text-muted-foreground">Repo</dt>
            <dd className="mt-1">{openSource.repo}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">PR</dt>
            <dd className="mt-1">
              <a href={openSource.href} className="underline underline-offset-4 hover:text-primary">
                #{openSource.pr}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Closes</dt>
            <dd className="mt-1">
              <a href={openSource.issueHref} className="underline underline-offset-4 hover:text-primary">
                #{openSource.issue}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Diff</dt>
            <dd className="mt-1">{openSource.diff}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Merged</dt>
            <dd className="mt-1">
              {formatDate(openSource.merged)} by {openSource.mergedBy}
            </dd>
          </div>
        </dl>
      </div>
      <div className="space-y-5">
        <CodeBlock label="Before" code={openSource.before} />
        <CodeBlock label="Fix in pandas/plotting/_matplotlib/core.py" code={openSource.fix} />
        <CodeBlock label="After" code={openSource.after} />
      </div>
    </Reveal>
  );
}
