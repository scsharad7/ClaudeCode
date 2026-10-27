# The Crew: 22 roles for an AI-generated film

Each role is an AI agent definition in [`.claude/agents/`](../.claude/agents/) (`film-*.md`).
They work in **any tool**. Claude Code runs them as subagents. Antigravity and Command Code find
them through [`AGENTS.md`](../AGENTS.md), which tells any tool to read a role's file and act as that role.
For Meta Muse, you paste in the role's brief yourself.

Every role follows the same rules:
1. **You own the story.** Roles never invent or overwrite your idea, characters, powers or style.
   Undecided things come back to you as options.
2. **One shared project.** Roles read [`GAMEPLAN.md`](GAMEPLAN.md), [`TASKS.md`](TASKS.md) and the story and design files, and write only to their own output paths.
3. **Fights are the core.** Every role has a section on its part in making the fights intense.

The film moved from live action to AI in October 2026. Eleven roles that only make sense on a real set
(stunt coordinator, grip and electric, sound mixer, location manager and others) are
[archived](archive/live-action/agents/).

## How to use them

- **Claude Code:** *"Use film-screenwriter to turn story/00-my-idea.md into a logline and synopsis."*
- **Antigravity or Command Code:** *"Do task T-003 in superhero_movie/TASKS.md."* The tool reads `AGENTS.md`, then the role file.
- **Meta Muse:** copy the task row and the role's *Responsibilities* and *Your part in the fight scenes* sections into Muse, then save the results to the task's output folder.
- **Several roles at once (Claude Code):** `/team plan <scope>` or `/team think <problem>`.

## Roster

| Role | What it does | Usually runs in |
|---|---|---|
| **Story & leadership** | | |
| `film-producer` | Scope, priorities, when to spend, proposing tasks | Claude Code |
| `film-screenwriter` | Logline → synopsis → short script → longer story | Claude Code |
| `film-story-editor` | Ranked story notes, including AI-feasibility | Claude Code or Antigravity |
| `film-director` | Visual style, tone, vision, final creative calls | Claude Code |
| **Design** | | |
| `film-character-designer` | Hero, villain and cast reference sheets; consistency starts here | Muse / Antigravity (images), Claude Code (sheets) |
| `film-production-designer` | World, locations, fight-ready environments | Muse / Antigravity (images), Claude Code (sheets) |
| `film-storyboard-artist` | Panel descriptions and keyframes (start frames for every shot) | Muse / Antigravity (images), Claude Code (prompts) |
| `film-cinematographer` | Shot lists, camera and lighting prompt language, style guide | Claude Code or Antigravity |
| `film-vfx-supervisor` | Power looks, power prompt blocks, fixes | Claude Code or Antigravity |
| **Fights ★** | | |
| `film-fight-choreographer` | Fight design, escalation, AI fight shot lists | Claude Code |
| `film-previs-animator` | Safe phone motion reference, free mocap, Blender grey-box | Antigravity / Command Code (scripts), you (filming) |
| **Production** | | |
| `film-production-manager` | Pipeline, schedule, tool budget, credit burn, shot tracker | Claude Code or Antigravity |
| `film-shot-generator` | Final prompts, generation, attempts log, selects | Antigravity (Google models), you in web tools, Muse |
| `film-continuity-supervisor` | Keeps characters, locations and damage consistent; naming rules | Claude Code |
| `film-pipeline-td` | Scripts, storage, folder layout, manifests | Antigravity or Command Code |
| **Post** | | |
| `film-editor` | Animatic, cut, fight rhythm, hiding AI flaws | You in DaVinci Resolve, advised by Claude Code |
| `film-sound-designer` | Power sounds, layered impacts, mix | You, advised by Claude Code |
| `film-voice-director` | Character voices, lip sync, voice consent | You in voice tools, advised by Claude Code |
| `film-composer` | Themes, score, music licences | You in music tools, advised by Claude Code |
| `film-colorist` | Matching shots across tools, upscaling, delivery | You in DaVinci Resolve |
| **Business** | | |
| `film-entertainment-lawyer` | AI rights, tool terms, authorship log, labels (checklists, not legal advice) | Claude Code |
| `film-distribution-marketing` | AI festivals, YouTube, behind-the-scenes content, credits programs | Claude Code or Antigravity |

★ The fight team: fight choreographer, previs animator, cinematographer, VFX and powers, shot generator, editor and sound designer.

## Project folders

```
superhero_movie/
├── GAMEPLAN.md     ← the master plan (start here)
├── TASKS.md        ← who does what, in which tool
├── CREW.md         ← this file
├── GLOSSARY.md     ← terms
├── story/          ← your idea, logline, synopsis, characters, powers, script
├── design/         ← style guide, characters, locations, storyboards, continuity bible, Muse outputs
├── fights/         ← fight map, fight docs, shot lists, AI fight playbook, motion-reference briefs
├── shots/          ← one file per generated shot (prompt, attempts, human choices)
├── production/     ← pipeline, budget, shot tracker, legal checklist, pipeline setup
├── post/           ← edit, sound, voices, music, finishing plans
├── release/        ← release and audience strategy
├── tools/          ← scripts
├── research/       ← background research
└── archive/        ← the earlier live-action plan
```

Large video and audio files never go in git (see [`.gitignore`](.gitignore)). Store them
externally; the repo holds prompts, small reference images, manifests and logs.
