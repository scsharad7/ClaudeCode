# AI Fight Workflow: Making Intense Fight Scenes With Generative Video (Late 2026)

Companion to [`fight-scene-design.md`](./fight-scene-design.md). Its story rules (stakes, geography, reversals, losing before winning, a signature moment, sound, escalation) still apply. This file replaces the production pipeline, since there is no shoot and no crew.

**Core idea:** AI video can't film a fight. It generates a few seconds at a time and invents the physics, so design for that: short shots, one action per shot, impact sold in the edit, and powers wherever possible.

---

## 1. What AI Video Does Well and Badly in Action (October 2026)

**Current tools:**
- Kling 3.0: 3–15 s, up to 6 shots per generation ([Akool](https://akool.com/blog-posts/kling-3-0-ai-video-on-akool-15s-native-audio-multi-shot-storytelling-and-character-consistency)). Kling 4.0, up to 30 s, reached the app on 15 October ([Pinggy](https://pinggy.io/blog/best_video_generation_ai_models/)).
- Seedance 2.0: 15 s, with image, video and audio references ([Artlist](https://help.artlist.io/hc/en-us/articles/35245474706333-Seedance-2-0)). Seedance 2.5: 30 s ([No Film School](https://nofilmschool.com/seedance-2-5-updates)).
- Veo 3.1: 4–8 s, extend, first/last frame ([DataCamp](https://www.datacamp.com/tutorial/veo-3-1-complete-guide-with-examples)).
- Wan 2.2: open weights. Wan 3.0 is API-only ([WaveSpeed](https://wavespeed.ai/blog/video-model-access/is-wan-3-0-open-source/)).
- Sora is shut down ([Axios](https://www.axios.com/2026/03/24/openai-discontinue-sora-video-app)).

Model names change every few months; the workflow doesn't.

| Area | Good at | Still breaks | What to do |
|---|---|---|---|
| **Clip length** | 5–15 s routinely, 30 s on the newest models | Identity, timing and motion drift in longer takes, including 30 s ones ([PixVerse review](https://pixverse.ai/en/blog/seedance-2-5-ai-video-generator-review)) | Generate 5–10 s, use the best 2–5 s |
| **Physics and contact** | Big, simple forces: a body flying back, a shockwave | Fists that pass through faces, collisions that look wrong, hands passing through objects ([Kling's own blog](https://kling.ai/blog/limitations-of-current-ai-video-generation-technology)) | Don't show contact. Cut on it (Section 2) |
| **Grappling** | Almost never good | Coherence falls apart when bodies interact up close ([is4](https://is4.ai/blog/our-blog-1/ai-video-generation-2026-what-works-what-doesnt-340)) | No clinches, no locks, no throws held on screen |
| **Motion blur and morphing** | Stylised speed lines and smear | Fast motion smears into melted bodies and swapped limbs | One fast action per shot, slow-motion prompts, speed up in the edit |
| **Limbs and hands** | Better than in 2025 | Extra fingers, joints bending the wrong way, fingers merging mid-move ([HackerNoon](https://hackernoon.com/how-to-fix-warped-hands-and-faces-in-ai-generated-video)). Most tools still fail on hands and fast motion ([PixVerse](https://www.pixverse.ai/en/blog/best-ai-video-generators)) | Fists closed, gloves, hands in motion blur, crop or cut before the error |
| **Two characters** | Facing off, circling, one hit and one reaction | Faces swap, bodies merge, the wrong character moves | Most action shots show one character; keep two-shots wide and brief |
| **Camera** | Push-ins, orbits, crane-ups, tracking, slow motion | Real handheld shake is hard (a VFX artist used this to argue the Cruise/Pitt clip had live reference, [Newsweek](https://newsweek.com/ai-brad-pitt-tom-cruise-fight-may-not-be-ai-11554875)) | One camera move per shot; add shake in post |
| **Continuity** | Character sheets, reference images, multi-shot modes | Costume damage, props and injuries reset between shots; a new angle is a new generation ([invideo](https://invideo.io/faq/which-ai-video-generator-is-best-for-action-scenes/)) | Lock one master still per character ([Picsart](https://picsart.com/blog/how-to-make-ai-fight-videos/)) and generate shots from start frames |

**Plan for waste.** *Hell Grind* needed more than 16,000 generations for 253 shots, about 63 per kept shot ([AI Weekly](https://aiweekly.co/alerts/higgsfield-ai-feature-film-debuts-at-cannes), [The Location Guide](https://www.thelocationguide.com/industrynews/how-hell-grind-brought-ai-filmmaking-to-cannes)). With a good start frame and a simple action, expect 5–20.

---

## 2. Translating the Live-Action Principles to AI

**Geography from establishing shots.** Open every fight with a 4–6 s wide establishing shot generated from a still you designed: exits, hazards, the objective (detonator, hostage, ledge). Reuse that location image as a reference in every shot so the audience always knows where everything is. Decide for each shot whether it covers *geography* (wide) or *impact* (tight) ([HackerNoon](https://hackernoon.com/how-to-cover-a-fight-scene-in-ai-generated-video-so-the-audience-can-follow-it)).

**Build the fight from 2–5 s shots.** Each shot is one complete action: a wind-up, a dodge, a hit, or a body landing. Combining several actions in one prompt tends to fail ([Seedance fight guide](https://seedance2pro.io/blog/seedance-2-fight-scene-guide)). Hong Kong editing already works this way.

**Write the fight beat by beat.** Turn the beat table in the design doc into a shot list (Section 4) before generating anything. One beat is usually 3–6 shots: setup, action, impact, reaction, aftermath.

**Sell impact through cuts, reactions and sound.**
1. **Shot A:** [HERO] swings toward the camera; cut just before contact.
2. **Shot B:** a 2–6 frame flash or impact frame, with a bass hit.
3. **Shot C:** [VILLAIN] snaps back and is thrown into the wall.

No shot shows contact, but the audience sees it anyway. Reaction shots (a pained face, a bystander flinching) are cheap to generate and carry the emotion.

**Powers are your advantage.** Energy, debris, shockwaves and collapsing concrete are what these models do best, and nobody knows what a plasma blast "should" look like. Design toward ranged powers, destruction and body launches, and away from close-range martial arts. Keep the power rules and costs: the effects are cheap, and the stakes still come from the limits.

**Stylisation hides flaws.** Most MIT AI Film Hack entries used cartoonish styles, partly because inconsistencies show less ([arXiv](https://arxiv.org/pdf/2504.08296)).
- **Anime or cel-shaded:** smears and speed lines make morphing look intentional.
- **Comic or graphic novel:** inks, halftone and freeze-frame panels on key beats.
- **Photoreal:** the hardest. Hide it with night, rain and smoke.

Pick one look and keep it.

---

## 3. Motion and Performance Transfer: You Become the Stunt Team

Text prompts produce generic fighting. Filming your own movement gives you specific, repeatable choreography, the AI version of the live-action stuntvis.

> **SAFETY. Read this before filming.** Do every reference move **slowly**, at half speed or slower, **without contact**: strikes hit air, with **one performer per clip** (no partner in frame). Work on **soft ground** (grass, mats, a mattress) with space cleared around you. **No flips, falls, jumps of any height, takedowns or weapons.** The AI adds the speed and the impacts. Your job is clean, readable poses. Warm up, have someone watching, and stop if anything hurts. Big stunts (a body thrown through a wall, a flip) come from Mixamo or Cascadeur animation, never from your body.

### Video-to-video and motion-control tools

| Tool | What it does | Fight notes | Cost |
|---|---|---|---|
| **Kling Motion Control (2.6 / 3.0)** | Reference video plus character image produces your motion on the character, from a 3–30 s reference ([Kling guide](https://kling.ai/quickstart/motion-control-user-guide)) | **One performer per generation**; with several people it takes the largest one in frame. The reference should have no cuts and no camera move ([Runway help](https://help.runwayml.com/hc/en-us/articles/50280558448147-Creating-with-Kling-3-0-Motion-Control)). Film each fighter separately | Free tier ~66 credits, watermarked, low-res, non-commercial ([eesel](https://eesel.ai/blog/kling-ai-pricing)) |
| **Seedance 2.0 / 2.5 references** | Tag `@video1` as motion or camera reference alongside character images ([Magic Hour](https://magichour.ai/blog/how-to-use-seedance-20)) | Its site reportedly showed green-screen stunt performers as fight reference ([Newsweek](https://newsweek.com/ai-brad-pitt-tom-cruise-fight-may-not-be-ai-11554875)). Exactly this workflow | Via Dreamina/CapCut and resellers; paid |
| **Runway Act-Two** | Performance video drives the character's body, face and hands ([Runway](https://help.runwayml.com/hc/en-us/articles/42311337895827)) | Best for close-ups: face, a fist rising, breath. Struggles with occlusion and complex camera ([Nemo guide](https://www.nemovideo.com/model/runway-act-two)) | Paid credits |
| **Runway Aleph** | Restyles or edits existing video by prompt: relight, add objects, new angles ([Layer](https://www.layer.ai/docs/models/runway-gen4-aleph)) | Turns your phone footage or a Blender render into the final look; adds debris and energy | Paid |
| **Wan 2.2 Animate** | Open source; animates or replaces a character using your video's pose ([ComfyUI docs](https://docs.comfy.org/tutorials/video/wan/wan2-2-animate)) | Free with unlimited attempts, but the 14B model needs about 12–16 GB of VRAM with quantisation ([ComputingForGeeks](https://computingforgeeks.com/run-wan-video-generation-locally/)) or a rented cloud GPU | Free if you have the GPU |
| **Viggle (Mix)** | Character image plus motion clip, very simple to use | Fast for previs and comedy beats; quality below Kling | Free plan of about 5 videos/day ([Aixploria](https://www.aixploria.com/?p=26965)) |

### 3D previs and animation (for moves you must not perform)

- **Blender** ([blender.org](https://www.blender.org)): free. Block the fight with grey mannequins on a floor plan of your location, then render a viewport video from your planned angles. That render is the motion and camera reference.
- **Mixamo**: free with an Adobe ID and royalty-free for films. It has hundreds of punches, kicks, hit reactions and knockdowns ([Adobe FAQ](https://helpx.adobe.com/en/creative-cloud/faq/mixamo-faq.html)). It is reportedly in maintenance mode, with community Blender add-ons ([Cinevva](https://app.cinevva.com/guides/free-character-animations-rigging)).
- **Cascadeur**: physics-assisted fight animation; AutoPhysics turns rough poses into plausible motion. The free edition is **non-commercial and saves only `.casc` files** ([CG Channel, Aug 2026](https://www.cgchannel.com/2026/08/nekki-releases-cascadeur-2026-2-with-animation-layers/)). Use it for learning and private previs, and check the licence before using its output in a film you sell.
- **AI mocap from phone video**: Rokoko Vision (free single-camera, FBX out) and DeepMotion (about 60 s a month free, non-commercial) ([Cinevva](https://app.cinevva.com/guides/ai-animation-generators-3d), [CG Channel](https://www.cgchannel.com/2023/09/check-out-free-browser-based-ai-mocap-tool-rokoko-vision/)). For Move AI, check the current free tier. These turn your slow moves into 3D, which you can then speed up in Blender, where you also add the second fighter.

**Free beginner stack:** phone, then Rokoko Vision or Mixamo, then a Blender grey-box video, then free-tier tests. Pay for one month of one generator only once the shot list is locked.

---

## 4. Step-by-Step Pipeline for One Fight

1. **Design doc.** Fill in the template from `fight-scene-design.md`: stakes, geography, beats and reversals, the signature move, the ending.
2. **Look bible.** Make one master still per character (a turnaround) and one per location, with fixed style keywords.
3. **Stuntvis.** Act out the beats slowly on a phone, or block them in Blender with Mixamo, and cut that into a rough edit at the speed you want.
4. **Shot list.** Turn the stuntvis cut into numbered 2–5 s shots (template below).
5. **Keyframes.** Make a start frame for every shot, plus an end frame for big moves. Start frames are how you control continuity: injuries, costume, position in the room.
6. **Generate.** Use image-to-video with the start frame, prompt and motion reference. After 3–4 failed attempts, rewrite the prompt instead of rerolling.
7. **Selects.** Watch at full and half speed and scrub for hands and faces ([FilmDaft](https://filmdaft.com/?p=34430)). A shot is usable if its *best 20 frames* work.
8. **Assembly, then pickups.** Cut to the stuntvis rhythm, then regenerate the missing reactions and inserts.
9. **Finish.** Speed ramps, interpolation, upscaling, grade, grain, shake.
10. **Sound.** Impacts, breath, power sounds, silence, then music.

### AI Fight Shot List (fill-in template)

| Shot # | Beat | Duration | Shot type | Camera move | Characters | Action (ONE) | Start-frame image | Prompt | Reference / motion source | Tool | Attempts | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | B1 Establish | 5 s | Extreme wide | Slow crane down | HERO, VILLAIN | They face off across the rooftop | `loc_roof_wide.png` |  | — | Veo / Kling |  | Todo |
| 02 | B1 Wind-up | 2 s | Medium, low angle | Push-in | HERO | Pulls fist back; energy crackles | `hero_med_01.png` |  | `me_punch_slow.mp4` | Kling MC |  | Todo |
| 03 | B1 Impact | 0.2 s | Impact frame | — | — | White flash with silhouette | made in edit |  | — | Editor |  | Todo |
| 04 | B1 Reaction | 3 s | Wide | Whip pan | VILLAIN | Thrown into the water tank, which bursts | `vil_wide_02.png` |  | — | Seedance |  | Todo |
| … |  |  |  |  |  |  |  |  |  |  |  |  |

Status values: Todo / Generating / Select chosen / Locked / Pickup needed.

---

## 5. Prompting for Action

**Structure:** `[shot type + lens] → [subject + identity anchor] → [ONE action, with timing] → [environment] → [camera move] → [style + light] → [speed or physics cue] → [audio cue, if the model has audio]`.

- **Camera language:** "low-angle medium shot, 24mm," "slow push-in," "orbit 90° left," "whip pan," "crash zoom," "locked-off wide," "120fps slow motion."
- **Impact frames:** ask for the *moment before* and the *moment after*, never the contact itself. Use "freeze on impact" or "a moment of contact" when you need the beat ([Seedance fight guide](https://seedance2pro.io/blog/seedance-2-fight-scene-guide)). Make anime-style impact frames (1–3 frames of inverted, high-contrast silhouette; [background](https://knowyourmeme.com/memes/cultures/impact-frames)) in the edit or as stills.
- **Speed ramps:** generate key moves in slow motion ("slow motion, 120fps look") so the model has time to keep limbs intact, then speed them up in the edit. That gives you a clean ramp from slow to real time.
- **Content policy:** automated filters block even bloodless cartoon duels ([HackerNoon](https://hackernoon.com/ai-video-generators-flagged-my-anime-duel-as-graphic-violence-it-was-a-cartoon)), and single words like "blood" can trip them ([invideo](https://invideo.io/faq/why-does-my-ai-image-request-get-blocked-or-refused/)). Describe force, not injury ("is thrown back," "staggers"). Keep blood stylised or off-screen, cut away at the worst moment, and let sound carry it. Never use real people's likenesses ([Let's Data Science](https://letsdatascience.com/blog/bytedances-seedance-2.0-spooked-all-of-hollywood-in-72-hours)).

**Example prompts** (replace [HERO] and [VILLAIN] with your locked character descriptions, and attach their reference images):

1. **Establishing.** *Extreme wide shot, 18mm, night rooftop in heavy rain, neon city below. [HERO] stands at the left edge by a rusted water tower; [VILLAIN] steps out of a stairwell door on the right, 15 meters away. Slow crane down from above. Cinematic, high contrast, wet reflections. Neither moves except breathing. Audio: rain, distant sirens.*
2. **Wind-up (with motion reference).** *Low-angle medium shot, 35mm. [HERO] draws his right fist back; blue energy crawls up his forearm, lighting his face. Slow push-in. Rain droplets hang in the air, slow motion, 120fps look. Ends just before the punch is thrown.* (Motion reference: your slow phone punch.)
3. **Reaction and launch.** *Wide shot, 24mm, whip pan right. [VILLAIN] is blasted backward off his feet by an unseen force, slams into the water tower, steel buckles, and the tank bursts in a wave of water and debris. Camera shake on impact. Dramatic, anime-influenced realism.*
4. **Midpoint loss, close-up.** *Close-up, 85mm, handheld feel. [HERO] on his knees in the rubble, breathing hard, a cut above his eye, his energy flickering and dying in his hand. The shadow of [VILLAIN] falls across him. Shallow focus, slow push-in, silence except heavy breathing.*

---

## 6. Editing and Sound

**Rhythm.** Fast phrases (0.5–2 s shots) separated by 4–8 s breathers. Hold 4–12 frames past impact, and keep the subject centre-frame (Fury Road) so fast cuts stay readable.

**Hiding flaws with cuts.**
- Cut *before* the hand morphs, and cut on motion so the eye follows the action instead of checking anatomy.
- Overlap 2–4 frames on big hits (Hong Kong style), using two different generations.
- Use flash frames, whip pans, debris or smoke wipes, and lens flares as stitch points.
- Crop in to 120–150% to remove a bad hand at the edge of frame.

**Frame interpolation and speed ramps.** Free options: RIFE through Flowframes ([80.lv](https://80.lv/articles/flowframes-a-new-free-video-interpolation-tool)), and Optical Flow retiming in DaVinci Resolve. Both can produce artifacts in fast action, so test on a hand crossing a face ([WaveSpeed](https://wavespeed.ai/blog/ai-comparisons/best-ai-frame-interpolation-tools/)). Ramp from real time into slow motion on the signature move, then snap back on the impact.

**Upscaling.** Free tiers often render at 360–720p. SeedVR2 in ComfyUI is a free open-source video upscaler with a GPU needed ([ComfyUI docs](https://docs.comfy.org/tutorials/utility/seedvr2)). Upscale only locked selects, then add a little film grain to unify shots from different models.

**Layered impact sound.** Each hit gets 3–5 layers:
- **Whoosh:** the swing.
- **Transient:** the crack.
- **Body:** a thump (cabbage or leather).
- **Sub:** a 30–60 Hz boom for super-strength.
- **Tail:** debris and reverb.

Add breath and cloth movement, and drop to near-silence before the biggest hit.
- **Free libraries:** [freesound.org](https://freesound.org) (check each sound's licence: CC0 is free, CC-BY needs credit, CC-BY-NC can't go in a film you sell) and [Pixabay sound effects](https://pixabay.com/sound-effects/).
- **AI SFX:** ElevenLabs Sound Effects turns text prompts like "metal pipe impact, heavy" into sounds ([TechCrunch](https://techcrunch.com/2024/05/31/elevenlabs-debuts-ai-powered-tool-to-generate-sound-effects)). The free tier has no commercial licence ([Magic Hour](https://magichour.ai/blog/best-ai-sound-effect-generators)). Use the video model's native audio only as a guide track.
- Give each power a **signature sound** and reuse it.

---

## 7. Case Studies (2025–2026)

**1. "Cruise vs. Pitt" rooftop fight (Seedance 2.0, Feb 2026), by Ruairi Robinson.** A 15 s fistfight that alarmed Hollywood. Robinson said it came from a "2-line prompt," but a VFX artist pointed to green-screen stunt-performer fight footage on Seedance's site and to the handheld camera, which suggests per-angle generation driven by live reference ([Newsweek](https://newsweek.com/ai-brad-pitt-tom-cruise-fight-may-not-be-ai-11554875), [The Outpost](https://theoutpost.ai/news-story/tom-cruise-brad-pitt-ai-fight-scene-sparks-hollywood-debate-over-green-screen-footage-controversy-23960/)). **Steal:** human choreography as the motion source, one clip per angle, and short duration. **Avoid:** real faces. It drew immediate MPA and SAG-AFTRA condemnation.

**2. *Hell Grind* (Higgsfield, premiered beside Cannes, May 2026).** A 15-person team made a feature-length action fantasy in about two weeks for under $500K, reportedly with Seedance 2.0. The first 25 minutes took more than 16,000 generations for 253 shots ([AI Weekly](https://aiweekly.co/alerts/higgsfield-ai-feature-film-debuts-at-cannes), [tportal](https://www.tportal.hr/kultura/clanak/video-dovrsen-u-dva-tjedna-za-500-000-dolara-film-nastao-uz-pomoc-ai-a-podigao-prasinu-u-cannesu-foto-20260525)). Reviews were mixed ([JoBlo](https://www.joblo.com/?p=903716)). **Steal:** detailed prompts that lock physics, camera and look, and the attempt ratio as a planning number. Scale doesn't fix story.

**3. *Loading…* anthology (Kling AI × Outliers, June 2025).** Seven shorts, with Kling handling fights and explosions. Kling's product head admitted that motion rendering and stability remain challenges and that creators rewrote prompts repeatedly ([Yicai](https://www2.yicaiglobal.com/news/chinas-kling-ai-debuts-worlds-first-aigc-anthology-series)). **Steal:** treat prompt iteration as normal work.

**4. *Echo Hunter* (Arcana Labs, dir. Kavan Cardoza, 2025).** A sci-fi thriller in which a SAG-AFTRA cast's performances drove their AI versions, through a toolchain built on Veo, Runway, Luma and Pika ([TechRadar](https://www.techradar.com/computing/artificial-intelligence/this-movie-is-fully-ai-generated-and-has-a-fully-sag-aftra-cast-heres-3-things-you-need-to-know-about-echo-hunter)). **Steal:** human performance as input, and different models for different jobs.

**5. "Samurai's Resolve" (Kling 2.5 Turbo, 2025).** A one-minute original anime duel, samurai against dragon ([YouTube](https://www.youtube.com/watch?v=fCiS_aGgBoE)). **Steal:** anime style, a monster opponent (so no grappling), and a tight scope.

**Precedent:** Corridor Digital's *Anime Rock, Paper, Scissors* (2023) restyled green-screen actors into anime ([ProVideo Coalition](https://www.provideocoalition.com/nab-2023-how-ai-and-puget-systems-helped-corridor-digitals-anime-rock-paper-scissors-come-to-life/)). The principle still holds: **film people, then restyle**.

---

## 8. Three-Act Fight Escalation for an AI Film

The story logic is unchanged: the callback is planted in Act 1, exploited in Act 2, and turned around in Act 3. Scale is now measured in shots, seconds and generations instead of shoot days. Assume an average of 2–3 s per shot and roughly 8–15 attempts per kept shot.

| | **Act 1: Opening fight** | **Act 2: Midpoint loss** | **Act 3: Climax** |
|---|---|---|---|
| **Purpose** | Show the hero's style, power rules and **limits**; a scrappy win against weaker enemies | The villain shows his full power; the hero **loses**, with an injury and a cost | The hero wins **through growth**, beating the move that beat him in Act 2 |
| **Screen time** | 45–75 s | 90–150 s | 3–4 min in 2–3 phases, each with a location or stakes change |
| **Final shots** | 20–30 | 40–60 | 70–100 |
| **Generations (approx.)** | 200–450 | 400–900 | 700–1,500 |
| **AI-friendly design** | Mostly powers against thugs; 1–2 grounded hand-to-hand beats using your motion reference | Long villain power display (destruction is cheap); the hero's loss told in close-ups and silence | Big environmental phases (a collapsing building, a fight in the sky), the signature move with a speed ramp and impact frame, and one emotional held close-up |
| **Motion reference** | 5–10 phone moves | 10–15 moves plus Mixamo falls | 20+ moves plus a Blender previs of the whole climax |

**Rules of thumb**
- Give the climax the most iteration time, not the most shots. A clean 3-minute climax beats a 6-minute blur.
- Escalate the scale from act to act: street level, then collateral damage, then mythic.
- **Injury continuity is a keyframe job.** Update the master stills after each fight (the cut, the torn suit) and generate every later shot from them.
- Make the stuntvis for all three fights before generating any finals. Grey-box action is free, so credits go only on shots you know you need.
