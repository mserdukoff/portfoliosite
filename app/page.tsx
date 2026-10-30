import Image from "next/image";
import Link from "next/link";
import { HeroCollage } from "@/components/hero/hero-collage";
import { HeroStacked } from "@/components/hero/hero-stacked";
import { SectionHead } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { WorkPlate } from "@/components/work-plate";
import temple from "@/public/collage/temple.webp";
import { formatDate, impact, journal, projects, site } from "@/lib/site";

export default function HomePage() {
  const featured = projects.filter((project) => project.featured);
  const latest = journal.slice(0, 4);

  return (
    <>
      <HeroCollage />
      <HeroStacked />

      <div className="page">
        <section className="mt-24 lg:mt-20">
          <SectionHead
            index="01 — Selected work"
            title="Projects"
            action={
              <Link href="/projects" className="link-rule">
                All projects →
              </Link>
            }
          />
          <div className="mt-10 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, index) => (
              <Reveal key={project.slug} className="flex">
                <WorkPlate project={project} index={index} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-28">
          <SectionHead index="02 — Approach" title="How I work" />
          <Reveal className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,18rem)] lg:gap-14">
            <div className="relative hidden aspect-[9/16] max-h-[26rem] lg:block">
              <Image src={temple} alt="" fill sizes="14rem" className="object-contain object-left-top" />
            </div>
            <div className="max-w-2xl space-y-6 text-[18px] leading-[1.65] text-ink/85">
              <p>{site.aboutClose}</p>
              <p className="text-ink/70">{site.homepageClose}</p>
            </div>
            <ul className="self-start border-t border-ink/70">
              {impact.slice(0, 4).map((item) => (
                <li key={item.label} className="border-b border-border py-4">
                  <p className="font-heading text-[2.1rem] leading-none tracking-[-0.02em] text-navy">{item.value}</p>
                  <p className="caps mt-2 text-[9.5px] text-muted-foreground">{item.label}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="mt-28">
          <SectionHead
            index="03 — Writings"
            title="Recent notes"
            action={
              <Link href="/writings" className="link-rule">
                All {journal.length} entries →
              </Link>
            }
          />
          <ol className="mt-8 border-t border-border">
            {latest.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/writings/${post.slug}`}
                  className="group grid gap-2 border-b border-border py-6 sm:grid-cols-[9rem_minmax(0,1fr)_minmax(0,1fr)] sm:items-baseline sm:gap-8"
                >
                  <time dateTime={post.date} className="caps text-[10px] text-muted-foreground">
                    {formatDate(post.date)}
                  </time>
                  <span className="font-heading text-[1.6rem] leading-tight tracking-[-0.01em] transition-colors group-hover:text-seal">
                    {post.title}
                  </span>
                  <span className="text-[15px] leading-[1.55] text-muted-foreground">{post.gist}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
