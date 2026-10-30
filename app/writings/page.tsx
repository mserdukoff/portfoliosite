import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import temple from "@/public/collage/temple.webp";
import { formatDate, journal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writings",
  description: "Build notes on Grammario, Wheelbase, Go, and shipping things that work.",
};

export default function WritingsPage() {
  const years = new Map<string, typeof journal>();
  for (const post of journal) {
    const year = post.date.slice(0, 4);
    years.set(year, [...(years.get(year) ?? []), post]);
  }

  return (
    <div className="page">
      <PageHeader
        index="03"
        label="Writings"
        title="Writings"
        lead={<p>Build notes, kept as I go: what broke, what I changed, and why.</p>}        art={
          <div className="relative mx-auto aspect-[9/16] max-h-[30rem] lg:ml-auto lg:mr-0">
            <Image src={temple} alt="" fill preload sizes="18rem" className="object-contain" />
          </div>
        }
      />

      <div className="mt-6">
        {[...years].map(([year, posts]) => (
          <section key={year} className="grid gap-2 border-b border-ink/70 py-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
            <h2 className="font-heading text-[2.4rem] leading-none tracking-[-0.02em] text-ink/35">{year}</h2>
            <ol>
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/writings/${post.slug}`}
                    className="group grid gap-1.5 border-b border-border py-5 last:border-b-0 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8"
                  >
                    <time dateTime={post.date} className="caps pt-1.5 text-[10px] text-muted-foreground">
                      {formatDate(post.date).replace(/, \d{4}$/, "")}
                    </time>
                    <span>
                      <span className="block font-heading text-[1.6rem] leading-tight tracking-[-0.01em] transition-colors group-hover:text-seal">
                        {post.title}
                      </span>
                      <span className="mt-1.5 block text-[15px] leading-[1.55] text-muted-foreground">{post.gist}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
