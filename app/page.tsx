import Link from "next/link";
import { FeaturedWork } from "@/components/featured-work";
import { GithubActivity } from "@/components/github-activity";
import { LanguageRadar } from "@/components/language-radar";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import {
  certifications,
  education,
  experience,
  formatDate,
  journal,
  languages,
  projects,
  site,
  stack,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const sectionClass = "scroll-mt-8 mt-16 border-t border-foreground/80 pt-6 sm:mt-20";

const actionLink =
  "font-mono text-[12px] text-muted-foreground underline decoration-foreground/25 underline-offset-4 hover:text-foreground hover:decoration-primary";

function SectionBar({
  label,
  action,
  className,
}: {
  label: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <p className="eyebrow flex items-center gap-2.5">
        <span aria-hidden className="size-1.5 bg-primary" />
        {label}
      </p>
      {action}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-[clamp(1.9rem,3.2vw,2.6rem)] leading-[1.02] tracking-[-0.03em]">
      {children}
    </h2>
  );
}

export default function HomePage() {
  const rest = projects.filter((project) => !project.featured);
  const latestPosts = journal.slice(0, 4);
  return (
    <>
      <div id="hero" aria-hidden className="scroll-mt-0" />

      <section id="work" className="scroll-mt-8 pt-6 lg:pt-7">
        <SectionBar
          label="Featured work"
          action={
            <a href="#more-projects" className={actionLink}>
              View all projects
            </a>
          }
        />
        <div className="mt-6">
          <FeaturedWork />
        </div>

        <div id="more-projects" className="mt-14 scroll-mt-8 border-t border-border pt-6">
          <SectionBar
            label="More projects"
            action={
              <a href={site.github} className={actionLink}>
                GitHub ↗
              </a>
            }
          />
          <ul className="cell-grid cell-grid-3 mt-6 grid border-t border-border sm:grid-cols-2 xl:grid-cols-3">
            {rest.map((project, i) => (
              <li key={project.slug} id={project.slug} className="flex flex-col">
                <div className="flex items-baseline gap-3">
                  <span className="index-chip">
                    {String(i + 4).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-2xl tracking-tight">
                    {project.title}
                  </h3>
                </div>
                <p className="mt-3 font-mono text-[12px] text-primary">
                  {project.subtitle}
                </p>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted-foreground">
                  {project.summary}
                </p>
                <p className="mt-auto pt-5 font-mono text-[11px] text-muted-foreground">
                  {project.stack.slice(0, 3).join("  /  ")}
                </p>
              </li>
            ))}
            <li className="flex flex-col">
              <p className="eyebrow">Stack</p>
              <p className="mt-3 font-mono text-[12px] leading-6 text-foreground/80">
                {stack.join("  /  ")}
              </p>
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <GithubActivity />
        </div>
      </section>

      <section id="experience" className={sectionClass}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_17rem]">
          <div>
            <SectionBar label="Experience" />
            <ol className="mt-6 border-t border-border">
              {experience.map((item) => (
                <li
                  key={item.org}
                  className="grid gap-2 border-b border-border py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
                >
                  <p className="pt-1 font-mono text-[11px] text-muted-foreground">
                    {item.period}
                  </p>
                  <div>
                    <p className="font-heading text-xl tracking-tight">
                      {item.role}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.href ? (
                        <a href={item.href} className="hover:text-primary">
                          {item.org} ↗
                        </a>
                      ) : (
                        item.org
                      )}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/75">
                      {item.summary}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <SectionBar label="Education" className="mt-12" />
            <ol className="mt-6 border-t border-border">
              {education.map((item) => (
                <li
                  key={item.school}
                  className="grid gap-2 border-b border-border py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
                >
                  <p className="pt-1 font-mono text-[11px] text-muted-foreground">
                    {item.period}
                  </p>
                  <div>
                    <p className="font-heading text-xl tracking-tight">
                      {item.degree}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.school}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-10 lg:border-l lg:border-border lg:pl-8">
            <div>
              <SectionBar label="Currently" />
              <p className="mt-6 text-[15px] leading-7 text-foreground/85">
                {site.status} for new roles in {site.location}. Building
                Wheelbase and Lociros, and starting an M.S. at Boston
                University.
              </p>
              <Link
                href="#contact"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-5 px-4")}
              >
                Get in touch <span aria-hidden>→</span>
              </Link>
            </div>
            <div>
              <SectionBar label="Certifications" />
              <ul className="mt-5 space-y-3 text-sm leading-5">
                {certifications.map((item) => (
                  <li key={item.name}>
                    {item.name}
                    <span className="block text-[13px] text-muted-foreground">
                      {item.issuer}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section id="about" className={sectionClass}>
        <SectionBar label="About" />
        <Reveal className="mt-8 grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[17rem_minmax(0,1fr)]">
          <SectionTitle>Engineer first.</SectionTitle>
          <div className="max-w-2xl space-y-5 text-[16px] leading-7 text-foreground/85">
            <p>
              {site.role} in {site.location}. {site.homepageLead} Applied
              machine learning to state government data pipelines at the MA
              Executive Office of Administration &amp; Finance.
            </p>
            <p>{site.homepageClose}</p>
            <p>{site.aboutClose}</p>
          </div>
        </Reveal>
      </section>

      <section id="languages" className={sectionClass}>
        <SectionBar
          label="Languages"
          action={
            <Link href="/work/grammario" className={actionLink}>
              Grammario case study
            </Link>
          }
        />
        <Reveal className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
          <div>
            <SectionTitle>Languages I&apos;ve studied.</SectionTitle>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">
              Learning these languages is what led me to build{" "}
              <Link
                href="/work/grammario"
                className="text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-primary"
              >
                Grammario
              </Link>{" "}
              and{" "}
              <a
                href="https://lociros.com"
                className="text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-primary"
              >
                Lociros
              </a>
              . Grammario came from wanting to see the structure of a sentence
              instead of memorizing rules. Lociros came from wanting reading
              practice that actually matched my level.
            </p>
            <ul className="mt-8 grid grid-cols-2 border-t border-border sm:grid-cols-3">
              {languages.map((language) => (
                <li key={language.name} className="border-b border-border py-3.5">
                  <p className="font-heading text-xl tracking-tight">
                    {language.name}
                  </p>
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
        <SectionBar
          label="Journal"
          action={
            <Link href="/journal" className={actionLink}>
              All {journal.length} entries
            </Link>
          }
        />
        <div className="cell-grid mt-6 grid border-t border-border sm:grid-cols-2">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group block"
            >
              <time className="font-mono text-[11px] text-muted-foreground">
                {formatDate(post.date)}
              </time>
              <span className="mt-2 block font-heading text-xl tracking-tight group-hover:text-primary">
                {post.title}
              </span>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                {post.gist}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="contact" className={sectionClass}>
        <SectionBar label="Contact" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <SectionTitle>Want to get in touch?</SectionTitle>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">
              {site.status} in {site.location}. Reach out if you&apos;re hiring,
              or just want to talk shop.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className={cn(buttonVariants({ size: "lg" }), "px-4")}
            >
              {site.email}
            </a>
            <a
              href={site.github}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-4")}
            >
              GitHub ↗
            </a>
            <a
              href={site.linkedin}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-4")}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
