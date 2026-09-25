import Link from "next/link";
import { FeaturedWork } from "@/components/featured-work";
import { GithubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
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

const sectionClass =
  "scroll-mt-10 border-t border-foreground/80 pt-10 pb-16 sm:pt-12 sm:pb-24";

function SectionHead({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal>
      <p className="eyebrow flex justify-between">
        <span>{label}</span>
        <span>{index}</span>
      </p>
      <h2 className="mt-8 max-w-2xl font-heading text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.03em]">
        {title}
      </h2>
      {children ? (
        <div className="mt-5 max-w-xl text-[16px] leading-7 text-muted-foreground">
          {children}
        </div>
      ) : null}
    </Reveal>
  );
}

export default function HomePage() {
  const rest = projects.filter((project) => !project.featured);
  const latestPosts = journal.slice(0, 4);

  return (
    <>
      <Hero />

      <section id="work" className={sectionClass}>
        <SectionHead index="01" label="Work" title="Things that had to ship.">
          <p>
            Three live products and five completed builds. Source for most of it
            is on GitHub.
          </p>
        </SectionHead>

        <div className="mt-14">
          <FeaturedWork />
        </div>

        <div className="mt-20">
          <h3 className="eyebrow">Completed</h3>
          <ul className="mt-4 border-t border-border">
            {rest.map((project, i) => (
              <li
                key={project.slug}
                id={project.slug}
                className="grid gap-2 border-b border-border py-7 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,16rem)] sm:gap-8"
              >
                <span className="font-mono text-[11px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-heading text-2xl tracking-tight">
                    {project.title}
                  </h4>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {project.summary}
                  </p>
                </div>
                <div className="font-mono text-[11px] leading-5 text-muted-foreground sm:text-right">
                  <p className="uppercase tracking-[0.14em] text-foreground/80">
                    {project.subtitle}
                  </p>
                  <p className="mt-2">{project.stack.join(" / ")}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 max-w-3xl font-mono text-[12px] leading-6 text-muted-foreground">
          <span className="mr-3 uppercase tracking-[0.14em] text-foreground/80">
            Stack
          </span>
          {stack.join(" / ")}
        </p>

        <div className="mt-16 max-w-3xl">
          <GithubActivity />
        </div>
      </section>

      <section id="experience" className={sectionClass}>
        <SectionHead
          index="02"
          label="Experience"
          title="Where the work happened."
        />

        <ol className="mt-12 border-t border-border">
          {experience.map((item) => (
            <li
              key={item.org}
              className="grid gap-3 border-b border-border py-8 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-8"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                {item.period}
              </p>
              <div>
                <p className="font-heading text-2xl tracking-tight">
                  {item.role}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.href ? (
                    <a href={item.href} className="hover:text-primary">
                      {item.org} ↗
                    </a>
                  ) : (
                    item.org
                  )}
                </p>
                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-foreground/80">
                  {item.summary}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          <div>
            <p className="eyebrow">Education</p>
            <div className="mt-5 space-y-6">
              {education.map((item) => (
                <div key={item.school}>
                  <p className="font-heading text-2xl tracking-tight">
                    {item.school}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.degree}
                    <br />
                    {item.period}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Certifications</p>
            <ul className="mt-5 space-y-3 text-[15px] leading-6">
              {certifications.map((item) => (
                <li key={item.name}>
                  {item.name}
                  <span className="block text-sm text-muted-foreground">
                    {item.issuer}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="about" className={sectionClass}>
        <SectionHead index="03" label="About" title="Engineer first." />

        <Reveal className="mt-8 max-w-2xl space-y-5 text-[17px] leading-8 text-foreground/88">
          <p>
            {site.role} in {site.location}. {site.homepageLead} Applied
            machine learning to state government data pipelines at the MA
            Executive Office of Administration &amp; Finance.
          </p>
          <p>{site.homepageClose}</p>
          <p>{site.aboutClose}</p>
        </Reveal>
      </section>

      <section id="languages" className={sectionClass}>
        <SectionHead
          index="04"
          label="Languages"
          title="Seven languages, seven different grammars."
        >
          <p>
            Grammario exists because I wanted to see structure instead of
            memorizing it. These are the languages that shaped how it works.
            The{" "}
            <Link
              href="/work/grammario"
              className="text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-primary"
            >
              case study
            </Link>{" "}
            has the details.
          </p>
        </SectionHead>

        <div className="mt-12 grid gap-12 lg:grid-cols-[22rem_1fr] lg:items-center lg:gap-16">
          <LanguageRadar className="mx-auto w-full max-w-sm" fontSize={13} />
          <ul className="grid grid-cols-2 border-t border-border sm:grid-cols-3">
            {languages.map((language) => (
              <li key={language.name} className="border-b border-border py-4">
                <p className="font-heading text-xl tracking-tight">
                  {language.name}
                </p>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {language.level}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="journal" className={sectionClass}>
        <SectionHead index="05" label="Journal" title="Public writing.">
          <p>
            Build notes. Mostly Grammario, plus the Go work that came out of a
            slow Wheelbase pipeline.
          </p>
        </SectionHead>

        <div className="mt-10 border-t border-border">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group grid gap-2 border-b border-border py-7 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-8"
            >
              <time className="font-mono text-[11px] text-muted-foreground">
                {formatDate(post.date)}
              </time>
              <span>
                <span className="block font-heading text-2xl tracking-tight group-hover:text-primary">
                  {post.title}
                </span>
                <span className="mt-2 block max-w-xl text-sm leading-6 text-muted-foreground">
                  {post.gist}
                </span>
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/journal"
          className="mt-8 inline-block text-sm text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-primary"
        >
          All {journal.length} entries
        </Link>
      </section>

      <section id="contact" className={cn(sectionClass, "pb-8 sm:pb-10")}>
        <SectionHead index="06" label="Contact" title="Want to get in touch?">
          <p>
            {site.status} in {site.location}. Reach out if you&apos;re hiring,
            or just want to talk shop.
          </p>
        </SectionHead>
        <div className="mt-8 flex flex-wrap gap-3">
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
      </section>
    </>
  );
}
