import type { Metadata } from "next";
import Link from "next/link";
import { Gauge, Server } from "lucide-react";
import {
  CaseLayout,
  CaseSection,
  FactsPanel,
  Panel,
  Points,
  Rows,
  StackPanel,
} from "@/components/case-study";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Wheelbase",
  description:
    "Engineering case study: a multi-tenant dealership platform with retrieval-based auction ranking, a governed AI operations assistant, offline VIN decoding, and a Go backend shipped to web, desktop, and mobile.",
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

export default function WheelbasePage() {
  return (
    <article>
      <PageHero
        eyebrow="Case study"
        title="Wheelbase"
        lead="Dealership software built at the pace of a live auction floor. One Turborepo monorepo ships a web app, an Electron desktop app, an Expo field app, a Go backend, and an AI agent runtime."
        links={
          <>
            <a href="https://wheelbase.io" className="hud-btn">
              wheelbase.io <span aria-hidden>↗</span>
            </a>
            <Link href="/journal/new-challenges-new-languages" className="hud-btn border-border">
              Why I learned Go
            </Link>
          </>
        }
        aside={
          <FactsPanel
            href="https://wheelbase.io"
            site="wheelbase.io"
            items={[
              ["Role", "AI Engineer / Full-Stack Developer"],
              ["Company", "Hime"],
              ["Timeline", "Jan 2024–Present"],
              ["Stage", "Closed beta"],
              ["Surfaces", "Web, desktop, mobile"],
            ]}
          />
        }
      />

      <div className="wrap pb-20 pt-10">
        <Panel icon={Server} title="Deployment topology" meta="Nginx edge · Docker · Dokploy">
          <ul className="divide-y divide-border px-3 font-mono text-[12px]">
            {topology.map((row) => (
              <li
                key={row.route}
                className="grid gap-1 py-3 sm:grid-cols-[10rem_8rem_minmax(0,1fr)] sm:gap-4"
              >
                <span>{row.route}</span>
                <span className="text-primary">→ {row.target}</span>
                <span className="text-muted-foreground">{row.detail}</span>
              </li>
            ))}
          </ul>
          <p className="border-t border-border px-3 py-3 font-mono text-[11px] leading-5 text-muted-foreground">
            Supabase Postgres underneath everything: RLS, pgvector, Realtime,
            Vault, Edge Functions. GitHub Actions deploys only the services whose
            paths changed.
          </p>
        </Panel>

        <CaseLayout
          main={
            <>
              <CaseSection
                code="01"
                title="Retrieval that makes decisions"
                lead="The RAG layer ranks every car on an auction runlist against what a dealer's lot actually needs, and buyers use that ranking on the auction floor. The score is IMX, the Inventory Match Index."
              >
                <Points
                  items={[
                    "Semantic and keyword search work together, so conceptual queries (\"work truck\") and exact ones (\"F-150\") both land.",
                    "Embeddings come from a chain of providers with a local fallback, so ranking degrades instead of failing.",
                    "Retrieval supplies relevance. Deterministic business rules align it with how a dealership actually operates.",
                  ]}
                />
              </CaseSection>

              <CaseSection
                code="02"
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
              </CaseSection>

              <CaseSection
                code="03"
                title="VIN decoding without the network"
                lead="A paid third-party API became a self-contained Go service over a ~2GB NHTSA database. It decodes make, model, trim, and specs, and corrects mistyped VINs, with zero external calls per decode."
              />

              <CaseSection
                code="04"
                title="Python to Go, with nothing broken"
                lead="A core import that populated thousands of rows took up to two minutes. Fixing the FastAPI path got it to 5–25 seconds. Rewriting the services in Go with Gin, plus caching and data-model changes, cut database load by more than 80% and brought responses under a second, with zero breaking changes for the clients."
              />

              <CaseSection code="05" title="Other calls worth explaining">
                <Rows items={decisions} />
              </CaseSection>
            </>
          }
          rail={
            <>
              <Panel icon={Gauge} title="Scale">
                <dl className="grid gap-[0.4375rem] px-2.5 py-2.5 font-mono text-[11px]">
                  {scale.map((item) => (
                    <div key={item.label} className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted-foreground">{item.label}</dt>
                      <dd className="text-[13px] text-primary">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Panel>
              <StackPanel>
                React 19, TanStack Start, tRPC 11, TanStack Query, Zustand,
                Tailwind CSS 4, Go 1.25, Gin, Supabase, PostgreSQL, pgvector,
                SQLite, Electron 41, Expo SDK 55, NativeWind, Yjs, TipTap,
                OpenRouter, AI SDK, Remotion, MinIO, Docker, Nginx, Dokploy,
                GitHub Actions, Turborepo, Bun.
              </StackPanel>
            </>
          }
        />
      </div>
    </article>
  );
}
