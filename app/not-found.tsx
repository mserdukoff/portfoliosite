import Link from "next/link";

export default function NotFound() {
  return (
    <article className="pt-16">
      <svg
        aria-hidden
        viewBox="0 0 200 60"
        className="h-auto w-40 text-muted-foreground/40"
        fill="none"
      >
        <path d="M 20 44 Q 60 4 100 44" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M 100 44 Q 140 4 180 44"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
        <circle cx={20} cy={44} r={3} fill="currentColor" />
        <circle cx={100} cy={44} r={3} fill="currentColor" />
        <circle cx={180} cy={44} r={3} className="fill-primary" />
        <text
          x={180}
          y={30}
          textAnchor="middle"
          fontSize="9"
          fontFamily="var(--font-geist-mono)"
          className="fill-primary"
        >
          ???
        </text>
      </svg>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        404 · unparsed
      </p>
      <h1 className="mt-4 font-heading text-4xl tracking-tight">
        This page is not here.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        It may have moved. The work lives on the home page, the writing under
        /journal.
      </p>
      <Link href="/" className="mt-8 inline-block text-sm hover:text-primary">
        Back to home →
      </Link>
    </article>
  );
}
