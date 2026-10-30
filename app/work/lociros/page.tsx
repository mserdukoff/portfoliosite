import type { Metadata } from "next";
import { CaseCrumb } from "@/components/case-crumb";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Lociros",
  description:
    "Engineering case study: graded readers in Japanese, Arabic, Italian, and Russian where an LLM drafts each passage and a morphological analyzer checks every word against CEFR rules before anyone reads it.",
};

const pipeline = [
  ["Constrain", "The prompt carries the level's grammar rules and every word allowed at or below it."],
  ["Analyze", "The draft is tokenized by a real analyzer for its language: lemma, part of speech, inflection, reading."],
  ["Validate", "Rules in JSON score over-level words and forbidden constructions. Nothing is taken on the model's word."],
  ["Rewrite", "A failing draft goes back with its flags, at a lower temperature. The less severe attempt is kept."],
  ["Quarantine", "A draft that still fails is stored for review and never reaches the shelf."],
] as const;

const languages = [
  { name: "Japanese", analyzer: "Sudachi", catches: "て-form, ている, relative clauses, keigo" },
  { name: "Arabic", analyzer: "CAMeL Tools", catches: "past tense, إنّ, derived Forms II–X, the passive", lang: "ar" },
  { name: "Italian", analyzer: "spaCy", catches: "congiuntivo, gerundio, passato remoto" },
  { name: "Russian", analyzer: "razdel + pymorphy3", catches: "extra cases, participles, бы, который-clauses" },
];

const kanji = [
  { char: "市", reading: "し", meaning: "market, city, town", strokes: 5, jlpt: "N3" },
  { char: "場", reading: "じょう", meaning: "location, place", strokes: 12, jlpt: "N4" },
];

const learner = [
  {
    title: "Placement by reading",
    body: "One short passage per band from A1, four questions each, climbing while the reader gets three of four right. After 30 days away, the shelf offers the ladder again from the old band.",
  },
  {
    title: "Ratings that move slowly",
    body: "Three too-easy or too-hard ratings in a row move placement one CEFR step. Just right clears the streak, so one bad day does not reshuffle the shelf.",
  },
  {
    title: "New versus known",
    body: "Every card on the shelf counts content words you have already met against new ones, by token, so a recycled word that shows up three times counts three times.",
  },
  {
    title: "What to read next",
    body: "Unread, calibration-passed passages at your level first, then one up, then one down. Texts that reuse words you tapped for a gloss rank higher.",
  },
];

function Section({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <h2 className="font-heading text-2xl tracking-tight">{title}</h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-7 text-foreground/85">
        {lead}
      </p>
      {children}
    </section>
  );
}

function Flagged({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-[2px] bg-primary/15 px-0.5 text-primary underline decoration-primary/60 decoration-wavy underline-offset-[6px]">
      {children}
    </mark>
  );
}

export default function LocirosPage() {
  return (
    <article className="page pb-8 pt-6 sm:pt-10">
      <CaseCrumb />
      <h1 className="font-heading text-[clamp(3rem,7.5vw,6rem)] font-normal leading-[0.92] tracking-[-0.025em]">
        Lociros
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        Graded readers where A2 is actually A2. Ask a model for beginner text
        and it reaches for grammar a beginner has not met yet, so Lociros
        treats the CEFR level as a constraint it can check.
      </p>
      <div className="mt-6 flex flex-wrap gap-4 font-mono text-[12px]">
        <a
          href="https://lociros.com"
          className="text-foreground underline-offset-4 hover:underline"
        >
          lociros.com
        </a>
        <a
          href="https://github.com/mserdukoff/lociros"
          className="text-muted-foreground underline-offset-4 hover:underline"
        >
          Source
        </a>
      </div>

      <div className="theme-lociros mt-12 overflow-hidden rounded-sm border border-border bg-card text-foreground">
        <p className="px-4 pt-6 font-heading text-xl sm:px-8 sm:pt-8 sm:text-2xl">
          Write A1 Japanese about a morning at the market.
        </p>
        <ol className="mt-6 divide-y divide-border border-t border-border">
          <li className="grid gap-4 px-4 py-6 sm:grid-cols-[6rem_minmax(0,1fr)] sm:px-8">
            <span className="font-mono text-[12px] text-muted-foreground">
              Draft
            </span>
            <div>
              <p lang="ja" className="text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.6] [word-break:auto-phrase]">
                毎朝、市場に<Flagged>行って</Flagged>、魚を
                <Flagged>買っています</Flagged>。
              </p>
              <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[12px]">
                <span className="rounded-sm border border-primary/40 px-2 py-0.5 text-primary">
                  ja:te_form (て)
                </span>
                <span className="rounded-sm border border-primary/40 px-2 py-0.5 text-primary">
                  ja:te_iru (て)
                </span>
                <span className="text-muted-foreground">Fails A1</span>
              </p>
            </div>
          </li>
          <li className="grid gap-4 px-4 py-6 sm:grid-cols-[6rem_minmax(0,1fr)] sm:px-8">
            <span className="font-mono text-[12px] text-muted-foreground">
              Rewrite
            </span>
            <div>
              <p lang="ja" className="text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.6] [word-break:auto-phrase]">
                毎朝、市場に行きます。そして、魚を買います。
              </p>
              <p className="mt-3 text-sm text-foreground/80">
                Every morning I go to the market. Then I buy fish.
              </p>
              <p className="mt-2 font-mono text-[12px] text-primary">
                Passes A1, shelved
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div className="mt-4 grid gap-16 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
        <div className="min-w-0">
          <Section
            title="Checked, not asked"
            lead="The model writes. It does not get to decide what level it wrote. The draft and rewrite above are real validator output: て-form and ている are both off the table at A1, and the polite present passes."
          >
            <ol className="mt-6 max-w-2xl divide-y divide-border border-y border-border">
              {pipeline.map(([step, detail], i) => (
                <li
                  key={step}
                  className="grid gap-1 py-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4"
                >
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
          </Section>

          <Section
            title="One analyzer per language"
            lead="Each language drifts upward in its own way, so each gets its own analyzer and its own rules. CEFR levels live in hand-edited JSON per language, with allowed cases, tenses, and constructions and a cap on over-level words."
          >
            <ul className="mt-6 max-w-2xl divide-y divide-border border-y border-border">
              {languages.map((language) => (
                <li
                  key={language.name}
                  className="grid gap-1 py-4 sm:grid-cols-[8rem_10rem_minmax(0,1fr)] sm:items-baseline sm:gap-4"
                >
                  <span className="font-heading text-xl">{language.name}</span>
                  <span className="font-mono text-[12px] text-foreground/85">
                    {language.analyzer}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {language.lang ? (
                      <span lang={language.lang}>{language.catches}</span>
                    ) : (
                      language.catches
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            title="Every word arrives analyzed"
            lead="The reader is built on the same analysis the validator used. Tap a word for its lemma, level, grammar, and gloss. Japanese words break into kanji, with each reading aligned to its character, and Arabic words show their root and verb form."
          >
            <div className="theme-lociros mt-6 max-w-2xl rounded-sm border border-border bg-card px-4 py-5 text-foreground sm:px-6">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <ruby lang="ja" className="font-heading text-4xl">
                  市場<rt className="text-[12px] text-muted-foreground">しじょう</rt>
                </ruby>
                <span className="text-lg">market</span>
                <span className="font-mono text-[12px] text-muted-foreground">
                  noun / A2
                </span>
              </div>
              <ul className="mt-5 divide-y divide-border border-t border-border">
                {kanji.map((item) => (
                  <li
                    key={item.char}
                    className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-3 py-3"
                  >
                    <span lang="ja" className="font-heading text-3xl text-primary">
                      {item.char}
                    </span>
                    <span className="text-sm leading-6">
                      <span lang="ja">{item.reading}</span>, {item.meaning}
                      <span className="block font-mono text-[11px] text-muted-foreground">
                        {item.strokes} strokes / JLPT {item.jlpt}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-muted-foreground">
              Kanji details come from a bundled KANJIDIC2 lexicon of about
              13,100 characters. Stroke order animates from KanjiVG when the
              gloss opens.
            </p>
          </Section>

          <section className="mt-16">
            <h2 className="font-heading text-2xl tracking-tight">
              A level that follows the reader
            </h2>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {learner.map((item) => (
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

          <Section
            title="Slow on purpose, safe to run"
            lead="Writing, analyzing, maybe rewriting, and translating a passage takes 20 to 40 seconds, so generation runs as a background job the client polls instead of a request that holds a connection open."
          >
            <ul className="mt-5 max-w-2xl space-y-2.5 text-[15px] leading-7 text-foreground/80">
              {[
                "The pytest suites never call the LLM. Validators are tested on fixed sentences: て-form fails A1 and passes A2, congiuntivo fails B1 and passes B2.",
                "Guests get a device id, a placement read, and one passage. Signing up moves that progress onto a Supabase account.",
                "FastAPI runs as two replicas behind nginx, deployed with a rolling restart and a one-command rollback. The Next.js frontend and admin app are on Vercel.",
                "Generation is capped per account each month and rate limited per caller and per IP.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-[0.8rem] h-px w-3 shrink-0 bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <aside className="space-y-10 lg:sticky lg:top-24 lg:mt-16">
          <div className="rail-panel">
            <p className="font-mono text-[12px] text-muted-foreground">
              Quick facts
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Role", "Sole developer"],
                ["Timeline", "2026"],
                ["Languages", String(languages.length)],
                ["Levels", "A1–B2"],
                ["Method", "Checked generation"],
              ].map(([term, value]) => (
                <div key={term} className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted-foreground">{term}</dt>
                  <dd className="text-right text-foreground/85">{value}</dd>
                </div>
              ))}
            </dl>
            <a
              href="https://lociros.com"
              className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full")}
            >
              Open lociros.com
            </a>
          </div>

          <div className="rail-panel">
            <p className="font-mono text-[12px] text-muted-foreground">Stack</p>
            <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
              Next.js 16, React 19, FastAPI, SQLAlchemy, Alembic, Supabase
              (Postgres, Auth), Sudachi, CAMeL Tools, spaCy, razdel, pymorphy3,
              KANJIDIC2, KanjiVG, OpenRouter, Stripe, Redis, Docker, nginx,
              AWS Lightsail, Vercel.
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
