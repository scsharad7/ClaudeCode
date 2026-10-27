# Superhero Movie: Gameplan

| | |
|---|---|
| **Project** | Original superhero film (title TBD) |
| **Approach** | **Fully AI-generated**: no crew, no shoot, no hiring |
| **First deliverable** | A **2–3 minute AI fight short** |
| **Budget** | $0 while planning. About $58/month only during 1–3 generation months: roughly **$120–350 total** for the short (estimates) |
| **Tools** | Claude Code · Google Antigravity · Meta Muse · Command Code (later) · you |
| **Current phase** | Phase 0: Shape the idea |
| **Core focus** | Fight scenes: intense, exciting, and driven by the story |
| **Who does what** | [TASKS.md](TASKS.md) (task board) · [AGENTS.md](../AGENTS.md) (rules for every tool) · [CREW.md](CREW.md) (22 roles) · [GLOSSARY.md](GLOSSARY.md) |

The earlier live-action plan is [archived](archive/live-action/).

---

## The strategy

1. **Make a 2–3 minute AI fight short first.** Even the AI features released in 2026 needed teams and big budgets, and a solo feature would take years. A short is achievable in about **2–4 months part-time**. It's also exactly what wins AI film competitions: a solo creator with no film training won the 2026 Runway AI Festival Grand Prix with an 8-minute film. ([research](research/ai-tool-stack.md#6-realistic-scope-for-a-beginner))
2. **Plan everything for free, then pay.** Story, script, character design, shot list and previs cost nothing. Pay for generation only once the fight shot list is locked, and use those paid months fully.
3. **Build every shot from images, not text.** Lock character and location reference sheets first, then generate each shot from a start frame. Keeping characters looking the same is the hardest problem in AI film. A **masked hero** with bold colours and an emblem makes it much easier.
4. **Design the fights for what AI does well.**
   - Use short single-action shots, and sell each hit by cutting from wind-up to impact to reaction, with heavy sound.
   - Use powers, energy and destruction instead of close grappling.
   - Use safe phone-filmed motion reference for key moves.
5. **Own what you can, and release where AI films are welcome.**
   - Log your human choices for every shot.
   - Make final shots only on plans that allow commercial use.
   - Label the film as AI.
   - Aim at the AI film circuit and YouTube. Some mainstream genre festivals bar fully AI films.

---

## Your next 3 actions (this week)

1. **Fill in [`story/00-my-idea.md`](story/00-my-idea.md)** (task T-001). It now asks AI-route questions: tool budget, computer, visual style, hours per week.
2. **Claude Code:** *"Do T-002 in superhero_movie/TASKS.md"*. The screenwriter turns your idea into a logline and synopsis.
3. **Start the parallel work:**
   - **Antigravity:** open this repo and say *"Do T-013"* (pipeline setup). This can start today.
   - **Meta Muse:** do T-004 (style frames) by hand once your idea file names the hero.

---

## The road map

The detailed schedule, tool per stage and "done when" criteria are in [production/ai-pipeline.md](production/ai-pipeline.md). In outline:

| Phase | Weeks (part-time) | What happens | Main tools | Cost |
|---|---|---|---|---|
| **0. Shape the idea** | 1–2 | Your idea → logline, synopsis, hero, villain, powers; pick a visual style from style frames | Claude Code, Muse, you | $0 |
| **1. Short script & fight design** | 2–5 | 2–3 min script; fight map; the short's fight design doc | Claude Code, Antigravity (notes) | $0 |
| **2. Design bible & tool bake-off** | 4–7 | Character and location sheets, style guide, continuity bible; the same 3 test shots on 2–3 free tiers to choose your video tool | Muse, Claude Code, Antigravity, you | $0 |
| **3. Shot list, keyframes, previs** | 6–9 | Fight shot list (~20–30 shots), keyframes for every shot, safe motion reference, an animatic | Claude Code, Muse/Antigravity, you | $0 |
| **4. Generation** | 8–12 | Generate shots, log attempts, choose selects, redesign beats that fail | You in web tools, Antigravity | **paid months** |
| **5. Post** | 11–14 | Edit, sound design, voices, music, colour matching, upscaling | You in DaVinci Resolve (free) + voice and music tools | voice/music month |
| **6. Release** | 14+ | AI festivals and competitions, YouTube, behind-the-scenes content | Claude Code, you | entry fees |

**After the short:** a series of short episodes in the same world, then longer pieces. Use the short as your pitch and portfolio.

---

## How the work is shared across tools

| Tool | What it does on this film | How you hand it work |
|---|---|---|
| **Claude Code** | Story and script, fight design, planning, reviewing other tools' output, keeping documents consistent | *"Do T-0xx in superhero_movie/TASKS.md"*, or name a crew role |
| **Google Antigravity** | Second-opinion story notes, browser research, scripts and asset organisation, Google model calls (Gemini, Veo via Flow) | Open the repo; *"Do T-0xx"*. It reads [AGENTS.md](../AGENTS.md) automatically |
| **Meta Muse** | Style frames, character and location images (Muse Image); short mood tests (Vibes); video once Muse Video ships | You paste the task brief in and save the results to the task's output folder |
| **Command Code** (later) | Utility scripts | Reads AGENTS.md; *"Do T-0xx"* |
| **You** | Every creative decision; web video tools (Kling, Seedance, Flow); editing; merging every tool's work | You own [TASKS.md](TASKS.md) and this file |

**Rules that keep tools from colliding:**
- Each task names one tool and one output path.
- Each task gets its own git branch (`cc/T-002`, `ag/T-013`).
- Tools never edit this file, your idea file, `TASKS.md` or `AGENTS.md`. They propose changes and you decide.

Full protocol: [AGENTS.md](../AGENTS.md#task-protocol).

**Before using Muse:** turn off "use my data for training" in its settings. Check Meta's commercial-use terms before any Muse image goes into the final film (the legal checklist covers this).

---

## The fight plan

Practical guide: [fights/ai-fight-playbook.md](fights/ai-fight-playbook.md). Research: [AI fight workflow](research/ai-fight-workflow.md) and [fight design principles](research/fight-scene-design.md).

### Story rules (unchanged from live action)
1. Every fight is about something. If the story doesn't change when you cut it, it isn't finished.
2. Each fighter wants something specific.
3. Clear geography: the audience always knows where everyone is.
4. Reversals: the advantage keeps changing hands.
5. The hero loses before they win.
6. Powers have rules and costs, and the fight exploits them.
7. One signature moment per fight.

### AI rules (new)
- **Build from 2–5 second single-action shots.** One action per shot.
- **Never show contact.** Cut wind-up → impact frame → reaction, and let layered sound sell the hit.
- **Favour powers over grappling.** AI renders energy, debris, launches and destruction well, but breaks on two bodies tangled together.
- **Open with a wide that shows the whole space,** then return to it.
- **Choose the visual style deliberately.** Stylised looks (anime, comic, graphic novel) hide AI flaws; photoreal shows them.
- **PG-13 force, not gore.** Every major tool blocks blood. Describe force, not injury.
- **If a beat fails after about 10 attempts, redesign the beat.** Don't keep paying for it.

### Motion reference: safety first
Some tools copy movement from a phone video of you. When you film reference:
- Move **slowly** and **never make contact**.
- Use **soft ground** and **clear space**.
- **No flips, falls, jumps or weapons.**
- Film **one person per clip**.

The AI adds the speed and power. Nobody needs to get hurt making an AI fight.

### Scale
- **The short's fight:** about **20–30 shots**, roughly **45–90 seconds of fighting** inside a 2–3 minute short.
- **For a longer film later:**
  - Act 1 fight: ~20–30 shots
  - Midpoint fight: ~40–60 shots
  - Climax: ~70–100 shots

---

## Budget at a glance

| Stack | Per month | What it gets you |
|---|---|---|
| **A: Free** | $0 | Tests and planning; ~1–2 min of footage a month, watermarked and mostly **not** cleared for commercial use |
| **B: Starter (recommended)** | ~$58 | Google AI Pro + Kling Pro + ElevenLabs Starter + DaVinci Resolve (free); ~50–130 finished seconds a month |
| **C: Faster** | ~$150–190 | ~1.5–3.5 finished minutes a month |

A beginner usually needs 5–20 attempts per usable shot, and that waste is the real cost. Prices change monthly, so confirm them on each official page. Details, a credit calculator and spending caps: [production/budget.md](production/budget.md).

---

## Rights and release at a glance

- **What you can own:** prompts alone don't make you an author under current US Copyright Office guidance. You **can** own the script, the characters as written, your edit (selection and arrangement) and anything you change by hand. So **log your human choices per shot** from day one (`shots/<scene>/<shot-id>.md`).
- **Final shots, voices and music only on paid plans** that allow commercial use. Several free tiers don't.
- **Original characters only:** no lookalikes of existing heroes, and no real people's faces or voices.
- **Label the film as AI** on every platform.
- **Where to release:** the AI film circuit (AI film festivals and competitions) plus YouTube. Some mainstream genre festivals bar fully AI films.

Details: [production/legal-checklist.md](production/legal-checklist.md) (not legal advice) and [release/strategy.md](release/strategy.md).

---

## Decisions only you can make

| Decision | Options | Recommendation |
|---|---|---|
| Visual style | Photoreal / anime / comic-book / stylised 3D | Decide from the T-004 style frames. **Stylised** is more forgiving for fights |
| Hero's face | Masked or helmeted / face visible | **Masked**: much easier to keep consistent |
| Tool budget | $0 / ~$58 / ~$150–190 per month | **$0 now; ~$58 for 1–3 months** once the shot list is locked |
| Main video tool | Decided by the bake-off (T-012) | Test Kling and Seedance for fights, and Google Flow for cheap volume |
| First target | An AI film competition deadline, or YouTube first | Pick one early: a deadline keeps the project moving. Some competitions set minimum lengths (Runway's is 3 minutes), so check before locking the short's length |

---

## Planning docs

| Doc | Role | What it gives you |
|---|---|---|
| [production/ai-pipeline.md](production/ai-pipeline.md) | `film-production-manager` | Stage-by-stage pipeline, schedule, tool per stage, tool bake-off |
| [production/budget.md](production/budget.md) | `film-production-manager` | Tool stacks, month-by-month spend, credit calculator, spending caps |
| [production/shot-tracker.md](production/shot-tracker.md) | `film-production-manager` | Master shot tracker and the per-shot authorship record template |
| [fights/ai-fight-playbook.md](fights/ai-fight-playbook.md) | `film-fight-choreographer` | How to make intense AI fights, prompt patterns, the safety box |
| [fights/fight-map.md](fights/fight-map.md) | `film-fight-choreographer` | Fight escalation template |
| [fights/fight-shot-list-template.md](fights/fight-shot-list-template.md) | `film-fight-choreographer` | Fill-in fight shot list |
| [production/legal-checklist.md](production/legal-checklist.md) | `film-entertainment-lawyer` | AI rights checklist and tool-terms table (not legal advice) |
| [release/strategy.md](release/strategy.md) | `film-distribution-marketing` | AI festival calendar, YouTube, audience building, zero-budget funding |

## Research behind this plan
- [AI tool stack](research/ai-tool-stack.md): tools by stage, consistency, content limits, budget stacks, realistic scope
- [AI fight workflow](research/ai-fight-workflow.md): what AI can and can't do in fights, motion transfer, prompts, case studies
- [AI legal and release](research/ai-legal-and-release.md): copyright, tool terms, platform labels, festivals, funding
- [Tool orchestration](research/tool-orchestration.md): what Meta Muse, Antigravity and Command Code are, and how to share work
- Still relevant from before: [story development](research/story-development.md) and [fight scene design](research/fight-scene-design.md)

*Tool features, prices and policies change monthly. All figures are October 2026 estimates; confirm them on official pages before paying.*
