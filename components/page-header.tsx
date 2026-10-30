import { cn } from "@/lib/utils";

export function PageHeader({
  index,
  label,
  title,
  lead,
  art,
  className,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  art?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "grid gap-10 border-b border-ink/70 pb-12 pt-6 sm:pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-14",
        className
      )}
    >
      <div className="settle">
        <p className="caps flex items-center gap-3 text-[11px] text-muted-foreground">
          {index}
          <span aria-hidden className="h-px w-8 bg-current" />
          {label}
        </p>
        <h1 className="mt-6 font-heading text-[clamp(3rem,7.5vw,6rem)] font-normal leading-[0.92] tracking-[-0.025em]">
          {title}
        </h1>
        {lead ? <div className="mt-7 max-w-xl text-[18px] leading-[1.6] text-ink/80">{lead}</div> : null}
      </div>
      {art ? (
        <div className="settle [--d:150ms]" aria-hidden>
          {art}
        </div>
      ) : null}
    </header>
  );
}

export function SectionHead({
  index,
  title,
  action,
  className,
  id,
}: {
  index: string;
  title: string;
  action?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "flex scroll-mt-8 flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-ink/70 pt-5",
        className
      )}
    >
      <div>
        <p className="caps text-[10.5px] text-muted-foreground">{index}</p>
        <h2 className="mt-2 font-heading text-[clamp(2rem,3.4vw,2.75rem)] font-normal leading-[1.02] tracking-[-0.02em]">
          {title}
        </h2>
      </div>
      {action ? <div className="caps pb-1.5 text-[10.5px]">{action}</div> : null}
    </div>
  );
}
