import type { Metadata } from "next";
import Link from "next/link";
import { WritingArt } from "@/components/header-art";
import { SectionPage } from "@/components/section-page";
import { formatDate, journal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
};

export default function JournalPage() {
  return (
    <SectionPage
      section="writing"
      lead="Notes from building: what shipped, what broke, and which languages it took."
      art={<WritingArt />}
    >
        <ol className="panel px-4 sm:px-5">
          {journal.map((post, i) => (
            <li key={post.slug} className="border-b border-border last:border-b-0">
              <Link
                href={`/journal/${post.slug}`}
                className="group grid gap-1 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
              >
                <time dateTime={post.date} className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground">
                  {formatDate(post.date)}
                </time>
                <span>
                  <span className="block font-heading text-[clamp(1.0625rem,1.7vw,1.3125rem)] leading-snug transition-colors group-hover:text-primary">
                    {post.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-6 text-muted-foreground">{post.gist}</span>
                </span>
                <span aria-hidden className="hidden font-mono text-[11px] text-muted-foreground sm:block">
                  {String(journal.length - i).padStart(2, "0")}
                </span>
              </Link>
            </li>
          ))}
        </ol>
    </SectionPage>
  );
}
