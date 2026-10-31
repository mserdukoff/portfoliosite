import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, journal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
};

export default function JournalPage() {
  return (
    <article className="py-16 sm:py-20">
      <h1 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
        Journal
      </h1>

      <div className="mt-10 divide-y divide-border border-t border-border">
        {journal.map((post) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            className="group grid gap-2 py-6 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-8"
          >
            <time dateTime={post.date} className="font-mono text-[11px] text-muted-foreground">
              {formatDate(post.date)}
            </time>
            <span className="font-heading text-2xl tracking-tight transition-colors group-hover:text-primary">
              {post.title}
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}
