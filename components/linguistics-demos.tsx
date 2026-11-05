"use client";

import { useState } from "react";
import { ParseTree, type Parse } from "@/components/parse-tree";
import { cn } from "@/lib/utils";

function Choices<T extends string>({
  label,
  options,
  value,
  onChange,
  lang,
}: {
  label: string;
  options: readonly { id: T; text: string }[];
  value: T;
  onChange: (id: T) => void;
  lang?: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2 font-mono text-[12px]">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          lang={lang}
          aria-pressed={option.id === value}
          onClick={() => onChange(option.id)}
          className={cn(
            "cursor-pointer border px-3 py-1.5 transition-colors",
            option.id === value
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-foreground/80 hover:border-foreground hover:text-foreground"
          )}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}

/* Syntax: one set of relations, whatever the word order or language. */

const parses = {
  ru: {
    label: "Dependency tree for the Russian sentence Я читаю книгу",
    lang: "ru",
    head: 1,
    tokens: [
      { id: "ya", text: "Я", pos: "PRON · nsubj", note: "Case=Nom, Person=1. The nominative marks the subject." },
      { id: "chitayu", text: "читаю", pos: "VERB · root", note: "Lemma читать. Aspect=Imp, Tense=Pres, Person=1." },
      { id: "knigu", text: "книгу", pos: "NOUN · obj", note: "Lemma книга. Case=Acc, Gender=Fem. The ending -у marks the object." },
    ],
    arcs: [
      { from: 0, to: 1, label: "nsubj" },
      { from: 2, to: 1, label: "obj" },
    ],
  },
  "ru-ovs": {
    label: "Dependency tree for the Russian sentence Книгу читаю я",
    lang: "ru",
    head: 1,
    tokens: [
      { id: "knigu", text: "Книгу", pos: "NOUN · obj", note: "Still the object. The accusative ending, not the position, says so." },
      { id: "chitayu", text: "читаю", pos: "VERB · root", note: "Lemma читать. Aspect=Imp, Tense=Pres, Person=1." },
      { id: "ya", text: "я", pos: "PRON · nsubj", note: "Still the subject, now at the end for emphasis: it is I who reads it." },
    ],
    arcs: [
      { from: 0, to: 1, label: "obj" },
      { from: 2, to: 1, label: "nsubj" },
    ],
  },
  it: {
    label: "Dependency tree for the Italian sentence Io leggo un libro",
    lang: "it",
    head: 1,
    tokens: [
      { id: "io", text: "Io", pos: "PRON · nsubj", note: "Person=1. Italian usually drops it, since leggo already says who." },
      { id: "leggo", text: "leggo", pos: "VERB · root", note: "Lemma leggere. Mood=Ind, Tense=Pres, Person=1." },
      { id: "un", text: "un", pos: "DET · det", note: "Indefinite article. Russian has no articles, so this relation has no match there." },
      { id: "libro", text: "libro", pos: "NOUN · obj", note: "Gender=Masc. Italian marks the object by position, not by an ending." },
    ],
    arcs: [
      { from: 0, to: 1, label: "nsubj" },
      { from: 2, to: 3, label: "det" },
      { from: 3, to: 1, label: "obj" },
    ],
  },
} satisfies Record<string, Parse>;

type ParseId = keyof typeof parses;

const parseOptions: { id: ParseId; text: string }[] = [
  { id: "ru", text: "Я читаю книгу" },
  { id: "ru-ovs", text: "Книгу читаю я" },
  { id: "it", text: "Io leggo un libro" },
];

export function DependencyDemo() {
  const [id, setId] = useState<ParseId>("ru");
  return (
    <div>
      <Choices label="Sentence" options={parseOptions} value={id} onChange={setId} />
      <ParseTree key={id} parse={parses[id]} className="mt-6" />
    </div>
  );
}

/* Agreement: change the subject and every ending that agrees changes too. */

type Piece = { stem: string; end?: string };

const italianSubjects = [
  { id: "ms", text: "mio fratello", gloss: "masculine singular", words: [{ stem: "mi", end: "o" }, { stem: "fratell", end: "o" }, { stem: "è" }, { stem: "andat", end: "o" }] },
  { id: "fs", text: "mia sorella", gloss: "feminine singular", words: [{ stem: "mi", end: "a" }, { stem: "sorell", end: "a" }, { stem: "è" }, { stem: "andat", end: "a" }] },
  { id: "mp", text: "i miei fratelli", gloss: "masculine plural", words: [{ stem: "i" }, { stem: "mie", end: "i" }, { stem: "fratell", end: "i" }, { stem: "sono" }, { stem: "andat", end: "i" }] },
  { id: "fp", text: "le mie sorelle", gloss: "feminine plural", words: [{ stem: "le" }, { stem: "mi", end: "e" }, { stem: "sorell", end: "e" }, { stem: "sono" }, { stem: "andat", end: "e" }] },
] as const satisfies readonly { id: string; text: string; gloss: string; words: readonly Piece[] }[];

const germanVerbs = [
  { id: "sehen", text: "sehen", gloss: "to see", verb: "sehe", article: "den", noun: { stem: "Mann" }, kase: "accusative" },
  { id: "helfen", text: "helfen", gloss: "to help", verb: "helfe", article: "dem", noun: { stem: "Mann" }, kase: "dative" },
  { id: "gedenken", text: "gedenken", gloss: "to remember, honor", verb: "gedenke", article: "des", noun: { stem: "Mann", end: "es" }, kase: "genitive" },
] as const satisfies readonly { id: string; text: string; gloss: string; verb: string; article: string; noun: Piece; kase: string }[];

function Sentence({ lang, words }: { lang: string; words: readonly Piece[] }) {
  return (
    <p lang={lang} className="font-heading text-[clamp(1.5rem,3.4vw,2.25rem)] leading-tight">
      {words.map((word, i) => (
        <span key={`${word.stem}-${i}`}>
          {i ? " " : null}
          {word.stem}
          {word.end ? <span className="text-primary underline decoration-primary/50 underline-offset-[6px]">{word.end}</span> : null}
        </span>
      ))}
    </p>
  );
}

export function AgreementDemo() {
  const [subject, setSubject] = useState<(typeof italianSubjects)[number]["id"]>("fs");
  const [verb, setVerb] = useState<(typeof germanVerbs)[number]["id"]>("helfen");
  const it = italianSubjects.find((item) => item.id === subject) ?? italianSubjects[0];
  const de = germanVerbs.find((item) => item.id === verb) ?? germanVerbs[0];

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
      <div>
        <p className="font-mono text-[11px] text-muted-foreground">Italian: pick the subject</p>
        <div className="mt-3">
          <Choices label="Italian subject" lang="it" options={italianSubjects} value={subject} onChange={setSubject} />
        </div>
        <div className="mt-6 border-t border-border pt-4">
          <Sentence lang="it" words={it.words} />
          <p className="mt-2 font-mono text-[11px] leading-5 text-muted-foreground">
            {it.gloss}: the possessive, the noun, and the participle all take the same ending
          </p>
        </div>
      </div>
      <div>
        <p className="font-mono text-[11px] text-muted-foreground">German: pick the verb</p>
        <div className="mt-3">
          <Choices label="German verb" lang="de" options={germanVerbs} value={verb} onChange={setVerb} />
        </div>
        <div className="mt-6 border-t border-border pt-4">
          <Sentence
            lang="de"
            words={[{ stem: "Ich" }, { stem: de.verb }, { stem: "", end: de.article }, de.noun]}
          />
          <p className="mt-2 font-mono text-[11px] leading-5 text-muted-foreground">
            {de.text} ({de.gloss}) takes the {de.kase}, so the article becomes {de.article}
            {"end" in de.noun ? " and the noun takes -es" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

/* Writing systems: the same kanji, read differently in each word. */

type Segment = { text: string; reading?: string; target?: boolean };

const readings = [
  { id: "sensei", text: "先生", meaning: "teacher", reading: "せい", segments: [{ text: "先", reading: "せん" }, { text: "生", reading: "せい", target: true }] },
  { id: "umareru", text: "生まれる", meaning: "to be born", reading: "う", segments: [{ text: "生", reading: "う", target: true }, { text: "まれる" }] },
  { id: "ikiru", text: "生きる", meaning: "to live", reading: "い", segments: [{ text: "生", reading: "い", target: true }, { text: "きる" }] },
  { id: "nama", text: "生ビール", meaning: "draft beer", reading: "なま", segments: [{ text: "生", reading: "なま", target: true }, { text: "ビール" }] },
] as const satisfies readonly { id: string; text: string; meaning: string; reading: string; segments: readonly Segment[] }[];

export function KanjiDemo() {
  const [id, setId] = useState<(typeof readings)[number]["id"]>("sensei");
  const word = readings.find((item) => item.id === id) ?? readings[0];

  return (
    <div>
      <Choices label="Word" lang="ja" options={readings} value={id} onChange={setId} />
      <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4 border-t border-border pt-6">
        <p lang="ja" className="text-[clamp(2.5rem,6vw,3.75rem)] leading-none">
          {word.segments.map((segment: Segment) =>
            segment.reading ? (
              <ruby key={segment.text} className={segment.target ? "text-primary" : undefined}>
                {segment.text}
                <rt className={cn("text-[0.3em]", segment.target ? "text-primary" : "text-muted-foreground")}>
                  {segment.reading}
                </rt>
              </ruby>
            ) : (
              <span key={segment.text}>{segment.text}</span>
            )
          )}
        </p>
        <p className="pb-1 font-mono text-[12px] leading-5 text-muted-foreground">
          {word.meaning}
          <span className="block">
            生 is read <span lang="ja" className="text-primary">{word.reading}</span> here
          </span>
        </p>
      </div>
    </div>
  );
}

/* Graded input: the validator's verdict on a real draft and its rewrite. */

const drafts = [
  {
    id: "draft",
    text: "Draft",
    words: [{ stem: "毎朝、市場に" }, { stem: "", end: "行って" }, { stem: "、魚を" }, { stem: "", end: "買っています" }, { stem: "。" }],
    flags: ["ja:te_form (て)", "ja:te_iru (て)"],
    verdict: "Fails A1, sent back for a rewrite",
    pass: false,
  },
  {
    id: "rewrite",
    text: "Rewrite",
    words: [{ stem: "毎朝、市場に行きます。そして、魚を買います。" }],
    flags: [],
    verdict: "Passes A1, shelved",
    pass: true,
  },
] as const satisfies readonly { id: string; text: string; words: readonly Piece[]; flags: readonly string[]; verdict: string; pass: boolean }[];

export function ValidatorDemo() {
  const [id, setId] = useState<(typeof drafts)[number]["id"]>("draft");
  const draft = drafts.find((item) => item.id === id) ?? drafts[0];

  return (
    <div>
      <p className="font-mono text-[11px] text-muted-foreground">Prompt: write A1 Japanese about a morning at the market</p>
      <div className="mt-3">
        <Choices label="Version" options={drafts} value={id} onChange={setId} />
      </div>
      <div className="mt-6 border-t border-border pt-5">
        <p lang="ja" className="text-[clamp(1.375rem,3.4vw,2rem)] leading-[1.6] [word-break:auto-phrase]">
          {draft.words.map((word: Piece, i) => (
            <span key={i}>
              {word.stem}
              {word.end ? (
                <mark className="bg-primary/15 px-0.5 text-primary underline decoration-primary/60 decoration-wavy underline-offset-[6px]">
                  {word.end}
                </mark>
              ) : null}
            </span>
          ))}
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[12px]">
          {draft.flags.map((flag: string) => (
            <span key={flag} className="border border-primary/40 px-2 py-0.5 text-primary">
              {flag}
            </span>
          ))}
          <span className={draft.pass ? "text-signal" : "text-muted-foreground"}>{draft.verdict}</span>
        </p>
        {draft.pass ? (
          <p className="mt-2 text-[13px] text-foreground/80">Every morning I go to the market. Then I buy fish.</p>
        ) : null}
      </div>
    </div>
  );
}
