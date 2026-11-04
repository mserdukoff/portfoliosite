import { FlowField } from "@/components/flow-field";
import { cn } from "@/lib/utils";

export function Ruler() {
  return (
    <div aria-hidden className="ruler">
      <span>000</span>
      <span>090</span>
      <span>180</span>
      <span>270</span>
      <span>360</span>
    </div>
  );
}

/**
 * The landing hero at page scale. `aside` is a HUD panel beside the headline;
 * `art` is a larger subject drawing with the field dimmed behind it. With
 * `bare` the field goes and the art sits centered on the ruler.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  links,
  aside,
  art,
  bare,
}: {
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  links?: React.ReactNode;
  aside?: React.ReactNode;
  art?: React.ReactNode;
  bare?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-background">
      {bare ? null : (
        <>
          <FlowField preset="neon" className={art ? "opacity-30" : undefined} />
          <div aria-hidden className="field-scrim pointer-events-none absolute inset-0" />
        </>
      )}
      <div className="wrap relative flex min-h-[25rem] flex-col pb-5 pt-[calc(var(--bar-h)+1.5rem)]">
        <div
          className={cn(
            "grid flex-1 gap-8 py-8 lg:gap-12",
            bare
              ? "items-end pb-0 xl:grid-cols-[minmax(0,1fr)_36rem_minmax(0,1fr)]"
              : art
                ? "items-center lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]"
                : "items-center lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
          )}
        >
          <div>
            <p className="font-mono text-[12px] text-muted-foreground">
              {`// ${eyebrow}`}
            </p>
            <h1 className="mt-4 max-w-[20em] font-[family-name:var(--font-plex-mono)] text-[clamp(2.25rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.01em] [text-shadow:0_0_24px_rgb(3_6_10/0.9)]">
              {title}
              <span aria-hidden className="cursor" />
            </h1>
            {lead ? (
              <p className="mt-6 max-w-[62ch] text-[14px] leading-[1.7] text-[#c7d2d9] [text-shadow:0_0_12px_#03060a,0_0_4px_#03060a]">
                {lead}
              </p>
            ) : null}
            {links ? (
              <div className="mt-6 flex flex-wrap gap-2 font-mono text-[12px]">
                {links}
              </div>
            ) : null}
          </div>
          {bare ? <div className="mx-auto w-full max-w-[36rem]">{art}</div> : (art ?? aside)}
        </div>
        <Ruler />
      </div>
    </section>
  );
}
