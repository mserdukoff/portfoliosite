import { cn } from "@/lib/utils";

export function BrowserFrame({
  label,
  children,
  tone = "light",
  className,
  contentClassName = "p-4",
}: {
  label: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
  contentClassName?: string;
}) {
  const dark = tone === "dark";

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-sm border",
        dark
          ? "border-background/25 bg-background text-foreground"
          : "border-border bg-background",
        className
      )}
    >
      <figcaption
        className={cn(
          "flex items-center justify-between gap-3 border-b px-3 py-1.5 font-mono text-[10px] text-muted-foreground",
          dark ? "border-border bg-muted" : "border-border bg-muted/60"
        )}
      >
        <span className="truncate">{label}</span>
        <span className="shrink-0">Live</span>
      </figcaption>
      <div className={contentClassName}>{children}</div>
    </figure>
  );
}
