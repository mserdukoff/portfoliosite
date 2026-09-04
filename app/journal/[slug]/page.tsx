import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getJournal, journal } from "@/lib/site";

export function generateStaticParams() {
  return journal.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournal(slug);
  if (!post) return {};
  return { title: post.title, description: post.gist };
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournal(slug);
  if (!post) notFound();

  const index = journal.findIndex((item) => item.slug === post.slug);
  const newer = index > 0 ? journal[index - 1] : null;
  const older = index < journal.length - 1 ? journal[index + 1] : null;

  return (
    <article className="py-16 sm:py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        Journal · {formatDate(post.date)}
      </p>
      <h1 className="mt-4 max-w-3xl font-heading text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.1] tracking-[-0.03em]">
        {post.title}
      </h1>
      <div className="mt-10 max-w-2xl space-y-5 text-[16.5px] leading-8 text-foreground/88">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <nav className="mt-16 flex flex-col gap-4 border-t border-border pt-6 text-sm sm:flex-row sm:justify-between">
        {older ? (
          <Link href={`/journal/${older.slug}`} className="text-muted-foreground hover:text-foreground">
            ← {older.title}
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link href={`/journal/${newer.slug}`} className="text-muted-foreground hover:text-foreground sm:text-right">
            {newer.title} →
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
