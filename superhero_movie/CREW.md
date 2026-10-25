# The Crew — 26 AI department heads

Every key creative and production role on a film exists as a Claude Code subagent in
[`.claude/agents/`](../.claude/agents/) (files named `film-*.md`). They're available
in any session opened on this repo.

All agents follow three rules:

1. **You own the story.** They never invent or overwrite your beginning, middle, end,
   characters or powers. Anything undecided comes back to you as *Decisions needed*,
   with options and a recommendation.
2. **They share one project.** Each one reads [`GAMEPLAN.md`](GAMEPLAN.md) and
   `story/` before working, and writes its deliverables into its department folder below.
3. **Fights are the core.** Every agent has a section on what its department adds to
   making the fights intense and exciting.

> These agents plan, write and design. Real-world safety-critical work (stunts, rigging,
> pyro, weapons, legal and insurance) must be done or signed off by qualified, licensed people.
> The agents help you brief and hire those people. They don't replace them.

## How to use them

Ask in plain language and name the role, for example:

- *"Use film-screenwriter to turn my beginning/middle/end into a logline and synopsis."*
- *"Have film-story-editor give notes on story/beat-sheet.md."*
- *"film-fight-choreographer: design the midpoint fight as a fight design doc."*
- *"Get film-stunt-coordinator and film-line-producer to cost fights 1–3."*

Or run several departments together with CoCo's `/team` command, e.g.
`/team plan pre-production for the climax fight`.

## Roster

| Agent | Role | Joins | Writes to |
|---|---|---|---|
| **Development — start here** | | | |
| `film-producer` | Producer / project owner | Day one | `production/` |
| `film-screenwriter` | Screenwriter | Day one | `story/` |
| `film-story-editor` | Story editor (notes, coverage) | Development | `story/notes/` |
| `film-director` | Director (vision, tone, shot strategy) | Development | `design/` |
| `film-fight-choreographer` | Fight choreographer / action designer ★ | Development | `fights/` |
| `film-entertainment-lawyer` | Legal & business affairs (checklists, not legal advice) | Day one | `production/` |
| `film-distribution-marketing` | Audience, festivals, crowdfunding, marketing | Development | `release/` |
| **Pre-production** | | | |
| `film-line-producer` | Budget, spend, deals | Late development | `production/` |
| `film-first-ad` | Breakdown, schedule, call sheets, set safety | Pre-production | `production/` |
| `film-script-supervisor` | Script timing, continuity | Pre-production | `production/continuity/` |
| `film-casting-director` | Casting (incl. action-capable leads, doubles) | Pre-production | `production/` |
| `film-stunt-coordinator` | Stunt safety, teams, rigging ★ | Pre-production | `fights/` |
| `film-cinematographer` | Director of photography | Pre-production | `design/` |
| `film-production-designer` | World, sets, props, breakaways | Pre-production | `design/` |
| `film-costume-designer` | Hero suit, villain look, stunt multiples | Pre-production | `design/` |
| `film-makeup-sfx` | Makeup, injuries, prosthetics | Pre-production | `design/` |
| `film-vfx-supervisor` | Powers, VFX shots, previs | Development (feasibility) | `design/` |
| `film-sfx-supervisor` | Practical effects (debris, haze, breakaways) | Pre-production | `design/` |
| `film-storyboard-artist` | Storyboards, animatics | Pre-production | `design/storyboards/` |
| `film-location-manager` | Scouting, permits, logistics | Pre-production | `production/` |
| `film-grip-electric` | Gaffer & key grip (lighting, rigging) | Tech scouts | `production/` |
| `film-sound-mixer` | Production sound | Scouts | `production/` |
| **Post-production** | | | |
| `film-editor` | Editor (also cuts stuntvis in pre-pro) ★ | Pre-production | `post/` |
| `film-sound-designer` | Sound design, foley, mix ★ | Pre-production | `post/` |
| `film-composer` | Score & music licensing | Development (themes) | `post/` |
| `film-colorist` | Grade & delivery | Look tests | `post/` |

★ = the core fight team: choreographer, stunt coordinator, DP, editor, sound designer.

## Roles without their own agent

A real set also needs crew whose work is mainly hands-on. These roles don't get an agent;
the department head above them plans for them:

- **Producing:** executive producer, production coordinator, production accountant, PAs → `film-producer`, `film-line-producer`
- **Directing:** 2nd AD, 2nd 2nd AD → `film-first-ad`
- **Camera:** camera operator, 1st & 2nd AC (focus puller, loader), DIT, stills photographer → `film-cinematographer`
- **Grip & electric:** best boys, electricians, grips, dolly grip → `film-grip-electric`
- **Art:** art director, set decorator, props master, construction, scenic painters → `film-production-designer`
- **Wardrobe:** wardrobe supervisor, costume standby, cutters/fabricators → `film-costume-designer`
- **Stunts:** stunt performers, doubles, riggers, safety/medic → `film-stunt-coordinator`
- **Sound:** boom operator, sound utility → `film-sound-mixer`; foley artist, ADR mixer, dialogue editor → `film-sound-designer`
- **Post:** assistant editor, VFX artists, compositors, music supervisor → `film-editor`, `film-vfx-supervisor`, `film-composer`
- **Other:** caterer / craft services, drivers, set medic, unit publicist, BTS videographer

For which of these you can combine or skip on a small budget, see
[`research/production-roadmap.md`](research/production-roadmap.md).

## Project folders

```
superhero_movie/
├── GAMEPLAN.md        ← the master plan (start here)
├── CREW.md            ← this file
├── story/             ← your idea, logline, synopsis, beats, characters, powers, script
├── fights/            ← fight map, fight design docs, stunt plan, stuntvis, safety
├── design/            ← vision, look book, cinematography, costume, VFX, storyboards
├── production/        ← budget, schedule, breakdown, casting, locations, legal
├── post/              ← edit, sound, music, color plans
├── release/           ← festivals, marketing, distribution
└── research/          ← background research behind the plan
```
