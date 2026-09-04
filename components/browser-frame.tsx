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
    <div
      className={cn(
        "overflow-hidden rounded-xl border card-elevated",
        dark
          ? "border-background/10 bg-background text-foreground"
          : "border-border/70 bg-background",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 border-b px-3 py-2",
          dark ? "border-border/60 bg-muted/40" : "border-border/60 bg-muted/50"
        )}
      >
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">
          {label}
        </span>
      </div>
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
