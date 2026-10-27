# Glossary

Film terms used across this project, in plain language. Every document links here.

## Story

| Term | Meaning |
|---|---|
| **Logline** | The film in one or two sentences: who, what they want, what's in the way. |
| **Synopsis** | A one-page summary of the whole story, beginning to end. |
| **Beat sheet** | The story as a list of 15 or so key moments ("beats"). |
| **Treatment** | A 5–15 page prose version of the story, written before the script. |
| **Draft / lock** | A version of the script. "Locked" means no more changes before shooting. |
| **Chain of title** | The paper trail proving who owns the script and story rights. |

## Fights and stunts

| Term | Meaning |
|---|---|
| **Fight sequence** | The whole fight as the audience sees it on screen, pauses included. |
| **Nonstop fighting / seconds of fighting** | The action itself inside a fight sequence, not counting setup and aftermath. In an AI film it drives the number of shots and generations. |
| **Fight choreographer** | The role that designs a fight's beats and moves. Here it's the `film-fight-choreographer` crew role. |
| **Stuntvis** | In live action, a stunt team's filmed rehearsal. In this AI film: your slow, safe phone previs of a fight's moves, cut together to test the fight before generating (safety box: [playbook §4](fights/ai-fight-playbook.md#4-motion-reference-safety)). |
| **Breakaway** | A prop made to break safely (sugar-glass bottle, balsa chair, foam brick). |
| **Oner / stitched oner** | A fight shown as one continuous shot. "Stitched" means several takes joined with hidden cuts. |
| **Impact frame** | A 2–6 frame flash at the moment of a hit (a freeze, a flash, a distortion), made in the edit. With a cut from wind-up to reaction, it sells contact without ever showing it. |
| **Signature moment** | The single image from a fight that goes on the poster or in the trailer. |

## Production

| Term | Meaning |
|---|---|
| **DP** | Director of photography, in charge of camera and lighting. |
| **Breakdown** | A list of everything each scene needs: cast, props, stunts, effects. |
| **Coverage** | The set of shots filmed for a scene (wide, medium, close-ups). |
| **Previs / techvis** | Rough animated or filmed versions of shots, used to plan them. Techvis adds the technical measurements. |

## Post-production

| Term | Meaning |
|---|---|
| **Picture lock** | The edit is final. Sound, music, VFX and colour are finished after this. |
| **ADR** | Re-recording dialogue in a studio after the shoot. |
| **Foley** | Recording everyday sounds (punches, footsteps, cloth) to match the picture. |
| **Spotting** | Deciding where music and sound effects start and stop. |
| **LUT** | A colour preset used on set to preview the film's look. |
| **Grade** | Final colour correction. |
| **M&E** | A version of the soundtrack with music and effects only (no dialogue), for foreign-language versions. |

## Money and business

| Term | Meaning |
|---|---|
| **Contingency** | Money held back (10% or more) for surprises. |
| **Deferred pay** | Pay promised later, usually if the film makes money. |
| **Points** | A percentage share of the film's profits. |
| **Work-for-hire** | Contract language that makes the production own what someone creates for it. |
| **Release (form)** | A signed permission to use a person, location or material in the film. |
| **LLC / EIN** | Limited liability company (the business that owns the film) and its US tax ID number. |
| **Fiscal sponsorship** | A nonprofit that accepts tax-deductible donations on the film's behalf. |
| **Title report** | A professional search confirming the film's title doesn't conflict with others. |
| **E&O insurance** | Errors and omissions: covers legal claims about rights and content. Distributors require it. |


## Release

| Term | Meaning |
|---|---|
| **Premiere status** | Whether a film has been shown publicly before. Many festivals only accept films that haven't been released online. |
| **Laurels** | The festival-selection badges shown on posters and trailers. |
| **Sales agent** | A company that sells a film's distribution rights to buyers. |
| **Presales / presell territories** | Selling the rights in specific countries before the film is finished, to raise money. |
| **Key art** | The main poster image. |
| **EPK** | Electronic press kit: stills, trailer, synopsis and interviews for press. |
| **Look book** | A visual document showing the film's intended look, used for pitching. |
| **InDemand** | Indiegogo's mode for continuing to take orders after a campaign ends. |

## AI filmmaking

| Term | Meaning |
|---|---|
| **Generation** | One run of an AI tool producing an image or video clip. Most won't be usable. |
| **Text-to-video / image-to-video** | Making a clip from a written prompt alone, or from a starting image plus a prompt. Image-to-video keeps characters far more consistent. |
| **Keyframe / start frame** | The still image a shot is generated from. It largely decides the shot. |
| **Reference image / reference sheet** | Approved images of a character or location (front, side, back, close-up) that you give the tool so it keeps the look. |
| **Prompt block** | A reusable chunk of prompt text that describes a character, power or look identically every time. |
| **Seed** | A number some tools use to make a generation repeatable. Log it when available. |
| **Credits** | The units AI tools charge per generation. A paid plan gives a monthly allowance. |
| **Attempts per shot** | How many generations it takes to get one usable shot. Expect 5–20 as a beginner. |
| **Select** | The take you choose to use in the edit. |
| **Motion transfer / motion control** | Copying movement from a reference video (e.g. you, filmed on a phone) onto a generated character. |
| **Motion reference** | The video clip of real movement used for motion transfer. Film it slowly and safely; the AI adds the speed. |
| **Mocap from video** | Software that turns ordinary video of a person into 3D animation data. |
| **Grey-box** | A rough, untextured 3D scene used to block out movement and camera. |
| **Animatic** | Keyframes or rough shots timed to temporary sound: a draft of the film before final generation. |
| **Bake-off** | Running the same test shots through several tools to choose the best one before paying. |
| **LoRA** | A small add-on trained on your own images so an open-source model draws a character consistently. |
| **Open weights** | AI models you can download and run on your own computer (needs a strong graphics card). |
| **Content filter** | A tool's built-in block on certain content (blood, gore, real people, famous characters). |
| **Watermark / SynthID / C2PA** | Marks showing a video is AI-made. Watermarks are visible; SynthID is Google's invisible one; C2PA is a metadata standard that platforms read to label AI content. |
| **Upscaling / interpolation / deflicker** | Finishing steps: raising resolution, adding in-between frames for smoother motion, and removing flicker. |
| **Human-authorship record** | Your per-shot log of what you chose, wrote, directed or changed by hand. It supports your ownership of the human-made parts. |

## Working across tools

| Term | Meaning |
|---|---|
| **AGENTS.md** | A shared instructions file that many AI coding tools read automatically (Antigravity, Command Code, Codex, Cursor). Claude Code reads it through `CLAUDE.md`. |
| **Task board** | `TASKS.md`: the list of tasks, which tool does each, its status and where its output goes. |
| **Branch / worktree** | Git's way to keep each task's changes separate until you merge them. A worktree is a separate folder for a branch, so two tools never share files mid-task. |
| **Merge / PR** | Bringing a task's finished branch into the main project. A pull request (PR) is the reviewable proposal to merge. |

## Tools mentioned in the plan

Tools change monthly; confirm current features and prices on each official page.

| Tool | What it is |
|---|---|
| **Kling / Seedance / Veo / Omni Flash** | AI video generators. Veo and Omni Flash are Google's, used through **Flow** or the Gemini app |
| **Nano Banana** | Google's image model in the Gemini app, used for keyframes and reference images |
| **Muse Image / Vibes** | Meta's image generator, and the Meta AI app's short-video feed |
| **Runway (Aleph, Act-Two)** | AI video tools, including performance and motion transfer |
| **Wan 2.2 / LTX / HunyuanVideo** | Open-weight video models you can run yourself with a strong GPU |
| **Mixamo** | Free library of 3D character animations (Adobe) |
| **Rokoko Vision** | Free mocap from ordinary video |
| **Cascadeur** | Physics-based 3D animation tool for fights (the free edition is non-commercial) |
| **Blender** | Free 3D software for grey-box previs |
| **ElevenLabs** | AI voices and sound effects |
| **Suno** | AI music (commercial use on paid plans; under litigation) |
| **MMAudio** | An open model that generates sound for video (check its licence before using it in finals) |
| **DaVinci Resolve** | Free editing, colour and sound software |
| **Whisper** | Free speech-to-text, used for captions |
| **Topaz** | Upscaling software |

## Plan terms

| Term | Meaning |
|---|---|
| **Gate** | A checkpoint in the schedule where you decide before moving on (e.g. Gate 2: shot list locked, so paid generation can start) |
| **Pickup** | Regenerating or adding shots that are missing or failed, usually in an extra month |
| **Assembly / rough cut** | The first edit with every select in order, then the first shaped version |
| **.fountain** | A plain-text screenplay format that screenwriting apps can open |
| **SRT** | A standard subtitle file |
| **eCO** | The US Copyright Office's online registration system |
| **YPP** | YouTube Partner Program, which lets channels earn ad revenue |
| **AIF / WAIFF** | Runway's AI Film Festival / World AI Film Festival |

