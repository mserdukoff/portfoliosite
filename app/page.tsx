import Link from "next/link";
import { InViewTitle } from "@/components/arc/in-view-title/in-view-title";
import { ContactActions } from "@/components/contact-actions";
import { FeaturedWork } from "@/components/featured-work";
import { GithubActivity } from "@/components/github-activity";
import { LanguageRadar } from "@/components/language-radar";
import { Reveal } from "@/components/reveal";
import {
  certifications,
  education,
  experience,
  formatDate,
  impact,
  journal,
  languages,
  openSource,
  programmingLanguages,
  projects,
  site,
  skills,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const sectionClass = "scroll-mt-8 mt-16 border-t border-foreground/80 pt-6 sm:mt-20";

const actionLink =
  "font-mono text-[12px] text-muted-foreground underline decoration-foreground/25 underline-offset-4 hover:text-foreground hover:decoration-primary";

const inlineLink =
  "text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-primary";

const chip =
  "rounded-sm border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[11px] text-foreground/80";

function SectionHead({
  title,
  action,
  className,
}: {
  title: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <InViewTitle
        text={title}
        variant="word"
        className="arc font-heading text-[clamp(1.9rem,3.2vw,2.6rem)] leading-[1.02] tracking-[-0.03em]"
      />
      {action ? <div className="pb-1.5">{action}</div> : null}
    </div>
  );
}

function SubHead({ children }: { children: React.ReactNode }) {
  return <h3 className="font-heading text-2xl tracking-tight">{children}</h3>;
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <figure className="min-w-0">
      <figcaption className="font-mono text-[11px] text-muted-foreground">
        {label}
      </figcaption>
      <pre className="mt-2 overflow-x-auto rounded-sm border border-border bg-card px-4 py-3.5 font-mono text-[12px] leading-5 text-foreground/85">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export default function HomePage() {
  const rest = projects.filter((project) => !project.featured);
  const latestPosts = journal.slice(0, 4);
  return (
    <>
      <div id="hero" aria-hidden className="scroll-mt-0" />

      <section id="work" className="scroll-mt-8 pt-6 lg:pt-7">
        <SectionHead
          title="Work"
          action={
            <a href="#more-projects" className={actionLink}>
              All projects
            </a>
          }
        />
        <div className="mt-6">
          <FeaturedWork />
        </div>

        <div id="more-projects" className="mt-14 scroll-mt-8 border-t border-border pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <SubHead>More projects</SubHead>
            <a href={site.github} className={actionLink}>
              GitHub ↗
            </a>
          </div>
          <ul className="cell-grid cell-grid-3 mt-6 grid border-t border-border sm:grid-cols-2 xl:grid-cols-3">
            {rest.map((project) => (
              <li key={project.slug} id={project.slug} className="flex flex-col">
                <h4 className="font-heading text-2xl tracking-tight">
                  {project.repo ? (
                    <a href={project.repo} className="hover:text-primary">
                      {project.title} <span className="text-base">↗</span>
                    </a>
                  ) : (
                    project.title
                  )}
                </h4>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {project.summary}
                </p>
                {project.highlights ? (
                  <ul className="mt-4 space-y-1.5 text-[13px] leading-5 text-foreground/80">
                    {project.highlights.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span aria-hidden className="mt-[0.45rem] size-1 shrink-0 bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-auto pt-5 font-mono text-[11px] text-muted-foreground">
                  {project.stack.slice(0, 4).join("  /  ")}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <GithubActivity />
        </div>
      </section>

      <section id="impact" className={sectionClass}>
        <SectionHead title="Impact" />
        <ul className="cell-grid cell-grid-3 mt-8 grid border-t border-border sm:grid-cols-2 xl:grid-cols-3">
          {impact.map((item) => (
            <li key={item.label}>
              <p className="font-heading text-[clamp(2.4rem,4vw,3.2rem)] leading-none tracking-[-0.03em] text-primary">
                {item.value}
              </p>
              <p className="mt-2 font-mono text-[12px] text-foreground">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section id="experience" className={sectionClass}>
        <SectionHead title="Experience" />
        <ol className="mt-8 border-t border-border">
          {experience.map((item) => (
            <li
              key={item.org}
              className="grid gap-2 border-b border-border py-6 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
            >
              <div className="pt-1 font-mono text-[11px] leading-5 text-muted-foreground">
                <p>{item.period}</p>
                <p>{item.place}</p>
              </div>
              <div>
                <p className="font-heading text-xl tracking-tight">{item.role}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {item.org}
                  {item.product && item.href ? (
                    <>
                      {" · "}
                      <a href={item.href} className="hover:text-primary">
                        {item.product} ↗
                      </a>
                    </>
                  ) : null}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/80">
                  {item.summary}
                </p>
                <ul className="mt-4 max-w-2xl space-y-2 text-sm leading-6 text-foreground/75">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6rem] h-px w-3 shrink-0 bg-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {item.stack.join("  /  ")}
                  </p>
                  {item.caseStudy ? (
                    <Link href={item.caseStudy} className={actionLink}>
                      Read the case study
                    </Link>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-10">
          <div>
            <SubHead>Education</SubHead>
            <ol className="mt-5 border-t border-border">
              {education.map((item) => (
                <li
                  key={item.school}
                  className="grid gap-2 border-b border-border py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
                >
                  <p className="pt-1 font-mono text-[11px] text-muted-foreground">
                    {item.period}
                  </p>
                  <div>
                    <p className="font-heading text-xl tracking-tight">{item.degree}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.school}</p>
                    <p className="mt-2 max-w-2xl text-[13px] leading-6 text-foreground/70">
                      {item.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SubHead>Certifications</SubHead>
            <ul className="mt-5 border-t border-border">
              {certifications.map((item) => (
                <li key={item.name} className="border-b border-border py-3 text-sm leading-5">
                  {item.name}
                  <span className="block text-[13px] text-muted-foreground">
                    {item.issuer}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="skills" className={sectionClass}>
        <SectionHead title="Skills" />
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {programmingLanguages.map((language) => (
            <li key={language} className="rounded-sm bg-primary px-2 py-1 font-mono text-[12px] text-primary-foreground">
              {language}
            </li>
          ))}
        </ul>
        <ul className="cell-grid cell-grid-3 mt-8 grid border-t border-border sm:grid-cols-2 xl:grid-cols-3">
          {skills.map((group) => (
            <li key={group.area} className="flex flex-col">
              <h3 className="font-heading text-xl tracking-tight">{group.area}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {group.proof}
              </p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                {group.tools.map((tool) => (
                  <li key={tool} className={chip}>
                    {tool}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section id="open-source" className={sectionClass}>
        <SectionHead
          title="Open source"
          action={
            <a href={openSource.href} className={actionLink}>
              View PR #{openSource.pr} ↗
            </a>
          }
        />
        <Reveal className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <SubHead>A clearer error in pandas</SubHead>
            <div className="mt-4 max-w-xl space-y-4 text-[15px] leading-7 text-foreground/85">
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
                <dt className="text-muted-foreground">Closes</dt>
                <dd className="mt-1">
                  <a href={openSource.issueHref} className={inlineLink}>
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
      </section>

      <section id="about" className={sectionClass}>
        <SectionHead title="About" />
        <Reveal className="mt-8 max-w-2xl space-y-5 text-[16px] leading-7 text-foreground/85">
          <p>
            I&apos;m an AI and software engineer in {site.location}. At Hime I
            build Wheelbase end to end, from Postgres security policies to the
            retrieval layer to the React app dealers use every day. On my own I
            built Grammario and Lociros, NLP products for language learners,
            and at the Massachusetts Executive Office for Administration and
            Finance I built AWS Bedrock pipelines that translate financial
            documents without breaking their layout.
          </p>
          <p>{site.homepageClose}</p>
          <p>{site.aboutClose}</p>
          <p>
            I learn fast by building. Wheelbase ingestion got too slow in
            Python, so I{" "}
            <Link href="/journal/new-challenges-new-languages" className={inlineLink}>
              learned Go
            </Link>{" "}
            and rewrote it. I picked up a pandas plotting bug and{" "}
            <a href="#open-source" className={inlineLink}>
              got the fix merged upstream
            </a>
            . Outside of code I read history and science, and I am always
            partway through learning another language.
          </p>
        </Reveal>
      </section>

      <section id="languages" className={sectionClass}>
        <SectionHead title="Languages" />
        <Reveal className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
          <div>
            <p className="max-w-xl text-[15px] leading-7 text-foreground/85">
              {site.aboutLanguages}
            </p>
            <ul className="mt-8 grid grid-cols-2 border-t border-border sm:grid-cols-3">
              {languages.map((language) => (
                <li key={language.name} className="border-b border-border py-3.5">
                  <p className="font-heading text-xl tracking-tight">{language.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    {language.level}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <LanguageRadar className="mx-auto w-full max-w-xs" fontSize={12} />
        </Reveal>
      </section>

      <section id="journal" className={sectionClass}>
        <SectionHead
          title="Journal"
          action={
            <Link href="/journal" className={actionLink}>
              All {journal.length} entries
            </Link>
          }
        />
        <div className="cell-grid mt-6 grid border-t border-border sm:grid-cols-2">
          {latestPosts.map((post) => (
            <Link key={post.slug} href={`/journal/${post.slug}`} className="group block">
              <time className="font-mono text-[11px] text-muted-foreground">
                {formatDate(post.date)}
              </time>
              <span className="mt-2 block font-heading text-xl tracking-tight group-hover:text-primary">
                {post.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="contact" className={sectionClass}>
        <SectionHead title="Contact" />
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">
          {site.status} in AI engineering, ML, data, and software engineering,{" "}
          {site.scope}. US citizen, no sponsorship needed.
        </p>
        <div className="mt-8">
          <ContactActions />
        </div>
      </section>
    </>
  );
}
