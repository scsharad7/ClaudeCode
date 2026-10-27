# AI Tool Stack: Making a Fully AI-Generated Superhero Film (October 2026)

*Research brief for a first-time filmmaker with no budget and no crew. Prices move monthly and most were confirmed only through third-party trackers, because vendor pages could not be fetched directly from this environment. Treat every number as "roughly right in October 2026" and check the vendor's pricing page before you pay. **Unconfirmed** marks anything the sources could not settle.*

---

## TL;DR

- **The landscape changed in 2026.** [OpenAI shut down the Sora app on April 26, 2026](https://variety.com/2026/digital/news/openai-shutting-down-sora-video-disney-1236698277/), and the [API end date was September 24](https://www.mindstudio.ai/blog/why-openai-killed-sora-ai-video-generation-future). Leave Sora out of your plans. The current front-runners are **Kling 3.0 (4.0 is rolling out)**, **ByteDance Seedance 2.0/2.5**, **Google Gemini Omni Flash and Veo 3.1**, **MiniMax H3** and **Alibaba Wan 3.0**.
- **For fights, Seedance and Kling lead.** Reviewers rate [Seedance strongest on fast, complex action and Kling stronger on control and polish](https://www.yottalabs.ai/post/kling-vs-seedance-which-ai-video-model-is-better-in-2026). No neutral benchmark exists, so test both on your own choreography.
- **Every major cloud tool blocks blood and gore.** PG-13 stage combat (impacts, falls, energy blasts) works if you prompt it carefully. Plan your fights that way from day one.
- **Character consistency is still the hardest problem.** A superhero has an advantage here: masks, helmets and bold costume silhouettes hide face drift.
- **Recommended starter stack: about $58/month.** Google AI Pro + Kling Pro + ElevenLabs Starter, plus free DaVinci Resolve. Expect roughly **1–2 finished minutes per month**.
- **Scope honestly.** A solo first-timer won the 2026 Runway AI Festival with an 8-minute film made in about two weeks of 17-hour days. A 90-minute feature is a team-scale project.

---

## 1. The Pipeline at a Glance

| # | Stage | What you make | Lead tools (2026) | Free option |
|---|---|---|---|---|
| 1 | Script | Screenplay, shot list | Any frontier chatbot (Claude, Gemini, ChatGPT) as a writing partner | Free chat tiers |
| 2 | Design bible | Character turnarounds, costume and location sheets | Nano Banana Pro / 2 (Gemini), Midjourney, FLUX.2, Ideogram | Gemini app, Ideogram free |
| 3 | Storyboard / keyframes | One still per shot (start and end frames for fight beats) | Nano Banana, Midjourney, Kling multi-shot storyboard | Gemini app |
| 4 | Shot generation | 3–15 s video clips from keyframes | Kling 3.0, Seedance, Omni Flash / Veo 3.1, MiniMax H3, Runway Gen-4.5 | Flow daily credits, Dreamina daily credits, local Wan 2.2 |
| 5 | Performance / motion transfer | Your own body or face drives the character | Kling Motion Control, Runway Act-Two, Wan 2.2-Animate (open) | Wan Animate locally |
| 6 | Voices and lip sync | Dialogue, matched mouths | ElevenLabs; Sync (lipsync-2-pro), Hedra Character-3; native audio in Kling, Veo and Omni | ElevenLabs free (non-commercial), Sync free |
| 7 | Sound effects | Punches, whooshes, debris | ElevenLabs SFX v2 and Video-to-Sound, MMAudio | MMAudio (open) |
| 8 | Music | Score and themes | Suno (Udio is effectively unusable, see section 2) | Suno free (non-commercial) |
| 9 | Edit, colour, upscale | Assembly, grade, 1080p/4K master | DaVinci Resolve, CapCut, Topaz Video / Astra | Resolve free |
| 10 | Captions and deliverables | SRT files, ProRes/H.264 masters | Resolve, CapCut auto-captions, Whisper (open source) | Whisper, CapCut free |

---

## 2. Tools by Stage

### 2a. Video generation (the expensive part)

Cost per second is for **generated** footage, before you throw away the bad takes. The figures are approximate and come from each plan's price ÷ its credits.

| Tool | Free tier | Entry paid / month | ≈ Cost per generated second | Max clip / resolution | Strengths | Weaknesses | Commercial use |
|---|---|---|---|---|---|---|---|
| **Kling 3.0** (Kuaishou) | Watermarked, [non-commercial](https://www.atlascloud.ai/blog/guides/kling-ai-pricing); daily allowance disputed | [Standard $10 ($6.99 first month), 660 credits; Pro $37 (renews $32.56), 3,000 credits](https://kling.ai/app/membership/membership-plan) | [8 credits/s at 1080p silent, 12/s with audio, 30/s at 4K](https://kling.ai/blog/kling-video-3-0-credit-cost-guide), ≈ $0.09–0.13/s on Pro | [3–15 s; multi-shot with up to 6 cuts](https://apiframe.ai/guides/kling-3-0-guide); 1080p, 4K | Element reference, multi-character coreference, [Motion Control](https://www.mindstudio.ai/blog/what-is-kling-2-6-pro-motion-control-video), native audio | Rejects realistic weapons and blood with generic errors | Paid plans only |
| **Kling 4.0** | n/a | [Flash preview for Ultra annual subscribers since Sept 28](https://en.wikipedia.org/wiki/Kling_AI) | Unconfirmed | Announced: [30 s, 10 keyframes, 4K](https://wavespeed.ai/blog/ai-news/kling-4-0-release-date/) | Long takes suit fight choreography | **Full release unconfirmed** as of late October | — |
| **Seedance 2.0 / 2.5** (ByteDance, via Dreamina/CapCut) | [Daily free credits (120/day per Dreamina)](https://dreamina.capcut.com/ai-video/free-ai-video-generator-usable-clips-guide-2026), watermarked | [Subscriptions $18–82](https://higgsfield.ai/blog/seedance-2-0-pricing-2026) | [≈ $0.046–0.055/s for 2.0; ≈ $0.097/s for 2.5](https://dreamina.capcut.com/seedance/seedance-price); another source gives $1.29 per 8 s clip | [4–15 s; 720p–1080p (4K disputed)](https://www.atlabs.ai/blog/seedance-2.0-vs-seedance-2.0-mini-upgrades-speed-price-compared) | [Best-rated for fight choreography](https://invideo.io/faq/which-ai-video-generator-is-best-for-action-scenes/); reference-to-video from character sheets | [Hollywood copyright backlash](https://www.aljazeera.com/news/2026/2/16/bytedance-pledges-fixes-to-seedance-2-0-after-hollywood-copyright-claims) led to new guardrails and real-face blocking | Free tier: **unconfirmed**; paid: check terms |
| **Gemini Omni Flash** (Google, in Flow/Gemini) | [Reported 50 Flow credits/day](https://dreamina.capcut.com/ai-model/gemini-omni-1-1-flash-review) (region-dependent, unconfirmed) | [Google AI Plus $4.99 (200 credits); Pro $19.99 (1,000 credits)](https://www.websnp.com/google-ai-pro/plus-vs-pro-vs-ultra) | [12 credits per 8 s at 720p](https://support.google.com/flow/answer/16526234?hl=en&co=GENIE.Platform%3DAndroid), ≈ **$0.03/s** on Pro; API ≈ [$0.10/s](https://www.eesel.ai/blog/gemini-omni-1-1-flash-pricing) | 4–10 s; 720p in Flow (1080p/4K upscale on paid plans) | Cheapest bulk generation; [top-ranked on some arenas](https://videogen.io/best-ai-video-models); flat 40-credit video editing | Google's safety filters block violent prompts and outputs | Visible watermark on non-Ultra Veo output in [Flow's FAQ](https://labs.google/fx/sk/tools/flow/faq); commercial terms **unconfirmed** |
| **Veo 3.1** (Google) | Via the Flow credits above | Same Google AI plans | [100 credits per 8 s (Quality)](https://support.google.com/flow/answer/16526234?hl=en&co=GENIE.Platform%3DAndroid) ≈ $0.25/s on Pro | 8 s (extendable), 1080p | Realism, synced dialogue and SFX, ["Ingredients" references](https://picsart.com/compare-models/runway-gen-4-vs-veo-3/) | Expensive per clip; [no official Veo 4](https://pixverse.ai/de/blog/veo-4-release) | As above |
| **Runway Gen-4.5 / Aleph / Act-Two** | [125 one-time credits](https://help.runwayml.com/hc/en-us/articles/15124877443219-How-do-credits-work) | [Standard $12 (annual) / $15 (monthly), 625 credits](https://runway.com/pricing) | [12 credits/s](https://creatify.ai/blog/runway-pricing-(2026)-plans-credits-and-what-you-ll-actually-pay) ≈ $0.23/s; Standard buys ≈ 52 s | [2–10 s, 720p](https://openrouter.ai/runway/gen-4.5-20260729) | Gen-4 References; Aleph edits existing shots; [Act-Two is best for facial performance](https://www.mindstudio.ai/blog/what-is-kling-2-6-pro-motion-control-video) | [Strictest violence policy](https://help.runwayml.com/hc/en-us/articles/17944787368595); flags stylised duels | Paid plans |
| **MiniMax H3 / Hailuo** | Welcome credits (terms conflict) | [≈ $9.99–14.99 Standard](https://aireiter.com/blog/hailuo-ai-pricing) | Hailuo 2.3 API [≈ $0.03–0.08/s](https://apiframe.ai/blog/hailuo-api-providers) | [H3: 15 s, 2K, native audio](https://datanorth.ai/news/minimax-releases-minimax-h3) | Top-3 on arenas; strong motion | Open weights "promised", not confirmed | **Unconfirmed** |
| **Wan 3.0** (Alibaba) | — | API only | Unconfirmed | [30 s, 1080p](https://thenextweb.com/news/alibaba-wan3-video-model-after-share-sale) | Longest single clips | [**Not open weights**](https://www.instasd.com/post/wan-3-0-comfyui-what-is-real); self-reported benchmarks | Per API terms |
| **Luma Ray3.x** | No permanent free tier | [Plus $30 ($25 annual), 10,000 credits](https://eesel.ai/blog/luma-ai-pricing) | Ray3.14 1080p ≈ 80 credits/s ≈ $0.24/s | 1080p | HDR, good camera moves | Pricey for volume | [Paid only](https://academy.techpresso.co/reviews/is-luma-dream-machine-worth-it) |
| **Pika 2.5** | [Zero monthly credits since September 2026](https://www.usagepricing.com/blueprint/activity/pika-labs-2026-09-20-free-tier-zero-credits) | Starter $10 (no commercial rights); [Creator $35](https://www.hooked.so/compare/pika-pricing) | Unconfirmed | Unconfirmed | Fun effects | Behind the leaders | From Creator only |
| **Midjourney Video** | None | [$10 Basic](https://eesel.ai/blog/midjourney-pricing) | Billed in GPU time | 5 s, extendable to 21 s; image-to-video only | Beautiful style | Weak action control | All paid plans |
| **Meta Vibes** | Free app | — | — | Short social clips | — | [Test markets only (Mexico, Brazil)](https://metricool.com/meta-vibes/) | Not a film tool; skip |

**Aggregators.** [Higgsfield](https://www.krea.ai/blog/higgsfield-pricing-explained-2026-unlimited-credits-and-real-monthly-costs) ($19–129/month) bundles Kling, Seedance and Nano Banana, sometimes with time-limited "unlimited" windows. [Comfy Cloud's free tier](https://blog.comfy.org/p/free-tier-arrives-in-comfy-cloud) gives 400 credits/month across Seedance, Wan and Kling, which [one tester used up in under two hours](https://www.patreon.com/codecrafterscorner/posts/exploring-new-152366313).

### 2b. Open-source / local video

| Model | Licence | Hardware | Notes |
|---|---|---|---|
| **Wan 2.2** (5B / 14B), **Wan 2.2-Animate** | [Apache 2.0](https://www.instasd.com/post/wan-3-0-comfyui-what-is-real) | [5B fits a 12 GB card (RTX 3060); 14B needs 16 GB+ with GGUF](https://localaimaster.com/blog/wan-vram-requirements-by-gpu) | Expect 10–25+ min per 5 s clip on a 12 GB card ([rough estimate](https://github.com/Cordux/ComfyUI-Wan2.2-workflow)). Animate does motion transfer. |
| **LTX-2 / 2.3** (Lightricks) | [Open weights](https://www.artificialintelligence-news.com/news/open-source-ai-video-from-lightricks-offers-4k-sound-and-faster-rendering/); check licence terms | High-end GPU for 4K | [Up to 20 s, native 4K/50 fps, synced audio](https://invideo.io/blog/ltx-ai-video-generator/). LTX Studio app: [free 800 one-time credits (non-commercial); commercial from $35](https://dupple.com/reviews/ltx-studio) |
| **HunyuanVideo 1.5** (Tencent) | [Community licence; excludes EU/UK/South Korea](https://cgworld.jp/flashnews/01-202512-HunyuanVideo15.html) | [~14 GB VRAM](https://www.promptus.ai/blog/hunyuan-video-1-5) | 480p/720p with built-in super-resolution |

No GPU? [Colab and Kaggle give roughly 30 free GPU-hours a week each on 15 GB T4 cards](https://pinggy.io/blog/run_and_share_comfyui_on_google_colab/). That is enough for Wan 2.2 5B, but it is slow and sessions reset.

### 2c. Images, voice, lip sync, sound, music, finishing

| Tool | Free | Entry paid | Key facts | Commercial |
|---|---|---|---|---|
| **Nano Banana 2 / Pro** (Gemini image) | Nano Banana 2 free in the Gemini app (daily cap unpublished) | Pro via Google AI Pro ($19.99) | [Keeps up to 5 characters consistent, blends 14 reference objects, up to 4K](https://www.androidauthority.com/p-3644579) | Check Google terms |
| **Midjourney V8.x** | [No trial](https://dupple.com/learn/is-midjourney-free) | $10 Basic / $30 Standard | Best look; [studio lawsuits pending](https://www.banani.co/blog/midjourney-pricing) | All paid plans |
| **FLUX.2** (Black Forest Labs) | [klein 4B is Apache 2.0](https://help.bfl.ai/articles/9364115800-flux-models-overview) | API / partners | Best for local LoRA training | Other open checkpoints are non-commercial |
| **Ideogram** | Weekly slow credits; images are public | [$20 Plus ($15 annual)](https://www.krea.ai/blog/what-is-ideogram-ai-features-pricing-and-alternatives-in-2026) | Strong text in images (logos, title cards) | Free tier allowed, per Ideogram FAQ |
| **Recraft** | Daily credits; images are public | [$10](https://www.eesel.ai/blog/recraft-ai-pricing) | Vector logos and emblems | Paid only |
| **ElevenLabs** | [~10k credits (~10 min)](https://dupple.com/learn/is-elevenlabs-free) | [Starter $5–6; Creator $22](https://smallest.ai/blog/elevenlabs-pricing-plans-cost-what-you-get-in-2026) | Voices, cloning, [SFX v2 and Video-to-Sound](https://www.tomsguide.com/ai/i-tried-the-new-elevenlabs-video-to-sound-effects-demo-and-its-pretty-amazing) | Starter and up |
| **Sync (lipsync-2-pro)** | [3 generations/month, ≤20 s](https://sync.so/docs/product/billing) | Usage-based | [$0.067–0.083/s](https://sync.so/docs/product/billing) | Paid |
| **Hedra Character-3** | ~100 credits, watermarked (third-party report) | [~$15](https://fluxnote.io/guides/hedra-ai-review) | [8 credits/s](https://www.hedra.com/models/video/hedra/character-3) | Paid |
| **MMAudio** | Open source | [~$0.001/s on fal](https://modelslab.com/best-sound-effects-api-2026.md) | Foley synced to video | Check licence |
| **Suno** | Non-commercial; [download caps since Sept 3, 2026](https://dupple.com/learn/is-suno-free) | [Pro ~$10 ($8 annual)](https://dupple.com/learn/suno-vs-udio) | Licensed models after [Warner settlement](https://www.musicinafrica.net/magazine/suno-adjusts-ai-music-ownership-terms-after-warner-music-partnership) | Pro and up |
| **Udio** | — | — | [Downloads disabled since Oct 2025](https://www.digitalmusicnews.com/2025/10/31/udio-downloads-disabled-umg-deal/); still off in 2026 | **Avoid for now** |
| **DaVinci Resolve 21** | [Free: no watermark, up to 4K60 (reviewer claim)](https://beginnersinai.org/davinci-resolve-review/) | [Studio $295 one-time](https://www.redsharknews.com/davinci-resolve-studio-free-updates-grant-petty-nab-2026) | Pro edit, grade and mix; steep learning curve | Yes |
| **CapCut** | [1080p export; many AI tools Pro-only](https://eesel.ai/blog/capcut-pricing) | Pro (price varies by region) | Fastest auto-captions, phone-friendly | Check terms |
| **Topaz Video / Astra** | — | [Video $299/yr; Astra cloud ~$19–39/mo](https://www.renderahouse.com/blog/topaz-ai-pricing) | Upscale 720p to 4K | Yes |

---

## 3. Character Consistency (the #1 problem)

[Keeping one subject consistent within a clip is now largely solved](https://www.capcut.com/create/ai-character-consistency-long-form-video-early-2026). The hard cases are **holding identity across many shots** and **two characters in physical contact**, which describes every fight scene. [No model achieves perfect cross-clip consistency](https://magichour.ai/blog/how-to-keep-characters-consistent-in-ai-video), so budget time for fixes.

| Technique | How it works | Best tools today |
|---|---|---|
| **Design bible / turnarounds** | Front, side and back views, expressions, costume close-ups, a location plate. Use [2–6 reference images per character](https://invideo.io/faq/how-many-reference-images-do-you-need-for-consistent-ai/). | Nano Banana Pro/2, Midjourney, FLUX.2 |
| **Image-to-video, not text-to-video** | The first frame locks appearance. [Consistently more stable than text-only prompts](https://invideo.io/faq/how-do-you-use-reference-images-in-ai-video-generation/). | All major tools |
| **Reference / element features** | Upload character sheets that the model reuses across shots | [Seedance 2.0 reference-to-video](https://invideo.io/faq/what-is-the-best-ai-video-tool-for-character-consistency/), [Kling 3.0 element reference + multi-character coreference](https://rgb.ir/en/ai/kling-video/), [Runway Gen-4 References](https://petapixel.com/2025/04/01/runways-new-ai-video-model-gen-4-promises-character-consistency/), Veo Ingredients |
| **Start/end frame** | Generate pose A (wind-up) and pose B (impact) as stills; the model animates between them. This is the **best fight-beat control**. | Kling, Veo/Flow, Wan FLF2V, Kling 4.0 (up to 10 keyframes, announced) |
| **Multi-shot in one generation** | Several cuts share one identity pass | [Kling 3.0: 2–6 shots in up to 15 s](https://apiframe.ai/guides/kling-3-0-guide); Seedance shot labels |
| **LoRA** | Train a small add-on model on ~15–30 images of your hero (typical community guidance) | Local Wan 2.2 / FLUX.2 / Hunyuan only; the best free-stack option |
| **Motion transfer** | Film yourself doing the move on a phone; it drives the character | Kling Motion Control (full body), Act-Two (face), Wan Animate (free) |

**Superhero advantage:** design the hero with a **mask or helmet, a strong colour block and one distinctive emblem**. Faces drift; silhouettes don't. Keep the villain visually opposite (different colour temperature and shape language) so the audience can follow screen direction.

---

## 4. Violence and Content Policy

| Tool | What gets blocked | Notes |
|---|---|---|
| **Runway** | [Graphic violence, gore, incitement](https://help.runwayml.com/hc/en-us/articles/17944787368595) (policy updated March 6, 2026) | [Flagged a stylised anime duel with no blood in the prompt](https://hackernoon.com/ai-video-generators-flagged-my-anime-duel-as-graphic-violence-it-was-a-cartoon). Blade + fast motion + contact can trip the filter. |
| **Google Veo / Omni** | [Prompt and output filters cover violence](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/responsible-ai-and-usage-guidelines); [TIME found violence prompts blocked](https://time.com/7290050/veo-3-google-misinformation-deepfake/) | Fewer clips returned than requested means some output was blocked |
| **Kling** | [Realistic weapons fire, blood and hard impacts are often rejected](https://www.atlascloud.ai/blog/guides/kling-ai-nsfw-policy); stylised violence is treated more leniently | Generic errors; jobs can fail at 99%; sometimes returns toned-down output |
| **Seedance** | Real-face blocking and copyright guardrails [after the MPA complaints](https://www.atlascloud.ai/blog/guides/is-hollywood-trying-to-shut-down-seedance-2.0) | Widely used for fight scenes; written violence rules **unconfirmed** |
| **Fight-specialist apps** | [PG-13 stage combat allowed; gore blocked](https://pixo.video/use-cases/ai-fight-scene-generator) | Shows where the industry line sits |
| **Local open models** | No server filter | Your responsibility; the brief below still applies |

**Working within policy** (this also suits festivals, YouTube monetisation and a broad audience):

1. **Describe motion and consequence, not injury.** "Swings, connects, villain staggers back into a wall that cracks" rather than wounds.
2. **Use superpower impacts:** shockwaves, sparks, energy flares, dust, shattering concrete. They read as more "superhero" than blood anyway.
3. **Cut on the impact.** Wind-up shot, then a reaction or aftermath shot. [Tension comes from cut density](https://www.atlascloud.ai/blog/guides/seedance-2-gpt-image-2-api-tutorial), not from one perfect shot.
4. **Let sound sell the hit.** A heavy SFX layer turns a mild visual into a brutal one.
5. **Favour geography shots** (wide, readable positions) and [build each beat from keyframes: establish, collision, aftermath](https://picsart.com/blog/how-to-make-ai-fight-videos/).
6. **No real faces, no Marvel/DC lookalikes.** Copyright and likeness filters are the strictest of all in 2026.

---

## 5. Three Budget Stacks

**Waste assumption:** about **12 generated seconds per finished second** for a fight-heavy short. That reflects roughly 8 tries per usable shot (fights 10–15, dialogue 3–5) and using about 4 s of each 5–8 s clip. One documented production [kept 41 of 164 clips (~25%)](https://invideo.io/faq/what-percentage-of-ai-generated-video-clips-are-actually/). Another [needed ~400 generations for 90 seconds](https://invideo.io/faq/how-many-ai-video-generations-do-you-need-per-usable/). The ranges below use ratios from 8:1 to 20:1.

### Stack A: $0/month

| Stage | Tool |
|---|---|
| Design / keyframes | Gemini app (Nano Banana 2), Ideogram free |
| Video | Flow daily credits (Omni Flash 720p), Dreamina daily Seedance credits, Kling free, Comfy Cloud 400 credits. Local Wan 2.2 if you have a 12 GB+ GPU, or Colab/Kaggle. |
| Voice / SFX / music | ElevenLabs free, MMAudio, Suno free. All are **non-commercial**, so use them for practice only. |
| Edit | DaVinci Resolve free, Whisper captions |

**Output:** if the reported 50 Flow credits/day applies to you, that is ~1,500 credits ≈ 1,000 generated seconds of Omni Flash a month, or **~50–120 finished seconds**, watermarked, at 720p. Local Wan 2.2 overnight renders add **1–3 minutes** of lower-quality footage. Good enough for learning and a pitch teaser, not for monetised release.

### Stack B: ~$58/month (recommended starter)

| Tool | Monthly | Generated seconds |
|---|---|---|
| Google AI Pro (Omni Flash, Veo 3.1, Nano Banana Pro, Flow) | $19.99 | 1,000 credits ≈ 660 s of Omni Flash 720p (or ~80 s of Veo Quality) |
| Kling Pro (3.0: hero fight shots, Motion Control, multi-shot) | ~$32.56 ($25.99 first month) | 3,000 credits ≈ 375 s at 1080p silent |
| ElevenLabs Starter | ~$6 | Commercial voices |
| DaVinci Resolve, MMAudio, Whisper | $0 | — |
| *Suno Pro, scoring month only* | *+$10* | — |

**Output:** ~1,035 generated seconds ≈ **50–130 finished seconds/month (central estimate ~85 s)**. Swap Kling for a Dreamina/Seedance plan if your tests show Seedance fights better. At ~$0.05/s, the same money buys more seconds there.

### Stack C: ~$150–190/month

| Tool | Monthly | Generated seconds |
|---|---|---|
| Kling Premier | ~$81 | 8,000 credits ≈ 1,000 s at 1080p |
| Google AI Pro | $19.99 | ≈ 660 s |
| Runway Standard (Aleph shot fixes, Act-Two faces) | $15 | ≈ 52 s of Gen-4.5 or equivalent |
| ElevenLabs Creator (pro voice cloning, SFX) | $22 | — |
| Suno Pro | $10 | — |
| Topaz Astra Standard (720p to 4K upscale) | ~$19–39 | — |

**Output:** ~1,700 generated seconds ≈ **85–215 finished seconds/month (central ~140 s, about 2.5 minutes)** at higher quality, with audio and an upscaled master.

---

## 6. Realistic Scope for a Beginner

### Real examples (2025–2026)

| Project | Team | Length | Time / budget | Tools |
|---|---|---|---|---|
| ["A Face Only A Mother Could Love"](https://www.hollywoodreporter.com/movies/movie-features/ai-films-face-mother-love-robert-gaudette-runway-1236624039/), Robert Gaudette. **Runway AI Festival 2026 Grand Prix ($50k)** and [Reply AI Film Festival winner](https://www.reply.com/en/newsroom/news/robert-gaudette-wins-the-reply-ai-film-festival-2026) | Solo, no film training | ~8 min | [~2 weeks of 17-hour days (~240 h); $5,000 self-reported](https://letsdatascience.com/news/runway-showcases-ai-generated-shorts-to-packed-audience-3825c8ad) | Grok, Nano Banana, Seedance |
| ["Total Pixel Space"](https://aiff.runwayml.com), Jacob Adler. AIFF 2025 Grand Prix | Solo | 9:28 | Not published | — |
| [7-minute AI sports mockumentary](https://creativepossible.substack.com/p/how-to-make-a-pro-short-film-with) | Solo | 7 min | 1+ month, 1,000+ shots | Mixed |
| [3-minute animated episode](https://invideo.io/faq/how-long-does-it-take-to-make-an-ai-short-film/) | Small team | 3 min | Days; 164 clips → 41 used | Seedance 2.0 |
| [*Hell Grind*](https://en.wikipedia.org/wiki/Hell_Grind) (Higgsfield) | 15 pros | 95 min | ~2 weeks, < $500k | Higgsfield stack |
| [*The Cully Hill Boys*](https://www.semafor.com/article/08/19/2026/ai-startup-produces-fully-ai-generated-feature-length-film) (Higgsfield) | 28 creatives + human writer | 110 min | 4 weeks, $2M (half on AI tokens) | Higgsfield stack |
| [*Dreams of Violets*](https://petapixel.com/2026/05/29/a-feature-length-ai-generated-live-action-movie-is-premiering-at-tribeca-for-some-reason/) | First-time filmmakers | Feature | $2,000; Tribeca 2026 | Not stated |
| [*Sanxingdui: Future Past*](https://www.yahoo.com/entertainment/movies/articles/chinas-first-ai-film-hits-cinemas-but-ticket-sales-lag-032721444.html) (China) | ~100 people | Feature | 2+ years, ~$1.5M; weak ticket sales | — |
| [*Critterz*](https://www.techradar.com/streaming/entertainment/this-new-openai-backed-movie-has-a-budget-of-just-usd30-million-but-will-it-prove-ai-can-make-movies-hollywood-cant) (OpenAI-backed) | Studio + human voice actors | Feature | ~9-month target, < $30M; Cannes premiere **unconfirmed** | GPT-5 + image tools |

### Estimates for you (part-time, ~15 h/week, Stack B or C)

| Project | Shots | Finished s → generated s (12:1) | Your hours | Calendar time | Subscription cost |
|---|---|---|---|---|---|
| **2–3 min fight short** | 50–80 (fast 2–3 s cuts) | 150 s → ~1,800 s | 100–200 h (plus 2–4 weeks learning) | **2–4 months** | ~$120–350 |
| **10-min short** | 200–300 | 600 s → ~7,200 s | 300–500 h | **6–10 months** | ~$600–1,500 |
| **90-min feature** | 1,500–2,500 | 5,400 s → ~65,000 s | 3,000–5,000+ h | **3–5 years solo** | $5k–15k+ in generation alone |

**Bottom line:** make the **2–3 minute fight short first**. It matches what solo creators actually finish, it is the right length for AI festivals (Runway AIF, Reply, Project Odyssey-style contests), and it doubles as the proof-of-concept for the feature. Features that shipped in 2026 needed teams of 15–100 and $500k–$2M, or years of work.
