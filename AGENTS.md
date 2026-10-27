# AGENTS.md

Shared instructions for every AI tool working in this repository: Claude Code, Google Antigravity,
Command Code, Codex, Cursor and others. Claude Code loads this file through `CLAUDE.md`.

## Projects in this repo

| Folder | Project | Notes |
|---|---|---|
| `superhero_movie/` | **Original AI-generated superhero film**: the active project | All rules below apply |
| `fix_my_itch_us/` | Static website | Separate project; the film rules don't apply |
| `stock_alert_agent/` | Python stock-alert agent | Separate project; the film rules don't apply |

---

## Superhero movie: rules for every tool

### Sources of truth

| What | Where | Who may edit |
|---|---|---|
| The filmmaker's idea (fixed points) | `superhero_movie/story/00-my-idea.md` | **Filmmaker only** |
| Plan, phases, decisions | `superhero_movie/GAMEPLAN.md` | **Filmmaker only** (tools propose changes in their PR or output) |
| Who does what | `superhero_movie/TASKS.md` | Filmmaker. A tool may change only the **Status** cell of its own task row |
| These rules | `AGENTS.md` | **Filmmaker only** |
| Crew roles | `.claude/agents/film-*.md` | Filmmaker. Any copies elsewhere are generated, never hand-edited |
| Terms | `superhero_movie/GLOSSARY.md` | Any tool, additions only |

### Crew roles

The film's 22 crew roles (screenwriter, fight choreographer, shot generator and so on) are
defined in `.claude/agents/film-<role>.md`. The roster is in `superhero_movie/CREW.md`.
**To act as a role in any tool, read that file and follow its body.** Ignore the `tools:` line
in its header, which is Claude Code-specific.

### Which tool does what

| Tool | Best for | How it gets tasks |
|---|---|---|
| **Claude Code** | Story and script, fight design, planning, reviewing other tools' work, keeping documents consistent | Reads this file and `TASKS.md`; runs crew roles as subagents |
| **Google Antigravity** | Parallel document work, browser research, scripts and asset organisation, Google model calls (Gemini, Veo via Flow or API) | Reads this file natively; pick a row in `TASKS.md` |
| **Meta Muse** | Concept art, character and location images, style frames (Muse Image); short mood tests (Vibes). Muse Video only once it ships. If Muse or Vibes isn't available where the filmmaker lives, the Gemini app is the fallback | **Human-dispatched**: the filmmaker copies the task brief into Muse, then saves results to the task's output folder |
| **Command Code** (later) | Utility scripts and tooling | Reads this file natively; pick a row in `TASKS.md` |
| **The filmmaker** | Every creative decision, web video tools (Kling, Seedance, Flow), editing in DaVinci Resolve, merging | Owns `TASKS.md` |

### Task protocol

1. **Work only from a row in `superhero_movie/TASKS.md`.** No row means no work. Propose new tasks in your output instead. Output paths on the board are relative to `superhero_movie/`.
2. **One task, one tool, one output path.** Write only to the paths on your row. If you need to change another role's file, put a note in `<that file's folder>/notes/<task-id>.md`.
3. **Branch per task**, prefixed by tool: `cc/T-012`, `ag/T-012`, `cmd/T-012`. Use a separate git worktree per tool. Never commit straight to `main`. Tasks done in Meta Muse or by the filmmaker by hand go on `you/T-012`: the filmmaker saves the outputs to the row's path and commits them, or asks Claude Code to.
4. **Status flow:** `todo → claimed → in-progress → review → done` (or `blocked`). Before claiming, run `git fetch` and check `git branch -r | grep T-0xx` for an existing claim. Then commit `claimed:<tool>` on your branch and **push it immediately**. If two branches claim the same task, the later one stops. Only the filmmaker moves a task to `done`.
5. **Handoffs live in the repo.** No tool can see another tool's chat. End every task with a short handoff note in your output file: what's done, what's open, which role or tool goes next.

### Hard rules

- **The filmmaker owns the story.** Never invent or overwrite their beginning, middle or end, characters, powers or visual style. Undecided things go back to them as options.
- **No large media in git.** Video, audio and big image batches live in external storage (see `superhero_movie/production/pipeline-setup.md` once it exists). Commit prompts, small reference images, manifests and logs.
- **Record human authorship.** Every generated shot gets a `superhero_movie/shots/<scene>/<shot-id>.md` file listing the inputs, prompt, attempts and the human choices and edits. That record is what supports copyright in the human-made parts.
- **Original characters only.** No lookalikes of existing heroes (Marvel, DC and others), no real people's faces or voices.
- **Motion-reference safety.** Any real person filmed for motion reference follows the safety box in `superhero_movie/fights/ai-fight-playbook.md` §4: slow, non-contact, soft ground, someone watching, no flips, falls, jumps or weapons, one performer per clip.
- **Fights stay PG-13:** force, energy and debris, not gore. Most major tools block blood (confirm per tool), and platforms restrict it.
- **Commercial-use terms for everything in the final film.** Final shots and audio, and every start frame or reference image that feeds a final shot, must come from plans whose terms allow commercial use. Free tiers of generators are for tests. Free software whose licence allows commercial use (DaVinci Resolve, Whisper) is fine.
- **Respect spending caps.** Monthly caps are set by the filmmaker in `superhero_movie/production/budget.md`, and a blank cap means $0. Never start paid generation or API calls unless the task row's *Paid?* column says yes.
