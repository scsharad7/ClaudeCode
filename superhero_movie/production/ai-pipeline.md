# AI Pipeline: The 2–3 Minute Fight Short

> **Owner:** `film-production-manager` · **Task:** T-090 · **Status:** draft for review
> **Assumes:** ~10–15 hours/week, Stack B (~$58/month) in the paid months. See [budget.md](budget.md).
> **Story:** blank. Every story item below is **[TBD]** until you fill in [`../story/00-my-idea.md`](../story/00-my-idea.md).
> Terms: [`../GLOSSARY.md`](../GLOSSARY.md). Background: [ai-tool-stack.md §1, §5, §6](../research/ai-tool-stack.md#1-the-pipeline-at-a-glance), [ai-fight-workflow.md §4](../research/ai-fight-workflow.md#4-step-by-step-pipeline-for-one-fight).

## The short at a glance

| | |
|---|---|
| Length | 2–3 min (~150 s finished) |
| Shots | ~50–80 in total. The fight is **~20–30 of them** (~45–90 s) |
| Story, hero, villain, powers, look | **[TBD]**: yours to decide |
| Calendar | **~18 weeks (about 4 months)**: 8 free weeks, then 2 paid generation months |
| Tool spend | **~$121 core, ~$175 with a pickup month** (estimates; see [budget.md](budget.md)) |

**After the short:** make a **series of shorts** (each one reuses the design bible and adds a fight), then something longer. A solo feature is a multi-year job ([ai-tool-stack.md §6](../research/ai-tool-stack.md#6-realistic-scope-for-a-beginner)).

## The one rule

> **Don't pay for anything until the fight shot list is locked** (end of week 8, Gate 2).
> Free tiers cover learning, tests and the bake-off. A paid month only starts when there is a full list of locked shots with keyframes ready to generate.

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
| 5 | Shot list & previs | Phone video, Rokoko Vision, Mixamo, Blender grey-box | Cascadeur paid (its free edition is non-commercial) |
| 6 | Keyframes (start/end frames) | Gemini app, Muse Image | Google AI Pro (Nano Banana Pro), Muse Image API |
| 7 | Generation | Free daily credits (**tests only**); local Wan 2.2 (12 GB+ GPU) | **Kling Pro ~$32.56** + **Google AI Pro ~$19.99** (or a Seedance plan ~$18+) |
| 8 | Edit | DaVinci Resolve (free) | Resolve Studio (one-off; not needed) |
| 9 | Voice / sound / music | MMAudio; ElevenLabs free and Suno free (**non-commercial**) | ElevenLabs Starter ~$6; Suno Pro ~$10 (music month only) |
| 10 | Finishing | Resolve grade, Whisper captions | Topaz Astra ~$19–39 (Stack C only) |
| 11 | Release | YouTube; AI festival submissions | Festival fees (e.g. WAIFF €15 early-bird to 15 Nov 2026) |

## The tool bake-off

Before you pay for anything, generate **the same 3 test shots** on **2–3 tools' free tiers** (Kling, Seedance via Dreamina, Omni Flash/Veo in Flow):

| Test | What it proves |
|---|---|
| **1. Character close-up**: hero [TBD], from the reference sheet | Does the face, mask or costume stay consistent? |
| **2. Power shot**: power [TBD] (energy, debris, launch) | Does the tool sell the spectacle? |
| **3. Fight beat**: wind-up → strike, single action, no contact shown | Does fast motion hold together? Does the content filter block it? |

Same start frame, same prompt, same settings on each tool, 3 attempts each. Score each tool 1–5 on **consistency, motion, filter friction, cost per usable second, watermark/terms**. Results go in `production/bake-off.md` (T-012). The winner becomes your paid stack.

## Phase-by-phase schedule

The week ranges overlap on purpose: while you wait on one tool, you work on the next stage.

| Phase | Weeks | Roles | Tool | Deliverables | Done when |
|---|---|---|---|---|---|
| **0. Idea** | 1 | You | You | `story/00-my-idea.md` (T-001) | Beginning, middle, end, hero, villain and look are written down, roughly |
| **1. Story** | 1–3 | `film-screenwriter`, `film-story-editor`, `film-fight-choreographer` | Claude Code (write), Antigravity (second-opinion notes) | `story/logline.md`, `story/characters.md`, `story/powers.md`, `story/script/short-v1.fountain`, `fights/fight-01-[TBD].md` | You can pitch the short in two sentences and the script is under 3 pages |
| **2. Design bible** | 2–5 | `film-character-designer`, `film-production-designer`, `film-cinematographer`, `film-continuity-supervisor` | Meta Muse (images, human-dispatched), Claude Code (prompts, bible) | `design/characters/<name>/`, `design/locations/<name>/`, `design/style-guide.md`, `design/continuity-bible.md` | One approved turnaround per character, one sheet per location, fixed style keywords |
| **3. Tool bake-off** | 4–6 | `film-shot-generator`, `film-pipeline-td` | You (web tools, free tiers), Antigravity (comparison sheet, storage setup) | `production/bake-off.md`, `production/pipeline-setup.md` | 3 tests × 2–3 tools scored, paid stack chosen (**Gate 1**) |
| **4. Shot list & previs** | 5–8 | `film-fight-choreographer`, `film-previs-animator`, `film-storyboard-artist`, `film-director` | You (phone stuntvis, safe and non-contact), Claude Code (shot list), Command Code later (script to create shot files from the tracker) | `fights/fight-shot-list-template.md` filled in, previs cut (external storage), [shot-tracker.md](shot-tracker.md) rows | Every shot has an ID, a 2–5 s single action, and a tool. **Fight shot list LOCKED (Gate 2)** |
| **5. Keyframes** | 7–9 | `film-storyboard-artist`, `film-continuity-supervisor` | Meta Muse / Gemini app, Antigravity (file naming, batches) | One start frame per shot (plus an end frame for big moves), `shots/<scene>/<shot-id>.md` created | All fight keyframes approved; the rest at least 50% done |
| **6. Generation, paid month 1** | 9–12 | `film-shot-generator`, `film-continuity-supervisor`, `film-production-manager` | You (Kling, Flow/Seedance), Antigravity (Veo API batches, if used) | Selects logged in the tracker and shot files; burn tracker in [budget.md](budget.md) | **All fight shots** have a select; credits fully used |
| **7. Edit (rolling)** | 10–16 | `film-editor`, `film-director` | You (DaVinci Resolve), Claude Code (edit notes) | Assembly → rough cut; pickup list in the tracker | Rough cut plays end to end with placeholders marked |
| **8. Generation, paid month 2** | 13–16 | `film-shot-generator` | You (web tools) | Remaining shots, plus pickups | Every tracker row is `locked` or cut |
| **9. Voice / sound / music** | 14–17 | `film-voice-director`, `film-sound-designer`, `film-composer` | You (ElevenLabs, MMAudio, Suno Pro in this month), Claude Code (sound spotting list) | Dialogue, SFX, score stems (external storage) | Every impact has layered sound; music cleared on a paid plan |
| **10. Finishing** | 16–17 | `film-colorist`, `film-vfx-supervisor`, `film-editor` | You (Resolve) | Graded master, captions (SRT), AI disclosure card | Picture lock, plus a master that passes a full-screen watch |
| **11. Release** | 17–18 | `film-distribution-marketing`, `film-entertainment-lawyer` | Claude Code (copy, checklist), you (upload, submit) | `release/strategy.md` actions done, authorship log complete | Short is online or submitted to the AI festival circuit |

**Gates.** Gate 1 (end of week 6): paid stack chosen. Gate 2 (end of week 8): fight shot list locked, so paid month 1 can start. Gate 3 (end of week 12): if fewer than 80% of fight shots have selects, add a pickup month ([budget.md](budget.md#month-by-month-spend-plan)) rather than lowering the bar.

**Hours.** About 200–230 hours in total. The paid months are the heavy ones (~15 h/week), because an unused credit is wasted money.

## Rules that shape the plan

- Build every shot **image-to-video from a start frame**, never from text alone.
- Fight shots are **2–5 s and show one action each**. Sell the impact by cutting wind-up → impact frame → reaction. Never show contact. Keep it PG-13.
- **Generate the fights first** in paid month 1. They burn the most credits (5–20 attempts per kept shot).
- **Final shots and audio must come from plans whose terms allow commercial use.** Free-tier output is for tests only.
- Every generated shot gets a `shots/<scene>/<shot-id>.md` authorship record ([shot-tracker.md](shot-tracker.md)).

---

**Handoff:** pipeline drafted. Open: story [TBD], paid stack (after T-012). Next: `film-producer` (Claude Code) to fold the gates into GAMEPLAN as a proposal; you to add Phase 3+ rows to TASKS.md.
