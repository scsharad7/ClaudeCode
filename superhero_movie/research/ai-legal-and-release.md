# AI Legal, Rights and Release Guide (late October 2026)

> **This is research, not legal advice.** Terms of service, court cases and platform policies change monthly. Several facts below come from secondary sources (law-firm blogs, trade press, aggregators) because official pages could not be fetched directly; those are marked *(secondary)*. Before you sign anything, sell anything or register anything, re-check the primary source and, for money decisions, talk to a lawyer. Many legal-aid or volunteer-lawyers-for-the-arts groups help for free.

**Status key:** Verified = consistent across primary or several reputable sources. Secondary = a single trade or blog source. Unverified = conflicting or unconfirmed.

---

## 1. Copyright in AI-generated work

### United States (your main jurisdiction)

- **Human authorship is required.** The US Copyright Office's *Part 2: Copyrightability* report (29 Jan 2025) says that with current tools, **prompts alone do not give enough human control** to make you the author of the output. AI output is protectable only where a human determined "sufficient expressive elements" ([IPWatchdog](https://ipwatchdog.com/2025/01/29/part-two-copyright-office-ai-report-says-creative-prompting-doesnt-constitute-authorship/); [Lowenstein](https://www.lowenstein.com/news-insights/publications/client-alerts/us-copyright-office-issues-report-on-copyrightability-of-generative-ai-outputs-ai)). Status: verified.
- **2026 court news.** On 2 March 2026 the Supreme Court **declined to hear** *Thaler v. Perlmutter*. That leaves in place the 2025 DC Circuit ruling that a machine cannot be an author ([Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2026/03/supreme-court-denies-review-in-ai-authorship-case); [Minnesota Lawyer](https://minnlawyer.com/2026/03/02/supreme-court-ai-art-copyright/)). This was a refusal to hear the case, not a ruling on the merits. *Allen v. Perlmutter*, a challenge in Colorado over a Midjourney image, had no 2026 ruling that I could find. Status: verified.
- **What you can own:**
  - Your **script, story, characters' written descriptions, dialogue, storyboards and concept sketches** are ordinary human works.
  - Your **selection, coordination and arrangement** of AI clips. This is the edit, the shot order, the timing and the cut.
  - **Human modifications**, such as compositing, paint-overs, inpainting decisions, colour work, and VO or sound design you perform yourself.
  - **Music you compose or perform.**

  The precedent is *A Single Piece of American Cheese*. The Copyright Office registered it in Jan 2025 for the selection and arrangement of about 35 inpainted regions, after the creator submitted a time-lapse of his process ([Invoke press release](https://pressreleases.triplepointpr.com/2025/02/10/invoke-receives-first-of-its-kind-copyright-registration-for-ai-assisted-visual-artwork-from-u-s-copyright-office-develops-provenance-records-tool-to-help-others-do-the-same/); [IP Law Group](https://www.iplawgroup.com/a-landmark-ruling-u-s-copyright-office-grants-protection-to-ai-assisted-artwork/)). The raw AI frames themselves stay unprotected.
- **Disclosure when registering.** Use the **Standard Application**, not the single-work form. Disclose AI content that is more than de minimis and **exclude it under "Material Excluded"** in Limitation of the Claim. Then claim the human parts, for example: "screenplay, selection and arrangement of audiovisual material, human-created VO and edits." If you don't disclose, the registration can be invalidated ([Jenner & Block](https://www.jenner.com/en/news-insights/publications/client-alert-copyright-registration-for-works-containing-ai-generated-material)). Status: verified, based on the March 2023 guidance, which is still in force.
- **Practical upshot.** Register the **screenplay right away**: it is cheap and fully human. Register the finished short later as an audiovisual work with the AI material disclaimed. Your strongest IP is the **characters and world as written**. Treat the pixels as unprotected.

### UK, EU and India (brief)

- **UK:** Section 9(3) of the CDPA gives "computer-generated works" 50 years of protection. The government's March 2026 report recommends **removing it** for works with no human author, but sets no timetable. AI-*assisted* works with real human creativity keep protection ([Stephenson Harwood](https://www.stephensonharwood.com/post/102mpke/uk-government-publishes-report-and-impact-assessment-on-copyright-and-artificial/); [Bratby](https://bratby.law/copyright-and-ai-training-exception-2026/)). On training data, *Getty v Stability AI* (High Court, 4 Nov 2025) rejected Getty's secondary-infringement claim. An appeal was allowed ([Bird & Bird](https://cm.twobirds.com/en/insights/2025/uk/stability-ai-defeats-getty-images-copyright-claims-in-first-of-its-kind-dispute-before-the-high-cour)).
- **EU:** Copyright requires the author's "own intellectual creation" by a human, so the US approach applies in practice. The **AI Act Article 50** transparency duties, including labelling deepfakes, applied from **2 Aug 2026**. The Digital Omnibus reportedly delays only the machine-readable marking duty for providers, Art. 50(2), to Dec 2026 ([Reed Smith](https://www.reedsmith.com/our-insights/blogs/technology-law-dispatch/102nfi5/eu-ai-act-next-level-applies-as-of-2-august-2026/); [Silicon Canals](https://siliconcanals.com/the-eus-ai-act-starts-requiring-chatbot-and-deepfake-labels-on-august-2-while-its-tougher-rules-on-hiring-biometrics-and-migration-are-pushed-back-to-december-2027/)) *(secondary)*. Fiction and artistic work gets a lighter disclosure duty, but it still applies.
- **India:** Copyright requires a human author. The DPIIT working paper (Dec 2025) dealt with training licences, and the paper on authorship was still pending ([K&S](https://ksandk.com/md/intellectual-property-rights/ai-generated-content-copyright-ownership-india/)). The **IT Rules Amendment 2026**, in force 20 Feb 2026, requires prominent labels and provenance metadata on "synthetically generated information" shared through platforms ([Business Today](https://www.businesstoday.in/amp/technology/story/govt-tightens-rules-on-ai-generated-content-mandates-labels-and-faster-takedowns-515505-2026-02-10); [DSCI](https://www.dsci.in/resource/content/it-amendment-rules-2026)).

---

## 2. Tool terms of service (what the free tier really gives you)

| Tool | Who owns the output | Free tier commercial use? | Watermark | Attribution | Status |
|---|---|---|---|---|---|
| **Google Veo / Flow / Gemini** | Google does not claim ownership ([9to5Google](https://9to5google.com/2024/04/16/google-tos-ai/)) | Commercial use is reportedly allowed *(secondary)*, but you can't use it to build competing AI or to make deepfakes | **Invisible SynthID on every output.** A visible "Veo" mark appears except for **AI Ultra in Flow** ([9to5Google](https://9to5google.com/2025/05/30/gemini-app-veo-3-ai-ultra/)). One 2026 report mentions a visible-watermark toggle in Flow *(unverified)* | None required | Partly verified |
| **OpenAI Sora** | n/a | n/a | n/a | n/a | **Discontinued.** The app shut on 26 Apr 2026 and the API was scheduled to end on 24 Sep 2026 ([OpenAI Help](https://help.openai.com/en/articles/20001152-what-to-know-about-the-sora-app-discontinuation); [The Decoder](https://the-decoder.com/openai-sets-two-stage-sora-shutdown-with-app-closing-april-2026-and-api-following-in-september/)). **Don't plan around Sora.** |
| **Runway** | Runway doesn't claim ownership of inputs or outputs | Sources conflict ([terms.law](https://terms.law/ai-output-rights/runway/)) | **Free plan is watermarked**; Standard and above are not | None | Unverified for free tier |
| **Kling** | The user generally keeps rights, but grants Kling a broad licence that may include training ([ConductAtlas](https://conductatlas.com/platform/kling-ai/kling-ai-terms-of-service/)) | **No.** Free output is watermarked and non-commercial; upgrading later doesn't fix old clips ([crepal](https://crepal.ai/blog/aivideo/is-kling-ai-free-pricing/); [st-hakky](https://book.st-hakky.com/en/data-science/kling-ai-pricing-usage-kling-3-0)) | Visible on free | None | Secondary |
| **Midjourney** | Paid subscribers own their assets "to the fullest extent possible". Companies with more than $1M revenue need Pro or Mega | **No.** Trial images are CC BY-NC 4.0 ([terms.law](https://terms.law/2026/01/15/midjourney-commercial-use-rights-complete-2026-guide/)) | None, but images are public unless you use Stealth mode (Pro and above) | NC licence on trial | Secondary |
| **ElevenLabs** | You, on paid plans | **No.** Paid plans include a commercial licence ([ElevenLabs help](https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform)) | Audio is not visibly marked | **Free plan: "elevenlabs.io" or "11.ai" must be in the title** | Verified (official) |
| **Suno** | Language has moved toward a *licence* rather than ownership | **No.** Free songs are non-commercial and not retroactively licensed. Paid plans give commercial rights for songs made while subscribed ([Digital Music News](https://www.digitalmusicnews.com/?p=335808); [Music in Africa](https://www.musicinafrica.net/magazine/suno-adjusts-ai-music-ownership-terms-after-warner-music-partnership)) | None audible | None | Secondary |
| **Udio** | n/a | **Downloads disabled since 30 Oct 2025.** It is being rebuilt as a licensed "walled garden" ([Digital Music News](https://www.digitalmusicnews.com/2025/10/31/udio-downloads-disabled-umg-deal/)) | n/a | n/a | Verified. **Don't use Udio for your soundtrack.** |
| **Meta AI (Vibes, Imagine)** | Unclear. Meta takes a broad licence on content ([PopSci](https://www.popsci.com/technology/cant-stop-instagram-meta-ai/)) | Not clearly granted | Meta "AI info" label and C2PA/IPTC metadata | n/a | Unverified. **Avoid for production assets.** |

**What this means for a zero-budget creator:**
- Free tiers are fine for **tests, previz and the animatic**.
- For anything you might monetise or submit for prize money, generate final shots on a **paid month**. One month of Kling, Runway or Google AI Pro plus ElevenLabs Starter is cheaper than re-rendering later.
- **No vendor indemnifies consumer users.** Indemnity is offered only on enterprise plans, for example Adobe Firefly ([Redress Compliance](https://redresscompliance.com/adobe-firefly-generative-ai-enterprise-licensing)). If a clip infringes, the risk is yours.

---

## 3. Risk areas

**Lookalikes and existing characters: the biggest risk for a superhero film.**
- Disney and Universal sued Midjourney in June 2025, and Warner Bros. Discovery followed over Superman and Batman. The cases were consolidated and sent to mediation ([LA Mag](https://lamag.com/news/disney-and-universal-sue-ai-company-midjourney-for-copyright-infringement/); [Graphic Policy](https://graphicpolicy.com/2025/11/14/court-suggests-disney-v-midjourney-go-to-mediation/)). Studios are actively hunting AI output of their characters.
- Rules for your project:
  - Never prompt with "like Spider-Man," "Batman-style cowl," "MCU look" or an actor's name.
  - Avoid iconic marks: a chest emblem resembling the S-shield or bat, red and blue webbing, a lightning bolt on red.
  - Keep a **"distinctiveness check"** sheet for each hero that lists costume, colours, emblem and powers against the closest Marvel or DC character.
  - Trademark matters as well as copyright. "Super Hero" is a jointly held Marvel/DC trademark, so don't put it in your title.

**Voice cloning and real people's likeness.**
- Tennessee's **ELVIS Act** (in force July 2024) makes it unlawful to simulate someone's voice or likeness without consent. California's **AB 2602** (in force Jan 2025) voids vague digital-replica clauses in performer contracts ([Reed Smith](https://www.reedsmith.com/articles/tennessee-efforts-protect-rop-against-genai-imitations-deepfakes/); [Proskauer](https://www.proskauer.com/blog/california-enacts-generative-ai-law-addressing-digital-replicas-of-performers)).
- The federal **NO FAKES Act** passed Senate Judiciary on 18 Jun 2026 but had **stalled** as of October ([Sen. Blackburn](https://www.blackburn.senate.gov/2026/6/blackburn-coons-bipartisan-bill-to-protect-individuals-and-creators-from-deepfakes-passes-senate-judiciary-committee); [Daily Journal](https://www.dailyjournal.com/article/395055-no-fakes-act-dead-for-now-as-cruz-objects-to-unanimous-consent-request)).
- YouTube's **likeness detection** now lets people find and remove AI uses of their face ([TheWrap](https://www.thewrap.com/youtube-ai-likeness-detection-tool-rollout/)).
- Rules: use stock synthetic voices or your own voice. Clone a friend only with a **signed written release** that names the project, the uses and the term. Never clone a celebrity.

**Music generators.**
- **UMG settled with Udio** (Oct 2025) and **Warner settled with both Udio and Suno** (Nov 2025). Those deals turn the services into licensed platforms ([Music Business Worldwide](https://www.musicbusinessworldwide.com/universal-music-settles-udio-lawsuit-strikes-deal-for-licensed-ai-music-platform); [Billboard](https://billboard.com/pro/suno-warner-music-sign-ai-licensing-deal-settle-lawsuit/)).
- **UMG and Sony are still suing Suno.** Talks stalled in April 2026, and a summary-judgment ruling on fair use is pending ([Opus](https://www.opus.pro/blog/ai-music-news-april-2026); [MBW](https://www.musicbusinessworldwide.com/umg-and-sony-accuse-suno-of-pirating-youtube-via-stream-ripping-to-train-its-ai/)).
- Suno reportedly launched v6 models trained with licensed Warner, BMG and Believe data ([The Rundown](https://www.therundown.ai/news/suno-v6-music-partners-paid-fan-remixes)) *(secondary)*.
- **Practical take:** a paid Suno track is *licensed* to you but carries unresolved risk. Safer options are the royalty-free libraries some competitions require (Epidemic Sound), a human composer, or ElevenLabs Music on a paid plan.

**Training-data lawsuits: do they hit you?**
- **Mostly no, for now.** The cases target the model makers:
  - *Bartz v. Anthropic*: a $1.5B settlement, approved in July 2026 ([Authors Alliance](https://www.authorsalliance.org/2026/07/21/bartz-v-anthropic-settlement-receives-final-approval/)).
  - *Kadrey v. Meta*: a narrow fair-use win for Meta in June 2025 ([Akin Gump](https://www.akingump.com/en/insights/ai-law-and-regulation-tracker/second-district-court-rules-ai-training-can-be-fair-use)).
- The risk to you comes from **outputs that reproduce protected expression**, such as a recognisable character, melody or voice, not from the training itself. A tool could also vanish or change its terms mid-project, as Sora and Udio show. **Download and back up every final asset.**

---

## 4. Platform rules for publishing

- **YouTube**
  - **Disclosure:** you must tick "altered or synthetic content" for *realistic* content that viewers could mistake for real people, places or events. **Clearly fantastical or animated content is exempt**, and so is using AI only for scripts, thumbnails or captions ([YouTube Help](https://support.google.com/youtube/answer/14328491)). A stylised superhero short in a fictional city is likely exempt, but tick the box anyway if any shot is photoreal or could be mistaken for news. YouTube can add the label itself if you don't.
  - **Monetisation:** the "repetitious content" policy was renamed **"inauthentic content"** in July 2025. On 16 July 2026 YouTube clarified that three kinds of content can't be monetised: template or mass-produced videos, distressing or manipulative bait, and AI personas giving health, finance or legal advice ([TechCrunch](https://techcrunch.com/2026/07/20/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos/); [eWeek](https://www.eweek.com/news/youtube-responds-to-ai-concerns/)). AI use itself stays monetisable. **Enforcement is now reportedly channel-level** *(secondary)*, so avoid bulk-uploading near-identical clips.
- **TikTok** auto-labels content that carries C2PA Content Credentials and requires you to label realistic AI content yourself ([NBC News](https://www.nbcnews.com/tech/tech-news/tiktok-will-automatically-label-ai-generated-content-rcna151446)). Veo's SynthID and C2PA data can trigger the label automatically.
- **Instagram and Facebook (Meta)** apply an **"AI info"** label from C2PA/IPTC signals, and disclosure is mandatory for photorealistic video and realistic audio ([TechRadar](https://www.techradar.com/computing/software/facebook-and-instagram-will-label-fake-ai-images-to-stop-misinfo-from-spreading); [Clipspeed](https://www.clipspeed.ai/blog/ai-generated-video-disclosure-rules.html)) *(secondary for 2026)*.
- **Vimeo** has a checkbox in Content settings for AI audio and/or visuals, required for realistic content. Unrealistic or animated work and production-only AI use are exempt. Vimeo may add a label you can't remove if you skip it ([Vimeo Help](https://help.vimeo.com/hc/en-us/articles/25078011225233-How-can-I-tell-if-a-video-on-Vimeo-was-generated-with-or-enhanced-by-using-AI)).
- **Rule of thumb:** label voluntarily everywhere ("Made with generative AI. Story, edit and direction by [you]."). It builds trust, and a missing label is the thing that gets videos penalised.

---

## 5. Festivals and competitions (dates as found; confirm before paying)

**AI-specialist:**
- **Runway AI Festival (AIF):** renamed from the AI Film Festival in 2026.
  - The 2026 deadline was 27 Apr, with a **$50k Grand Prix plus 1M credits**, 3–15 minute narrative films, and screenings in NYC on 11 Jun and LA on 18 Jun ([aifilmcontests](https://aifilmcontests.com/contests/runway-aif-2026)) *(secondary)*. Entry is free.
  - Watch for the **2027 call around Jan–Mar**. Your short must be **3 minutes or longer** to qualify.
- **Runway Gen:48:** a 48-hour challenge. Past prizes were $5k plus 1M credits, free entry, one entry per person ([Runway rules](https://runway.com/gen48/terms)).
- **Curious Refuge competitions:**
  - 2026 Horror: $12k pool, 3 minutes max, every shot AI, Epidemic Sound music, closed 9 Oct.
  - Earlier 2026: Feel Good ($10k) and Animation ($10k).
  - A **Holiday 2026 contest (about $7.5k, 6 Dec deadline) is unconfirmed** ([aifilmcontests](https://aifilmcontests.com/topics/curious-refuge-ai-film-competitions-2026); [Curious Refuge](https://curiousrefuge.com/2026-ai-horror-film-competition)).
- **Project Odyssey:** Season 2 had a $70k cash pool across 9 categories ([DomoAI](https://domoai.app/de/blog/domoai-x-project-odyssey-ai-create-ai-films-and-win-over-70-000)). A 2026 "championship" with a $78k pool and 3-minute cap is listed but unverified ([aifilmcontests](https://aifilmcontests.com/contests/project-odyssey-ai-film-championship-2026)).
- **1 Billion Followers Summit AI Film Award, $1M:**
  - The 2027 edition with BytePlus and TikTok **opened 12 Oct 2026**, and the winner will be named in Dubai on 8–10 Jan 2027.
  - The deadline isn't published yet ([WAM](https://www.wam.ae/en/article/c2pf8nu-billion-followers-summit-opens-submissions-for)). Expect a tool requirement: the previous edition required 70% Google-tool output.
- **WAIFF (World AI Film Festival), Cannes, 6–7 Apr 2027:**
  - Direct entry reportedly costs **€15 by 15 Nov 2026**, €30 by 31 Jan and €60 by 15 Feb.
  - US creators go through **WAIFF Los Angeles**: $45 by 30 Nov ([aifilmcontests](https://aifilmcontests.com/contests/waiff-cannes-2027)) *(secondary)*.
- **Kling NEXTGEN contest:** the 2025 edition had a $42k pool plus 1.25M credits. The 2026 edition closed 1 Sep ([aifilmcontests](https://aifilmcontests.com/contests/kling-nextgen-2026)).
- **Regional and rolling festivals:** about 21 AI festivals have 2027 editions, mostly with deadlines before Feb 2027 ([aifilmcontests 2027 list](https://aifilmcontests.com/topics/ai-film-festivals-2027)). Examples:
  - World AI Cinema Festival, which runs monthly.
  - WAICF India, extended deadline 5 Dec 2026.
  - International AI Short Film Festival, late deadline 10 Nov 2026 ([Festhome](https://filmmakers.festhome.com/en/festival/10485)).

**Mainstream festivals:**
- **Sitges**, the biggest genre festival relevant to a superhero film, **excludes from competition** films made entirely with AI or where AI was essential ([Sitges rules PDF](https://www.clickforfestivals.com/media/festivales/ficheros/3797_20260530081610.pdf)).
- **Cannes** reportedly barred films whose script, visuals or performances are driven by generative AI from the main competition in April 2026 *(secondary)* ([HackerNoon](https://hackernoon.com/cannes-drew-the-line-on-ai-films-that-same-week-5500-of-them-arrived-in-town-anyway)).
- **Cinema St. Louis** bans generative-AI films from 2027 ([STLPR](https://www.stlpr.org/text/arts/2026-09-08/cinema-st-louis-limits-ai-use-festival-films)).
- The **Oscars** (from the March 2027 ceremony) require human-written screenplays and human performers ([Newcastle Herald/Reuters](https://www.newcastleherald.com.au/story/9237873/ai-actors-and-writers-will-be-ineligible-for-oscars/)).
- Sundance, TIFF and Fantastic Fest have **no published 2026 AI rule that I could verify**. Read each call's rules and disclose honestly.
- **Expect fully AI-generated genre shorts to be shut out of most major competitions. Aim for the AI circuit.**

---

## 6. Monetisation and funding at zero budget

1. **YouTube:**
   - Fan-funding tier: 500 subscribers plus 3,000 watch hours or 3M Shorts views.
   - Ad revenue: 1,000 subscribers plus 4,000 hours or 10M Shorts views ([AIR](https://air.io/en/monetization/youtube-partner-program-requirements-2026-the-complete-guide)).
   - An unconfirmed report says the thresholds rise in Feb 2027.
   - Strategy: one hero short, plus behind-the-scenes and "how I made it" videos, which also show the human authorship.
2. **Patreon:** AI-made, safe-for-all-audiences work is allowed ([Patreon](https://support.patreon.com/hc/en-us/articles/34055590411789)). Offer early cuts, scripts, prompt breakdowns and character art.
3. **Creator and partner programs:**
   - **Runway Creative Partners Program:** hand-picked members get a free Unlimited or Max plan, reportedly with 1M credits ([Runway CPP](https://runway.com/creative-partners-program)).
   - **Luma Creative Partner Program:** 200k credits a month, but requires 5k or more engaged followers and attribution ([Luma](https://lumalabs.ai/creative-partner-program)).
   - Kling has no verified open creator-credit program. Its NEXTGEN contests are the main route.
   - Build an audience first, then apply.
4. **Grants:**
   - NFMLA **NewNarratives**: $35k across 2026 grants, including an AI fellowship strand ([GGFDN](https://ggfdn.org/nfmla-expands-newnarratives-grants-launches-ai-fellowship-for-emerging-auteurs/)).
   - Runway's **Hundred Film Fund** ($5k to $1M+, announced 2024; current status unknown) ([TVBEurope](https://www.tvbeurope.com/artificial-intelligence/tech-start-up-offers-filmmakers-1-million-if-they-use-ai)).
   - Local arts councils. Many prefer "AI-assisted" human-led projects.
5. **Prize money:** Runway AIF, the 1BF $1M award, Curious Refuge, Project Odyssey and WAIFF (see section 5).
6. **Series pitch:** make the short the proof of concept. Pair it with a series bible, a 10-episode arc and character sheets. Because the *script and characters* are your copyrightable assets, register the bible as well. Pitch to AI-native studios and to competitions that offer development deals, such as Curious Refuge Animation.

---

## 7. Day-one checklist

- [ ] **Write and register the screenplay** (human-written) with the US Copyright Office or WGA Registry.
- [ ] Start a **human-authorship log** in a spreadsheet. For each shot, record:
  - the tool and model version
  - the plan or tier, which proves you had commercial rights that month
  - prompt, seed, reference images and number of takes
  - which take you picked and **why**
  - the edits you made, such as composites, inpainting and colour
- [ ] **Screen-record** your sessions occasionally. Time-lapses won the *American Cheese* registration.
- [ ] Save **ToS snapshots** (PDF with date) for every tool on the day you generate final assets.
- [ ] Do **finals on paid tiers only**. Free-tier clips can't be relicensed later on Kling, Suno or ElevenLabs.
- [ ] **Back up every final asset locally**, because tools disappear (Sora, Udio).
- [ ] Keep a **character distinctiveness sheet** comparing each hero to Marvel and DC. Use no real names, logos or actor names in prompts.
- [ ] **Voices:** use your own, stock synthetic voices, or cloned voices with a **signed release**. Credit ElevenLabs if you use the free tier.
- [ ] **Music:** use a paid licence, a library track or a human composer. Keep the licence PDF for each cue, and avoid Udio.
- [ ] **Don't strip SynthID or C2PA data.** Label the work as AI on YouTube, TikTok, Meta and Vimeo whenever any shot is realistic.
- [ ] Credit honestly: "Written, directed and edited by [you]. Imagery generated with [tools]."
- [ ] Before each festival submission, read its **AI clause**, and check its length rules (Runway needs 3 minutes or more; Curious Refuge allows 3 minutes or less).
- [ ] Re-check this document every quarter. Tool terms and the Suno and Midjourney cases are moving.
