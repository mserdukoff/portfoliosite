/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FlowField } from "@/components/flow-field";

export default function NotFound() {
  return (
    <article className="relative overflow-hidden bg-background">
      <FlowField preset="neon" />
      <div aria-hidden className="field-scrim pointer-events-none absolute inset-0" />
      <img
        src="/art/eel.webp"
        alt=""
        width={850}
        height={900}
        className="pointer-events-none absolute -right-[4%] top-1/2 h-auto w-[min(70vw,30rem)] -translate-y-1/2 opacity-40 sm:opacity-90"
      />
      <div className="wrap relative flex min-h-[80dvh] flex-col justify-center pb-16 pt-[calc(var(--bar-h)+3rem)]">
        <p className="font-mono text-[12px] text-muted-foreground">
          {"// 404 · No signal"}
        </p>
        <h1 className="mt-4 max-w-[14em] font-[family-name:var(--font-plex-mono)] text-[clamp(2.25rem,5vw,4rem)] font-normal leading-[1.05]">
          This page is not here
          <span aria-hidden className="cursor" />
        </h1>
        <div className="mt-8 flex flex-wrap gap-6 font-mono text-[13px]">
          <Link href="/" className="hover:text-primary">
            Go to the home page →
          </Link>
          <Link href="/journal" className="text-muted-foreground hover:text-primary">
            Read the writing
          </Link>
        </div>
      </div>
    </article>
  );
}
