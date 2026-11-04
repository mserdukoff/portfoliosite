import { journal } from "@/lib/site";

const label = "fill-[var(--muted-foreground)] font-mono text-[13px]";
const strong = "fill-[var(--foreground)] font-mono text-[13px]";
const line = "fill-none stroke-[var(--line)]";

function Node({ x, y, w, h, title, note }: { x: number; y: number; w: number; h: number; title: string; note?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} className="fill-[var(--field)] stroke-[#7fb6c9]" />
      <text x={x + 9} y={y + 18} className={strong}>{title}</text>
      {note ? <text x={x + 9} y={y + 34} className={label}>{note}</text> : null}
    </g>
  );
}

/** Wheelbase, as deployed: the three surfaces through the edge to Postgres. */
export function WorkArt() {
  const clients = [
    ["Web", 42],
    ["Desktop", 142],
    ["Mobile", 242],
  ] as const;
  const services = [
    ["Frontend", "TanStack Start", 8],
    ["Landing", "Vite static", 80],
    ["Go API", "Gin", 152],
    ["Agent proxy", "Bun", 224],
  ] as const;
  const wires = [
    ...clients.map(([, y]) => `M84 ${y} C112 ${y} 104 150 132 150`),
    ...services.map(([, , y]) => `M202 150 C232 150 212 ${y + 24} 248 ${y + 24}`),
    ...[8, 152, 224].map((y) => `M386 ${y + 24} H432`),
  ];

  return (
    <svg viewBox="0 0 560 276" aria-hidden className="w-full">
      {wires.map((wire) => (
        <g key={wire}>
          <path d={wire} className={line} />
          <path d={wire} className="wire-flow fill-none stroke-[var(--orange)] stroke-[1.5]" />
        </g>
      ))}
      {clients.map(([name, y]) => (
        <text key={name} x="0" y={y + 4} className={label}>{name}</text>
      ))}
      <Node x={132} y={118} w={70} h={64} title="Nginx" note="edge" />
      {services.map(([name, note, y]) => (
        <Node key={name} x={248} y={y} w={138} h={48} title={name} note={note} />
      ))}
      <rect x="432" y="8" width="128" height="264" className="fill-[var(--field)] stroke-[var(--teal)]" />
      <text x="444" y="30" className={strong}>Postgres</text>
      {["RLS", "pgvector", "Realtime", "Vault", "66 tables"].map((item, i) => (
        <text key={item} x="444" y={74 + i * 34} className={label}>{item}</text>
      ))}
    </svg>
  );
}

function Caption({ x, y, children }: { x: number; y: number; children: string }) {
  return <text x={x} y={y} textAnchor="middle" className={label}>{children}</text>;
}

/** One figure for each side project, drawn from what it does. */
export function ProjectsArt() {
  const tree = "M70 170V190M70 190H34M70 190H106M34 190V210M106 190V210M34 210H18M34 210H50M106 210H90M106 210H122";

  return (
    <svg viewBox="0 0 560 300" aria-hidden className="w-full">
      {/* Global Terrorism Visualization: the globe */}
      <g className={line}>
        <circle cx="280" cy="136" r="112" className="stroke-[#7fb6c9]" />
        <ellipse cx="280" cy="136" rx="74" ry="112" />
        <ellipse cx="280" cy="136" rx="34" ry="112" />
        <path d="M280 24V248M168 136H392" />
        <ellipse cx="280" cy="136" rx="112" ry="42" />
        <ellipse cx="280" cy="84" rx="97" ry="20" />
        <ellipse cx="280" cy="188" rx="97" ry="20" />
      </g>
      <g className="fill-none stroke-[var(--orange)] stroke-[1.5]">
        <path d="M232 92C256 58 306 58 332 104" />
        <path d="M332 104C348 134 340 168 308 190" />
      </g>
      <Caption x={280} y={276}>Global Terrorism Visualization</Caption>

      {/* Purser: a merged pull request becoming a changelog entry */}
      <g className="fill-none stroke-[#7fb6c9]">
        <path d="M20 96H128" />
        <path d="M44 96C44 52 64 52 76 52C92 52 100 62 104 96" className="stroke-[var(--orange)]" />
      </g>
      <g className="fill-[var(--field)] stroke-[#7fb6c9]">
        <rect x="39" y="91" width="10" height="10" />
        <rect x="99" y="91" width="10" height="10" />
        <rect x="71" y="47" width="10" height="10" className="stroke-[var(--orange)]" />
      </g>
      <Caption x={74} y={124}>Purser</Caption>

      {/* Teen Phone Addiction Prediction: a random forest's decision tree */}
      <path d={tree} className="fill-none stroke-[var(--teal)]" />
      <Caption x={70} y={236}>Random forest</Caption>

      {/* SkinGuard: CNN layers narrowing to a verdict */}
      <g className="fill-[var(--field)] stroke-[#7fb6c9]">
        <rect x="446" y="44" width="16" height="72" />
        <rect x="470" y="52" width="14" height="56" />
        <rect x="492" y="60" width="12" height="40" />
        <rect x="512" y="68" width="10" height="24" className="stroke-[var(--teal)]" />
        <rect x="530" y="74" width="10" height="12" className="stroke-[var(--orange)]" />
      </g>
      <Caption x={492} y={136}>SkinGuard</Caption>

      {/* Procmon: per-process meters */}
      {[62, 34, 78, 20].map((width, i) => (
        <g key={width}>
          <rect x="446" y={172 + i * 13} width="94" height="7" className="fill-none stroke-[var(--line)]" />
          <rect x="446" y={172 + i * 13} width={width} height="7" className={i === 2 ? "fill-[var(--orange)]" : "fill-[#7fb6c9]"} />
        </g>
      ))}
      <Caption x={492} y={236}>Procmon</Caption>
    </svg>
  );
}

// "Language" in each language on the site, plus Arabic from Lociros.
const words = [
  { text: "язык", lang: "ru", x: 8, y: 62, size: 44 },
  { text: "言語", lang: "ja", x: 210, y: 46, size: 34 },
  { text: "lingua", lang: "it", x: 362, y: 76, size: 50 },
  { text: "Sprache", lang: "de", x: 30, y: 136, size: 38 },
  { text: "שפה", lang: "he", x: 256, y: 124, size: 40 },
  { text: "dil", lang: "tr", x: 428, y: 150, size: 42 },
  { text: "لغة", lang: "ar", x: 180, y: 186, size: 46 },
];

const dayMs = 86_400_000;

/** The word for language, over a tick for every journal entry on its real date. */
export function WritingArt() {
  const times = journal.map((post) => Date.parse(post.date));
  const first = Math.min(...times);
  const span = Math.max(...times) - first || dayMs;
  const place = (time: number) => 8 + ((time - first) / span) * 544;
  const years = [...new Set(journal.map((post) => post.date.slice(0, 4)))];

  return (
    <svg viewBox="0 0 560 276" aria-hidden className="w-full">
      {words.map((word) => (
        <text key={word.lang} lang={word.lang} x={word.x} y={word.y} fontSize={word.size} className="fill-[#a9c3cf]">
          {word.text}
        </text>
      ))}
      <path d="M8 240H552" className={line} />
      {journal.map((post, i) => (
        <path
          key={post.slug}
          d={`M${place(times[i])} 240V${i === 0 ? 212 : 222}`}
          className={i === 0 ? "stroke-[var(--orange)]" : "stroke-[#7fb6c9]"}
        />
      ))}
      {years.map((year) => {
        const start = Math.max(Date.parse(`${year}-01-01`), first);
        return (
          <text key={year} x={place(start)} y="262" className={label}>{year}</text>
        );
      })}
    </svg>
  );
}
