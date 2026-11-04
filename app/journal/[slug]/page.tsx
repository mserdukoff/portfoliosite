import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
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
    <article>
      <PageHero
        eyebrow={`Entry ${String(journal.length - index).padStart(2, "0")} · ${formatDate(post.date)}`}
        title={post.title}
      />
      <div className="wrap py-12 sm:py-16">
        <div className="max-w-[72ch] space-y-5 text-[15px] leading-8 text-[#c7d2d9]">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <nav aria-label="Entries" className="mt-14 grid gap-3 sm:grid-cols-2">
          {older ? (
            <Link href={`/journal/${older.slug}`} className="panel">
              <span className="panel-head text-muted-foreground">← Older</span>
              <span className="block border-t border-border p-3 font-heading text-[15px] leading-snug">
                {older.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link href={`/journal/${newer.slug}`} className="panel sm:text-right">
              <span className="panel-head justify-end text-muted-foreground">Newer →</span>
              <span className="block border-t border-border p-3 font-heading text-[15px] leading-snug">
                {newer.title}
              </span>
            </Link>
          ) : null}
        </nav>
      </div>
    </article>
  );
}
