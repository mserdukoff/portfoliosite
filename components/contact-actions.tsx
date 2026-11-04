"use client";

import { useEffect, useState } from "react";
import { TextMorph } from "@/components/arc/text-morph/text-morph";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const outline = cn(buttonVariants({ variant: "outline", size: "lg" }), "h-[3.25rem] px-4");

export function ContactActions() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={`mailto:${site.email}`} className={cn(outline, "border-foreground")}>
        {site.email}
      </a>
      <button type="button" onClick={copyEmail} className={cn(outline, "arc")}>
        <TextMorph>{copied ? "Copied" : "Copy email"}</TextMorph>
      </button>
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
      <a href={site.linkedin} className={outline}>
        LinkedIn ↗
      </a>
      <a href={site.x} className={outline}>
        X {site.xHandle} ↗
      </a>
    </div>
  );
}
