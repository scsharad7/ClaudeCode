# AI Fight Shot List: Template

> **How to use:** copy this file to `fight-NN-shots.md`, one per fight. Fill it in from the fight's design doc
> (from [`fight-design-doc-template.md`](fight-design-doc-template.md)) before generating anything. Rules and prompt patterns are in [`ai-fight-playbook.md`](ai-fight-playbook.md).
> The example rows use placeholders only. The real story, characters and powers are [TBD].

**Fight:** [TBD] · **Location still:** [TBD] · **Style:** [TBD] · **Target:** [TBD] shots / [TBD] s of fighting

## Shot list

| Shot ID (e.g. F01-010; pickups F01-015) | Beat | Duration | Shot type | Camera move | Characters | Action (ONE) | Start-frame image | Prompt | Reference / motion source | Tool | Attempts | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| F01-010 | B1 Establish | 5 s | Extreme wide | Slow crane down | [HERO], [VILLAIN] | They face off across [LOCATION] | `loc_wide_01.png` | *Extreme wide shot, 18mm. [LOCATION]. [HERO] left, [VILLAIN] right, 15 m apart. Slow crane down. [STYLE]. Neither moves except breathing.* | — | Veo 3.1 / Kling | 0 | todo |
| F01-020 | B1 Wind-up | 2 s | Medium, low angle | Push-in | [HERO] | Draws fist back; [POWER] gathers | `hero_med_01.png` | *Low-angle medium shot, 35mm. [HERO] draws one fist back as [POWER] gathers. Slow push-in, 120fps look. Ends before the strike.* | `ref_hero_punch_slow.mp4` | Kling Motion Control | 0 | todo |
| F01-030 | B1 Impact | 0.2 s | Impact frame | — | — | White flash, silhouette | made in edit | — | — | Resolve (editor) | — | todo |
| F01-040 | B1 Reaction | 3 s | Wide | Whip pan | [VILLAIN] | Thrown back into a wall, which cracks | `vil_wide_01.png` | *Wide shot, 24mm, whip pan right. [VILLAIN] is blasted backward off their feet and slams into a wall; concrete cracks, dust and debris. Camera shake. [STYLE].* | — | Seedance / Kling | 0 | todo |
| … |  |  |  |  |  |  |  |  |  |  |  |  |

## Column guide

| Column | Fill in |
|---|---|
| **Shot ID** | `F<fight>-<shot>`, numbered in tens in cut order: `F01-010`, `F01-020`. A pickup takes an in-between number: `F01-015`. |
| **Beat** | Beat number from the design doc + its job: Establish, Wind-up, Impact, Reaction, Breath, Reversal, Signature. |
| **Duration** | Target screen time, 2–5 s (impact frames 0.1–0.3 s). Generate longer and trim. |
| **Shot type** | Extreme wide, wide, medium, close-up, insert, impact frame. |
| **Camera move** | One move only: locked, push-in, orbit, crane, tracking, whip pan, crash zoom. |
| **Characters** | Who is in frame. Prefer one. Two only in a brief wide. |
| **Action (ONE)** | A single action. If it needs "and then", split it. Never show contact. |
| **Start-frame image** | Filename of the keyframe (and end frame, if any) built from locked character sheets, made with a tool whose terms allow commercial use. |
| **Prompt** | Final prompt text. Force words, not injury words. |
| **Reference / motion source** | Phone clip (one performer, filmed under the [playbook §4 safety box](ai-fight-playbook.md#4-motion-reference-safety)), Mixamo or Blender render, or "—". |
| **Tool** | Generator used for the select. |
| **Attempts** | Running count. At 4 rewrite the prompt, at 6 change the input, at ~10 redesign the beat. |
| **Status** | `todo · keyframe · generating · select · locked · pickup · redesign · cut` |

Every generated shot also gets a `../shots/<scene>/<shot-id>.md` authorship file (e.g. `../shots/F01/F01-010.md`): inputs, prompt, attempts, and the human choices and edits.

## Totals

| Shots | Seconds of fighting | Shots needing motion reference | High-risk shots | Total attempts |
|---|---|---|---|---|
| [TBD] | [TBD] | [TBD] | [TBD] | [TBD] |
