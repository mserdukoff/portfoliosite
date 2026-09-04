export const site = {
  name: "Matt Serdukoff",
  shortName: "Matt Serdukoff",
  role: "Software engineer",
  location: "Boston, MA",
  status: "Available",
  timezone: "America/New_York",
  email: "m.serdukoff@gmail.com",
  github: "https://github.com/mserdukoff",
  linkedin: "https://www.linkedin.com/in/matt-serdukoff-775030190/",
  metadata:
    "Software engineer building systems that think. Building Wheelbase, creator of Grammario. Based in Boston.",
  homepageLead:
    "Building Wheelbase, a dealership operations platform. Creator of Grammario, a grammar analyzer for six languages.",
  homepageClose:
    "I like hard problems and am drawn to domains where getting it wrong has real consequences.",
  aboutClose:
    "I am interested in systems that have to work under pressure — embedded, constrained, or otherwise consequential. On the language side, Grammario came from a frustration with how grammar is usually taught: I wanted to see the structure, not memorize rules. That turned into a real NLP pipeline covering morphological analysis, dependency parsing, and the structural differences between agglutinative and fusional languages. The seven languages I study inform the engineering as much as the other way around.",
} as const;

export const nav = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "languages", label: "Languages" },
  { id: "journal", label: "Journal" },
  { id: "contact", label: "Contact" },
] as const;

export const languages = [
  { name: "English", level: "Native", score: 100 },
  { name: "Russian", level: "Fluent", score: 88 },
  { name: "Italian", level: "Proficient", score: 68 },
  { name: "Turkish", level: "Proficient", score: 68 },
  { name: "German", level: "Basic", score: 32 },
  { name: "Hebrew", level: "Basic", score: 32 },
  { name: "Japanese", level: "Basic", score: 32 },
] as const;

export const stack = [
  "Python",
  "Go",
  "TypeScript",
  "C++",
  "React",
  "Next.js",
  "FastAPI",
  "Node.js",
  "TensorFlow",
  "PyTorch",
  "scikit-learn",
  "spaCy",
  "Supabase",
  "PostgreSQL",
  "Docker",
  "Linux",
] as const;

export const experience = [
  {
    org: "Wheelbase",
    role: "Full-Stack Engineer",
    period: "2024 — Present",
    href: "https://wheelbase.io",
    summary:
      "Multi-tenant dealership operations platform built from scratch as a Turborepo monorepo: web app, Electron desktop, and an Expo mobile field app sharing one Go backend. Re-engineered the backend from Python to Go for sub-second response times, and built an AI operations assistant with tenant-scoped natural-language SQL.",
  },
  {
    org: "MA Executive Office of Administration & Finance",
    role: "AI / Data Science Intern",
    period: "Mar – Sep 2025",
    href: null,
    summary:
      "Applied machine learning and NLP to state government data pipelines, and delivered briefings on AI procurement risk to senior staff.",
  },
] as const;

export const education = [
  {
    school: "Boston University",
    degree: "M.S. Applied Data Analytics",
    period: "2026 — 2028 (expected)",
  },
  {
    school: "University of Massachusetts Lowell",
    degree: "B.S. Computer Science — Data Science Concentration",
    period: "2020 — 2024",
  },
] as const;

export const certifications = [
  "Neural Networks and Deep Learning — DeepLearning.AI",
  "NLP Specialization — DeepLearning.AI",
  "Google Go Programming Specialization — Google / Coursera",
] as const;

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  status: "Active" | "Completed";
  featured: boolean;
  href?: string;
  caseStudy?: string;
  blurb?: string;
  summary: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "wheelbase",
    title: "Wheelbase",
    subtitle: "Dealership operations platform",
    period: "2024 — Present",
    status: "Active",
    featured: true,
    href: "https://wheelbase.io",
    blurb:
      "Auction intelligence, inventory, and recon — one Go backend, shipped to web, desktop, and mobile.",
    summary:
      "Built a multi-tenant dealership platform from zero: auction runlist scoring, VIN decoding, a configurable recon pipeline, and an AI operations assistant, spanning a web app, Electron desktop shell, and Expo mobile field app in one Turborepo monorepo. Re-engineered the backend from Python to Go for sub-second response times.",
    stack: [
      "TypeScript",
      "React",
      "TanStack Start",
      "tRPC",
      "Go",
      "Electron",
      "Expo",
      "Supabase",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    slug: "grammario",
    title: "Grammario",
    subtitle: "Grammar you can see",
    period: "2024 — Present",
    status: "Active",
    featured: true,
    href: "https://grammario.ai",
    caseStudy: "/work/grammario",
    blurb:
      "Click a sentence. See the structure. Universal Dependencies first, AI explanation second.",
    summary:
      "A syntactic grammar analyzer for six languages, with dual NLP engines, sentence embeddings for similarity search, CEFR difficulty scoring, and a full teacher/student class platform behind a gamified learning experience. Built entirely solo — the tool I wanted when every language app treated grammar as streak-maintenance.",
    stack: [
      "spaCy",
      "Stanza",
      "FastAPI",
      "Next.js",
      "Supabase",
      "pgvector",
      "Redis",
      "OpenAI API",
    ],
  },
  {
    slug: "levla",
    title: "Levla",
    subtitle: "CEFR graded readers",
    period: "2026",
    status: "Completed",
    featured: false,
    summary:
      "Graded-reader app for Russian and Japanese, A1–B2. An LLM drafts each passage under CEFR-level grammar constraints, a morphological analyzer validates and rewrites it before it ships, and tapping any word surfaces lemma, grammar, gloss, and kanji readings. Feedback on each text adjusts placement and recommends what to read next.",
    stack: [
      "Next.js",
      "FastAPI",
      "SQLAlchemy",
      "Sudachi",
      "pymorphy3",
      "OpenRouter",
    ],
  },
  {
    slug: "purser",
    title: "Purser",
    subtitle: "Automated GitHub changelogs",
    period: "2026",
    status: "Completed",
    featured: false,
    summary:
      "A read-only GitHub App that turns each merged pull request into a reviewed changelog draft: dependency bumps and CI-only diffs are filtered out before any model call, then Claude writes a customer-facing note and a technical note per PR. Approved entries push to Slack and an in-app launcher widget, with Stripe-metered plans and Upstash QStash jobs so it runs serverless on Vercel.",
    stack: [
      "Next.js",
      "Supabase",
      "GitHub Apps",
      "Upstash QStash",
      "Anthropic API",
      "Stripe",
      "TypeScript",
    ],
  },
  {
    slug: "global-terrorism-visualization",
    title: "Global Terrorism Visualization",
    subtitle: "3D globe and dashboard",
    period: "Completed",
    status: "Completed",
    featured: false,
    summary:
      "Interactive WebGL globe over 177,000+ records from the Global Terrorism Database, plus a seven-view analytics dashboard covering trends, regions, attack types, targets, weapons, and hotspots.",
    stack: ["React", "Globe.gl", "FastAPI", "Pandas", "Vite"],
  },
  {
    slug: "teen-phone-addiction",
    title: "Teen Phone Addiction Prediction",
    subtitle: "Behavioral ML pipeline",
    period: "Completed",
    status: "Completed",
    featured: false,
    summary:
      "Random forest regressor predicting adolescent phone-addiction risk from behavioral survey data, tracked with MLflow and served through a FastAPI endpoint that always loads the latest registered model, with a Streamlit dashboard for exploration and live prediction.",
    stack: ["Python", "scikit-learn", "MLflow", "FastAPI", "Streamlit"],
  },
  {
    slug: "skin-cancer-cnn",
    title: "SkinGuard",
    subtitle: "Lesion classification",
    period: "Completed",
    status: "Completed",
    featured: false,
    summary:
      "Binary skin-lesion classifier (benign vs. malignant) trained on HAM10000, with four training pipelines across TensorFlow and PyTorch and export to Apple Core ML for on-device iOS/macOS inference.",
    stack: ["TensorFlow", "PyTorch", "coremltools", "MLflow", "scikit-learn"],
  },
  {
    slug: "procmon",
    title: "Procmon",
    subtitle: "Linux process monitor",
    period: "Completed",
    status: "Completed",
    featured: false,
    summary:
      "Terminal process monitor in C++ with ncurses. Real-time procfs reads for CPU, memory, and threads, plus sorting, filtering, and signal dispatch.",
    stack: ["C++", "ncurses", "Linux", "procfs"],
  },
];

export const grammarioLanguages = [
  {
    code: "IT",
    name: "Italian",
    note: "Agreement clusters, fusional morphology",
  },
  {
    code: "DE",
    name: "German",
    note: "Case governance, verb-bracket structures",
  },
  {
    code: "RU",
    name: "Russian",
    note: "Six-case system, aspect pairs",
  },
  {
    code: "TR",
    name: "Turkish",
    note: "Agglutinative X-Ray, suffix decomposition",
  },
  {
    code: "ES",
    name: "Spanish",
    note: "Agreement clusters, ser/estar distinction",
  },
  {
    code: "JA",
    name: "Japanese",
    note: "Verb and adjective conjugation, honorific register",
  },
] as const;

export type JournalPost = {
  slug: string;
  date: string;
  title: string;
  gist: string;
  body: string[];
};

export const journal: JournalPost[] = [
  {
    slug: "grammario-where-things-stand",
    date: "2026-04-19",
    title: "Grammario: Where Things Stand",
    gist: "v1.0 features, teacher suite, Japanese, Learn section. Honest about building solo.",
    body: [
      "I am working on Grammario more than ever. What started as a passion project is something I might actually market. That shift is real, and it is still not finished.",
      "v1.0, as of this writing: an interactive SVG dependency tree. Click a word and you get POS, lemma, case, tense, and the dependency relation. Sentence similarity via embeddings, so after analysis you can see something from your own history that is structurally close — with a note explaining the link. A Learn section organized by CEFR, A1 through C2, that ties topics back to the analyzer. Japanese is in progress, being refined, not broadly shipped.",
      "The teacher suite is still in active development: classes, shareable join codes, quizzes, Kahoot-style live sessions, assigned reading, writing prompts with AI feedback, class-wide error pattern analytics.",
      "Features under consideration, not committed: Sentence Remix, a word-frequency overlay on the tree, paragraph mode, a personal grammar library, vocabulary-in-context flashcards that keep the structure the word came from.",
      "Building this entirely alone is freeing and overwhelming in equal measure. Wheelbase still takes precedence when the two conflict.",
    ],
  },
  {
    slug: "new-grammario-method",
    date: "2025-12-17",
    title: "Why I'm Changing Everything: The New Grammario Method",
    gist: "Structural-First Analysis. Analyst, Strategist, Tutor. Language-family strategies.",
    body: [
      "Earlier Grammario asked a language model to identify grammar. The output was fluent. It was also unreliable. I will not ship a tool that kind of works.",
      "The rebuild is Structural-First Analysis. Three layers, in order.",
      "Analyst: spaCy parses via Universal Dependencies. Lemmatization, POS tags, and dependency arcs come out deterministically. No model hallucination at this layer.",
      "Strategist: language-specific post-processing. Turkish gets an X-Ray view — agglutinative, stacking meanings like LEGO, exploding a word such as evlerinizden into plural, possessive, and case. German and Russian get governance: which verb demands dative or accusative. Italian and Spanish get agreement clusters, visually grouping words that must match in gender and number.",
      "Tutor: only after the structure is known does the AI explain it in natural language. It does not find the grammar. It teaches from the open book.",
      "The design tension is linguistic rigor versus a uniform UX. Languages are not the same. Each one needed its own analysis strategy, not just a different model.",
    ],
  },
  {
    slug: "grammario-down",
    date: "2025-10-10",
    title: "Grammario Down",
    gist: "Backend maintenance. Analysis API temporarily down.",
    body: [
      "The analysis API is down while I make backend changes. I would rather take it offline than leave a half-working parser in the world.",
      "If you hit grammario.ai and analysis fails, that is this. It will come back when the new path is actually correct.",
    ],
  },
  {
    slug: "thoughts-on-go",
    date: "2025-09-13",
    title: "My Thoughts on Go",
    gist: "Pointer and method-receiver syntax versus C/C++. Automatic struct dereference.",
    body: [
      "I started learning Go after a Wheelbase ingestion path in Python got too slow. The language itself is the part I keep thinking about.",
      "I like the method-receiver syntax. Pass-by-value versus a *Bank receiver makes the mutation story obvious in a way C++ sometimes buries. And Go's automatic struct pointer dereference is a small, precise detail that feels like the language is paying attention.",
      "It is not a religion. It is a better tool for a class of backend work I am already doing.",
    ],
  },
  {
    slug: "new-challenges-new-languages",
    date: "2025-08-31",
    title: "New Challenges and New Languages",
    gist: "Wheelbase ingestion was too slow in Python/FastAPI. Fixed, then started learning Go.",
    body: [
      "A core Wheelbase feature populated the database with thousands of entries and took up to two minutes. After finding the problem in the FastAPI/Python backend, the same process dropped to about 5–25 seconds depending on volume, from 500 to 5,000 cars.",
      "That was the prompt to learn Go as a potential backend language for Wheelbase. I took the Google Go Programming Specialization. Performance work has a way of making you honest about the runtime you chose.",
    ],
  },
  {
    slug: "grammario-new-ui",
    date: "2025-08-28",
    title: "Grammario has a New UI",
    gist: "Scrapped the canvas of cards. Sentence at the top, click a word for info.",
    body: [
      "I scrapped the old freely-movable connected cards on a gridded canvas. It looked clever. It was not how anyone actually reads a sentence.",
      "The new layout puts the sentence at the top. Click a word, see the information. Structure first, chrome second.",
    ],
  },
  {
    slug: "grammario-youtube",
    date: "2025-03-06",
    title: "Grammario & YouTube",
    gist: "Hosting issues. Wheelbase takes precedence. Plans for a C programming series.",
    body: [
      "Backend hosting issues made the sentence-analysis API undeployable for a stretch. Wheelbase takes precedence when the two conflict. That is the honest order.",
      "I am also planning a C programming YouTube series, starting from the basics. Teaching increases knowledge. Daniel Bourke's PyTorch course is the influence: C as the guts of programming without dropping all the way to assembly.",
    ],
  },
  {
    slug: "grammario-v0",
    date: "2025-01-01",
    title: "Grammario Update 1/1/25",
    gist: "v0.1.0 live.",
    body: [
      "v0.1.0 is live. Bare, unpolished, basic functionality shown to the world. Shipping something that works at a small scale beats waiting for a perfect engine that exists only in notes.",
    ],
  },
  {
    slug: "grammario-json-breakthrough",
    date: "2024-12-29",
    title: "Grammario Project Update 12/29/24",
    gist: "Prompt engineering breakthrough. Structured JSON for sentences.",
    body: [
      "A prompt-engineering breakthrough: structured JSON output for sentences — lemma, POS, tense, relationship matrix. Design drawings exist. This is still the LLM-first era of the project, before I rebuilt around deterministic parse.",
      "The instinct was already right: grammar as structure you can inspect, not a paragraph of vibes.",
    ],
  },
  {
    slug: "grammario-wont-ship-half",
    date: "2024-11-01",
    title: "Grammario Update 11/1/24",
    gist: "Prompt engineering still inconsistent. Will not ship half-working.",
    body: [
      "Prompt engineering is not yet consistent enough. I refuse to ship something that kind of works.",
      "I am also considering expanding from a grammar breakdown into a full language-learning web app aimed at enthusiasts, not streak-chasers. The apps I have used treat grammar as maintenance. I want understanding.",
    ],
  },
  {
    slug: "grammario-september-experiments",
    date: "2024-09-19",
    title: "Grammario Update — September 19, 2024",
    gist: "OpenAI versus Stanza plus custom suffix tests for Italian and Turkish.",
    body: [
      "Experiments: OpenAI API for Italian and Turkish, and Stanza plus custom suffix extraction for Turkish. The Stanza path was more flexible for Turkish suffixes. The goal is a robust web app, not a demo notebook.",
    ],
  },
  {
    slug: "grammario-background",
    date: "2024-09-17",
    title: "Grammario Project Background",
    gist: "Origin story. Language-learning hobby. Example sentence breakdown.",
    body: [
      "Language learning is a core hobby. Across Duolingo, LingQ, textbooks, and tutors, grammar was always explained as rules to memorize, not structures to see. When I analyzed a sentence in my head, I was drawing relationships. No tool reflected that.",
      "Example: Italian L'ho fatta parlare in italiano. Pronoun, auxiliary, agreeing past participle, infinitive, preposition, noun. Grammar is the hard part of language learning. NLP can make the structure visible.",
      "That is the origin. Everything after this is me trying to make that drawing real.",
    ],
  },
];

export const wheelbaseIngestion = {
  data: [
    { stage: "Before", seconds: 120 },
    { stage: "After", seconds: 15 },
  ],
} as const;

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function getJournal(slug: string) {
  return journal.find((post) => post.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
