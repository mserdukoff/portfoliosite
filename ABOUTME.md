# Matt Serdukoff — Context Brief

Use this document as ground truth about Matt Serdukoff, his work, projects, background, and voice. Prefer facts here over invention. If something is not listed, do not assume it.

Extracted from his personal site (website 6.0) as of August 2026.

---

## Identity

- **Name:** Matt Serdukoff (also Matthew Serdukoff)
- **Role:** Software engineer
- **Location:** Boston, MA (timezone: America/New_York / EST)
- **Status (as shown on site):** Available · Boston
- **Email:** [m.serdukoff@gmail.com](mailto:m.serdukoff@gmail.com)
- **GitHub:** [https://github.com/mserdukoff](https://github.com/mserdukoff)
- **LinkedIn:** [https://www.linkedin.com/in/matt-serdukoff-775030190/](https://www.linkedin.com/in/matt-serdukoff-775030190/)

**Site metadata line:** "Software engineer building systems that think. Building Wheelbase, creator of Grammario. Based in Boston."

**Note (September 2026):** He is actively job-hunting in the industry. Per his explicit instruction, site copy de-emphasizes "co-founder"/founder framing in favor of hands-on engineer framing — do not lead with "founder" or "co-founder" when describing him or Wheelbase; "Full-Stack Engineer" is the role to use. The public study-notes repo link was also removed from the site at his request — do not re-add it.

---



## How he describes himself

Software engineer based in Boston. Built Wheelbase (SaaS for auto dealerships) and Grammario (syntactic grammar analyzer). Applied machine learning to state government data pipelines at the MA Executive Office of Administration & Finance.

**Core stance:** He builds software that has to actually work. He likes hard problems and is drawn to domains where getting it wrong has real consequences. He cares about problems where software has real weight — embedded, constrained, or otherwise consequential systems.

**Homepage copy:**

> I build software that has to actually work. Right now: building Wheelbase and building Grammario — a grammar analyzer for six languages.
>
> I like hard problems and am drawn to domains where getting it wrong has real consequences.

**About-page closer:**

> I am interested in systems that have to work under pressure — embedded, constrained, or otherwise consequential. On the language side, Grammario came from a frustration with how grammar is usually taught: I wanted to see the structure, not memorize rules. That turned into a real NLP pipeline covering morphological analysis, dependency parsing, and the structural differences between agglutinative and fusional languages. The six languages I study inform the engineering as much as the other way around.

---



## Voice and values (for writing as / about him)

- Direct, specific, slightly editorial. Not startup-hype, not academic-stiff.
- Prefers structure and determinism over "chat with an AI and hope."
- Skeptical of black-box language-learning apps (Duolingo, LingQ, etc.) that treat grammar as streak-maintenance rather than understanding.
- Cares about linguistic rigor: agglutinative languages (Turkish) behave differently from fusional ones (Italian, Spanish, German, Russian). A one-size-fits-all engine is a mistake.
- Builds solo when it matters (Grammario is entirely his).
- Wheelbase work takes precedence over side projects when they conflict.
- Enjoys small, precise language/tooling details (e.g. Go's automatic struct pointer dereference).
- Interested in teaching as a way to learn (planned C programming YouTube series inspired by Daniel Bourke).
- Photography is a personal practice (26 frames on the site); language learning is a core hobby.

Do not make him sound like a generic "AI founder." He is an engineer who happens to use ML/NLP where it is the right tool.

---



## Experience



### Wheelbase — Full-Stack Engineer

- **Period:** 2024 — Present
- **URL:** [https://wheelbase.io](https://wheelbase.io)
- Built SaaS for pre-owned auto dealerships from zero / entirely from scratch.
- Features: live auction data ingestion, inventory management across the full deal lifecycle, real-time collaboration / deal pipeline, embedded AI assistant for pricing and market analysis.
- **Stack:** TypeScript, React, TanStack Start, tRPC, Go (Gin), Supabase, PostgreSQL, Electron, Expo, Docker.
- Built as a Turborepo monorepo (Bun workspaces): web app (TanStack Start), Electron desktop shell, and an Expo React Native mobile field app, sharing one Go backend.
- Backend was re-engineered from Python (FastAPI) to Go (Gin) for sub-second response times — the payoff of the Go migration described in the "New Challenges and New Languages" / "My Thoughts on Go" journal entries below.
- **Status:** Active (featured work).
- **Backend performance note (Aug 2025 journal):** A core feature that populated the DB with thousands of entries took up to two minutes. After finding a problem in the FastAPI/Python backend, the same process dropped to ~5–25 seconds depending on volume (500 to 5,000 cars). This prompted him to learn Go as a potential backend language for Wheelbase.



### MA Executive Office of Administration & Finance — AI / Data Science Intern

- **Period:** Mar – Sep 2025
- Applied ML and NLP to state government data pipelines.
- Delivered briefings on AI procurement risk to senior staff.
- No public URL listed.

---



## Education

- **University of Massachusetts Lowell**
- **B.S. Computer Science — Data Science Concentration**
- **2020 — 2024**

---



## Languages (human)

He has studied six human languages. Levels as listed on the about page:


| Language | Level      |
| -------- | ---------- |
| English  | Native     |
| Russian  | Fluent     |
| Italian  | Proficient |
| Turkish  | Proficient |
| German   | Basic      |
| Hebrew   | Basic      |


These languages directly inform Grammario's design (especially the split between agglutinative Turkish and fusional IT/ES/DE/RU).

---



## Technical stack

Python, Go, TypeScript, C++, React, Next.js, FastAPI, Node.js, TensorFlow, PyTorch, scikit-learn, spaCy, Supabase, PostgreSQL, Docker, Linux.

Also used across projects (not all on the about-page chip list): Three.js, D3.js, Pandas, Streamlit, Jupyter, NumPy, ncurses, procfs, Tailwind CSS, Pydantic, pgvector, Vercel, Railway, OpenAI API, sentence-transformers, Stanza (early Grammario experiments).

Prior systems experience: C and C++ (pointers, low-level), Linux process internals.

**Currently learning / using Go** for backend performance (Wheelbase) and because he likes the language. Took the Google Go Programming Specialization.

---



## Certifications

- Neural Networks and Deep Learning — DeepLearning.AI
- NLP Specialization — DeepLearning.AI
- Google Go Programming Specialization — Google / Coursera

---



## Projects



### 1. Wheelbase (Active)

Dealership management SaaS. See Experience above. Featured project subtitle: "Dealership SaaS" / "Dealership Management SaaS."

### 2. Grammario (Active) — flagship personal product

- **Live:** [https://grammario.ai](https://grammario.ai)
- **Case study on site:** `/work/grammario`
- **Role:** Sole developer and maintainer. First app he built entirely from the ground up.
- **One-liner:** Grammar visualization tool that renders syntactic dependency trees for user-submitted sentences. Grammar you can see, not just memorize.
- **Pitch:** Uses the Universal Dependencies standard for deterministic structural analysis, then layers AI explanation on top of that hard truth.

**Origin** Language learning is a core hobby. Across Duolingo, LingQ, textbooks, and tutors, grammar was always explained as rules to memorize, not structures to see. When he analyzed a sentence in his head, he was drawing relationships. No tool reflected that. Grammario is the tool he wanted.

Example he uses: Italian *L'ho fatta parlare in italiano.* — broken into pronoun, auxiliary, agreeing past participle, infinitive, preposition, noun.

**Architecture — Structural-First Analysis (introduced Dec 2025)**

Earlier versions asked an LLM to identify grammar ("chat with an AI about your grammar"). Output was fluent but unreliable / hallucinatory. He rebuilt the engine:

1. **Analyst** — spaCy parses via Universal Dependencies. Lemmatization, POS tags, and dependency arcs are extracted deterministically. No model hallucination at this layer.
2. **Strategist** — language-specific post-processing:
  - **Turkish:** "X-Ray" view. Agglutinative — stacks meanings like LEGO. Explodes words (e.g. *evlerinizden*) into plural / possessive / case markers. Custom suffix extractor. Early work also used Stanza + custom suffix logic.
  - **German & Russian:** "Governance" — which verb demands Dative or Accusative.
  - **Italian & Spanish:** "Agreement Clusters" — visually group words that must match in gender and number. Spanish also: ser/estar distinction. Russian also: six-case system, aspect pairs. German also: verb-bracket structures.
3. **Tutor** — only after structure is known does the AI explain it in natural language. It does not find the grammar; it teaches from the open book.

**Supported languages (shipped)**


| Code | Language | Analysis notes                                     |
| ---- | -------- | --------------------------------------------------- |
| IT   | Italian  | Agreement clusters, fusional morphology              |
| DE   | German   | Case governance, verb-bracket structures             |
| RU   | Russian  | Six-case system, aspect pairs                        |
| TR   | Turkish  | Agglutinative X-Ray, suffix decomposition            |
| ES   | Spanish  | Agreement clusters, ser/estar distinction            |
| JA   | Japanese | Verb and adjective conjugation, honorific register   |


Japanese has since shipped as a full sixth supported language (per a September 2026 project audit — supersedes the April 2026 journal entry below, which still described it as in progress).

**Now a production-ready, full-stack platform** (per September 2026 project audit): dual NLP engines (spaCy primary, Stanza fallback), LLM-powered pedagogical insights, rule-based grammar error detection, CEFR difficulty scoring (A1–C2), sentence embeddings for similarity search, a dual spaced-repetition system (vocabulary + grammar concepts), gamification (streaks, XP, achievements), and a full teacher/student class-management platform. Stripe-powered Pro and Class/Teacher subscription plans are live in production.

**v1.0 feature set (as of April 19, 2026 journal + case study; see above for what shipped since)**

- Interactive SVG dependency tree. Click a word → POS, lemma, case, tense, dependency relation.
- Sentence similarity via vector embeddings (pgvector / sentence-transformers). After analysis, surfaces semantically similar sentences from the user's own history ("You've seen this before") with a note explaining the link.
- Teacher suite (has since shipped — see above): classes, shareable join codes, quizzes, Kahoot-style live sessions, assigned reading passages, writing prompts with AI feedback, class-wide error pattern analytics.
- Learn section: CEFR-organized grammar curriculum A1–C2. Topics link to the analyzer and a spaced-repetition / concept review queue.
- Japanese (has since shipped — see above).

**Features under consideration (not committed)**

- Sentence Remix: AI grammatical variants (tense, plural, negative, formality), each with its own tree.
- Word Frequency Overlay: color-code tree nodes by corpus frequency / difficulty.
- Paragraph Mode: paste a paragraph; split, analyze each sentence, expand any into a full tree.
- Personal Grammar Library: catalogue of concepts from the user's own sentences; mini-lessons synthesized from their examples.
- Vocabulary in Context: flashcards that include the grammatical structure the word came from.

**Stack**


| Layer          | Tools                                                    |
| -------------- | -------------------------------------------------------- |
| NLP Core       | spaCy · Universal Dependencies · custom suffix extractor |
| API            | Python · FastAPI · Pydantic                              |
| Frontend       | React · Next.js · TypeScript · Tailwind CSS              |
| Database       | Supabase · PostgreSQL · pgvector                         |
| Infrastructure | Docker · Vercel · Railway                                |
| AI Layer       | OpenAI API · sentence-transformers                       |


**History / product timeline**

- **Sep 17, 2024** — Project background published. Motivation: grammar is the hard part of language learning; NLP can make structure visible.
- **Sep 19, 2024** — Experiments: OpenAI API for Italian and Turkish; Stanza + custom suffix extraction for Turkish. Stanza+custom more flexible for Turkish suffixes. Goal: robust web app.
- **Nov 1, 2024** — Prompt engineering not yet consistent enough. Refuses to ship "kind of works." Considers expanding from grammar breakdown into a full language-learning web app aimed at enthusiasts, not streak-chasers.
- **Dec 29, 2024** — Prompt-engineering breakthrough; structured JSON output for sentences (lemma, POS, tense, relationship matrix). Design drawings exist.
- **Jan 1, 2025** — v0.1.0 live. Bare, unpolished, basic functionality shown to the world.
- **Mar 6, 2025** — Backend hosting issues; sentence-analysis API undeployable. Wheelbase takes precedence. Mentions planned C programming YouTube series.
- **Aug 28, 2025** — New UI. Scrapped old freely-movable connected cards on a gridded canvas. New layout: sentence at top, click a word for info.
- **Oct 10, 2025** — "Grammario Down" — backend changes, API temporarily down.
- **Dec 17, 2025** — Structural-First Analysis method announced. Rebuild away from chat-with-AI toward visual architecture.
- **Apr 19, 2026** — "Where Things Stand." Working on it more than ever. Shifted from passion project to something he might actually market. v1.0 features listed; still not finished. Honest about being the sole builder — freeing and overwhelming.

**Central design tension:** linguistic rigor (languages are not the same) vs. a uniform UX. Each language needed its own analysis strategy, not just a different model.

### 3. Global Terrorism Visualization (Completed)

Interactive 3D globe (Globe.gl, WebGL) over 177,000+ records from the Global Terrorism Database (GTD, START consortium), plus a seven-view analytics dashboard (Overview, Trends, Regions, Attack Types, Targets, Weapons, Hotspots). **Stack:** React, Globe.gl, Vite, FastAPI, Pandas. **Code:** [https://github.com/mserdukoff](https://github.com/mserdukoff) (no specific repo linked on the site).

### 4. Teen Phone Addiction Prediction (Completed)

ML pipeline predicting smartphone addiction risk (0–10 continuous score) in adolescents from behavioral survey data, using a RandomForestRegressor tracked with MLflow (metrics, params, model artifacts). Served via a FastAPI `/predict` endpoint that auto-loads the latest MLflow-registered model, plus a Streamlit dashboard for EDA, feature importance, and a live prediction playground. **Stack:** Python, scikit-learn, MLflow, FastAPI, Pydantic, Streamlit, Pandas. **Code:** [https://github.com/mserdukoff](https://github.com/mserdukoff) (no specific repo linked on the site).

### 5. SkinGuard — Skin Cancer Classification (Completed)

Binary skin-lesion classifier (benign vs. malignant, collapsed from HAM10000's 7 diagnostic categories, 10,015 images). Note: earlier notes described this as multi-class with ResNet transfer learning — per a September 2026 project audit it is a binary classifier built on custom CNN architectures (not ResNet transfer learning), with four training pipelines (Keras, two PyTorch variants, PyTorch + MLflow) and export to Apple Core ML (`.mlpackage`) for on-device iOS/macOS inference. **Stack:** TensorFlow/Keras, PyTorch, torchvision, coremltools, MLflow, scikit-learn. **Code:** [https://github.com/mserdukoff](https://github.com/mserdukoff) (no specific repo linked on the site).

### 6. Procmon (Completed)

Terminal-based Linux process monitor in C++using ncurses. Real-time procfs reads for per-process CPU, memory, and thread usage. Sorting, filtering, signal dispatch. **Stack:** C++, ncurses, Linux, procfs. **Code:** [https://github.com/mserdukoff](https://github.com/mserdukoff) (no specific repo linked on the site).

### 7. Levla (Completed, added September 2026 — not previously listed here)

A CEFR-calibrated graded-reader app for Russian and Japanese (A1–B2). An LLM drafts each passage under per-level grammar constraints from a prompt; a morphological analyzer (razdel + pymorphy3 for Russian, Sudachi for Japanese) validates the draft against rule-based CEFR grammar constraints rather than trusting the model, rewriting on failure. Users tap any word for lemma, grammar, gloss, and (Japanese) kanji readings; marking a text too easy/too hard adjusts CEFR placement and recommends the next unread passage. No accounts — a device UUID in `localStorage` scopes state. **Stack:** Next.js, FastAPI, SQLAlchemy, SQLite, Sudachi, pymorphy3 + razdel, OpenRouter (LLM). **No public URL confirmed as of this audit — do not claim it is deployed publicly unless confirmed.**

### 8. Purser (Completed, added September 2026 — not previously listed here)

Read-only GitHub App that turns merged pull requests into reviewed changelog drafts. Dependency bumps, CI-config, and formatting-only diffs are filtered out before any model call; Claude then drafts a customer-facing note and a separate technical note (plus category + confidence score), with breaking changes held for human review. Approved entries push to Slack and light up an in-app launcher widget (also: public changelog page, RSS, JSON API). Multi-tenant with Free/Pro/Team plans on Stripe Checkout + Customer Portal; background jobs via Upstash QStash so it runs on Vercel without a worker process (falls back to `after()` locally). Source at `~/Desktop/Programming/purser`, GitHub repo `mserdukoff/purser`. **Stack:** Next.js, Supabase (Postgres + GitHub OAuth), GitHub App webhooks, Upstash QStash, Anthropic API, Stripe, TypeScript. **No public URL confirmed as of this audit — do not claim it is deployed publicly unless confirmed; domains referenced in its own docs (purser.app / purser.dev) are placeholders, not verified live.**

---



## Journal (public writing)

Site section: Journal (`/journal`). 11 entries, newest first.


| Date       | Title                                                 | gist                                                                                                                                                                  |
| ---------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-19 | Grammario: Where Things Stand                         | v1.0 features, teacher suite, Japanese, Learn section; considering remix / frequency / paragraph / personal grammar library / vocab-in-context; note on building solo |
| 2025-12-17 | Why I'm Changing Everything: The New Grammario Method | Structural-First Analysis; Analyst / Strategist / Tutor; language-family strategies                                                                                   |
| 2025-10-10 | Grammario Down                                        | Backend maintenance; analysis API down                                                                                                                                |
| 2025-09-13 | My Thoughts on Go                                     | Enjoys Go pointer/method-receiver syntax vs C/C++; pass-by-value vs `*Bank` receiver; automatic struct dereference                                                    |
| 2025-08-31 | New Challenges and New Languages                      | Wheelbase ingestion too slow in Python/FastAPI; fixed 2 min → 5–25s; started learning Go for backend                                                                  |
| 2025-08-28 | Grammario has a New UI                                | Scrapped canvas-of-cards UI; sentence-top + click-word                                                                                                                |
| 2025-03-06 | Grammario & YouTube                                   | Hosting issues; Wheelbase takes precedence; plans C programming YouTube series (Daniel Bourke influence)                                                              |
| 2025-01-01 | Grammario Update 1/1/25                               | v0.1.0 live                                                                                                                                                           |
| 2024-12-29 | Grammario Project Update 12/29/24                     | Prompt engineering breakthrough; JSON grammar output                                                                                                                  |
| 2024-11-01 | Grammario Update 11/1/24                              | Prompt engineering still inconsistent; won't ship half-working; considering full language-learning app                                                                |
| 2024-09-19 | Grammario Update – September 19, 2024                 | OpenAI vs Stanza+custom suffix tests (IT/TR)                                                                                                                          |
| 2024-09-17 | Grammario Project Background                          | Origin story; language-learning hobby; example sentence breakdown                                                                                                     |


---



## Library / learning (removed from the public site, September 2026)

**The Library section was removed from the site entirely at his explicit request (September 2026)** — there is no `/#library` anchor, no "Currently reading," and no "Areas of interest" content rendered anywhere on the current site. Do not re-add a Library section, nor a `library` entry in the sidebar nav, unless he asks for it again. The facts below are kept here only as background about Matt, not as a description of current site content.

Background (not displayed on the site): he was reading *Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow* by Aurélien Géron. His areas of interest have included Natural Language Processing, Systems Design, Agglutinative Languages (e.g. Turkish), and Go Programming, plus a general C/C++ systems interest (Procmon, a planned C YouTube series).

The public study-notes repo link (previously shown under Identity above and in this section) was also removed from the site in September 2026 at his request — do not reference `github.com/mserdukoff/Notes` on the site.

---



## Other personal details

- **Photography:** Personal photo grid on `/photos` — 26 frames (`Lr*.jpg`). No captions or locations published on the site.
- **YouTube (planned, not confirmed shipped):** C programming series, starting from basics. Motivation: teaching increases knowledge. Inspired by Daniel Bourke's PyTorch course / teaching philosophy. C as "guts of programming" without going to Assembly.
- **Language-learning product opinions:** Has used every major language app (Duolingo, LingQ, etc.). Wants tools for enthusiasts, not streak-keepers. Grammar as visible structure, not memorized rules.

---



## Site surface (what exists publicly)

**As of the September 2026 single-page restructure**, the personal Next.js site is one long-scrolling homepage (`/`) with anchor sections — Hero, Work, Experience, About, Journal (teaser), Contact — navigated via a fixed left sidebar (desktop) with scroll-spy, not a top navbar. There is no Library section (removed, see above). Featured work: Wheelbase + Grammario.

`/work` and `/about` are thin redirects to their homepage anchors (`/#work`, `/#about`) rather than standalone pages (`/library` no longer exists at all, including as a redirect — the route was deleted). Real standalone routes that remain: `/journal` (full archive listing), `/journal/[slug]` (individual posts, permalinked), and `/work/grammario` (Grammario case study). There is no Photos page on the current site.

The Hero section shows a real portrait photo of Matt (`public/portrait.png`, a stylized sepia/ink-stipple engraving-style cutout with a transparent background, pulled from an earlier site version "website6.0") next to the intro text on wide screens.

---



## Quick facts another prompt might need

- Two live products: **Wheelbase** (dealership SaaS) and **Grammario** (solo, NLP grammar analyzer).
- CS degree, data science concentration, UMass Lowell, 2024.
- Government AI/data internship, Massachusetts A&F, 2025.
- Multilingual engineer; NLP work is not theoretical — he studies the languages.
- Available in Boston as of the current site copy.
- Do not invent employers, degrees, or project names beyond this list.
- Grammario ships six languages as of the September 2026 project audit (Italian, Spanish, German, Russian, Turkish, Japanese) — Japanese is no longer "in progress," despite what the April 2026 journal entry says.
- Do not claim specific GitHub repo names for the completed academic/side projects unless verified — the site only links the GitHub profile.
- Wheelbase outranks Grammario when time conflicts.

