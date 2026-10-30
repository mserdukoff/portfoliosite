import Link from "next/link";

export function CaseCrumb() {
  return (
    <p className="caps mb-6 flex items-center gap-3 text-[11px] text-muted-foreground">
      <Link href="/work" className="hover:text-seal">
        01 — Work
      </Link>
      <span aria-hidden className="h-px w-8 bg-current" />
      Case study
    </p>
  );
}
