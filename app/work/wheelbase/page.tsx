import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Wheelbase",
  description:
    "Engineering case study: a multi-tenant dealership platform with hybrid vector retrieval, a governed AI operations assistant, offline VIN decoding, and a Go backend shipped to web, desktop, and mobile.",
};

const topology = [
  { route: "/", target: "Frontend", detail: "TanStack Start SSR · React 19 · tRPC" },
  { route: "/landing", target: "Landing", detail: "Vite static · waitlist + onboarding" },
  { route: "/api/backend/*", target: "Go API", detail: "Gin · CGO + 2GB SQLite · MinIO · Remotion" },
  { route: "/_agent", target: "Agent proxy", detail: "Bun → OpenClaw runtime + plugins" },
];

const scale = [
  { label: "Frontend routes", value: "68" },
  { label: "tRPC procedures", value: "~217" },
  { label: "Domain routers", value: "35" },
  { label: "Postgres tables", value: "66" },
  { label: "SQL migrations", value: "66" },
  { label: "Go source files", value: "112" },
  { label: "Mobile source files", value: "276" },
];

const vinPipeline = [
  ["Model year", "Position 10, resolved with 30-year cycle logic."],
  ["Manufacturer", "WMI lookup for make and manufacturer."],
  ["Schema discovery", "Find the VIN schemas that apply to this WMI and year."],
  ["Multi-pass VDS match", "Positions 4–8 for body style, engine, drive type, and model."],
  ["Trim refinement", "Vehicle spec pattern rules narrow to a trim."],
  ["Correction", "Check-digit validation, single-character auto-correction, ranked candidates."],
] as const;

const decisions = [
  {
    title: "Streaming ETL that cleans up after itself",
    body: "Auction runlists stream row by row through csv.Reader at constant memory. Column mappings are per-auction configs in Supabase, so dealers add a new auction house without a code change. Inserts go in 500-row batches with client-side UUIDs; if linking cars to the runlist fails, the just-inserted cars are deleted so nothing is orphaned.",
  },
  {
    title: "One API, two transports",
    body: "tRPC procedures are split into a shared router, safe over both HTTP and Electron IPC, and a cloud-only router for embeddings and heavy IMX compute. The desktop app runs the full shared API in-process with zero duplicated business logic.",
  },
  {
    title: "A desktop app that supervises its own runtime",
    body: "The Electron main process spawns the bundled Go binary, launches the OpenClaw agent with loopback-only trusted-proxy auth, relays OpenRouter credentials locally, and manages Chrome for Testing for browser automation.",
  },
  {
    title: "Collaboration without a collaboration server",
    body: "The document vault uses TipTap with Yjs CRDTs, relayed over Supabase Realtime channels. Concurrent edits merge conflict-free, with debounced autosave, version history, and point-in-time restore.",
  },
  {
    title: "Secrets outside application tables",
    body: "Each user's OpenRouter key is encrypted in Supabase Vault. The Go backend mints and revokes keys through Vault RPCs, so keys never appear in an application query.",
  },
  {
    title: "Isolation enforced by the database",
    body: "Every core table carries tenant_id, and RLS binds auth.uid() to the user's tenant inside Postgres. The mobile app talks to Supabase directly with RLS as its only boundary, which only works because the policies are the real security layer.",
  },
];

function Section({
  index,
  title,
  lead,
  children,
}: {
  index: string;
  title: string;
  lead: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <p className="font-mono text-[12px] text-muted-foreground">{index}</p>
      <h2 className="mt-2 font-heading text-2xl tracking-tight">{title}</h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-7 text-foreground/85">
        {lead}
      </p>
      {children}
    </section>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 max-w-2xl space-y-2.5 text-[15px] leading-7 text-foreground/80">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.8rem] h-px w-3 shrink-0 bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function WheelbasePage() {
  return (
    <article className="py-16 sm:py-20">
      <p className="eyebrow">Case study · 2024–Present · AI Engineer / Full-Stack Developer at Hime</p>
      <h1 className="mt-4 font-heading text-[clamp(2.1rem,4.5vw,3rem)] leading-[0.98] tracking-[-0.04em]">
        Wheelbase
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        Dealership software built at the pace of a live auction floor. One
        Turborepo monorepo ships a web app, an Electron desktop app, an Expo
        field app, a Go backend, and an AI agent runtime.
      </p>
      <div className="mt-6 flex flex-wrap gap-4 font-mono text-[12px]">
        <a
          href="https://wheelbase.io"
          className="text-foreground underline-offset-4 hover:underline"
        >
          wheelbase.io
        </a>
        <Link
          href="/journal/new-challenges-new-languages"
          className="text-muted-foreground underline-offset-4 hover:underline"
        >
          Why I learned Go
        </Link>
      </div>

      <div className="mt-12 overflow-hidden rounded-sm bg-foreground text-background">
        <div className="flex items-center justify-between border-b border-background/15 px-5 py-3 font-mono text-[11px] text-background/60 sm:px-8">
          <span>Deployment topology</span>
          <span>Nginx edge · Docker · Dokploy</span>
        </div>
        <ul className="divide-y divide-background/10 px-5 font-mono text-[12px] sm:px-8">
          {topology.map((row) => (
            <li
              key={row.route}
              className="grid gap-1 py-3.5 sm:grid-cols-[10rem_8rem_minmax(0,1fr)] sm:gap-4"
            >
              <span className="text-background">{row.route}</span>
              <span className="text-background/85">→ {row.target}</span>
              <span className="text-background/55">{row.detail}</span>
            </li>
          ))}
        </ul>
        <p className="border-t border-background/15 px-5 py-3.5 font-mono text-[11px] leading-5 text-background/60 sm:px-8">
          Supabase Postgres underneath everything: RLS, pgvector, Realtime,
          Vault, Edge Functions. GitHub Actions deploys only the services whose
          paths changed.
        </p>
      </div>

      <div className="mt-4 grid gap-16 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
        <div className="min-w-0">
          <Section
            index="01 · Retrieval"
            title="Retrieval that makes decisions"
            lead="The RAG layer here does not chat with documents. It embeds vehicles, retrieves the ones that fill a dealer's real inventory gaps, and feeds that signal into ranking that buyers use on the auction floor."
          >
            <Points
              items={[
                "Every car becomes canonical text (\"2020 Toyota Sienna LE Minivan\") with a 768-dim embedding under an HNSW index and a weighted tsvector under GIN.",
                "Embeddings come from a provider chain: Gemini, then OpenAI at 768 dimensions, then a local sparse-feature fallback, so ranking degrades instead of failing.",
                "Semantic and lexical results are fused with Reciprocal Rank Fusion, which handles conceptual queries (\"work truck\") and exact ones (\"F-150\") alike.",
                "Retrieval runs over the whole demand matrix, not one query. Each underfilled category is embedded and searched, weighted by its gap ratio, and aggregated.",
                "Vehicle archetypes are embedded once by year, make, model, and body style, then reused across every matching car to cut embedding cost.",
              ]}
            />
            <pre className="mt-6 max-w-2xl overflow-x-auto rounded-sm border border-border bg-card px-4 py-3.5 font-mono text-[12px] leading-5 text-foreground/85">
              <code>{`gap_weight = (target - current) / target
fit        = Σ gap_weight × rrf(vector, full_text)
raw_imx    = 0.7 × fit + 0.2 × mileage + 0.1 × age
imx        = normalize(raw_imx) within the runlist`}</code>
            </pre>
            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-muted-foreground">
              IMX, the Inventory Match Index. Retrieval supplies relevance;
              deterministic rules for pricing bands, recency, aging, and
              wholesale risk align it with how a dealership actually operates.
            </p>
          </Section>

          <Section
            index="02 · Governance"
            title="An assistant that cannot leave its tenant"
            lead="Operators ask questions in plain English and get answers from their own data. Letting a model write SQL against a multi-tenant database only works if the model physically cannot see anyone else's rows."
          >
            <Points
              items={[
                "Prompts become a tenant-scoped, SELECT-only query DSL executed through ai_execute_query, a hardened security-definer Postgres function tightened over several migrations.",
                "Writes are risk-classified. Destructive operations require an approval token from a human before they run.",
                "Every query and write lands in telemetry tables, so any agent action can be audited after the fact.",
                "Context documents for the user, dealership, and team go through a draft and publish step before they can change agent behavior.",
              ]}
            />
          </Section>

          <Section
            index="03 · Offline"
            title="VIN decoding without the network"
            lead="A paid third-party API became a self-contained Go service over a ~2GB NHTSA SQLite database: about 1.6M pattern rows and 8.7M valid-character rows, zero external calls per decode."
          >
            <ol className="mt-6 max-w-2xl divide-y divide-border border-y border-border">
              {vinPipeline.map(([step, detail], i) => (
                <li key={step} className="grid gap-1 py-3 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-4">
                  <span className="font-mono text-[12px]">
                    <span className="mr-2 text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </span>
                  <span className="text-sm leading-6 text-muted-foreground">
                    {detail}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 max-w-2xl text-[13px] leading-6 text-muted-foreground">
              A custom pattern parser instead of regex, in-memory caches for
              elements and error codes, and streaming row reads throughout. The
              container pulls the database from MinIO at startup.
            </p>
          </Section>

          <Section
            index="04 · Performance"
            title="Python to Go, with nothing broken"
            lead="A core import that populated thousands of rows took up to two minutes. Fixing the FastAPI path got it to 5–25 seconds. Rewriting the services in Go with Gin, plus caching and data-model changes, cut database load by more than 80% and brought responses under a second, with zero breaking changes for the clients."
          />

          <section className="mt-16">
            <p className="font-mono text-[12px] text-muted-foreground">
              05 · Decisions
            </p>
            <h2 className="mt-2 font-heading text-2xl tracking-tight">
              Other calls worth explaining
            </h2>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {decisions.map((item) => (
                <li key={item.title} className="py-5">
                  <p className="font-heading text-lg tracking-tight">
                    {item.title}
                  </p>
                  <p className="mt-2 max-w-2xl text-[15px] leading-7 text-foreground/80">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-10 lg:sticky lg:top-24 lg:mt-16">
          <div className="rail-panel">
            <p className="font-mono text-[12px] text-muted-foreground">
              Quick facts
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Role", "AI Engineer / Full-Stack Developer"],
                ["Company", "Hime"],
                ["Timeline", "Jan 2024–Present"],
                ["Stage", "Closed beta"],
                ["Surfaces", "Web, desktop, mobile"],
              ].map(([term, value]) => (
                <div key={term} className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted-foreground">{term}</dt>
                  <dd className="text-right text-foreground/85">{value}</dd>
                </div>
              ))}
            </dl>
            <a
              href="https://wheelbase.io"
              className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full")}
            >
              Open wheelbase.io
            </a>
          </div>

          <div className="rail-panel">
            <p className="font-mono text-[12px] text-muted-foreground">Scale</p>
            <dl className="mt-4 space-y-2 text-sm">
              {scale.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted-foreground">{item.label}</dt>
                  <dd className="font-mono text-[13px] text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rail-panel">
            <p className="font-mono text-[12px] text-muted-foreground">Stack</p>
            <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
              React 19, TanStack Start, tRPC 11, TanStack Query, Zustand,
              Tailwind CSS 4, Go 1.25, Gin, Supabase, PostgreSQL, pgvector,
              SQLite, Electron 41, Expo SDK 55, NativeWind, Yjs, TipTap,
              OpenRouter, AI SDK, Remotion, MinIO, Docker, Nginx, Dokploy,
              GitHub Actions, Turborepo, Bun.
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
