import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, FileCheck } from "lucide-react";
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

function Flagged({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-primary/15 px-0.5 text-primary underline decoration-primary/60 decoration-wavy underline-offset-[6px]">
      {children}
    </mark>
  );
}

export default function LocirosPage() {
  return (
    <article className="accent-teal">
      <PageHero
        eyebrow="Case study"
        title="Lociros"
        lead="Graded readers where A2 is actually A2. Ask a model for beginner text and it reaches for grammar a beginner has not met yet, so Lociros treats the CEFR level as a constraint it can check."
        links={
          <>
            <a href="https://lociros.com" className="hud-btn">
              lociros.com <span aria-hidden>↗</span>
            </a>
            <a href="https://github.com/mserdukoff/lociros" className="hud-btn border-border">
              Source <span aria-hidden>↗</span>
            </a>
            <Link href="/linguistics" className="hud-btn border-border">
              The linguistics
            </Link>
          </>
        }
        aside={
          <FactsPanel
            href="https://lociros.com"
            site="lociros.com"
            items={[
              ["Role", "Sole developer"],
              ["Timeline", "2026"],
              ["Languages", String(languages.length)],
              ["Levels", "A1–B2"],
              ["Method", "Checked generation"],
            ]}
          />
        }
      />

      <div className="wrap pb-20 pt-10">
        <Panel icon={FileCheck} title="Write A1 Japanese about a morning at the market">
          <ol className="divide-y divide-border">
            <li className="grid gap-3 p-4 sm:grid-cols-[6rem_minmax(0,1fr)] sm:p-6">
              <span className="font-mono text-[12px] text-muted-foreground">Draft</span>
              <div>
                <p lang="ja" className="text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.6] [word-break:auto-phrase]">
                  毎朝、市場に<Flagged>行って</Flagged>、魚を
                  <Flagged>買っています</Flagged>。
                </p>
                <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[12px]">
                  <span className="border border-primary/40 px-2 py-0.5 text-primary">ja:te_form (て)</span>
                  <span className="border border-primary/40 px-2 py-0.5 text-primary">ja:te_iru (て)</span>
                  <span className="text-muted-foreground">Fails A1</span>
                </p>
              </div>
            </li>
            <li className="grid gap-3 p-4 sm:grid-cols-[6rem_minmax(0,1fr)] sm:p-6">
              <span className="font-mono text-[12px] text-muted-foreground">Rewrite</span>
              <div>
                <p lang="ja" className="text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.6] [word-break:auto-phrase]">
                  毎朝、市場に行きます。そして、魚を買います。
                </p>
                <p className="mt-3 text-[13px] text-foreground/80">
                  Every morning I go to the market. Then I buy fish.
                </p>
                <p className="mt-2 font-mono text-[12px] text-signal">Passes A1, shelved</p>
              </div>
            </li>
          </ol>
        </Panel>

        <CaseLayout
          main={
            <>
              <CaseSection
                code="01"
                title="Every draft gets checked"
                lead="A validator decides what level a draft is, so the model never grades its own writing. The draft and rewrite above are real validator output: て-form and ている are both off the table at A1, and the polite present passes."
              >
                <ol className="mt-6 divide-y divide-border border-y border-border">
                  {pipeline.map(([step, detail], i) => (
                    <li key={step} className="grid gap-1 py-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
                      <span className="font-mono text-[12px]">
                        <span className="mr-2 text-primary">{String(i + 1).padStart(2, "0")}</span>
                        {step}
                      </span>
                      <span className="text-[13px] leading-6 text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ol>
              </CaseSection>

              <CaseSection
                code="02"
                title="One analyzer per language"
                lead="Each language drifts upward in its own way, so each gets its own analyzer and its own rules. CEFR levels live in hand-edited JSON per language, with allowed cases, tenses, and constructions and a cap on over-level words."
              >
                <ul className="mt-6 divide-y divide-border border-y border-border">
                  {languages.map((language) => (
                    <li
                      key={language.name}
                      className="grid gap-1 py-3.5 sm:grid-cols-[8rem_11rem_minmax(0,1fr)] sm:items-baseline sm:gap-4"
                    >
                      <span className="font-heading text-[16px]">{language.name}</span>
                      <span className="font-mono text-[12px] text-primary">{language.analyzer}</span>
                      <span className="text-[13px] text-muted-foreground">
                        {language.lang ? <span lang={language.lang}>{language.catches}</span> : language.catches}
                      </span>
                    </li>
                  ))}
                </ul>
              </CaseSection>

              <CaseSection
                code="03"
                title="Every word arrives analyzed"
                lead="The reader is built on the same analysis the validator used. Tap a word for its lemma, level, grammar, and gloss. Japanese words break into kanji, with each reading aligned to its character, and Arabic words show their root and verb form."
              >
                <Panel icon={BookOpen} title="Word gloss" className="mt-6">
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <ruby lang="ja" className="text-4xl">
                        市場<rt className="text-[12px] text-muted-foreground">しじょう</rt>
                      </ruby>
                      <span className="text-[16px]">market</span>
                      <span className="font-mono text-[12px] text-muted-foreground">noun / A2</span>
                    </div>
                    <ul className="mt-5 divide-y divide-border border-t border-border">
                      {kanji.map((item) => (
                        <li key={item.char} className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-3 py-3">
                          <span lang="ja" className="text-3xl text-primary">{item.char}</span>
                          <span className="text-[13px] leading-6">
                            <span lang="ja">{item.reading}</span>, {item.meaning}
                            <span className="block font-mono text-[11px] text-muted-foreground">
                              {item.strokes} strokes / JLPT {item.jlpt}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Panel>
                <p className="mt-3 max-w-[72ch] text-[13px] leading-6 text-muted-foreground">
                  Kanji details come from a bundled KANJIDIC2 lexicon of about
                  13,100 characters. Stroke order animates from KanjiVG when the
                  gloss opens.
                </p>
              </CaseSection>

              <CaseSection code="04" title="A level that follows the reader">
                <Rows items={learner} />
              </CaseSection>

              <CaseSection
                code="05"
                title="Slow on purpose, safe to run"
                lead="Writing, analyzing, maybe rewriting, and translating a passage takes 20 to 40 seconds, so generation runs as a background job the client polls instead of a request that holds a connection open."
              >
                <Points
                  items={[
                    "The pytest suites never call the LLM. Validators are tested on fixed sentences: て-form fails A1 and passes A2, congiuntivo fails B1 and passes B2.",
                    "Guests get a device id, a placement read, and one passage. Signing up moves that progress onto a Supabase account.",
                    "FastAPI runs as two replicas behind nginx, deployed with a rolling restart and a one-command rollback. The Next.js frontend and admin app are on Vercel.",
                    "Generation is capped per account each month and rate limited per caller and per IP.",
                  ]}
                />
              </CaseSection>
            </>
          }
          rail={
            <StackPanel>
              Next.js 16, React 19, FastAPI, SQLAlchemy, Alembic, Supabase
              (Postgres, Auth), Sudachi, CAMeL Tools, spaCy, razdel, pymorphy3,
              KANJIDIC2, KanjiVG, OpenRouter, Stripe, Redis, Docker, nginx,
              AWS Lightsail, Vercel.
            </StackPanel>
          }
        />
      </div>
    </article>
  );
}
