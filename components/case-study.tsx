import { Info, Layers, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** The icon and title at the top of a panel. */
export function PanelTitle({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <Icon aria-hidden className="size-3.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
      <span className="truncate">{title}</span>
    </span>
  );
}

/** A HUD panel with an icon heading. */
export function Panel({
  icon,
  title,
  meta,
  className,
  children,
}: {
  icon: LucideIcon;
  title: string;
  meta?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("panel min-w-0", className)}>
      <p className="panel-head">
        <PanelTitle icon={icon} title={title} />
        {meta ? <span className="shrink-0 text-muted-foreground">{meta}</span> : null}
      </p>
      <div className="border-t border-border">{children}</div>
    </div>
  );
}

export function Facts({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <dl className="grid gap-[0.4375rem] px-2.5 py-2.5 font-mono text-[11px]">
      {items.map(([term, value]) => (
        <div key={term} className="flex items-baseline justify-between gap-4">
          <dt>{term}</dt>
          <dd className="text-right text-muted-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function FactsPanel({
  items,
  href,
  site,
}: {
  items: readonly (readonly [string, string])[];
  href: string;
  site: string;
}) {
  return (
    <Panel icon={Info} title="Quick facts" className="self-center">
      <Facts items={items} />
      <a href={href} className="block border-t border-border px-2.5 py-2 font-mono text-[11px] transition-colors hover:bg-foreground hover:text-background">
        Open {site} <span aria-hidden>↗</span>
      </a>
    </Panel>
  );
}

export function StackPanel({ children }: { children: React.ReactNode }) {
  return (
    <Panel icon={Layers} title="Stack">
      <p className="p-3 font-mono text-[11px] leading-5 text-muted-foreground">{children}</p>
    </Panel>
  );
}

export function CaseLayout({ main, rail }: { main: React.ReactNode; rail: React.ReactNode }) {
  return (
    <div className="mt-4 grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <div className="min-w-0">{main}</div>
      <aside className="space-y-3 lg:sticky lg:top-[calc(var(--bar-h)+1.5rem)] lg:mt-16">{rail}</aside>
    </div>
  );
}

export function CaseSection({
  id,
  code,
  title,
  lead,
  children,
}: {
  id?: string;
  code: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-16">
      <h2 className="font-heading text-[clamp(1.375rem,2.4vw,1.75rem)] font-normal leading-tight">
        <span className="mr-3 align-[0.2em] font-mono text-[11px] tracking-[0.14em] text-primary">{code} /</span>
        {title}
      </h2>
      {lead ? <p className="mt-3 max-w-[72ch] text-[14px] leading-7 text-[#c7d2d9]">{lead}</p> : null}
      {children}
    </section>
  );
}

export function Points({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 max-w-[72ch] space-y-2.5 text-[14px] leading-7 text-foreground/80">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.8rem] h-px w-3 shrink-0 bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Numbered rows: a ruled list of a title and its explanation. */
export function Rows({ items }: { items: readonly { title: string; body: string }[] }) {
  return (
    <ol className="mt-6 divide-y divide-border border-y border-border">
      {items.map((item, i) => (
        <li key={item.title} className="grid gap-1 py-5 sm:grid-cols-[3rem_minmax(0,1fr)]">
          <span aria-hidden className="pt-1 font-mono text-[11px] text-primary">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-heading text-[16px] font-medium leading-snug">{item.title}</h3>
            <p className="mt-2 max-w-[72ch] text-[14px] leading-7 text-foreground/80">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
