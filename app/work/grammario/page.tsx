import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { MorphemeBreakdown } from "@/components/morpheme-breakdown";
import { ParseTree } from "@/components/parse-tree";
import { grammarioLanguages } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Grammario",
  description:
    "Why I built Grammario: textbooks skip how agglutinative words are built. In Turkish, bilmediysen is one word for “if you did not know.” Grammario breaks grammar into the pieces that make it understandable, across six languages.",
};

export default function GrammarioPage() {
  return (
    <article className="py-16 sm:py-20">
      <h1 className="font-heading text-[clamp(2.1rem,4.5vw,3rem)] leading-[0.98] tracking-[-0.04em]">
        Grammario
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        Learning languages, I kept finding textbooks and online resources that
        were lazy about explaining grammar, especially for agglutinative
        languages, where one word can carry a whole sentence.
      </p>
      <div className="mt-6 flex flex-wrap gap-4 font-mono text-[12px]">
        <a
          href="https://grammario.ai"
          className="text-foreground underline-offset-4 hover:underline"
        >
          grammario.ai
        </a>
        <Link
          href="/journal/new-grammario-method"
          className="text-muted-foreground underline-offset-4 hover:underline"
        >
          The method
        </Link>
      </div>

      <div className="mt-12 rounded-sm border border-border bg-card px-4 py-6 sm:px-8 sm:py-8">
        <p className="max-w-xl font-heading text-xl sm:text-2xl">
          In Turkish, <em>bilmediysen</em> means “if you did not know.” One
          word. How do you make sense of it?
        </p>
        <MorphemeBreakdown className="mt-10" />
      </div>

      <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
        <div className="min-w-0">
          <div className="max-w-2xl space-y-5 text-[16px] leading-8 text-foreground/85">
            <p>
              Split into its pieces, the word stops being a wall of letters: a
              root, then negation, past tense, a buffer letter, the conditional,
              and the person. Each piece is small and learnable on its own.
              Most resources hand you the finished word, or a table of endings
              to memorize, and skip the part where it is built.
            </p>
            <p>
              I wanted an app that breaks grammar down like this, into small
              pieces that make the whole understandable. After a successful
              prototype, I expanded it to more languages.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="font-heading text-2xl tracking-tight">
              Expanding to six languages
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Not every language stacks suffixes. Italian inflects and agrees,
              so the same sentence-level idea shows up as a dependency tree:
              who governs whom, and which words must match.
            </p>
            <div className="mt-8 rounded-sm border border-border bg-card px-4 py-6 sm:px-6">
              <p className="font-heading text-xl italic">
                L&apos;ho fatta parlare in italiano.
              </p>
              <div className="mt-6">
                <ParseTree />
              </div>
            </div>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {grammarioLanguages.map((language) => (
                <li
                  key={language.code}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-heading text-xl">
                    {language.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {language.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <h2 className="font-heading text-2xl tracking-tight">
              Structural-First Analysis
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Earlier versions asked an LLM to identify grammar. Output was
              fluent and hallucinatory. I rebuilt the engine in December 2025.
            </p>
            <ol className="mt-8 divide-y divide-border border-y border-border [&>li]:py-5">
              <li>
                <p className="font-heading text-lg tracking-tight">
                  Analyst
                </p>
                <p className="mt-2 max-w-xl text-[15px] leading-7">
                  spaCy parses via Universal Dependencies, with Stanza as an
                  automatic fallback. Lemmatization, POS tags, and dependency
                  arcs are extracted deterministically. No model hallucination
                  at this layer.
                </p>
              </li>
              <li>
                <p className="font-heading text-lg tracking-tight">
                  Strategist
                </p>
                <p className="mt-2 max-w-xl text-[15px] leading-7">
                  Language-specific post-processing. Turkish, German, Russian,
                  Italian, and Spanish each get rules for how they actually
                  build meaning. A one-size-fits-all engine is a mistake.
                </p>
              </li>
              <li>
                <p className="font-heading text-lg tracking-tight">
                  Tutor
                </p>
                <p className="mt-2 max-w-xl text-[15px] leading-7">
                  Only after structure is known does the AI explain it in
                  natural language, teaching from a structure that is already
                  on the page.
                </p>
              </li>
            </ol>
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="font-heading text-2xl tracking-tight">
              Built out from there
            </h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-7 text-foreground/85">
              <li>
                Interactive SVG dependency tree. Click a word for POS, lemma,
                case, tense, relation.
              </li>
              <li>
                Rule-based grammar error detection and CEFR difficulty scoring
                (A1–C2), both computed from the parsed structure.
              </li>
              <li>
                Sentence similarity via pgvector and sentence-transformers
                against the user&apos;s own history.
              </li>
              <li>Learn section: CEFR-organized grammar curriculum, A1–C2.</li>
              <li>
                A dual spaced-repetition system for vocabulary and grammar
                concepts, wrapped in streaks and achievements.
              </li>
              <li>
                Teacher suite: classes, live real-time quizzes, AI-graded
                writing prompts, a gradebook, and a per-student grammar
                readiness heat map.
              </li>
              <li>
                Sentence Remix: past tense, negative, plural, formal, passive,
                each re-parsed and diff-highlighted against the original.
              </li>
              <li>
                Paragraph mode, error-trend analytics, and AI study plans
                tracked against live mastery data.
              </li>
            </ul>
          </div>

          <div className="mt-16">
            <h2 className="font-heading text-2xl tracking-tight">
              Making the AI fast and dependable
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Eight generative services run through one Python LLM service
              with structured JSON outputs, OpenRouter as the primary provider
              and OpenAI as fallback. The engineering is in everything around
              the model call.
            </p>
            <div className="mt-8 grid max-w-2xl grid-cols-3 border-y border-border">
              {[
                ["9s → 4s", "full analysis"],
                ["300–500ms", "tree on screen"],
                ["3 tiers", "of caching"],
              ].map(([value, label]) => (
                <div key={label} className="border-r border-border py-4 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4">
                  <p className="font-heading text-2xl tracking-tight text-primary sm:text-3xl">
                    {value}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <ol className="mt-8 divide-y divide-border border-y border-border [&>li]:py-5">
              <li>
                <p className="font-heading text-lg tracking-tight">
                  Parallel inference
                </p>
                <p className="mt-2 max-w-xl text-[15px] leading-7">
                  Sequential parse plus LLM took nine seconds. Parsing, the
                  LLM explanation, and the embedding now run concurrently with
                  asyncio.gather over executor futures, about four seconds
                  wall-clock. If the LLM fails, the tree still returns.
                </p>
              </li>
              <li>
                <p className="font-heading text-lg tracking-tight">
                  Two-phase streaming
                </p>
                <p className="mt-2 max-w-xl text-[15px] leading-7">
                  A separate NLP-only endpoint puts the dependency tree on
                  screen in 300–500ms while the pedagogy panel fills in
                  behind a skeleton.
                </p>
              </li>
              <li>
                <p className="font-heading text-lg tracking-tight">
                  Cache before you call
                </p>
                <p className="mt-2 max-w-xl text-[15px] leading-7">
                  Analyses cache in Redis for 24 hours under SHA-256 keys.
                  Conjugation paradigms are generated once and persisted in
                  Postgres and Redis, so exploring a common verb assembles
                  sentences without calling a model at all.
                </p>
              </li>
              <li>
                <p className="font-heading text-lg tracking-tight">
                  Rules where rules win
                </p>
                <p className="mt-2 max-w-xl text-[15px] leading-7">
                  CEFR difficulty is scored from engineered features like tree
                  depth, subordination, and morphological complexity. Quizzes
                  are generated by rules behind a quality gate, and the LLM is
                  only a fallback. Only raw sentence text is sent to providers,
                  never account data.
                </p>
              </li>
            </ol>
          </div>
        </div>

        <aside className="space-y-10 lg:sticky lg:top-24">
          <div className="rail-panel">
            <p className="font-mono text-[12px] text-muted-foreground">
              Quick facts
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">Role</dt>
                <dd className="text-right text-foreground/85">
                  Sole developer
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">Timeline</dt>
                <dd className="text-right text-foreground/85">
                  2024–Present
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">Languages shipped</dt>
                <dd className="text-right text-foreground/85">
                  {grammarioLanguages.length}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">Method</dt>
                <dd className="text-right text-foreground/85">
                  Structural-first
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">Billing</dt>
                <dd className="text-right text-foreground/85">
                  Stripe, live
                </dd>
              </div>
            </dl>
            <a
              href="https://grammario.ai"
              className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full")}
            >
              Open grammario.ai
            </a>
          </div>

          <div className="rail-panel">
            <p className="font-mono text-[12px] text-muted-foreground">
              Stack
            </p>
            <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
              spaCy, Stanza, Universal Dependencies, sentence-transformers,
              Python 3.11, FastAPI, Pydantic v2, Next.js 16, React 19,
              TypeScript, Tailwind CSS v4, ReactFlow, Dagre, TanStack Query,
              Zustand, Supabase (Postgres, pgvector, Auth, Realtime), Redis 7,
              OpenRouter, OpenAI SDK, Stripe, Docker, Nginx, GitHub Actions,
              DigitalOcean, Vercel, Remotion.
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
