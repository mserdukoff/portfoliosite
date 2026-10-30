import { cn } from "@/lib/utils";

/** The Church Slavonic М from the favicon. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span aria-hidden lang="cu" className={cn("inline-block font-church leading-none", className)}>
      М
    </span>
  );
}
