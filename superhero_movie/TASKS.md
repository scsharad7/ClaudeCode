# Task Board

**Owner: the filmmaker.** This board is how work is handed to each tool. Rules are in
[`../AGENTS.md`](../AGENTS.md#task-protocol). In short:
- One task, one tool, one output path.
- A branch per task (`cc/`, `ag/`, `cmd/`).
- A tool may change only the **Status** cell of its own row.
- Only you move a task to `done`.

**Tools:**
- `cc` = Claude Code
- `ag` = Google Antigravity
- `muse` = Meta Muse (you paste the brief in and save the results)
- `cmd` = Command Code
- `you` = the filmmaker, by hand or in web tools

**Status:** `todo` · `claimed:<tool>` · `in-progress` · `review` · `done` · `blocked`

## Phase 0: Shape the idea

| ID | Task | Role | Tool | Status | Output | Depends on | Handoff |
|---|---|---|---|---|---|---|---|
| T-001 | Fill in your idea: beginning, middle, end, hero, villain, style, reality check | — | you | todo | `story/00-my-idea.md` | — | T-002, T-004 |
| T-002 | Logline (+3 alternates) and one-page synopsis | film-screenwriter | cc | blocked | `story/logline.md`, `story/synopsis.md` | T-001 | T-003 |
| T-003 | Story notes on the logline and synopsis (a second opinion from a different model) | film-story-editor | ag | blocked | `story/notes/T-003.md` | T-002 | T-005 |
| T-004 | Style frames: 4 images each for 3 visual styles (e.g. photoreal, anime, comic) of the hero in one pose | film-director | muse | blocked | `design/muse/T-004/` (small images only) | T-001 | you pick a style |
| T-005 | Hero, villain and power sheets (descriptions, rules, limits) | film-screenwriter | cc | blocked | `story/characters.md`, `story/powers.md` | T-002 | T-007 |

## Phase 1: Short script and fight design

| ID | Task | Role | Tool | Status | Output | Depends on | Handoff |
|---|---|---|---|---|---|---|---|
| T-006 | 2–3 minute short script built around one fight | film-screenwriter | cc | blocked | `story/script/short-v1.fountain` | T-005 | T-008 |
| T-007 | Fight map and the short's fight design doc | film-fight-choreographer | cc | blocked | `fights/fight-map.md`, `fights/fight-01-<name>.md` | T-005 | T-009 |
| T-008 | Script notes, including AI-feasibility | film-story-editor | ag | blocked | `story/notes/T-008.md` | T-006 | rewrite |

## Phase 2: Design bible and tool bake-off

| ID | Task | Role | Tool | Status | Output | Depends on | Handoff |
|---|---|---|---|---|---|---|---|
| T-009 | Hero and villain reference sheets: prompts plus approved images | film-character-designer | muse + cc | blocked | `design/characters/<name>/` | T-004, T-005 | T-012 |
| T-010 | 1–3 location sheets, including the fight location's layout | film-production-designer | muse + cc | blocked | `design/locations/<name>/` | T-006 | T-012 |
| T-011 | Style guide: look, lighting and camera prompt vocabulary | film-cinematographer | cc | blocked | `design/style-guide.md` | T-004 | T-012 |
| T-012 | Tool bake-off: the same 3 test shots on 2–3 tools' free tiers, compared | film-shot-generator | ag + you | blocked | `production/bake-off.md` | T-009, T-010, T-011 | you pick the paid stack |
| T-013 | Pipeline setup: media storage, folder layout, contact-sheet script | film-pipeline-td | ag (or cmd later) | todo | `production/pipeline-setup.md`, `tools/` | — | everyone |
| T-014 | Continuity bible: canonical refs, prompt blocks, naming rules | film-continuity-supervisor | cc | blocked | `design/continuity-bible.md` | T-009, T-010 | T-016 |

## Phase 3 onward (added when Phase 2 is done)

Shot list, keyframes, motion reference, generation, edit, sound, voices, music, finishing and release.
The full sequence is in [production/ai-pipeline.md](production/ai-pipeline.md).

## Done in this planning run (review these)

| ID | Task | Role | Tool | Status | Output |
|---|---|---|---|---|---|
| T-090 | AI pipeline, schedule, budget and shot tracker | film-production-manager | cc | review | `production/ai-pipeline.md`, `production/budget.md`, `production/shot-tracker.md` |
| T-091 | AI fight playbook, fight map template, fight shot-list template | film-fight-choreographer | cc | review | `fights/ai-fight-playbook.md`, `fights/fight-map.md`, `fights/fight-shot-list-template.md` |
| T-092 | AI legal and rights checklist | film-entertainment-lawyer | cc | review | `production/legal-checklist.md` |
| T-093 | Release and audience strategy | film-distribution-marketing | cc | review | `release/strategy.md` |
