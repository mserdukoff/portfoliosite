import Link from "next/link";
import { FlowField } from "@/components/flow-field";
import { Specimen } from "@/components/home/specimen";
import { LocalClock } from "@/components/local-clock";
import { NameDecode } from "@/components/name-decode";
import { Ruler } from "@/components/page-hero";
import { languages, nav, projects } from "@/lib/site";
import { cn } from "@/lib/utils";

const inlineLink =
  "text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-primary";

const panelTaglines: Record<string, string> = {
  wheelbase: "Auction intelligence for dealers",
  lociros: "Graded readers, checked by analyzers",
  grammario: "Grammar analysis, six languages",
};

const languageCodes: Record<string, string> = {
  English: "EN",
  Russian: "RU",
  Italian: "IT",
  Turkish: "TR",
  German: "DE",
  Hebrew: "HE",
  Japanese: "JA",
};

function PanelHead({ code, title }: { code: string; title: string }) {
  return (
    <h3 className="panel-head">
      <span>
        [{code}] {title}
      </span>
      <span aria-hidden className="text-muted-foreground">
        →
      </span>
    </h3>
  );
}

function DependencySpecimen() {
  return (
    <svg
      viewBox="0 0 200 110"
      aria-hidden
      className="block h-[6.875rem] w-full border-t border-border font-mono"
    >
      <g fill="none" stroke="var(--teal)" strokeWidth="0.8">
        <path d="M100 74 C100 34, 44 34, 44 74" />
        <path d="M100 74 C100 34, 158 34, 158 74" />
      </g>
      <path d="M100 20 V70" stroke="var(--orange)" strokeWidth="0.8" />
      <g fontSize="7.5" textAnchor="middle" fill="var(--muted-foreground)">
        <text x="100" y="15" fill="var(--orange)">root</text>
        <text x="68" y="33">nsubj</text>
        <text x="130" y="33">obj</text>
      </g>
      <g fontSize="12" textAnchor="middle" fill="var(--foreground)">
        <text x="44" y="90">Я</text>
        <text x="100" y="90">читаю</text>
        <text x="158" y="90">книгу</text>
      </g>
      <g fontSize="6.5" textAnchor="middle" fill="var(--muted-foreground)">
        <text x="44" y="102">PRON</text>
        <text x="100" y="102">VERB</text>
        <text x="158" y="102">NOUN.Acc</text>
      </g>
    </svg>
  );
}

function ScriptSpecimen() {
  return (
    <div
      aria-hidden
      className="flex h-[6.875rem] flex-col justify-center gap-0.5 overflow-hidden border-t border-border bg-[#d9d6cf] px-2.5 text-[#1b1a17]"
    >
      <span
        lang="ar"
        dir="rtl"
        className="whitespace-nowrap text-[15px] leading-6"
        style={{ fontFamily: "var(--font-noto-arabic)" }}
      >
        اللغة والمعنى والكتابة
      </span>
      <span lang="ru" className="whitespace-nowrap font-[family-name:var(--font-plex-mono)] text-[13px]">
        язык и смысл
      </span>
      <span
        lang="ja"
        className="whitespace-nowrap text-[14px]"
        style={{ fontFamily: "var(--font-noto-jp)" }}
      >
        言葉の形と意味
      </span>
      <span lang="it" className="whitespace-nowrap font-[family-name:var(--font-newsreader)] text-[15px] italic">
        lingua e significato
      </span>
    </div>
  );
}

function StatusRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt>{label}</dt>
      <dd className="flex items-center gap-2 text-right text-muted-foreground">{children}</dd>
    </div>
  );
}

const crosshairs = [
  "left-[32%] top-[23%]",
  "left-[79%] top-[11%]",
  "left-[45%] top-[61%]",
  "left-[31%] top-[80%]",
];

export function Hero() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section id="top" className="relative overflow-hidden bg-background">
      <FlowField preset="neon" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(3_6_10/0.78),transparent_16%),linear-gradient(to_right,rgb(3_6_10/0.72),rgb(3_6_10/0.32)_34%,transparent_52%)] max-lg:bg-[linear-gradient(to_bottom,rgb(3_6_10/0.78),rgb(3_6_10/0.5)_40%,rgb(3_6_10/0.3))]"
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {crosshairs.map((position) => (
          <span key={position} className={cn("absolute size-7 text-foreground/45", position)}>
            <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
            <span className="absolute inset-y-0 left-1/2 w-px bg-current" />
            <span className="absolute inset-1.5 border border-current" />
          </span>
        ))}
      </div>

      <div className="wrap relative flex min-h-[min(100dvh,60rem)] flex-col pb-5 pt-[calc(var(--bar-h)+1.5rem)]">
        <div className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div>
            <p className="font-mono text-[12px] text-muted-foreground">
              {"// Software · AI · Languages"}
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-plex-mono)] text-[clamp(2.75rem,6.4vw,5.25rem)] font-normal leading-none tracking-[-0.01em] [text-shadow:0_0_24px_rgb(3_6_10/0.9)]">
              <NameDecode />
            </h1>
            <p className="mt-6 max-w-[42ch] text-[14px] leading-[1.7] text-[#c7d2d9] [text-shadow:0_0_12px_#03060a,0_0_4px_#03060a]">
              I build production AI systems that hold up under real use:
              retrieval pipelines, LLM features with guardrails, and the
              full-stack products around them.
            </p>
            <p className="mt-3 max-w-[42ch] text-[14px] leading-[1.7] text-muted-foreground [text-shadow:0_0_12px_#03060a,0_0_4px_#03060a]">
              AI Engineer / Full-Stack Developer at Hime, building{" "}
              <Link href="/work/wheelbase" className={inlineLink}>Wheelbase</Link>.
              Creator of{" "}
              <Link href="/work/grammario" className={inlineLink}>Grammario</Link> and{" "}
              <Link href="/work/lociros" className={inlineLink}>Lociros</Link>.
              Contributor to{" "}
              <Link href="/projects#open-source" className={inlineLink}>pandas</Link>.
            </p>
            <ul className="mt-8 hidden max-w-60 gap-1 font-mono text-[13px] lg:grid">
              {nav.map((item, i) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex gap-[1.125rem] border px-2.5 py-[0.4375rem] transition-colors hover:border-foreground",
                      i === 0 ? "border-foreground bg-background/55" : "border-transparent"
                    )}
                  >
                    <span className="text-muted-foreground">
                      {i === 0 ? <span className="text-foreground">▸ </span> : null}
                      {item.code}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            <Link href="/work/lociros" className="panel">
              <PanelHead code="A" title="Linguistics" />
              <ScriptSpecimen />
            </Link>
            <Link href="/work#skills" className="panel">
              <PanelHead code="B" title="Model" />
              <Specimen kind="terrain" />
            </Link>
            <Link href="/work/grammario" className="panel">
              <PanelHead code="C" title="Parse" />
              <DependencySpecimen />
            </Link>
            <Link href="/work/wheelbase" className="panel">
              <PanelHead code="D" title="Retrieval" />
              <Specimen kind="retrieval" />
            </Link>
            <Link href="/projects#global-terrorism-visualization" className="panel">
              <PanelHead code="E" title="Data" />
              <Specimen kind="world" />
            </Link>
            <Link href="/contact" className="panel">
              <PanelHead code="F" title="Status" />
              <dl className="grid gap-[0.4375rem] border-t border-border px-2.5 py-2 font-mono text-[11px]">
                <StatusRow label="Roles">
                  Open
                  <span aria-hidden className="size-[7px] bg-signal" />
                </StatusRow>
                <StatusRow label="Scope">Boston / remote</StatusRow>
                <StatusRow label="Auth">US citizen</StatusRow>
                <StatusRow label="Local">
                  <LocalClock />
                </StatusRow>
              </dl>
            </Link>
            <div className="panel col-span-2 flex flex-col">
              <Link href="/work" className="block">
                <PanelHead code="G" title="Projects" />
              </Link>
              <ul className="flex flex-1 flex-col justify-center border-t border-border px-2.5 py-1 font-mono text-[12px]">
                {featured.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={project.caseStudy ?? "/work"}
                      className="grid grid-cols-[6.25rem_minmax(0,1fr)_auto] gap-2.5 border-b border-dashed border-border/40 py-1.5 last:border-b-0 hover:text-primary"
                    >
                      <b className="font-medium">{project.title}</b>
                      <span className="truncate text-[#b9c6ce]">{panelTaglines[project.slug]}</span>
                      <span aria-hidden className="hidden text-muted-foreground sm:block">[→]</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/about#languages" className="panel col-span-2 md:col-span-1">
              <PanelHead code="H" title="Languages" />
              <ul className="grid gap-[3px] border-t border-border px-2.5 py-2.5 font-mono text-[10px] text-muted-foreground">
                {languages.map((language) => (
                  <li key={language.name} className="grid grid-cols-[1.375rem_minmax(0,1fr)] items-center gap-1.5">
                    <abbr title={`${language.name}: ${language.level}`} className="no-underline">
                      {languageCodes[language.name]}
                    </abbr>
                    <span className="relative block h-1.5 bg-foreground/10">
                      <span
                        className="absolute inset-y-0 left-0 bg-[#8a9aa6]"
                        style={{ width: `${language.score}%` }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </Link>
          </div>
        </div>

        <Ruler />
      </div>
    </section>
  );
}
