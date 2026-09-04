import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ParseTree } from "@/components/parse-tree";
import { grammarioLanguages } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Grammario",
  description:
    "Grammar visualization tool that renders syntactic dependency trees. Structure first, explanation second.",
};

export default function GrammarioPage() {
  return (
    <article className="py-16 sm:py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        Case study · 2024 — Present · Sole developer
      </p>
      <h1 className="mt-4 font-heading text-[clamp(2.1rem,4.5vw,3rem)] leading-[0.98] tracking-[-0.04em]">
        Grammario
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        Grammar you can see, not just memorize. Universal Dependencies for the
        hard truth. AI for the teaching.
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

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary opacity-[0.1] blur-3xl"
        />
        <div className="mt-12 rounded-2xl border border-border bg-card px-4 py-6 sm:px-8 sm:py-8">
          <p className="font-heading text-xl italic sm:text-2xl">
            L&apos;ho fatta parlare in italiano.
          </p>
          <div className="mt-6">
            <ParseTree />
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
        <div className="min-w-0">
          <div className="max-w-2xl space-y-5 text-[16px] leading-8 text-foreground/85">
            <p>
              Language learning is a core hobby. Across Duolingo, LingQ,
              textbooks, and tutors, grammar was always explained as rules to
              memorize, not structures to see. When I analyzed a sentence in
              my head, I was drawing relationships. No tool reflected that.
            </p>
            <p>
              That Italian sentence is the drawing I wanted inspectable:
              pronoun, auxiliary, agreeing past participle, infinitive,
              preposition, noun.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="font-heading text-2xl tracking-tight">
              Structural-First Analysis
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Earlier versions asked an LLM to identify grammar. Output was
              fluent and hallucinatory. I rebuilt the engine in December 2025.
            </p>
            <ol className="mt-8 space-y-6 border-l border-border pl-6">
              <li>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  01 · Analyst
                </p>
                <p className="mt-2 max-w-xl text-[15px] leading-7">
                  spaCy parses via Universal Dependencies, with Stanza as an
                  automatic fallback. Lemmatization, POS tags, and dependency
                  arcs are extracted deterministically. No model hallucination
                  at this layer.
                </p>
              </li>
              <li>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  02 · Strategist
                </p>
                <p className="mt-2 max-w-xl text-[15px] leading-7">
                  Language-specific post-processing. Languages are not the
                  same. A one-size-fits-all engine is a mistake.
                </p>
              </li>
              <li>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  03 · Tutor
                </p>
                <p className="mt-2 max-w-xl text-[15px] leading-7">
                  Only after structure is known does the AI explain it in
                  natural language. It does not find the grammar. It teaches
                  from the open book.
                </p>
              </li>
            </ol>
          </div>

          <div className="mt-16">
            <h2 className="font-heading text-2xl tracking-tight">
              Six languages shipped
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Each language gets its own Strategist pass, not a shared
              template — agglutinative and fusional languages don&apos;t
              break down the same way.
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {grammarioLanguages.map((language) => (
                <li
                  key={language.code}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-heading text-xl">
                    <span className="mr-3 font-mono text-[11px] text-muted-foreground">
                      {language.code}
                    </span>
                    {language.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {language.note}
                  </span>
                </li>
              ))}
            </ul>
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
                (A1–C2), both computed from the parsed structure, not guessed
                by a model.
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
                Teacher suite: classes, live real-time quizzes, and a
                per-student grammar readiness heat map.
              </li>
            </ul>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24">
          <div className="rail-panel">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
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
                  2024 — Present
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
            </dl>
            <a
              href="https://grammario.ai"
              className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full")}
            >
              Open grammario.ai
            </a>
          </div>

          <div className="rail-panel">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Stack
            </p>
            <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
              spaCy, Stanza, Universal Dependencies, custom suffix extractor,
              Python, FastAPI, Pydantic, React, Next.js, TypeScript, Tailwind,
              Supabase, PostgreSQL, pgvector, Redis, Stripe, Docker, Vercel,
              Railway, OpenAI API, sentence-transformers.
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
