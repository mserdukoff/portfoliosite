import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, journal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
};

export default function JournalPage() {
  const first = journal[journal.length - 1];
  const latest = journal[0];

  return (
    <article className="py-16 sm:py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        Journal
      </p>
      <h1 className="mt-4 font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
        Public writing.
      </h1>
      <p className="mt-5 max-w-xl text-[16px] leading-7 text-muted-foreground">
        Build notes. Mostly Grammario, plus the Go work that came out of a slow
        Wheelbase pipeline.
      </p>

      <div className="mt-14 grid gap-16 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
        <div className="min-w-0 divide-y divide-border border-t border-border">
          {journal.map((post) => (
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

        <aside className="space-y-6 lg:sticky lg:top-24">
          <div className="rail-panel">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Archive
            </p>
            <p className="mt-4 font-heading text-4xl tracking-tight text-primary">
              {journal.length}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              entries since {formatDate(first.date)}
            </p>
          </div>

          <div className="rail-panel">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Latest
            </p>
            <Link
              href={`/journal/${latest.slug}`}
              className="mt-3 block font-heading text-xl leading-snug tracking-tight hover:text-primary"
            >
              {latest.title}
            </Link>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {latest.gist}
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
