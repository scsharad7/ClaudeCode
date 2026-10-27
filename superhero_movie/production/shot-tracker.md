# Master Shot Tracker

> **Owner:** `film-production-manager` · **Task:** T-090 · **Status:** template, no shots yet
> Rows are added once the short's shot list is drafted (pipeline Phase 4, [ai-pipeline.md](ai-pipeline.md)). The fight's detailed plan (camera, action, motion reference) lives in `fights/fight-shot-list-template.md`. This tracker is the **one list of every shot's status**.

## How to use it

- **One row per shot** in the whole short: fight and non-fight.
- **Shot IDs:** `<scene>-<number>`, e.g. `S01-010`. Number in tens so pickups slot in (`S01-015`). Fight scenes can use `F01-010`. Scene names are **[TBD]**.
- **Update after every generation session.** The `attempts` count feeds the burn tracker in [budget.md](budget.md#burn-tracker-template).
- **Status flow:** `todo` → `keyframe` → `generating` → `select` → `locked`, plus `pickup` (needs a regeneration after the edit) or `cut`.
- A shot is **`locked`** when its select is in the edit and its shot file is complete.

## Tracker

| Shot ID | Scene | Beat | Duration (s) | Status | Tool | Attempts | Select | Shot file |
|---|---|---|---|---|---|---|---|---|
| F01-010 | [TBD] | B1 establish | 4 | todo | [TBD] | 0 | — | [shots/F01/F01-010.md](../shots/F01/F01-010.md) |
| F01-020 | [TBD] | B1 wind-up | 2 | todo | [TBD] | 0 | — | [shots/F01/F01-020.md](../shots/F01/F01-020.md) |
| F01-030 | [TBD] | B1 impact frame | 0.2 | todo | Edit | — | — | [shots/F01/F01-030.md](../shots/F01/F01-030.md) |
| … | | | | | | | | |

**Totals (update weekly):** shots [ ] · locked [ ] · total attempts [ ] · finished seconds [ ] / ~150 target.

## The per-shot file: `shots/<scene>/<shot-id>.md`

Every generated shot gets its own file. **This is the human-authorship record.** Prompts alone don't make you an author (US Copyright Office, 2025). What you can show is the human work: your script, your characters, your start frames and choices, your selection and arrangement, and your hand edits. This file is the evidence. Keep it honest and current, and disclose the AI material when you register anything ([ai-legal-and-release.md](../research/ai-legal-and-release.md)).

- Commit the `.md` file and small reference stills. **Never commit video.** Takes live in external storage ([pipeline-setup.md](pipeline-setup.md), once it exists); link to them by path.
- Write the attempt log as you go, not afterwards.

### Template

```markdown
# <shot-id>: <one-line action>

| | |
|---|---|
| Scene / beat | [TBD] / [beat] |
| Planned duration | [s] |
| Status | todo / keyframe / generating / select / locked / pickup / cut |
| Tool and plan | e.g. Kling Pro (paid: commercial use OK, confirm) |

## Inputs (human-made or human-chosen)
- Script lines / beat: [quote or link]
- Start frame: `design/...png`, made with [tool], chosen by [name] from [N] options
- End frame (if any):
- Character / location refs: [links into design/]
- Motion reference: [your phone clip or previs, external path]

## Prompt
[the exact prompt text, plus the negative prompt if used]

## Settings
Model/version · mode (image-to-video, motion control...) · clip length · resolution · seed · camera control

## Attempts log
| # | Date | Change from the last attempt | Result | Keep? |
|---|---|---|---|---|
| 1 | | first pass | hands broke at 2 s | no |
| 2 | | prompt rewritten: one action only | good frames 0.5–3.0 s | candidate |

## Selected take
Attempt # · file (external path) · frames/seconds used · why this one

## Human edits
Trim in/out · speed ramp · reframe or crop · paint-out or composite · grade · sound layered on · anything drawn or made by hand

## Notes
Continuity flags, pickup reason, filter refusals
```

---

**Handoff:** template ready. Open: rows wait for the shot list (Phase 4). Next: `film-pipeline-td` (Antigravity, or Command Code later) to script the creation of shot files from this table; `film-shot-generator` (you, in web tools) fills in the attempts; `film-continuity-supervisor` (Claude Code) reviews the selects.
