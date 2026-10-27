# Task Board

**Owner: the filmmaker.** This board is how work is handed to each tool. Rules are in
[`../AGENTS.md`](../AGENTS.md#task-protocol). In short:
- One task, one tool, one output path.
- A branch per task.
- A tool may change only the **Status** cell of its own row.
- Only you move a task to `done`.

**All output paths are relative to `superhero_movie/`.**

**Tools and their branch prefixes:**

| Tool | Branch | How it works |
|---|---|---|
| `cc` Claude Code | `cc/T-0xx` | Commits its own work |
| `ag` Google Antigravity | `ag/T-0xx` | Commits its own work |
| `cmd` Command Code | `cmd/T-0xx` | Commits its own work |
| `muse` Meta Muse | `you/T-0xx` | Muse can't use git. You save its results to the output path and commit them, or ask Claude Code to |
| `you` the filmmaker | `you/T-0xx` | By hand or in web tools |

**Status:** `todo` · `claimed:<tool>` · `in-progress` · `review` · `done` · `blocked`

**Paid?** says whether the task spends money on tools. A paid task needs a cap in [production/budget.md](production/budget.md). A blank cap means $0.

Weeks count from the day T-001 is done (schedule: [GAMEPLAN](GAMEPLAN.md#the-road-map)).

## Phase 0: Shape the idea (weeks 1–2)

| ID | Task | Role | Tool | Paid? | Status | Output | Depends on | Handoff |
|---|---|---|---|---|---|---|---|---|
| T-001 | Fill in your idea: beginning, middle, end, hero, villain, style, reality check | — | you | no | todo | `story/00-my-idea.md` | — | T-002, T-004 |
| T-002 | Logline (+3 alternates) and one-page synopsis | film-screenwriter | cc | no | blocked | `story/logline.md`, `story/synopsis.md` | T-001 | T-003 |
| T-003 | Story notes on the logline and synopsis (a second opinion from a different model) | film-story-editor | ag | no | blocked | `story/notes/T-003.md` | T-002 | T-005 |
| T-004 | Style frames: 4 images each for 3 visual styles of the hero in one pose (tests only) | film-director | muse | no | blocked | `design/muse/T-004/` (≤ 20 small images) | T-001 | you pick a style |
| T-005 | Hero, villain and power sheets (descriptions, rules, limits) | film-screenwriter | cc | no | blocked | `story/characters.md`, `story/powers.md` | T-002 | T-007, T-009b |

## Phase 1: Script & fight design (weeks 2–4)

| ID | Task | Role | Tool | Paid? | Status | Output | Depends on | Handoff |
|---|---|---|---|---|---|---|---|---|
| T-006 | ~3-page short script (3:10 main cut) built around one fight | film-screenwriter | cc | no | blocked | `story/script/short-v1.fountain` | T-005 | T-008 |
| T-007 | Fight map and the short's fight design doc | film-fight-choreographer | cc | no | blocked | `fights/fight-map.md`, `fights/fight-01-<name>.md` | T-005 | Phase 3 rows |
| T-008 | Script notes, including AI-feasibility | film-story-editor | ag | no | blocked | `story/notes/T-008.md` | T-006 | rewrite |

## Phase 2: Design bible & bake-off (weeks 3–6, Gate 1 at the end of week 6)

| ID | Task | Role | Tool | Paid? | Status | Output | Depends on | Handoff |
|---|---|---|---|---|---|---|---|---|
| T-015 | Confirm commercial-use terms for Muse Image and Gemini image before their images feed final shots | film-entertainment-lawyer | cc | no | todo | `production/notes/T-015.md` | — | T-009a, T-010a |
| T-009a | Hero and villain reference images | film-character-designer | muse | no | blocked | `design/characters/<name>/refs/` (≤ 20 small images each) | T-004, T-005, T-015 | T-009b |
| T-009b | Hero and villain reference sheets: description, palette, prompt block, list of refs | film-character-designer | cc | no | blocked | `design/characters/<name>/sheet.md` | T-009a | T-012, T-014 |
| T-010a | 1–3 location reference images, including the fight location | film-production-designer | muse | no | blocked | `design/locations/<name>/refs/` | T-006, T-015 | T-010b |
| T-010b | Location sheets, including the fight location's layout | film-production-designer | cc | no | blocked | `design/locations/<name>/sheet.md` | T-010a | T-012, T-014 |
| T-011 | Style guide: look, lighting and camera prompt vocabulary | film-cinematographer | cc | no | blocked | `design/style-guide.md` | T-004 | T-012 |
| T-012a | Bake-off plan: the 3 test shots, prompts and scoring sheet | film-shot-generator | ag | no | blocked | `production/bake-off.md` | T-009b, T-010b, T-011 | T-012b |
| T-012b | Run the bake-off on 2–3 tools' free tiers and score it, then choose your paid stack (**Gate 1**) | film-shot-generator | you | no | blocked | `production/bake-off-results.md` | T-012a | Phase 3 rows |
| T-013 | Pipeline setup: media storage, folder layout, contact-sheet script | film-pipeline-td | ag | no | todo | `production/pipeline-setup.md`, `tools/` | — | everyone |
| T-014 | Continuity bible: canonical refs, prompt blocks, naming rules | film-continuity-supervisor | cc | no | blocked | `design/continuity-bible.md` | T-009b, T-010b | Phase 3 rows |

## Phase 3 onward (rows added when Phase 2 is done)

Phase 3 covers the shot list, keyframes, motion reference and animatic. Phase 4 is generation, and Phase 5 is post: edit, sound, voices, music and finishing. Phase 6 is release. The full sequence is in [production/ai-pipeline.md](production/ai-pipeline.md). Paid generation starts only after **Gate 2** (shot list locked, end of week 8).

## Done in this planning run (review these)

These predate the per-task branch rule and were made on the planning branch.

| ID | Task | Role | Tool | Paid? | Status | Output |
|---|---|---|---|---|---|---|
| T-090 | AI pipeline, schedule, budget and shot tracker | film-production-manager | cc | no | review | `production/ai-pipeline.md`, `production/budget.md`, `production/shot-tracker.md` |
| T-091 | AI fight playbook, fight map, fight shot-list and design-doc templates | film-fight-choreographer | cc | no | review | `fights/ai-fight-playbook.md`, `fights/fight-map.md`, `fights/fight-shot-list-template.md`, `fights/fight-design-doc-template.md` |
| T-092 | AI legal and rights checklist | film-entertainment-lawyer | cc | no | review | `production/legal-checklist.md` |
| T-093 | Release and audience strategy | film-distribution-marketing | cc | no | review | `release/strategy.md` |
