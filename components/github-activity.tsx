"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function GithubActivity() {
  const username = site.github.split("/").pop();
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "ready" : "error");
  }, []);

  return (
    <div className="rail-panel">
      <p className="eyebrow">GitHub activity</p>
      <div className="relative mt-4 -mx-2 overflow-x-auto">
        <div className="relative min-w-[640px] px-2">
          {status !== "ready" ? (
            <div
              aria-hidden
              className={cn(
                "absolute inset-x-2 inset-y-0 rounded-sm bg-muted",
                status === "loading" && "animate-pulse"
              )}
            />
          ) : null}
          {status === "error" ? (
            <p className="relative flex aspect-[663/104] items-center justify-center font-mono text-[11px] text-muted-foreground">
              Contribution graph unavailable right now.
            </p>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imgRef}
              src={`https://ghchart.rshah.org/2a44b8/${username}`}
              alt={`${username}'s GitHub contribution graph`}
              width={663}
              height={104}
              className={cn(
                "relative block aspect-[663/104] w-full mix-blend-multiply transition-opacity duration-500",
                status === "ready" ? "opacity-100" : "opacity-0"
              )}
              loading="lazy"
              onLoad={() => setStatus("ready")}
              onError={() => setStatus("error")}
            />
          )}
        </div>
      </div>
      <a
        href={site.github}
        className="mt-3 inline-block font-mono text-[11px] text-muted-foreground hover:text-primary"
      >
        {username} on GitHub ↗
      </a>
    </div>
  );
}
