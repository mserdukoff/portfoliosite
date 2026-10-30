import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getJournal, journal } from "@/lib/site";

export function generateStaticParams() {
  return journal.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/writings/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournal(slug);
  if (!post) return {};
  return { title: post.title, description: post.gist };
}

export default async function WritingPage({ params }: PageProps<"/writings/[slug]">) {
  const { slug } = await params;
  const post = getJournal(slug);
  if (!post) notFound();

  const index = journal.findIndex((item) => item.slug === post.slug);
  const newer = index > 0 ? journal[index - 1] : null;
  const older = index < journal.length - 1 ? journal[index + 1] : null;

  return (
    <article className="page">
      <header className="settle border-b border-ink/70 pb-10 pt-6 sm:pt-10">
        <p className="caps flex items-center gap-3 text-[11px] text-muted-foreground">
          <Link href="/writings" className="hover:text-seal">
            03 — Writings
          </Link>
          <span aria-hidden className="h-px w-8 bg-current" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h1 className="mt-6 max-w-4xl font-heading text-[clamp(2.4rem,5.5vw,4.25rem)] font-normal leading-[1] tracking-[-0.025em]">
          {post.title}
        </h1>
        <p className="mt-5 max-w-2xl font-heading text-[19px] italic leading-[1.5] text-ink/70">{post.gist}</p>
      </header>

      <div className="mx-auto mt-12 max-w-[40rem] space-y-6 text-[19px] leading-[1.7] text-ink/90 first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-[4.2rem] first-letter:leading-[0.85] first-letter:text-seal">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <nav className="mx-auto mt-20 grid max-w-[40rem] gap-6 border-t border-ink/70 pt-6 sm:grid-cols-2">
        {older ? (
          <Link href={`/writings/${older.slug}`} className="group">
            <span className="caps block text-[10px] text-muted-foreground">← Older</span>
            <span className="mt-2 block font-heading text-xl leading-snug group-hover:text-seal">{older.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link href={`/writings/${newer.slug}`} className="group sm:text-right">
            <span className="caps block text-[10px] text-muted-foreground">Newer →</span>
            <span className="mt-2 block font-heading text-xl leading-snug group-hover:text-seal">{newer.title}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
