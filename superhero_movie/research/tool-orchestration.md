# Tool orchestration: sharing the film's work across AI tools

*Researched 26 October 2026. These products change month to month, so check prices and file conventions against the linked official pages before you rely on them. Most claims come from news coverage and third-party guides. Where the official docs were found they are linked first, and where sources disagree this file says so.*

## TL;DR

- **"Meta Muse" is a real product family.** Muse is the brand for Meta Superintelligence Labs' models and for Meta's personal AI agent, launched in September 2026. For this film, the useful parts are **Muse Image**, which is live (including an API), and the **Muse agent**, which can browse, run code and use a GitHub connector. **Muse Video is preview-only and cannot be used yet.**
- **Google Antigravity** is Google's agent-first coding environment. It comes in two forms: the original VS Code-based IDE and, since I/O 2026, **Antigravity 2.0**, a standalone multi-agent desktop app with the `agy` CLI. It reads `AGENTS.md`, `GEMINI.md` and `.agents/rules/`. **Its old workflows feature stopped working on 19 October 2026**, and skills replace it.
- **"Command Code"** is a real terminal coding agent (`cmd`) from Command Code AI / Langbase. It reads `AGENTS.md`, not `CLAUDE.md`, and plans start at $1.
- **Recommendation:** add one `AGENTS.md` at the repo root that points to the existing role files and to a new `superhero_movie/TASKS.md` board. Give each tool its own branch, assign file ownership by task, and the filmmaker merges everything.

---

## 1. "Meta Muse": what it really is

### The name is ambiguous, but the Meta product exists

In 2026, "Muse" at Meta covers several things:

| Product | What it is | Status (Oct 2026) |
|---|---|---|
| **Muse Spark / 1.1 / 1.2 / 1.3** | Multimodal reasoning LLM. Spark was the first model under Alexandr Wang ([Axios](https://www.axios.com/2026/04/08/meta-muse-alexandr-wang), [Meta AI blog](https://ai.meta.com/blog/introducing-muse-spark-msl/)). Version 1.1 added a paid **Meta Model API** ([Meta AI blog](https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/)) | Live, API |
| **Muse Wonder** | Meta's first frontier-level model, inside the Muse app on $20 / $100 plans ([CNBC](https://www.cnbc.com/2026/10/12/meta-muse-wonder-ai-model-agent.html), [TechCrunch](https://techcrunch.com/2026/10/12/meta-releases-its-first-frontier-model-muse-wonder/)) | Live, paid |
| **Muse Spark Open** | Open-weight 816B mixture-of-experts model, with an Apple partnership to run it on clustered Mac Studios ([CNBC](https://www.cnbc.com/2026/10/15/apple-meta-partner-ai.html)) | Announced |
| **Muse (agent)** | Personal agent with its own cloud computer ([Wikipedia](https://en.wikipedia.org/wiki/Muse_(AI_agent)), [TechCrunch](https://techcrunch.com/2026/09/23/everything-new-coming-to-metas-ai-agent-muse/)) | Live in the US; reported in Canada and Japan ([aiwiz](https://aiwiz.uk/blog/meta-muse/)) |
| **Muse Image** | Meta's first in-house image model (generation and editing) | Live in the Meta AI app, meta.ai, Instagram (US) and WhatsApp, plus an API ([Kingy AI](https://kingy.ai/news/muse-video-preview-meta-ai-native-audio/)) |
| **Muse Video** | Text-to-video with native audio | **Preview only.** No date, regions or API ([Kingy AI](https://kingy.ai/news/muse-video-preview-meta-ai-native-audio/), [OrcaRouter](https://www.orcarouter.ai/blog/muse-video)) |

**Other things the user might mean:**
- **Vibes** is the AI short-video feed in the Meta AI app. You can generate, remix and **restyle clips up to 10 seconds** ([Meta help](https://www.meta.com/help/artificial-intelligence/996454095987249/)). It launched on partner models (Midjourney, Black Forest Labs) while Meta built its own ([Android Central](https://www.androidcentral.com/apps-software/meta/meta-ai-app-new-vibes-feed-full-ai-generated-videos-you-can-remix)).
- **Microsoft Muse** is a different product. It is a World and Human Action Model for *gameplay ideation*, trained on *Bleeding Edge*, with open weights on Azure AI Foundry and Hugging Face ([Microsoft Research](https://www.microsoft.com/en-us/research/blog/introducing-muse-our-first-generative-ai-model-designed-for-ga), [ETCentric](https://www.etcentric.org/muse-could-be-a-gamechanger-for-xbox-players-developers/)). It is not useful for making a film.

**Verdict:** "Meta Muse" almost certainly means Meta's **Muse app and agent**, plus **Muse Image**, and later Muse Video.

### What it can do for the film

- **Concept art and look development (now):** Muse Image creates and edits images, for example hero suit variations, villain looks, locations and keyframes. The API costs **$0.01 per image** ([RuntimeWire](https://runtimewire.com/article/meta-ships-muse-image-api-at-one-cent-per-image), [OpenRouter](https://openrouter.ai/meta/muse-image)). A third-party read of Meta's docs describes OpenAI-style `/v1/images/generations` and `/v1/images/edits` endpoints at `api.meta.ai/v1` ([OrcaRouter](https://www.orcarouter.ai/blog/muse-image)). This is unverified, so check it first.
- **Short motion tests (now, limited):** Vibes produces clips of 10 seconds or less. They are good for mood tests, not shots.
- **Video shots (later):** Muse Video is not available. Don't plan around it until Meta ships it.
- **Ideation, research and writing:** The Muse agent runs on a cloud VM with its own browser. It can write and run code, hand work to subagents and run scheduled jobs. On a Mac it can operate apps ([TechCrunch](https://techcrunch.com/2026/09/23/everything-new-coming-to-metas-ai-agent-muse/), [Digital Trends](https://www.digitaltrends.com/wearables/metas-muse-ai-agent-is-coming-to-its-smart-glasses-and-it-can-see-and-act-for-you/)). Named connectors include **GitHub, Notion and Box** ([TechCrunch](https://techcrunch.com/2026/09/23/everything-new-coming-to-metas-ai-agent-muse/)).

### Access, cost and limits

- **Access:** web, mobile, a Mac app and WhatsApp, subject to rollout ([everydev](https://www.everydev.ai/tools/muse-from-meta)).
- **Cost:** Free, **Power at $20/month** (reported 500M Muse tokens/week) and **Maximum at $100/month** (reported 3B tokens/week). The free allowance isn't published. About 100M tokens/week is widely quoted but unconfirmed. Reports say a payment card is needed even for the free plan ([Layer3Labs](https://www.layer3labs.io/guides/meta-muse-pricing), [usecarly](https://www.usecarly.com/blog/meta-muse-pricing/)).
- **API (text):** Muse Spark Standard costs **$1.25 / $4.25 per million input / output tokens**. The cheaper "Contributor" tier lets Meta train on your data ([Meta pricing](https://dev.meta.ai/docs/pricing-rate-limits), [aireiter](https://aireiter.com/blog/muse-spark-1-2-api-pricing-guide)). **Don't use Contributor for unreleased story material.**
- **Privacy:** Reports say agent queries are used for training by default and can be turned off ([Wikipedia](https://en.wikipedia.org/wiki/Muse_(AI_agent))). Turn this off before pasting the script.
- **Rights:** Before any Muse or Vibes output goes into the finished film, have `film-entertainment-lawyer` check Meta's commercial-use terms.

### How Muse takes tasks from the shared plan

Muse doesn't read `AGENTS.md`. I found no documented convention for it, so treat it as a **human-dispatched tool**:
1. The filmmaker copies the task row and brief from `TASKS.md`, or points the Muse agent at the repo through its GitHub connector. Use read-only access if possible, because write scope is undocumented.
2. Download the results into `superhero_movie/design/muse/<task-id>/` and commit them by hand, or let Claude Code or Antigravity commit them.
3. For repeatable image batches, Claude Code or Antigravity can call the Muse Image API from a script and keep the prompts in git.

---

## 2. Google Antigravity

### What it is now

- Antigravity launched as an **agent-first IDE** built on VS Code. Its **Agent Manager** ("mission control") spawns and supervises several agents across workspaces ([Medium/Google Cloud](https://medium.com/google-cloud/tutorial-getting-started-with-google-antigravity-b5cc74c103c2), [arjankc](https://arjankc.com.np/blog/google-antigravity-agent-manager-explained/)).
- **Antigravity 2.0** (Google I/O, 19 May 2026) is a standalone desktop app for macOS, Windows and Linux. It adds dynamic **subagents** in parallel, **scheduled background tasks**, and the **`agy` CLI** ([Google I/O recap](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/), [Antigravity blog](https://antigravity.google/blog/google-io-2026/), [MarkTechPost](https://www.marktechpost.com/2026/05/19/google-launches-antigravity-2-0-at-i-o-2026-a-standalone-agent-first-platform-with-cli-sdk-managed-execution-and-enterprise-support/)). An October 2026 guide says the IDE was not deprecated and recommends keeping both ([Layer3Labs](https://www.layer3labs.io/guides/google-antigravity-2-0)).
- **Gemini CLI is retired** for free, Pro and Ultra users (from 18 June 2026), and users are moved to the Antigravity CLI ([Layer3Labs](https://www.layer3labs.io/guides/google-antigravity-cli)).
- **Browser subagent:** it uses a separate model in an isolated, Antigravity-managed browser. It can click, type, read console logs and **record video** ([gend.co](https://www.gend.co/blog/google-antigravity), [helply](https://helply.com/blog/google-antigravity-explained)).
- **Artifacts:** agents produce plans, task lists, walkthroughs, screenshots and browser recordings, and you can comment on them mid-run ([aibuilderclub](https://www.aibuilderclub.com/blog/google-antigravity-complete-guide)).
- **Models:** Gemini 3.x Pro and Flash, Claude Sonnet and Opus 4.6, and GPT-OSS 120B. Sources disagree on the exact list. One unconfirmed report says **Claude models leave the free and Plus tiers on 2 November** ([codeagentswarm](https://www.codeagentswarm.com/en/guides/antigravity-plans-and-pricing), [antigravitylab](https://antigravitylab.net/en/articles/antigravity/usage-and-pricing)).

### Cost

There is a **permanent free tier with a weekly agent quota**, whose size Google doesn't publish. Paid use comes through **Google AI Pro (about $20/month)** or **Ultra ($100 or $200/month)**. Business seats start at about $30 ([CloudZero](https://www.cloudzero.com/blog/google-antigravity-pricing/), [datastudios](https://www.datastudios.org/post/is-google-antigravity-free-to-use-pricing-limits-and-what-developers-should-expect)). Calling Veo or Imagen through the Gemini API is billed **separately**. Veo 3.1 is reported at about **$0.40/s** (standard), **$0.10/s** (Fast) and **$0.05/s** (Lite) ([CloudZero](https://www.cloudzero.com/blog/veo-3-pricing/), [The Decoder](https://the-decoder.com/google-veo-3-adds-1080p-916-video-and-drops-prices-by-half/)). One unconfirmed report says the Imagen 4 endpoints closed on 17 August 2026 in favour of `gemini-3.1-flash-image`, so check before you script against it.

### How it reads project instructions (verified against official docs)

| What | Where | Notes |
|---|---|---|
| Always-on rules | `AGENTS.md` or `GEMINI.md`, at the root **or any subfolder** | No frontmatter needed. The agent walks up from the file it is editing to the root ([Rules docs](https://antigravity.google/docs/rules/)) |
| Conditional rules | `.agents/rules/*.md` | Needs a `trigger` in the frontmatter (always-on or model-decided). Older guides use `.agent/rules`, which reportedly still works for compatibility ([The Prompt Shelf](https://thepromptshelf.dev/blog/google-antigravity-agents-md-rules-guide-2026/)) |
| Global rules | `~/.gemini/` | Per user |
| Skills | `.agents/skills/<name>/SKILL.md` (global: `~/.gemini/config/skills/`) | Loaded by the agent when a task matches |
| Custom agents | `.agents/agents/<name>.md`, with `subagent: true` in the frontmatter so the main agent can call it ([Subagents docs](https://antigravity.google/docs/subagents/)) | Antigravity's version of `.claude/agents/` |
| **Workflows** | `.agents/workflows/` (or `.agent/workflows/`) | **Retired 19 Oct 2026.** Migrate with `/migrate-workflows` to skills ([Workflows docs](https://antigravity.google/docs/ide/workflows/), [migration guide](https://antigravity.google/docs/migration/workflows-to-skills/)). Don't create new ones |

Antigravity **does not read `CLAUDE.md` or `.claude/agents/`** ([Shiplight](https://www.shiplight.ai/blog/claude-code-vs-antigravity), [AI Engineer Guide](https://aiengineerguide.com/til/make-antigravity-use-agents-md-automatically/)). A community report says workspace `.agents/` can be ignored by `agy` unless the session is bound to a project ([antigravity-for-claude-code](https://github.com/yuting0624/antigravity-for-claude-code)). It is unverified, but if rules seem ignored, check that first.

### Working alongside Claude Code, and the film tasks it suits

Open the same clone (or a separate git worktree) in Antigravity and keep it on its own branch (see §5). Good fits:
- **Parallel document work.** For example, three subagents draft costume, production-design and VFX breakdowns at the same time.
- **Browser research with recordings**, such as location reference, comparable films and festival rules.
- **Scripts and asset organisation**, such as renaming, contact sheets and shot-list CSVs.
- **Google model calls** (Gemini, Veo, image models) from scripts in `superhero_movie/tools/`, with prompts and outputs committed under `design/`.

---

## 3. "Command Code"

**Confirmed.** Command Code is a terminal coding agent from Command Code AI (Langbase, Inc.). You install it with npm and run it as **`cmd`** (`cmdc` on Windows). There is also a desktop app and a VS Code panel ([GitHub](https://github.com/CommandCodeAI/command-code), [site](https://commandcode.ai/), [docs](https://commandcode.ai/docs), [changelog](https://commandcode.ai/changelog)). Its selling point is "taste": its `taste-1` model learns from what you accept, reject or edit ([launch](https://commandcode.ai/launch)). The site calls it "the best coding agent for open models". A third-party listing shows Claude through bring-your-own-key and no local models ([Terminal Trove](https://terminaltrove.com/ai-coding-agents/commandcode/)), so check which models it supports today.

- **Instructions:** it reads **`AGENTS.md`**, either `<project>/AGENTS.md` or `<project>/.commandcode/AGENTS.md`, using whichever it finds first. It also reads `~/.commandcode/AGENTS.md` and subfolder files. **It does not read `CLAUDE.md`**, though `/import` can migrate files from other agents ([Memory docs](https://commandcode.ai/docs/memory)).
- **Cost:** Go is $1 ($10 credits), GOAT $10, Pro $20, Max $100 or $200, Team Pro $40/seat. Older docs and third-party pages disagree, and the FAQ says there is **no permanent free tier** ([pricing](https://commandcode.ai/pricing), [limits](https://commandcode.ai/docs/resources/pricing-limits)).
- **Role here:** later. It is a cheap second coding agent for scripts and tooling, and it will pick up the same `AGENTS.md` without extra setup.

---

## 4. Cross-tool conventions

### AGENTS.md is the shared standard

OpenAI released AGENTS.md (August 2025) and gave it to the Linux Foundation's **Agentic AI Foundation** (December 2025) ([OpenAI](https://openai.com/index/agentic-ai-foundation/), [Linux Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation), [agents.md](https://agents.md/)). As of October 2026:

| Tool | Reads AGENTS.md? |
|---|---|
| Codex, Cursor, GitHub Copilot, Jules, Factory, Amp, VS Code | Yes, natively ([OpenAI](https://openai.com/index/agentic-ai-foundation/)) |
| Antigravity (IDE, 2.0, `agy`) | Yes, along with `GEMINI.md` ([Rules docs](https://antigravity.google/docs/rules/)) |
| Gemini CLI | It did, but it is now retired for most users (see §2) |
| Command Code | Yes, and not `CLAUDE.md` ([docs](https://commandcode.ai/docs/memory)) |
| **Claude Code** | **Only as a fallback** when no `CLAUDE.md` exists in that folder or its parents (v2.1.277, Sept 2026). It ignores `.agents/` ([InfoWorld](https://www.infoworld.com/article/4224410/claude-code-now-also-accepts-instructions-in-openais-agents-md-format.html), [DevOps.com](https://devops.com/claude-code-adds-agents-md-fallback-cutting-instruction-file-sprawl)). The reliable method is a `CLAUDE.md` that contains `@AGENTS.md` |
| Meta Muse | No documented convention |

### Making the 26 crew agents usable by every tool

`.claude/agents/film-*.md` is already plain markdown with a small YAML header. The prompts themselves are tool-neutral. Only `tools:` and the `.claude/agents/` location are specific to Claude Code.

1. **Phase 1 (do now, no duplication):** add a root `AGENTS.md` that says: *"Crew roles are defined in `.claude/agents/film-<role>.md`. To act as a role, read that file and follow its body. Ignore the `tools:` line."* Add a root `CLAUDE.md` containing just `@AGENTS.md`. Every tool then shares one set of instructions.
2. **Phase 2 (optional):** for Antigravity's native subagents, generate `.agents/agents/film-<role>.md` from the Claude files using a small script that rewrites the frontmatter and adds `subagent: true`. Commit these copies as **generated files that nobody edits by hand**. Community installers already do this mapping ([ECC guide](https://github.com/affaan-m/ECC/blob/main/docs/ANTIGRAVITY-GUIDE.md)).
3. Keep **`.claude/agents/` as the single source of truth**. Don't create a third copy.

---

## 5. Recommended task-distribution design

### Task board: `superhero_movie/TASKS.md`

```markdown
| ID | Task | Owner-tool | Role | Status | Branch | Output path | Handoff |
|----|------|-----------|------|--------|--------|-------------|---------|
| T-001 | Logline + synopsis | claude-code | film-screenwriter | review | cc/T-001 | story/logline.md | film-story-editor notes |
| T-002 | Hero-suit concept images (12) | muse | film-costume-designer | todo | — (human upload) | design/muse/T-002/ | filmmaker picks 3 → T-005 |
| T-003 | Location reference sweep | antigravity | film-location-manager | in-progress | ag/T-003 | production/locations-ref.md | film-first-ad |
```

Status values: `todo → claimed → in-progress → review → done` (or `blocked`). **Only the filmmaker sets `todo`, approves `review`, and moves cards to `done`.**

### Rules so two tools never edit the same file

1. **One task, one owner, one output path.** A tool writes only to the paths listed on its row.
2. **`GAMEPLAN.md`, `story/00-my-idea.md`, `TASKS.md` and `AGENTS.md` belong to the human.** Tools propose changes in their PR description and never edit these files directly. A tool may update only the *Status* cell of its own row, in its own branch.
3. Shared files (fight map, budget) have **one owning role**. Others add notes in `<file>.notes/<tool>-<task>.md`.
4. Claim a task by committing a `claimed` status on its branch before starting. If two branches claim the same ID, the later one stops.

### Git workflow

- **One branch per task, prefixed by tool:** `cc/T-001`, `ag/T-003`, `cmd/T-010`. Use a separate **git worktree** for each tool so they never share a working directory.
- Pull `main` before starting. Open a PR when the task reaches `review`, and the filmmaker merges. Nothing goes straight to `main`.
- Large media goes in Git LFS or external storage. Commit only the prompts, selects and a manifest.

### Who owns what

| Tool | Owns | Why |
|---|---|---|
| **Claude Code** | Planning, the story and script pipeline, review of other tools' PRs, keeping `TASKS.md` tidy on request | Already holds the 26 roles and the `/team` flow |
| **Antigravity** | Parallel department breakdowns, browser research with recordings, asset-organising scripts, Gemini/Veo/image API calls | Multiple agents, browser subagent, Google model access |
| **Meta Muse** | Concept and look-development images (Muse Image), 10-second Vibes mood tests, later Muse Video | Its real strength is visuals. Human-dispatched |
| **Command Code** | Later: utility scripts and tooling | Cheap, and reads `AGENTS.md` |

### How the filmmaker stays in control

- Only the filmmaker creates tasks, merges PRs and edits the story's fixed points.
- Every task ends in `review` with an artifact the filmmaker can read: a PR, an Antigravity walkthrough or a Muse image folder.
- Review `TASKS.md` weekly.
- Set spend caps in each tool (§6) and record them in `AGENTS.md`.

---

## 6. Gotchas

- **Cost stacks up.** Muse ($0–100), Google AI plan ($0–200), Claude and Command Code subscriptions, *plus* per-call API spend (Veo at about $0.40/s adds up fast). Put a monthly cap for each tool in `AGENTS.md` and use the API dashboards' budget alerts.
- **Rate limits and hidden quotas.** Antigravity's free weekly quota and Muse's free allowance aren't published. When you hit them, they stop work mid-task, so keep tasks small.
- **Context isn't shared.** No tool sees another tool's chat history. Everything that matters must be written into the repo: briefs, decisions and handoff notes.
- **Tools can't see each other's agents.** Claude Code ignores `.agents/`. Antigravity and Command Code ignore `.claude/` and `CLAUDE.md`. The `AGENTS.md` pointer from §4 fixes this.
- **Antigravity workflows are dead.** The guides that tell you to create `.agent/workflows/` are out of date. Use skills.
- **Model availability shifts.** Claude in Antigravity's free tier may disappear on 2 November (unconfirmed). Imagen 4 may be gone. Muse Video isn't out yet.
- **Data and rights.** Turn off Muse training-on-queries, avoid Meta's Contributor API tier for story material, and have the legal role check commercial-use terms for every generator before footage is locked.
- **One source of truth.** `GAMEPLAN.md` holds the decisions, `TASKS.md` holds who does what, and `.claude/agents/` holds the roles. Any copy (such as `.agents/agents/`) is generated, never hand-edited.
