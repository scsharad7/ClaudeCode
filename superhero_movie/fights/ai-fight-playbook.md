# AI Fight Playbook

> **Owner:** `film-fight-choreographer` · **Status:** active plan for AI fights. It replaces the old live-action stunt plan.
> **Story status:** blank. Characters, powers, fights and visual style are [TBD] until the filmmaker fills in [`../story/00-my-idea.md`](../story/00-my-idea.md).
> **Background research:** [`../research/ai-fight-workflow.md`](../research/ai-fight-workflow.md) covers tools, case studies and sources; [`../research/fight-scene-design.md`](../research/fight-scene-design.md) (§1, §5–§6 story principles only; the live-action sections don't apply). Design each fight with [`fight-design-doc-template.md`](fight-design-doc-template.md). Terms are in [`../GLOSSARY.md`](../GLOSSARY.md).

**The one idea:** AI video can't film a fight. It generates a few seconds at a time and invents the physics. So we design fights as chains of short, single-action shots, sell every hit in the edit and the sound, and lean on powers.

---

## 1. The 7 story rules (unchanged by AI)

| # | Rule | In practice |
|---|---|---|
| 1 | **Stakes inside the fight** | Each fighter wants something specific beyond "win": an object, a person, an exit. |
| 2 | **Clear geography** | The audience always knows where the exit, the hazard and the objective are. |
| 3 | **Reversals** | The advantage flips every 10–20 s: a new trick, an injury, a location change. |
| 4 | **Lose before you win** | The hero takes real damage that carries into later shots and scenes. |
| 5 | **A signature moment** | One poster-worthy image per fight. It gets the most iteration time. |
| 6 | **Sound and breathing beats** | Half of every hit is what you hear. Pauses give the fight rhythm. |
| 7 | **Escalation** | Each fight is bigger, costlier and more personal than the last. Plant a move early and pay it off later (the callback). |

Every fight must also change something (a power, an injury, a relationship). If cutting the fight loses nothing, cut it.

---

## 2. The AI rules

| # | Rule | Why |
|---|---|---|
| A1 | **2–5 s single-action shots.** One shot = one action: a wind-up, a dodge, a launch, a landing. Generate 5–10 s and keep the best 2–5 s. | Combining several actions in one prompt breaks the shot. Drift grows with length. |
| A2 | **Wind-up → impact frame → reaction, plus sound. Never show contact.** Cut just before the hit, flash 2–6 frames, then show the result. | Fists pass through faces in AI video. The cut makes the audience see the hit anyway. |
| A3 | **Favour powers over grappling.** Energy, shockwaves, debris and launches, not clinches, locks or throws. Keep two-fighter shots wide and brief. | Destruction is what the models do best. Bodies touching is what they do worst. |
| A4 | **Establish geography with a wide.** Open each fight with a 4–6 s wide made from a designed location still, and reuse that still as a reference in every shot. | Keeps space readable and locations consistent. |
| A5 | **Make one stylisation choice and keep it** (filmmaker decides: photoreal, anime/cel, or comic/graphic novel). | Stylised looks hide morphing; photoreal is the hardest and needs night, rain or smoke. |
| A6 | **PG-13 force, not gore.** Describe what the force does, not the injury. | Most major tools block blood (confirm per tool). AGENTS.md requires PG-13. |

Also: build every shot **image-to-video from a start frame**, never text alone; and **one performer per motion-reference clip**.

---

## 3. The fight pipeline

| Step | What you make | Owner role | Tool | Output |
|---|---|---|---|---|
| 1. **Fight design doc** | Story purpose, stakes, geography, beats with reversals, signature moment, ending | `film-fight-choreographer` (with the filmmaker) | Claude Code | `fight-NN-<name>.md` from [`fight-design-doc-template.md`](fight-design-doc-template.md) |
| 2. **Fight shot list** | Numbered 2–5 s shots, 3–6 per beat | `film-fight-choreographer`, with `film-cinematographer` for camera | Claude Code | `fight-NN-shots.md` from [`fight-shot-list-template.md`](fight-shot-list-template.md) |
| 3. **Keyframes** | A start frame for every shot, plus an end frame for big moves. Built from locked character sheets and location stills | `film-storyboard-artist`, `film-character-designer`, `film-continuity-supervisor` | Meta Muse Image, Gemini image (Nano Banana), Midjourney or FLUX. Any image feeding a final shot must come from a tool whose terms allow commercial use (Muse and Gemini terms: confirm) | Small stills (reference images may be committed; batches go to external storage) |
| 4. **Motion reference or previs** (only where needed: specific choreography or the signature move) | Slow phone clips of one performer, or a Blender grey-box with Mixamo moves | `film-previs-animator` (the filmmaker performs) | Phone, Rokoko Vision, Mixamo, Blender | Clips in external storage, logged in the shot list. Follow the [§4 safety box](#4-motion-reference-safety) |
| 5. **Generation** | Image-to-video from start frame + prompt + reference | `film-shot-generator` (the filmmaker runs web tools) | Kling 3.0 (Motion Control), Seedance, Veo 3.1 in Flow (may be tests and keyframes only: watermark and commercial terms unconfirmed); Wan 2.2 locally | One `shots/<scene>/<shot-id>.md` per shot (e.g. `shots/F01/F01-010.md`): inputs, prompt, attempts, human choices |
| 6. **Selects** | Watch at full and half speed, scrub hands and faces. A shot is usable if its best 20 frames work | `film-director` with `film-fight-choreographer` | Any player, Resolve | Status `select` in the shot list |
| 7. **Edit** | Cut to the previs rhythm, add impact frames, speed ramps, crops, then list pickups | `film-editor` | DaVinci Resolve (free) | Timeline + pickup list |
| 8. **Sound** | 3–5 layers per hit (whoosh, crack, thump, sub, tail), breath, a signature sound per power, silence before the biggest hit, then music | `film-sound-designer`, `film-composer` | ElevenLabs SFX (paid plan for finals), freesound.org (check licence), Resolve Fairlight. Music: royalty-free library or a human composer (Suno Pro is licensed but under litigation) | Final mix |

**Money rule:** steps 1–4 are free. Pay for generation only after the shot list is locked and a `TASKS.md` row says so.

---

## 4. Motion-reference safety

**This is the canonical safety box.** Other files link here instead of repeating it.

> **SAFETY: read before filming anything.**
> - **Slow:** half speed or slower. The AI adds the speed.
> - **Non-contact:** strikes hit air, at least a foot short of anyone.
> - **Soft ground** (grass, mats, a mattress) and **clear space** around you.
> - **Someone watching.** Warm up, and **stop if anything hurts**.
> - **No flips, no falls, no jumps of any height, no weapons** (not even fake ones).
> - **One performer per clip.** Kling Motion Control follows only one person, so film each fighter separately.
> - **Big stunts come from Mixamo or Blender, never from a person:** thrown through a wall, a flip, a fall.
> - **Never perform faster or riskier moves for social content** (behind-the-scenes clips, TikTok). Same rules on and off the shot list.
> - **A friend who performs signs a release first.** Their body and movement feed the film.

Film with a locked-off phone, no cuts, no camera move, full body in frame, plain background.

---

## 5. Prompt patterns

**Structure:** `[shot type + lens] → [subject + identity anchor] → [ONE action, with timing] → [environment] → [camera move] → [style] → [speed or physics cue] → [audio cue]`.
Replace [HERO], [VILLAIN], [LOCATION], [STYLE] and [POWER] with the filmmaker's locked descriptions, and attach their reference images.

1. **Establishing wide.** *Extreme wide shot, 18mm. [LOCATION]. [HERO] stands on the left; [VILLAIN] enters on the right, 15 meters away. Slow crane down. [STYLE]. Neither moves except breathing.*
2. **Wind-up (with motion reference).** *Low-angle medium shot, 35mm. [HERO] draws one fist back as [POWER] gathers around the forearm. Slow push-in. Slow motion, 120fps look. Ends just before the strike is thrown.*
3. **Reaction and launch.** *Wide shot, 24mm, whip pan right. [VILLAIN] is blasted backward off their feet by an unseen force and slams into a wall, which cracks and showers dust and debris. Camera shake on impact. [STYLE].*
4. **The cost (close-up).** *Close-up, 85mm. [HERO] on one knee in rubble, breathing hard, suit torn and dusty, [POWER] flickering out. A shadow falls across them. Shallow focus, slow push-in, near silence.*

**Staying inside content filters**
- Use force words: *thrown back, staggers, slams into, buckles, is knocked down*. Avoid injury words: *blood, wound, gore, kill, stab, break bones*.
- Show damage on objects and costumes (cracked concrete, a torn suit, dust), not bodies.
- No realistic guns or gunfire. Kling rejects them.
- No real people's names or faces, and no existing heroes or "in the style of" a franchise.
- If a clean prompt is still blocked, change the camera (wider, from behind) or move the action to the reaction shot.

---

## 6. When to stop regenerating and redesign the beat

| Attempts on one shot | Do this |
|---|---|
| 1–3 | Reroll. Normal. |
| 4 | Rewrite the prompt: simpler action, slower motion, one camera move. |
| 6 | Change the input: a new start frame, an end frame, or add a motion reference. |
| **~10** | **Stop. Redesign the beat.** Split the action into two shots, swap contact for a power, hide it in a reaction or an off-screen sound, or try another tool. |

Beginners should expect 5–20 attempts per kept shot. More than 10 on one shot usually means the beat asks for something AI can't do yet. Log every attempt in the shot list's **Attempts** column and the shot's authorship file.

---

## 7. Scale for the short's fight

The first deliverable is a **~3-minute AI fight short**: a **3:10 main cut** (about 190 s, credits not counted) plus a **2:50 alternate cut** for competitions with a 3-minute cap.

| | Target |
|---|---|
| Fighting on screen | **~45–90 s** inside the ~3 min short |
| Final shots | **~20–30** (average 2–3 s each) |
| Beats | 5–7 beats, 3–6 shots each, with 2–3 reversals |
| Generations | ~200–450 (about 8–15 per kept shot) |
| Motion-reference moves | 5–10 slow phone clips |
| Signature moment | 1, with a speed ramp and an impact frame |

The rest of the short's running time is setup, breathing beats and aftermath: they make the fight matter.

---

## 8. Three-act escalation for a later, longer film

| | **Act 1: opening fight** | **Act 2: midpoint loss** | **Act 3: climax** |
|---|---|---|---|
| **Purpose** | Show style, power rules and **limits**; a scrappy win | The villain's full power; the hero **loses**, with a cost | The hero wins **through growth**, beating the move that beat them |
| **Fighting on screen** | 45–75 s | 90–150 s | 3–4 min in 2–3 phases |
| **Final shots** | 20–30 | 40–60 | 70–100 |
| **Generations (approx.)** | 200–450 | 400–900 | 700–1,500 |
| **Motion reference** | 5–10 moves | 10–15 moves + Mixamo falls | 20+ moves + Blender previs of the whole climax |
| **AI-friendly design** | Powers against weaker enemies | Long villain power display; loss told in close-ups and silence | Big environment phases; signature move with ramp and impact frame |

Give the climax the most iteration time, not the most shots. Update the master stills after each fight (injuries, torn suit) so continuity carries forward.

---

## Handoff

- **Done:** AI rules, pipeline, safety, prompts, stop rule and scale.
- **Open:** every story input is [TBD]: fights, characters, powers, style.
- **Next:** filmmaker fills `story/00-my-idea.md`; then `film-fight-choreographer` fills [`fight-map.md`](fight-map.md), `fight-01-<name>.md` and `fight-01-shots.md` (shot IDs `F01-010`, `F01-020`…).
