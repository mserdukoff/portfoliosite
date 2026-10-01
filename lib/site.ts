export const site = {
  name: "Matt Serdukoff",
  shortName: "Matt Serdukoff",
  cyrillicName: "Матвей Сердюков",
  role: "AI & software engineer",
  location: "Boston, MA",
  scope: "Boston metro or US-remote",
  status: "Open to roles",
  timezone: "America/New_York",
  email: "m.serdukoff@gmail.com",
  github: "https://github.com/mserdukoff",
  linkedin: "https://www.linkedin.com/in/matt-serdukoff-775030190/",
  metadata:
    "AI and software engineer shipping production LLM systems, retrieval pipelines, and full-stack products. AI Engineer / Full-Stack Developer at Hime building Wheelbase; creator of Grammario and Lociros. Pandas contributor. Based in Boston.",
  homepageLead:
    "AI Engineer / Full-Stack Developer at Hime, building Wheelbase: a multi-tenant dealership platform with hybrid vector search, a governed AI operations assistant, and a Go backend. Creator of Grammario and Lociros, two NLP products for language learners.",
  quote: "I refuse to ship something that kind of works.",
  homepageClose:
    "I build the whole path a feature travels: the schema and its security policies, the retrieval and ranking layer, the model call and its guardrails, the API, and the interface someone actually touches. Then I measure it. The Go rewrite of Wheelbase's backend cut database load by more than 80%; parallelizing Grammario's analysis pipeline took a nine-second wait down to four.",
  aboutClose:
    "My rule for AI work is structure first, model second. Grammario only lets the LLM explain grammar after a deterministic parser has already found it. Lociros never trusts a model's claim that a passage is A2; a morphological analyzer checks every word. Wheelbase's assistant can write SQL, but only inside a hardened Postgres function it cannot escape, and destructive writes wait for an approval token. Language models are powerful and unreliable, so I put them where their fluency helps and put hard checks where their mistakes would cost something.",
  aboutLanguages:
    "The languages are not a side note. I speak Russian, study Italian, Turkish, German, Hebrew, and Japanese, and that is where the NLP work comes from. Knowing firsthand that Turkish stacks suffixes while Italian inflects is why Grammario runs a different analysis strategy per language family instead of one generic pipeline.",
} as const;

export const nav = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Work" },
  { id: "impact", label: "Impact" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "open-source", label: "Open source" },
  { id: "about", label: "About" },
  { id: "languages", label: "Languages" },
  { id: "journal", label: "Journal" },
  { id: "contact", label: "Contact" },
] as const;

export const impact = [
  {
    value: "80%+",
    label: "less database load",
    detail:
      "Re-engineered Wheelbase's backend from Python/FastAPI to Go/Gin with zero breaking changes. Responses went sub-second.",
  },
  {
    value: "~217",
    label: "tRPC procedures",
    detail:
      "Across 35 domain routers, over a 66-table Postgres schema with Row Level Security on every table.",
  },
  {
    value: "0",
    label: "external API calls per VIN decode",
    detail:
      "Replaced a paid VIN API with an offline Go service over a ~2GB NHTSA database, with check-digit validation and auto-correction.",
  },
  {
    value: "60%",
    label: "faster translation turnaround",
    detail:
      "AWS Bedrock document pipelines for Massachusetts A&F, processing 200+ financial documents a month with layout-preserving PDF reconstruction.",
  },
  {
    value: "9s → 4s",
    label: "Grammario analysis latency",
    detail:
      "Parse, LLM explanation, and embedding run concurrently with asyncio.gather. The dependency tree itself renders in 300–500ms.",
  },
  {
    value: "Merged",
    label: "into pandas core",
    detail:
      "PR #64567 replaced a misleading plotting error with an accurate diagnostic, merged by a core maintainer without revisions.",
  },
] as const;

export const languages = [
  { name: "English", level: "Native", score: 100 },
  { name: "Russian", level: "Native", score: 88 },
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
  "SQL",
  "C++",
  "React",
  "Next.js",
  "FastAPI",
  "Gin",
  "PyTorch",
  "scikit-learn",
  "spaCy",
  "pgvector",
  "PostgreSQL",
  "Docker",
  "AWS",
] as const;

export const experience = [
  {
    org: "Hime",
    product: "Wheelbase",
    role: "AI Engineer / Full-Stack Developer",
    period: "Jan 2024–Present",
    place: "Remote",
    href: "https://wheelbase.io",
    caseStudy: "/work/wheelbase",
    summary:
      "Own full-stack delivery of Wheelbase, a multi-tenant dealership operations platform, across a React/TypeScript front end, Go and Python APIs, and Supabase Postgres, shipped to web, Electron desktop, and an Expo mobile field app from one Turborepo monorepo.",
    highlights: [
      "Built production AI features: a natural-language-to-SQL operations assistant with risk-tiered write approval, vector-powered demand matching, and operational recommendations.",
      "Built hybrid inventory search fusing 768-dim pgvector embeddings with Postgres full-text ranking via Reciprocal Rank Fusion, powering the IMX auction scoring system.",
      "Re-engineered backend services from Python/FastAPI to Go/Gin, cutting database load by 80%+ and bringing latency under a second with zero breaking changes.",
      "Designed tenant-scoped schemas and Row Level Security across 66 tables so isolation is enforced by Postgres, not application code.",
      "Replaced a paid VIN-decoding API with an offline Go service over a ~2GB NHTSA SQLite database: multi-pass pattern matching, check-digit validation, auto-correction.",
      "Built streaming CSV ETL for auction runlists with per-auction column mapping and 500-row batch writes, and set up GitHub Actions CI/CD with Docker and Nginx.",
      "Onboarded and mentored a new engineer through the monorepo, and turned requirements from finance and operations stakeholders into shipped features.",
    ],
    stack: ["Go", "TypeScript", "React 19", "tRPC", "Supabase", "pgvector", "Electron", "Expo", "Docker"],
  },
  {
    org: "Massachusetts Executive Office for Administration and Finance",
    product: null,
    role: "AI Engineering & Data Science Intern",
    period: "Mar–Sep 2025",
    place: "Boston, MA",
    href: null,
    caseStudy: null,
    summary:
      "Built AI-assisted document workflows for state government, where output had to be accurate, traceable, and usable by non-technical staff.",
    highlights: [
      "Automated multilingual translation of 200+ financial documents a month with AWS Bedrock and AWS Translate.",
      "Cut translation turnaround by 60% while preserving layout, deconstructing and rebuilding PDF structure with borb and PyMuPDF.",
      "Worked directly with cross-functional government stakeholders to deliver production-grade workflows with high accuracy requirements.",
    ],
    stack: ["Python", "AWS Bedrock", "AWS Translate", "PyMuPDF", "borb"],
  },
] as const;

export const education = [
  {
    school: "Boston University",
    degree: "M.S. Applied Data Analytics, AI & Machine Learning concentration",
    period: "2026–2028 (expected)",
    note: "Part-time. Concentration in artificial intelligence and machine learning, alongside statistics and data analytics.",
  },
  {
    school: "University of Massachusetts Lowell",
    degree: "B.S. Computer Science, Data Science concentration",
    period: "2019–2024",
    note: "Operating Systems, Databases, Computer Architecture, Artificial Intelligence, Natural Language Processing, Analysis of Algorithms, Data Structures.",
  },
] as const;

export const certifications = [
  { name: "Neural Networks and Deep Learning", issuer: "DeepLearning.AI" },
  { name: "Natural Language Processing", issuer: "DeepLearning.AI" },
  { name: "Programming with Google Go", issuer: "University of California, Irvine" },
] as const;

export const skills = [
  {
    area: "AI & LLM systems",
    proof:
      "Production RAG ranking at Wheelbase, eight structured-output LLM services in Grammario, governed natural-language SQL, AWS Bedrock pipelines in government.",
    tools: [
      "RAG",
      "Hybrid retrieval (RRF)",
      "Embedding pipelines",
      "Prompt engineering",
      "Structured JSON outputs",
      "OpenRouter",
      "OpenAI",
      "Anthropic Claude",
      "AWS Bedrock",
    ],
  },
  {
    area: "NLP",
    proof:
      "Dependency parsing and morphology across six languages, CEFR scoring from engineered features, analyzer-validated LLM generation.",
    tools: [
      "spaCy",
      "Stanza",
      "sentence-transformers",
      "Sudachi",
      "pymorphy3",
      "CAMeL Tools",
      "NLTK",
      "Universal Dependencies",
    ],
  },
  {
    area: "Machine learning & data",
    proof:
      "MLflow-tracked models served behind FastAPI, CNNs exported to Core ML, pipelines over 177K+ records and streaming ETL.",
    tools: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "MLflow",
      "pandas",
      "NumPy",
      "Core ML",
      "ETL / streaming ingestion",
    ],
  },
  {
    area: "Backend & databases",
    proof:
      "A Go service that cut DB load 80%+, a 66-table RLS schema, pgvector with HNSW and IVFFlat indexes, Redis caching layers.",
    tools: [
      "Go / Gin",
      "Python / FastAPI",
      "PostgreSQL",
      "Supabase",
      "pgvector",
      "Redis",
      "SQLite",
      "tRPC",
      "REST",
    ],
  },
  {
    area: "Frontend & apps",
    proof:
      "A 68-route React 19 app, an Electron desktop shell running tRPC over IPC, an Expo field app with a custom native VIN scanner.",
    tools: [
      "TypeScript",
      "React",
      "Next.js",
      "TanStack",
      "Tailwind CSS",
      "Electron",
      "Expo / React Native",
      "Yjs",
      "ReactFlow",
    ],
  },
  {
    area: "Infrastructure",
    proof:
      "Per-service Docker images behind Nginx, path-filtered GitHub Actions deploys, serverless background jobs on Vercel.",
    tools: [
      "Docker",
      "Nginx",
      "GitHub Actions",
      "AWS",
      "Vercel",
      "DigitalOcean",
      "Dokploy",
      "MinIO",
      "Stripe",
    ],
  },
] as const;

export const programmingLanguages = [
  { name: "Python", level: "Primary" },
  { name: "Go", level: "Production" },
  { name: "SQL", level: "Expert" },
  { name: "TypeScript", level: "Proficient" },
  { name: "C / C++", level: "Intermediate" },
  { name: "Bash", level: "Proficient" },
  { name: "R", level: "Familiar" },
] as const;

export const openSource = {
  repo: "pandas-dev/pandas",
  title: "BUG: clear error for hist/box with duplicate column names",
  pr: 64567,
  href: "https://github.com/pandas-dev/pandas/pull/64567",
  issue: 64546,
  issueHref: "https://github.com/pandas-dev/pandas/issues/64546",
  merged: "2026-03-22",
  mergedBy: "jbrockmendel",
  diff: "+11 / −0",
  before: `df = pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})
df.columns = ["a", "a"]

df.plot.hist()
# TypeError: no numeric data to plot`,
  fix: `if isinstance(data, ABCDataFrame):
    if self._kind in ("hist", "box") and not data.columns.is_unique:
        raise ValueError("plotting requires unique column names")`,
  story: [
    "Plotting a frame with duplicate column names told you there was no numeric data, even when every column was numeric. The real cause was in MPLPlot.__init__: with non-unique labels, data[col] returns a DataFrame instead of a Series, is_numeric_dtype says False, and every column is silently filtered out.",
    "Real duplicate-column support would mean reworking label-based indexing across the plotting pipeline, which the issue itself flagged as a much larger job. So I scoped it: a guard clause before any filtering, and a parametrized regression test for both plot kinds. It merged as submitted.",
  ],
} as const;

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  status: "Active" | "Completed";
  featured: boolean;
  href?: string;
  repo?: string;
  caseStudy?: string;
  blurb?: string;
  summary: string;
  highlights?: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "wheelbase",
    title: "Wheelbase",
    subtitle: "Dealership operations platform",
    period: "2024–Present",
    status: "Active",
    featured: true,
    href: "https://wheelbase.io",
    caseStudy: "/work/wheelbase",
    blurb:
      "Auction intelligence, inventory, and recon for used-car dealers. Hybrid vector search ranks every auction car against real inventory gaps; a governed AI assistant runs the rest.",
    summary:
      "A multi-tenant dealership platform built from zero: auction runlist scoring, offline VIN decoding, a configurable recon pipeline, real-time collaborative documents, and an AI operations assistant, spanning a web app, Electron desktop shell, and Expo mobile field app in one Turborepo monorepo.",
    highlights: [
      "IMX scoring: pgvector + full-text search fused with RRF, weighted by inventory gaps",
      "Natural-language SQL inside a hardened, tenant-scoped Postgres function",
      "Python → Go rewrite: 80%+ less DB load, sub-second responses",
    ],
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
    slug: "lociros",
    title: "Lociros",
    subtitle: "Graded readers, checked",
    period: "2026",
    status: "Active",
    featured: true,
    href: "https://lociros.com",
    repo: "https://github.com/mserdukoff/lociros",
    blurb:
      "Graded readers where A2 is actually A2. Every passage is checked by a morphological analyzer before you read it.",
    summary:
      "Graded readers in Japanese, Arabic, Italian, and Russian, A1–B2. An LLM drafts each passage under per-level grammar rules, then a real analyzer (Sudachi, CAMeL Tools, spaCy, pymorphy3) checks every word and construction and forces a rewrite when something is over level. Tap any word for reading, grammar, gloss, kanji with stroke order, or the Arabic root. Rating each text moves your placement and picks the next passage from the words you have already seen.",
    highlights: [
      "CEFR rules live in JSON, enforced by validators",
      "Kanji engine over ~13,100 KANJIDIC2 characters",
      "pytest suites that never call the LLM",
    ],
    stack: [
      "Next.js",
      "FastAPI",
      "Sudachi",
      "CAMeL Tools",
      "spaCy",
      "pymorphy3",
      "Supabase",
      "OpenRouter",
    ],
  },
  {
    slug: "grammario",
    title: "Grammario",
    subtitle: "Grammar you can see",
    period: "2024–Present",
    status: "Active",
    featured: true,
    href: "https://grammario.ai",
    caseStudy: "/work/grammario",
    blurb:
      "Click a sentence. See the structure. Universal Dependencies first, AI explanation second.",
    summary:
      "A syntactic grammar analyzer for six languages, with dual NLP engines, sentence embeddings for similarity search, CEFR difficulty scoring, and a full teacher/student class platform behind a gamified learning experience. Built entirely solo, with Stripe subscriptions live in production. It is the tool I wanted when every language app treated grammar as streak maintenance.",
    highlights: [
      "Deterministic parse first, LLM explanation second",
      "Parallel NLP, LLM, and embedding inference: 9s → 4s",
      "Live teacher quizzes over Supabase Realtime",
    ],
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
    slug: "purser",
    title: "Purser",
    subtitle: "Automated GitHub changelogs",
    period: "2026",
    status: "Completed",
    featured: false,
    summary:
      "A read-only GitHub App that turns each merged pull request into a reviewed changelog draft: dependency bumps and CI-only diffs are filtered out before any model call, then one Claude call writes a customer-facing note, a technical note, a category, and a confidence score. Approved entries push to Slack and an in-app launcher widget, with Stripe plans and Upstash QStash jobs so it runs serverless on Vercel.",
    highlights: [
      "Never stores diffs; installation tokens minted per request",
      "Breaking changes always wait for a human",
      "One job path: QStash in production, after() locally",
    ],
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
      "Interactive WebGL globe over 177,000+ records from the Global Terrorism Database (1970–2017), plus a seven-view analytics dashboard covering trends, regions, attack types, targets, weapons, and hotspots.",
    highlights: [
      "Pandas cleaning pipeline: coordinates, NaN imputation, type coercion",
      "8-endpoint FastAPI with analytical aggregations",
      "Sampled to 5,000 points to keep the globe smooth",
    ],
    stack: ["React", "Globe.gl", "FastAPI", "Pandas", "Vite", "Docker"],
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
    highlights: [
      "Every run logs params, seven metrics, and the model artifact",
      "API auto-serves the newest registered model",
      "Streamlit EDA and feature-importance playground",
    ],
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
      "Binary skin-lesion classifier (benign vs. malignant) trained on 10,015 HAM10000 dermatoscopic images, with four training pipelines across TensorFlow and PyTorch and export to Apple Core ML for on-device iOS/macOS inference.",
    highlights: [
      "Custom CNNs, class-balanced 224×224 pipeline",
      "MLflow tracking of per-epoch loss and accuracy",
      "Core ML .mlpackage export via coremltools",
    ],
    stack: ["TensorFlow", "PyTorch", "coremltools", "MLflow", "scikit-learn"],
  },
  {
    slug: "procmon",
    title: "Procmon",
    subtitle: "Linux process monitor",
    period: "Completed",
    status: "Completed",
    featured: false,
    repo: "https://github.com/mserdukoff/procmon",
    summary:
      "A minimal, htop-inspired process monitor in C++17 with an ncurses UI, reading live process data straight from the Linux /proc filesystem and refreshing every second.",
    highlights: [
      "Process / System / UI layers composed by dependency injection",
      "POSIX directory traversal to enumerate PIDs",
      "cmdline → comm → [unknown] fallback for kernel threads",
    ],
    stack: ["C++17", "ncurses", "POSIX", "procfs"],
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
      "v1.0, as of this writing: an interactive SVG dependency tree. Click a word and you get POS, lemma, case, tense, and the dependency relation. Sentence similarity via embeddings, so after analysis you can see something from your own history that is structurally close, with a note explaining the link. A Learn section organized by CEFR, A1 through C2, that ties topics back to the analyzer. Japanese is in progress, being refined, not broadly shipped.",
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
      "Strategist: language-specific post-processing. Turkish gets an X-Ray view. It is agglutinative, stacking meanings like LEGO, so the view explodes a word such as evlerinizden into plural, possessive, and case. German and Russian get governance: which verb demands dative or accusative. Italian and Spanish get agreement clusters, visually grouping words that must match in gender and number.",
      "Tutor: only after the structure is known does the AI explain it in natural language. The grammar is already on the page, and the model teaches from that open book.",
      "The design tension is linguistic rigor versus a uniform UX. Languages differ in how they build meaning, so each one needed its own analysis strategy.",
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
      "For a class of backend work I am already doing, it is simply the better tool.",
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
      "A prompt-engineering breakthrough: structured JSON output for sentences, covering lemma, POS, tense, and a relationship matrix. Design drawings exist. This is still the LLM-first era of the project, before I rebuilt around deterministic parse.",
      "The instinct was already right: grammar as structure you can inspect.",
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
    title: "Grammario Update, September 19, 2024",
    gist: "OpenAI versus Stanza plus custom suffix tests for Italian and Turkish.",
    body: [
      "Experiments: OpenAI API for Italian and Turkish, and Stanza plus custom suffix extraction for Turkish. The Stanza path was more flexible for Turkish suffixes. The goal is a robust web app people can actually use.",
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
