import Image from "next/image";
import Link from "next/link";
import { FeaturedWork } from "@/components/featured-work";
import { GithubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
import { LanguageRadar } from "@/components/language-radar";
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

export default function HomePage() {
  const rest = projects.filter((project) => !project.featured);
  const latestPosts = journal.slice(0, 4);

  return (
    <>
      <Hero />

      <section
        id="work"
        className="scroll-mt-10 border-t border-border pt-16 pb-16 sm:pt-20 sm:pb-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Work
        </p>
        <h2 className="mt-4 max-w-xl font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.03em]">
          Things that had to ship.
        </h2>
        <p className="mt-5 max-w-xl text-[16px] leading-7 text-muted-foreground">
          Two live products. Six completed builds. GitHub is the profile, not
          a set of invented repo names.
        </p>

        <div className="mt-14">
          <FeaturedWork />
        </div>

        <div className="mt-16">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Completed
          </h3>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {rest.map((project) => (
              <li key={project.slug} id={project.slug} className="py-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {project.subtitle}
                </p>
                <h4 className="mt-2 font-heading text-2xl tracking-tight">
                  {project.title}
                </h4>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {project.summary}
                </p>
                <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                  {project.stack.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap gap-1.5">
          {stack.map((item) => (
            <span
              key={item}
              className="rounded-md border border-border/70 px-2 py-1 font-mono text-[10.5px] text-foreground/75"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-16 max-w-3xl">
          <GithubActivity />
        </div>
      </section>

      <section
        id="experience"
        className="scroll-mt-10 border-t border-border pt-16 pb-16 sm:pt-20 sm:pb-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Experience
        </p>
        <h2 className="mt-4 font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.03em]">
          Where the work happened.
        </h2>

        <ol className="mt-10 max-w-2xl space-y-8 border-l border-border pl-6">
          {experience.map((item) => (
            <li key={item.org} className="relative">
              <span className="absolute -left-[1.6rem] top-1.5 size-2 rounded-full bg-primary" />
              <p className="font-mono text-[11px] text-muted-foreground">
                {item.period}
              </p>
              <p className="mt-2 font-heading text-xl tracking-tight">
                {item.role}{" "}
                <span className="text-muted-foreground">
                  ·{" "}
                  {item.href ? (
                    <a href={item.href} className="hover:text-primary">
                      {item.org}
                    </a>
                  ) : (
                    item.org
                  )}
                </span>
              </p>
              <p className="mt-3 max-w-xl text-[15px] leading-7 text-foreground/80">
                {item.summary}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 max-w-2xl space-y-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Education
          </p>
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

        <div className="mt-14 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Certifications
          </p>
          <ul className="mt-4 space-y-2 text-[15px] leading-7 text-muted-foreground">
            {certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-10 border-t border-border pt-16 pb-16 sm:pt-20 sm:pb-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          About
        </p>
        <h2 className="mt-4 max-w-[16ch] font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.03em]">
          Engineer, not a generic AI founder.
        </h2>

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start lg:gap-16">
          <div className="min-w-0 max-w-2xl space-y-5 text-[16.5px] leading-8 text-foreground/88">
            <p>
              {site.role} in {site.location}. {site.homepageLead} Applied
              machine learning to state government data pipelines at the MA
              Executive Office of Administration &amp; Finance.
            </p>
            <p>{site.homepageClose}</p>
            <p>{site.aboutClose}</p>
          </div>

          <aside className="lg:sticky lg:top-10">
            <Image
              src="/portrait.png"
              alt="Portrait of Matt Serdukoff"
              width={640}
              height={640}
              className="mx-auto h-auto w-full max-w-[12rem] select-none lg:mx-0 lg:max-w-none"
            />
          </aside>
        </div>
      </section>

      <section
        id="languages"
        className="scroll-mt-10 border-t border-border pt-16 pb-16 sm:pt-20 sm:pb-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Languages
        </p>
        <h2 className="mt-4 max-w-xl font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.03em]">
          Seven languages, seven different grammars.
        </h2>
        <p className="mt-5 max-w-xl text-[16px] leading-7 text-muted-foreground">
          Grammario exists because I wanted to see structure, not memorize
          it. These are the languages that shaped how it works — read the{" "}
          <Link
            href="/work/grammario"
            className="text-foreground underline-offset-4 hover:underline"
          >
            case study
          </Link>
          .
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[22rem_1fr] lg:items-center lg:gap-16">
          <LanguageRadar
            className="mx-auto w-full max-w-sm"
            fontSize={13}
          />
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
            {languages.map((language) => (
              <li key={language.name}>
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

      <section
        id="journal"
        className="scroll-mt-10 border-t border-border pt-16 pb-16 sm:pt-20 sm:pb-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Journal
        </p>
        <h2 className="mt-4 font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.03em]">
          Public writing.
        </h2>
        <p className="mt-5 max-w-xl text-[16px] leading-7 text-muted-foreground">
          Build notes. Mostly Grammario, plus the Go work that came out of a
          slow Wheelbase pipeline.
        </p>

        <div className="mt-10 divide-y divide-border border-t border-border">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group grid gap-2 py-7 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-8"
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
          className="mt-8 inline-block text-sm text-foreground underline-offset-4 hover:underline"
        >
          See all {journal.length} entries →
        </Link>
      </section>

      <section
        id="contact"
        className="scroll-mt-10 border-t border-border pt-16 pb-4 sm:pt-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Contact
        </p>
        <h2 className="mt-4 font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.03em]">
          Want to get in touch?
        </h2>
        <p className="mt-5 max-w-xl text-[16px] leading-7 text-muted-foreground">
          {site.status} in {site.location}. Reach out if you&apos;re hiring,
          or just want to talk shop.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Email me
          </a>
          <a
            href={site.github}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            GitHub ↗
          </a>
          <a
            href={site.linkedin}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            LinkedIn ↗
          </a>
        </div>
      </section>
    </>
  );
}
