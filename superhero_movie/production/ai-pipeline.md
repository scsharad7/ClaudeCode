# AI Pipeline: The ~3-Minute Fight Short

> **Owner:** `film-production-manager` · **Task:** T-090 · **Status:** draft for review
> **Assumes:** 10–15 hours/week (~200–230 h in total), Stack B (~$58/month) in the paid months. See [budget.md](budget.md).
> **Story:** blank. Every story item below is **[TBD]** until you fill in [`../story/00-my-idea.md`](../story/00-my-idea.md).
> Terms: [`../GLOSSARY.md`](../GLOSSARY.md). Background: [ai-tool-stack.md §1, §5, §6](../research/ai-tool-stack.md#1-the-pipeline-at-a-glance), [ai-fight-workflow.md §4](../research/ai-fight-workflow.md#4-step-by-step-pipeline-for-one-fight).

## The short at a glance

| | |
|---|---|
| Length | **~3 minutes**: a **3:10 main cut** (picture only, credits not counted) plus a **2:50 alternate cut** for competitions with a 3-minute cap. About **190 s** finished |
| Shots | ~70 in total. The fight is **~20–30 of them** (~45–90 s of fighting) |
| Script | About 3 pages |
| Story, hero, villain, powers, look | **[TBD]**: yours to decide |
| Calendar | **18 weeks part-time**, counted from the day T-001 is done. Picture lock by **15 Mar 2027 (≈ week 17)**. The only allowed extension is the pickup month, which takes it to ~22 weeks |
| Tool spend | **$0 while planning. Plan ~$175, hard ceiling $350** (estimates; see [budget.md](budget.md)) |

**After the short:** make a **series of shorts** (each one reuses the design bible and adds a fight), then something longer. A solo feature is a multi-year job ([ai-tool-stack.md §6](../research/ai-tool-stack.md#6-realistic-scope-for-a-beginner)).

## The one rule

> **Don't pay for anything until the fight shot list is locked** (Gate 2, end of week 8).
> Free tiers cover learning, tests and the bake-off. A paid month starts only when a full list of locked shots, with keyframes, is ready to generate.

## The stages

```
idea → story → design bible → tool bake-off → shot list & previs → keyframes
     → generation → edit → voice / sound / music → finishing → release
```

| # | Stage | Free option | Paid option (estimate, confirm on the official page) |
|---|---|---|---|
| 1 | Idea | You and a notebook | — |
| 2 | Story / script | Claude Code (`film-screenwriter`); free chat tiers | — (uses the plan you already have) |
| 3 | Design bible | Muse Image in the Meta AI app; Gemini app (Nano Banana 2) | Muse Image API ~$0.01/image; Google AI Pro (Nano Banana Pro) |
| 4 | Tool bake-off | Flow daily credits, Dreamina (Seedance) daily credits, Kling free, Comfy Cloud 400 credits | **None, by rule** |
| 5 | Shot list & previs | Phone motion reference, Rokoko Vision, Mixamo, Blender grey-box | Cascadeur paid (its free edition is non-commercial) |
| 6 | Keyframes (start/end frames) | Gemini app, Muse Image (**tests only** until commercial terms are confirmed) | Google AI Pro (Nano Banana Pro), Muse Image API |
| 7 | Generation | Free daily credits (**tests only**); local Wan 2.2 on a 12 GB+ GPU (licence: confirm commercial use) | **Kling Pro ~$32.56** + **Google AI Pro ~$19.99**\*, or a Seedance plan |
| 8 | Edit | DaVinci Resolve (free, commercial use allowed) | Resolve Studio (one-off; not needed) |
| 9 | Voice / sound / music | MMAudio (licence: confirm commercial use); royalty-free music library; ElevenLabs free and Suno free (**non-commercial**) | ElevenLabs Starter ~$6; music from a **human composer** or a paid library first, **Suno Pro ~$10 as a fallback** (licensed, but under litigation) |
| 10 | Finishing | Resolve grade, Whisper captions | Topaz Astra ~$19–39 (Stack C only) |
| 11 | Release | YouTube; AI festival submissions | Festival fees (e.g. WAIFF €15 early-bird until 15 Nov 2026) |

\* **Flow caveat:** Flow/Veo output below the top tier may carry a visible watermark, and its commercial terms are unconfirmed. Flow may therefore be limited to **tests and keyframes**. If the bake-off (T-012) confirms either problem, final shots move to Seedance (~+$40/month).

**Rights:** final shots, **and every start frame or reference image that feeds a final shot**, must come from a tool whose terms allow commercial use. Muse Image and Gemini image terms are still to be confirmed (T-015). If Muse or Vibes isn't available where you live, use the Gemini app (Nano Banana) instead.

## The tool bake-off

Before you pay for anything, generate **the same 3 test shots** on **2–3 tools' free tiers** (Kling, Seedance via Dreamina, Omni Flash/Veo in Flow):

| Test | What it proves |
|---|---|
| **1. Character close-up**: hero [TBD], from the reference sheet | Does the face, mask or costume stay consistent? |
| **2. Power shot**: power [TBD] (energy, debris, launch) | Does the tool sell the spectacle? |
| **3. Fight beat**: wind-up → strike, single action, no contact shown | Does fast motion hold together? Does the content filter block it? |

Use the same start frame, prompt and settings on each tool, with 3 attempts each. Score each tool 1–5 on **consistency, motion, filter friction, cost per usable second, and watermark/terms**. Results go in `production/bake-off.md` (T-012). The winner becomes your paid stack.

## Schedule: 7 phases

| Phase | Weeks | Done when / gate |
|---|---|---|
| **0 Shape the idea** | 1–2 | You can pitch the short in two sentences |
| **1 Script & fight design** | 2–4 | Script of about 3 pages, and the fight's design doc drafted |
| **2 Design bible & bake-off** | 3–6 | **Gate 1 (end of week 6):** paid stack picked |
| **3 Shot list, keyframes, previs** | 5–9 | **Gate 2 (end of week 8):** fight shot list locked. Pay only after this |
| **4 Generation** | 9–16 | **Gate 3 (end of week 12):** ≥80% of fight shots have a select, else the pickup month runs |
| **5 Post** | 10–17 | **Picture lock, week 17** (15 Mar 2027) |
| **6 Release** | 17–18 | The short is online or submitted |

### Phase notes

**0 Shape the idea (weeks 1–2)**
- 0a Idea: you, in `story/00-my-idea.md` (T-001).
- 0b Logline, characters and powers: `film-screenwriter` and `film-story-editor`, in Claude Code (with Antigravity for second-opinion notes). Output: `story/logline.md`, `story/characters.md`, `story/powers.md`.

**1 Script & fight design (weeks 2–4)**
- 1a Short script, about 3 pages: `film-screenwriter` in Claude Code, `story/script/short-v1.fountain`.
- 1b Fight design: `film-fight-choreographer` in Claude Code, `fights/fight-01-[TBD].md`. The outcome is [TBD] (suggested default: a scrappy win; the filmmaker decides).

**2 Design bible & bake-off (weeks 3–6)**
- 2a Design bible: `film-character-designer`, `film-production-designer`, `film-cinematographer` and `film-continuity-supervisor`. Meta Muse makes the images (dispatched by you); Claude Code writes the prompts and the bible. Output: `design/characters/<name>/`, `design/locations/<name>/`, `design/style-guide.md`, `design/continuity-bible.md`.
- 2b Bake-off and storage: `film-shot-generator` (you, in free web tiers) and `film-pipeline-td` (Antigravity). Output: `production/bake-off.md`, `production/pipeline-setup.md`.

**3 Shot list, keyframes, previs (weeks 5–9)**
- 3a Motion reference and previs: `film-previs-animator` and `film-fight-choreographer`. You make a phone motion reference (follow the safety box in [`../fights/ai-fight-playbook.md` §4](../fights/ai-fight-playbook.md#4-motion-reference-safety)). Big stunts come from Mixamo or Blender. The previs cut goes to external storage.
- 3b Shot list: `film-storyboard-artist` and `film-director` in Claude Code. Every shot gets an ID, a 2–5 s single action and a tool, in `fights/fight-shot-list-template.md` and the [shot-tracker.md](shot-tracker.md) rows. Command Code (later) can script the creation of the shot files.
- 3c Keyframes: one start frame per shot, plus an end frame for big moves. Made with Muse or the Gemini app on a commercial-allowed plan; Antigravity handles naming and batches. Create `shots/<scene>/<shot-id>.md` for each shot. All fight keyframes must be approved by Gate 2.

**4 Generation (weeks 9–16)**
- 4a Paid month 1 (weeks 9–12): **fight shots first**. You generate in the web tools; `film-continuity-supervisor` reviews the selects; Antigravity runs Veo API batches only if a task row says so. Log every session in the [burn tracker](budget.md#burn-tracker-template).
- **Gate 3 (end of week 12):** ≥80% of fight shots have a select. If not, the pickup month runs; don't lower the bar.
- 4b Paid month 2 (weeks 13–16): the rest of the short, plus pickups from the rough cut.
- 4c Pickup month: **budgeted as the expected case** ([budget.md](budget.md)). If it runs, it adds ~4 weeks, for ~22 weeks in total.

**5 Post (weeks 10–17)**
- 5a Edit (rolling from week 10): `film-editor` and `film-director` in DaVinci Resolve, with notes from Claude Code. Assembly, then rough cut, then the pickup list.
- 5b Voice, sound and music (weeks 14–17): `film-voice-director`, `film-sound-designer` and `film-composer`. Layer a sound on every impact. Music comes from a library or a composer first, with Suno Pro as a fallback.
- 5c Finishing: `film-colorist` and `film-vfx-supervisor`. Grade, captions (SRT), an AI disclosure card, and both cuts (3:10 and 2:50). **Picture lock in week 17.**

**6 Release (weeks 17–18)**
- `film-distribution-marketing` and `film-entertainment-lawyer` in Claude Code; you upload and submit. The authorship log must be complete before you submit.

## Rules that shape the plan

- Build every shot **image-to-video from a start frame**, never from text alone.
- Fight shots are **2–5 s, with one action each**. Sell the impact by cutting wind-up → impact frame → reaction. Never show contact. Keep it PG-13: most major tools block blood (confirm per tool).
- **Generate the fights first** in paid month 1. They burn the most credits (5–20 attempts per kept shot).
- **Finals, and the frames that feed them, come only from plans whose terms allow commercial use.** Free tiers are for tests.
- Every generated shot gets a `shots/<scene>/<shot-id>.md` authorship record ([shot-tracker.md](shot-tracker.md)).
- The heavy weeks are the paid ones (~15 h/week), because an unused credit is wasted money.

---

**Handoff:** pipeline drafted on the 7 canonical phases. Open: the story is [TBD], and the paid stack and Flow terms wait on the bake-off (T-012). Next: `film-producer` (Claude Code) to propose the gates for GAMEPLAN; you to add Phase 3+ rows to TASKS.md.
