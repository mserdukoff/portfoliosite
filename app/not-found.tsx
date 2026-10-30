import Link from "next/link";

export default function NotFound() {
  return (
    <article className="page pt-10">
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
          fontFamily="var(--font-plex-mono)"
          className="fill-primary"
        >
          ???
        </text>
      </svg>
      <h1 className="mt-6 font-heading text-4xl tracking-tight">
        This page is not here
      </h1>
      <div className="mt-8 flex gap-6 text-sm">
        <Link href="/" className="hover:text-primary">
          Go to the home page →
        </Link>
        <Link href="/writings" className="text-muted-foreground hover:text-primary">
          Read the writings
        </Link>
      </div>
    </article>
  );
}
