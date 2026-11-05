/* eslint-disable @next/next/no-img-element */
"use client";

import { BREAK_EVENT } from "@/components/easter-egg";
import { ContactActions } from "@/components/contact-actions";
import { FlowField } from "@/components/flow-field";
import { nav, site } from "@/lib/site";

const contactNav = nav.find((item) => item.id === "contact");
const BREAK_PHRASE = "kind of works";
const [quoteLead, quoteTail] = site.quote.split(BREAK_PHRASE);

export function Contact() {
  return (
    <section className="relative flex flex-1 flex-col overflow-hidden bg-background">
      <FlowField preset="neon" />
      <div aria-hidden className="field-scrim pointer-events-none absolute inset-0" />
      <img
        src="/art/eel.webp"
        alt=""
        width={850}
        height={900}
        className="pointer-events-none absolute -right-[2%] top-1/2 h-auto w-[min(50vw,29rem)] -translate-y-1/2 opacity-30 sm:opacity-60 lg:opacity-90"
      />
      <div className="wrap relative flex min-h-[min(88dvh,54rem)] flex-1 flex-col justify-center pb-16 pt-[calc(var(--bar-h)+3rem)]">
        <h1 className="font-mono text-[12px] font-normal text-muted-foreground">
          {`// ${contactNav?.code} · ${contactNav?.label}`}
        </h1>
        <blockquote
          data-breakable
          className="mt-6 max-w-[17em] font-[family-name:var(--font-plex-mono)] text-[clamp(1.875rem,4.4vw,3.5rem)] leading-[1.12] tracking-[-0.01em] [text-shadow:0_0_24px_rgb(3_6_10/0.9)]"
        >
          &ldquo;{quoteLead}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(BREAK_EVENT))}
            title="Does it?"
            className="inline cursor-pointer text-left underline decoration-primary/60 decoration-dotted underline-offset-[0.14em] transition-colors hover:text-primary hover:decoration-primary focus-visible:text-primary"
          >
            {BREAK_PHRASE}
          </button>
          {quoteTail}&rdquo;
        </blockquote>
        <p className="mt-6 max-w-[56ch] text-[14px] leading-7 text-[#c7d2d9] [text-shadow:0_0_12px_#03060a]">
          {site.status} in AI engineering, ML, data, and software engineering,{" "}
          {site.scope}. US citizen, no sponsorship needed.
        </p>
        <div className="mt-8">
          <ContactActions />
        </div>
      </div>
    </section>
  );
}
