# Legal & Rights Checklist: AI-Generated Superhero Film

> **This is not legal advice.** It is a checklist and questions to take to a real lawyer or a Volunteer Lawyers for the Arts (VLA) clinic. Terms and rules change monthly, so confirm every fact on the official page. Your country is unknown, so this uses **US defaults** and marks place-dependent rules **(varies)**.

Terms: [GLOSSARY](../GLOSSARY.md). New jargon is defined where it first appears. Background and sources: [AI legal and release research](../research/ai-legal-and-release.md).

**The core rule:** in the US, prompts alone don't make you the author of AI output (Copyright Office, Jan 2025; the Supreme Court declined *Thaler v. Perlmutter* in March 2026). You can own the script, characters as written, the edit and your hand-made changes, so **record your human choices as you go**.

---

## 1. Day one

- [ ] **Keep dated drafts.** Commit every draft of the story and script to git. The history is your evidence of independent creation. Don't rename `story/00-my-idea.md`, because other files link to it.
- [ ] **Sign a collaborator agreement if anyone helps** (story, voice, music), even an unpaid friend. Without one, they may become a **joint author** with equal rights. Cover ownership, credit, any pay, and a later transfer to a company.
- [ ] **A friend who performs motion reference or a voice signs a release first** (project, uses, term, any pay).
- [ ] **Turn off "train on my data" settings where you can**, before you paste the script anywhere:
  - [ ] **Meta Muse:** agent queries are reportedly used for training by default and can be switched off. Don't use the cheaper API "Contributor" tier, which lets Meta train on what you send, for any story material.
  - [ ] **Every other tool:** look for a training opt-out in settings and note it in the table below.
- [ ] **Start the human-authorship record.** Each generated shot gets its own file, `superhero_movie/shots/<scene>/<shot-id>.md`, e.g. `shots/F01/F01-010.md` (see `AGENTS.md`). Each file lists:
  - [ ] the tool, model version and **plan/tier** (this proves you had commercial rights that month)
  - [ ] your start frame or reference images and where they came from
  - [ ] the prompt, seed and number of attempts
  - [ ] which take you kept and **why**
  - [ ] your edits: compositing, inpainting, paint-overs, colour, retiming, sound
- [ ] **Screen-record a session now and then.** A process time-lapse helped win the *A Single Piece of American Cheese* registration.

## 2. Before choosing tools: tool-terms table

Fill the "confirm" cells from each official terms page, dated. **No consumer plan indemnifies you** (pays if you're sued), so infringement risk is yours.

| Tool | Who owns outputs | Commercial use by tier | Watermark | Attribution | Training on your inputs |
|---|---|---|---|---|---|
| **Google AI Pro / Flow / Veo** | Google doesn't claim ownership | Reportedly allowed on paid plans; **unconfirmed**. If the bake-off (T-012) confirms a problem, Flow is for tests and keyframes only and finals move to Seedance | Invisible **SynthID** (Google's hidden AI watermark) on every output; visible "Veo" mark except on the top Flow plan (AI Ultra) | None required | confirm (check Gemini activity settings) |
| **Kling** | You, but Kling takes a broad licence | **Free: no.** Paid: yes, confirm. Upgrading later doesn't clear old free clips | Visible on free | None | Licence may cover training; confirm opt-out |
| **Seedance** (Dreamina / CapCut) | confirm | Free daily credits are watermarked; paid commercial use: confirm | Visible on free | confirm | confirm |
| **Runway** | Runway doesn't claim ownership | Free: sources conflict, confirm. Standard and up: confirm | Free is watermarked; paid is not | None | confirm |
| **Meta Muse** (Image, Vibes) | Unclear; Meta takes a broad licence | Not clearly granted; confirm before any Muse image goes into the film | Meta "AI info" label plus **C2PA** metadata (an industry "content credentials" tag saying how a file was made) | confirm | On by default for agent queries, can be turned off; the Contributor API tier trains |
| **Midjourney** | Paid subscribers own assets "to the fullest extent possible" | **No trial currently; older trial images were CC BY-NC, non-commercial (confirm).** Paid: yes. Pro or Mega if your company earns over $1M | None, but images are public unless Stealth mode (Pro and up) | Old trial images carry the NC licence | confirm |
| **ElevenLabs** | You, on paid plans | **Free: no.** Paid (Starter and up): yes | Not visibly marked | **Free: "elevenlabs.io" or "11.ai" must be in the title** | confirm |
| **Suno** | A *licence*, not ownership | **Free: no**, and not retroactive. Paid: yes, for songs made while subscribed | None | None | confirm |
| **DaVinci Resolve** (free) | You (it's an editor, not a generator) | Free version allowed for commercial work; confirm | None on free (reviewer claim; confirm) | None | confirm for any cloud or AI features |

- [ ] **Inputs count too.** Every start frame or reference image that feeds a final shot must also come from a tool whose terms allow commercial use.
- [ ] **Confirm Muse Image and Gemini image (Nano Banana) commercial terms** before the character and location sheets (T-009, T-010) are approved for finals. This is TASKS row T-015. If Muse or Vibes isn't available where you live, use the Gemini app instead.
- [ ] Rule out **Sora** (shut down in 2026) and **Udio** (downloads disabled since Oct 2025).
- [ ] Choose your tools and plans with `film-producer` against the caps in `production/budget.md`.

## 3. Design phase

- [ ] **Originality check for each character.** Keep a **distinctiveness sheet** per hero and villain that lists costume, colours, emblem, name and powers next to the closest Marvel or DC character, and change anything too close. Studios are suing over AI copies of their characters (Disney/Universal/WBD v. Midjourney).
  - [ ] Never prompt with a character's name, "like Spider-Man", "Batman-style", "MCU look" or an actor's name.
  - [ ] Avoid iconic marks: an S-shield or bat-like emblem, red-and-blue webbing, a lightning bolt on red.
  - [ ] **No real faces.** Don't upload photos of real people as references, and don't let a generated face drift into a recognisable celebrity. Regenerate if it does.
- [ ] **Title check:** search the USPTO trademark database, IMDb and Google. Before any sale, buy a professional **title report**.
- [ ] **Trademark note:** the joint Marvel/DC **"Super Hero" marks were cancelled in 2024**, but **"Super-Villain" marks reportedly remain**. Keep both words out of the title and marketing anyway, and ask a lawyer to confirm.

## 4. Generation phase

- [ ] **Generate finals only on commercial-allowed tiers**, from start frames that are themselves cleared. Free tiers of generators are for tests and the animatic; pay only once the shot list is locked.
- [ ] **Free software is fine for finals when its licence allows commercial use** (DaVinci Resolve, Whisper). Open models such as MMAudio: licence, confirm commercial use before a final uses them.
- [ ] **Keep fights PG-13.** Most major tools block blood (confirm per tool), and platforms restrict it.
- [ ] **Log every shot as you make it** in its `shots/<scene>/<shot-id>.md` file. An unrecorded shot weakens your claim.
- [ ] **Keep dated copies of each tool's terms of service (ToS).** Save a PDF on the day you sign up and again on each day you generate finals, in a small `production/tos/` folder (or external storage).
- [ ] **Back up every final asset** outside the tool. Tools vanish (Sora) or lock downloads (Udio).
- [ ] **Don't strip SynthID or C2PA metadata.**

## 5. Voice and music

- [ ] **No real-person voice clones without written consent.** Tennessee's **ELVIS Act** (2024) bans simulating someone's voice or likeness without consent. California's **AB 2602** (2025) voids vague digital-replica clauses in performer contracts. The federal NO FAKES Act stalled in Oct 2026. **(varies)**
  - [ ] Use stock voices or your own. To clone a friend, get a **signed release** naming the project, uses, term and any pay. Never clone a celebrity.
- [ ] **Music only from a commercial plan or a royalty-free licence.** Keep the licence PDF for every cue, dated.
  - [ ] **Lowest risk:** a royalty-free library (some competitions require Epidemic Sound) or a human composer under a written agreement that assigns the rights.
  - [ ] **Fallback: Suno Pro.** Licensed for commercial use, but only for songs made while subscribed. Warner settled (Nov 2025), but **UMG and Sony are still suing**, so it stays a fallback.
  - [ ] **Udio:** don't use it. Downloads have been off since Oct 2025.
  - [ ] No existing songs unless you hold **both** a sync licence (the composition) and a master licence (the recording).

## 6. Copyright registration

- [ ] **Register the script now** with the US Copyright Office (eCO at copyright.gov; fee roughly $45–65, confirm). It is fully human-written and cheap to protect. The **WGA Registry** is optional dated proof, not copyright.
- [ ] **Register the finished film later** as an audiovisual work using the **Standard Application**:
  - [ ] **Disclose** all AI-generated material that is more than trivial, and **exclude it** under "Material Excluded".
  - [ ] **Claim** the human parts: the screenplay, the selection and arrangement of the footage (the edit), your hand-made edits and compositing, and any voice, sound or music you made yourself.
  - [ ] Attach or keep your authorship records ready. Failing to disclose AI material can invalidate the registration.

## 7. Release

- [ ] **Platform AI labels.** Label voluntarily everywhere, e.g. "Made with generative AI. Story, edit and direction by [you]."
  - [ ] **YouTube:** tick "altered or synthetic content" for anything realistic. Clearly fantastical content is exempt, but tick it if any shot is photoreal. Monetisation is cut for mass-produced or "inauthentic" content, not for AI itself.
  - [ ] **TikTok, Meta (Instagram, Facebook), Vimeo:** they auto-label from **C2PA** data and require you to label realistic AI content.
- [ ] **EU AI Act:** labelling duties for deepfakes started **2 Aug 2026** (confirm); artistic or fictional work has a lighter duty, but it still applies if you release in the EU. **(varies)**
- [ ] **India:** the 2026 IT Rules (in force 20 Feb 2026, confirm) require prominent AI labels and provenance metadata on platforms. **(varies)**
- [ ] **Festival AI policies:** read every call's AI clause before paying.
  - [ ] Closed or restricted: Sitges, Cannes (reportedly), the Oscars (human scripts and performers from March 2027).
  - [ ] Realistic route, the AI circuit: WAIFF Cannes (€15 until 15 Nov 2026), the 1 Billion Followers $1M award (expect tool requirements), Runway AI Festival (2027 call ~Jan–Mar; **3 minutes or longer**). Details: [research §5](../research/ai-legal-and-release.md).
- [ ] **Credit honestly:** "Written, directed and edited by [you]. Imagery generated with [tools]." Include any credit a free tier requires.

## 8. If money ever arrives

- [ ] **Form an LLC** (a company that holds the film's rights and limits your personal liability) before signing any deal. Assign the script to it in writing and record the assignment with the Copyright Office. **(varies)**
- [ ] **Investor documents only through a lawyer.** Selling a share of profits is usually a *security*, and friends-and-family money counts. Before that, accept only gifts or rewards crowdfunding (perks, never a profit share).
- [ ] **E&O insurance** (errors and omissions: covers claims of infringement or uncleared material) before a distribution deal. Distributors require it, and your authorship records, ToS copies and licences are what the insurer will ask for.
- [ ] **Chain-of-title binder** (the paper trail of ownership): certificates, agreements, releases, licences, dated ToS copies, the authorship log.

---

## Questions for a lawyer or Volunteer Lawyers for the Arts

1. Which of these rules apply where I live?
2. Is my authorship log (per-shot files plus screen recordings) enough to support a claim in the edit and my modifications?
3. How should I word "Material Excluded" and the claim for the finished short?
4. Do my hero's name, costume, emblem or powers come too close to any Marvel or DC character? Is my title clear?
5. Do the terms of the tools and tiers I picked really give me commercial rights, including for prize money and YouTube revenue?
6. If a tool changes its terms or shuts down, do my rights to past outputs survive?
7. What should a collaborator agreement and voice release say for an unpaid helper?
8. Is a paid Suno track safe enough for festivals and monetised YouTube while the UMG/Sony case is open?
9. What labelling do I need if the film is shown in the EU or India?
10. When, if ever, should I form an LLC, and what would E&O insurance need from me?

Free help: VLA chapters (e.g. NYC VLA, California Lawyers for the Arts), law-school IP clinics, and the US Copyright Office's AI guidance at copyright.gov/ai.

---

## Handoff

**Done:** created `superhero_movie/production/legal-checklist.md` (AI version; the live-action checklist stays archived), then updated it in the L4 fix round.

**Decisions needed:**

| Question | Options | Recommendation |
|---|---|---|
| Which country and state are you in? | (a) US (b) UK or EU (c) India or elsewhere | Add it to `story/00-my-idea.md`; it changes the voice, labelling and company rules |
| Which tools and plans? | (a) Stack A, $0 (tests only) (b) Stack B, ~$58/month (c) Stack C, ~$150–190/month | **(a) until the shot list is locked, then (b)**; fill the "confirm" cells first |
| Is anyone helping? | (a) No one (b) Unpaid friends (c) Unsure | If (b) or (c), sign agreements **before** they contribute |
| When to register? | (a) Script now, film at the end (b) Only the film (c) Not at all | **(a)**: the script is cheap and fully human |
| Music source? | (a) Royalty-free library (b) Human composer (c) Suno Pro | **(a) or (b)** for the lowest risk; (c) is licensed but under litigation, so a fallback only |

**Hand-offs:**
- `film-producer` (Claude Code): tools and tiers against the budget caps; registration fee.
- `film-shot-generator` (filmmaker in web tools): create a `shots/<scene>/<shot-id>.md` record for every shot; finals on paid tiers only.
- `film-pipeline-td` (Antigravity): shot-file template and a dated `tos/` folder.
- `film-character-designer` and `film-production-designer` (Muse or Claude Code): a distinctiveness sheet per character; clear Muse/Gemini image terms (T-015) before sheets feed finals.
- `film-voice-director` and `film-composer`: voice releases and music licences.
- `film-distribution-marketing`: platform labels and festival AI clauses.
