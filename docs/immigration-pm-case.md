# Landed — Product Case

**Single source of truth for the immigration-help venture.**
Reconciles Prathma's *ImmigrantConnect* venture plan with the *Landed* product brief into one product, one wedge, one plan.

| | |
|---|---|
| **Status** | Draft v0.2 — first version written from the source folder |
| **Owner** | Sharad Tuli |
| **Source material** | Google Drive → *Immigrants Idea WORK* (owner: prathma0909@gmail.com) |
| **Date** | 19 August 2026 |
| **Purpose** | The reference every later artifact derives from. If a deck, model or PRD contradicts this doc, one of them is stale — fix it here first. |

---

## 0. What changed from v0.1

v0.1 was written blind — the Drive folder wasn't reachable and the product definition in it was my inference. **It was wrong.** I had guessed at a case-file / filing-workflow product for high-skilled immigrants ("Passage"). The actual idea is a **trusted peer community with an AI router** — a different product, a different buyer, and a different set of risks.

This version is built from the six files in the folder. Everything below is either drawn from those documents (marked **[deck]** for *ImmigrantConnect_Venture_Plan*, **[brief]** for *Landed_Product_Brief*, **[arch]** for the system-design and agent-architecture docs) or is my own analysis (marked **[analysis]**). External figures carry a source link.

---

## 1. What's actually in the folder

Six files, created across two separate efforts, describing **two different products that share one idea**.

| File | What it is | Shape of the product |
|---|---|---|
| `ImmigrantConnect_Venture_Plan_Presentation.pptx` (+ PDF) | Prathma Rastogi's CAP600 Applied Methods capstone, with full speaker notes | Broad: all US immigrants, 4 states, identity-verified category community, freemium two-sided marketplace, VC-funded |
| `Landed_Product_Brief` | Product brief & 7-phase build roadmap | Narrow: Indian tech workers in the Bay Area, agentic AI Q&A + human matching, web only, no monetization in v1 |
| `Landed_System_Design` | Architecture, request lifecycle, 7-table schema | Next.js → FastAPI → Supabase/pgvector → Claude |
| `Landed_Agent_Architecture` | The five agents, inputs/outputs, test strategy | Classifier → router → answer / safety / matching + feedback loop |
| `Action Items` | Weekend list: talk to 5 immigrants, pick name, buy domain, repo, landing copy | — |

**The two are not the same product.** They share a problem statement almost word for word — *"Is this rent fair? Is this visa notice real? Where do I find food that tastes like home?"* **[deck]** against Landed's ten hyper-specific questions **[brief]** — and then diverge completely on scope, sequencing and how big the first year is.

### The contradictions, laid out

`[analysis]` These aren't nitpicks. Each one is a fork the plan can't take both sides of.

| # | ImmigrantConnect **[deck]** | Landed **[brief]** | Why it matters |
|---|---|---|---|
| 1 | 51.9M foreign-born; all immigrants; CA/TX/FL/NY | Indian tech workers, Bay Area only | Determines whether matching works at all |
| 2 | **100,000** confirmed registrations in Year 1 | **100** active users in 30 days | Three orders of magnitude apart |
| 3 | 10,000 active users across 3 metros in 18 months *(strategy slide)* | — | Also conflicts with the deck's own 100k Y1 registration target |
| 4 | Identity verification is the core product | Anonymous posting is in v1 | Directly opposed defaults |
| 5 | Pilot hubs: NYC, LA, Houston, **Toronto** | One city, then Seattle | Toronto puts a second country's privacy regime in scope in Year 1 — against a plan that names cross-border exposure as a top-four risk |
| 6 | Y1 revenue **$1.2M**, Y5 **$21M**, **$17M** raised | No monetization until PMF | See §8 — the deck disagrees with itself here too |

---

## 2. The recommendation

`[analysis]` **Build Landed's wedge, aim at ImmigrantConnect's vision, and use one name.**

The two documents are not competitors — they're the same venture at two altitudes, and each supplies what the other lacks:

- **The deck supplies the destination and the institutional scaffolding**: mission, market framing, brand values, legal/ethical architecture, ops model, partnership channels, and the funding story. That work is done and it's good.
- **The brief supplies the mechanism and the discipline**: the density principle, a real beachhead, the agent pipeline, an explicit *not-in-v1* list, and honest starting metrics.

Where they conflict, **the brief wins on sequencing and the deck wins on destination.** Concretely:

1. **Launch as Landed**, Bay Area, Indian tech workers, one city. Not four states. Not 100,000 registrations.
2. **Keep ImmigrantConnect's positioning line** — *real people, real answers, one trusted community for every step of the immigration journey* **[deck]** — it's the best sentence in either document.
3. **Verified identity, pseudonymous asking.** Resolves contradiction #4: verify every account (the deck is right that trust is the product), but let people *ask* under a handle (the brief is right that visa fear suppresses honest questions). Verification gates who may *answer*; anonymity protects who *asks*. `[analysis]`
4. **Drop Toronto from Year 1.** Add a second country only after the US model works. It buys a second regulatory regime for no additional density.
5. **Pick one name.** My recommendation is **Landed** — short, ownable, trademarkable, and *"You landed. Now belong."* is a better line than a category description. *ImmigrantConnect* reads as descriptive and generic, and generic marks are hard to protect. Counter-argument, honestly: ImmigrantConnect is the name Prathma has already presented and defended, and it's clearer to a resettlement-agency partner who has never heard of you. **This is your call and Prathma's, not mine** — but make it once, this week, and don't carry two names forward.

---

## 3. The problem

**[deck]** *"Picture landing in a new country with no one to ask: Is this rent fair? Is this visa notice real? Where do I find food that tastes like home? Today, that search happens in unmoderated Facebook groups and WhatsApp chats — full of good intentions, but no verification, no structure, and no accountability."*

**[brief]** sharpens the same problem into ten questions the product must answer. They're worth keeping verbatim, because they are the product spec:

> H-1B transfer filed 3 weeks ago, no receipt notice — normal or panic? · OPT STEM extension — can I freelance? · Which Santa Clara DMV has the shortest wait? · Where do I find curry leaves in Sunnyvale that aren't $8? · Weekend badminton group in the South Bay? · First US paycheck — credit card, 401k, or pay off the card? · Risky to switch jobs 8 months into H-1B? · Landlord wants 3 months' deposit for no credit history — legal in California? · Indian young professionals in Seattle who aren't coworkers? · Employer mentioned layoffs — what happens to my H-1B?

`[analysis]` What makes this list strong is that it spans two categories with completely different failure modes. *Where do I find curry leaves* is cheap to get wrong. *How many days do I have after a layoff* can end someone's status. **A product that treats those identically is either useless or dangerous.** The routing decision in §6 is the whole product, and this list is why.

### Why existing options fail **[brief]**

| Option | Why it fails |
|---|---|
| Google / Reddit | Generic, outdated, contradictory; can't tell which answer fits your visa + state + employer |
| Immigration lawyers | $300–500/hr for a 15-minute question — overkill for "is this normal?" anxiety |
| WhatsApp groups | Closed, need an introduction, chaotic, nobody accountable, memes drown real questions |
| Meetup / Facebook | Not immigrant-context-aware; "Indian professionals" groups are 90% networking spam |

---

## 4. Why now

The deck's case is demographic; the brief's is technological. `[analysis]` Both are real, and there's a third neither document uses — **the system got measurably worse in the last 18 months, which raises the value of every "is this normal?" answer.**

**Demographics [deck]** — 51.9M foreign-born US residents (mid-2025); 93M people in immigrant-oriented households; ~70% concentrated in CA, TX, FL and NY. Sources: [Pew Research Center (2025)](https://www.pewresearch.org/short-reads/2025/08/21/key-findings-about-us-immigrants/); [Migration Policy Institute (2025)](https://www.migrationpolicy.org/article/frequently-requested-statistics-immigrants-and-immigration-united-states).

**Technology [brief]** — the router-classifier pattern is now reliable enough that an app can decide *per question* whether to answer or fetch a human. This is what separates Landed from a chatbot.

**System stress `[analysis]`** — the anxiety the product monetizes is objectively increasing:

| Signal | Value |
|---|---|
| Cases pending at USCIS, end FY2026 Q1 | **11.3M**, +17% YoY ([AIC](https://www.americanimmigrationcouncil.org/blog/uscis-immigration-processing-trends-2026/)) |
| Net backlog | **6.3M**, up from under 4.3M a year earlier |
| Completions per 100 receipts | **86** — 11th consecutive quarter under break-even |
| H-1B $100k fee | Signed 19 Sept 2025, struck down 8 June 2026 ([Vorys](https://www.vorys.com/publication-court-strikes-down-100-000-h-1b-entry-fee-but-fee-still-applies-pending-appeal)) — a year of decisions made against a rule that no longer exists |
| FY2027 H-1B lottery | 211,600 registrations, 85,000 slots, new wage-weighted selection ([USCIS](https://www.uscis.gov/newsroom/alerts/fy-2027-h-1b-initial-registration-selection-process-completed)) |

Every one of those is a reason Priya asks Rahul *"is this normal?"* — and none of them existed in this form when the last generation of immigrant community apps launched.

---

## 5. The users

**[brief]** Three personas, and the critical structural point: **the supply side must be seeded first.**

| Persona | Who | The line that matters |
|---|---|---|
| **Priya** — demand | 27, Bangalore, SWE, H-1B, Bay Area, 8 months in | *"I found a WhatsApp group but it's mostly memes. I just want someone who's been here longer to tell me — is it safe to switch jobs right now?"* |
| **Rahul** — supply | 31, Mumbai, senior SWE, Seattle, 3 years in, I-140 approved | *"I would have paid anything for someone to just tell me how things actually work here — not the official answer, the real answer."* |
| **Ankit** — edge | 24, OPT, San Jose, 60-day unemployment clock | *"I've asked 10 people and got 10 different answers."* |

`[analysis]` Rahul is the whole business. Priya's problem is solved the moment Rahul exists nearby; Rahul's motivation is reciprocity, not money, and reciprocity is fragile — it survives about three unanswered notifications. **Treat supply-side retention as the primary metric, not a secondary one.** The deck's "trained category leads" **[deck]** is the same instinct expressed as an org chart; the honest version is that you will personally recruit the first 50 Rahuls and they will stay because of you, not the product.

---

## 6. What we build

### v1 scope **[brief]** — unchanged, it's right

**In:** AI Q&A for visa / daily life / local questions · profile (country, visa type, city, years in US, ≤5 interests) · human matching ("3 people near you answered this recently") · pseudonymous asking · basic city feed, filterable by category.

**Out, and say it out loud:** no events, no DMs or group chat, no second country, no mobile app until 1,000 users, **no monetization until you know what people would pay for.**

### The agent pipeline **[arch]**

Five single-purpose agents, each with typed input and output:

1. **Classifier** — question → `{category, risk, confidence, route}`. Categories: visa_legal, work, housing, food, social, local, general. Risk high = wrong advice could harm status, legal standing or finances.
2. **Router** — pure orchestration, no LLM call of its own. `ai` → answer only; `human` → matching only; `both` → fast AI context plus a notified human.
3. **Answer** — generates the factual response where the AI can be relied on.
4. **Safety** — attaches disclaimers to anything legal-adjacent.
5. **Matching** — scores helpers by same visa type, same city, recency of the same experience, track record; notifies the best one.

Plus a **feedback loop** logging whether the answer helped and whether the human replied, which tunes routing over time.

`[analysis]` The strongest design decision in the whole folder is storing the classifier's reasoning — `category, risk, confidence, route` — on the question row **[arch]**, not just the text. That turns the agent's judgment into an auditable dataset, and it is the only thing that will let you answer, six months in, *"which categories should we stop letting the AI answer?"* That dataset is also the closest thing this product has to a durable moat (§9).

### Stack **[arch]**

Next.js 14 + TypeScript on Vercel → FastAPI (Python) on Railway → Supabase (Postgres + pgvector + auth) → Claude API. Langfuse for tracing, Resend for email. Seven tables, UUID keys, `created_at` everywhere; AI answers and human answers deliberately kept in separate tables because they have different shapes and lifecycles.

---

## 7. Market opportunity

### The population frame **[deck]**

51.9M foreign-born · 93M in immigrant households · ~70% in four states.

`[analysis]` **This is a population, not a market.** 51.9M people is the right number for a mission statement and the wrong number for a revenue model — it implies nothing about willingness to pay, and community products convert at a fraction of a percent, not the percentages a SaaS model assumes. The number that decides this business is the deck's own **$52–$58 contribution margin per subscriber** — and that figure is quoted without a CAC beside it. If blended CAC exceeds $52, the model inverts no matter how large the population is.

### Bottom-up, for the wedge that's actually being built `[analysis]`

| Layer | Basis | Estimate |
|---|---|---|
| Indian-born immigrants in the US | MPI/Pew order of magnitude | ~2.9M |
| Working-age Indian professionals + students | Share of the above | ~1.2M |
| Bay Area Indian-origin tech workers | Beachhead | ~150k–250k |
| **Density threshold for the product to work** **[brief]** | 500 active users in one metro | **500** |

The first target is not a market size — it's **500 people in one metro**. Everything above that line is Year 2+ and should be treated as unearned until the matching loop demonstrably works.

**Revenue-relevant SAM**, once the loop works: if the wedge generalises to ~1.2M working-age Indian immigrants nationally and a community product converts 2–4% to a $60–96/yr Connect+ tier, that's **$1.4M–$4.6M** of subscription revenue in-segment — reaching the deck's Y5 numbers therefore *requires* the expansion to all-immigrant, all-metro, plus B2B. **That expansion is an assumption, not a projection.** State it as such in front of investors before someone else does.

---

## 8. Business model — and the model that disagrees with itself

**[deck]** Two-sided freemium. Demand: new arrivals and students. Supply: established immigrants and verified professionals. Revenue: Connect+ subscriptions, directory listings, B2B partnerships, verified-professional subscriptions. Partners: immigration law firms, resettlement nonprofits, universities, fintechs.

### The numbers don't reconcile — fix this first `[analysis]`

The deck carries **two financial models** that were built in different weeks and never merged. The roadmap slide names both out loud (*"$21.0M net revenue (Wk3 model) / $10.5M (Wk7 model)"*), so this is known — but it's currently sitting in a presented deck:

| | Business-model slide (Wk3) | Financial-plan slide (Wk7) | Gap |
|---|---|---|---|
| Year 1 net revenue | $1.2M | $310K | **3.9×** |
| Year 5 net revenue | $21M | $10.52M | **2.0×** |
| Total funding | $17M (Seed + A + B) | $2.0M (SAFE + Series A + SBA loan) | **8.5×** |
| Year 3 | EBITDA break-even | Profitable, $180K net | consistent |
| Revenue streams | Connect+, directory listings, B2B partnerships, pro subs | Premium subs, partner listings, sponsored partnerships, consultation fees | named differently |

**Recommendation:** keep the **Wk7 model** ($2.0M, $310K Y1, $10.5M Y5). It's the more defensible of the two, its funding ask matches a pre-PMF community product, and an $17M raise is not credible against 100 active users. Rebuild the Wk3 slide from it and retire the old figures everywhere.

### Two more model problems `[analysis]`

- **"Service remains free" vs subscription-led revenue.** Strategic objective 5 commits to the service remaining free; the revenue model is led by subscriptions. Both can be true — free core, paid Connect+ — but the deck never says which parts are which. Write the line: *what is free forever, and what is paid.*
- **"Consultation fees" and law-firm partnerships need a lawyer before they need a spreadsheet.** Revenue arrangements between a non-lawyer platform and immigration attorneys run into state bar rules on fee-splitting with non-lawyers and paying for referrals (ABA Model Rules 5.4 and 7.2, as adopted state by state). Flat-fee directory listings are the conventional structure; per-referral or revenue-share fees are the structure that gets platforms in trouble. **Get an opinion before this line item goes in front of an investor.** I'm flagging a risk, not giving a legal conclusion.

---

## 9. Competition — and the ghost in the room

**[deck] + [brief]** combined: Facebook/WhatsApp groups (no verification, no structure) · Nextdoor (hyperlocal, no immigrant categories) · USAHello / Settle In (resources, no peer channel) · Meetup (events, no visa matching) · FindHello (directory) · Boundless (visa legal) · Tarjimly (translation) · Google/Reddit (generic).

### Homeis `[analysis]` — the most important competitor is the one that's already dead

The deck lists Homeis as a live competitor with "limited language support, narrow ethnic focus." The more useful fact: **Homeis shut down in July 2021**, after raising a **$12M Series A** (Canaan Partners, Spark Capital) for *precisely this product* — a language- and location-based immigrant community network. It grew during COVID and failed to hold retention or find monetization. The domain went up for sale. ([Startup Nation Central](https://finder.startupnationcentral.org/company_page/homeis?section=news); [Grokipedia summary](https://grokipedia.com/page/homeis))

This changes the competitive slide from a list into a thesis. **A well-funded, well-staffed version of this idea has already been tried and died on the two exact risks in your own SWOT: retention and monetization.** Any version of this plan that doesn't answer *"why doesn't this end like Homeis?"* is incomplete.

`[analysis]` The honest answer — and it's a good one — is that **Homeis was a social network; Landed is a question-answering utility with a social supply side.** Social networks need constant novelty to retain. A utility needs only to be there when the question arrives; retention is measured in *questions answered*, not daily sessions. That distinction is worth a slide of its own, and it's the reason the brief's "no events, no DMs, no feed-scrolling" **[brief]** discipline is a strategic choice rather than a scoping shortcut.

---

## 10. Trust, legal and ethics

**[deck]** GDPR/CCPA-aligned multilingual privacy policy · layered IP · ToS/EULA + vendor DPAs · governance board with immigrant-advocacy expertise · free core access · **fair labour and wellbeing protections for moderators** · independent audits · ethical review board with a member reporting channel. Hybrid AI + human moderation, supported by research that AI moderation is trusted comparably to human moderation *when paired with transparency and appeal* (Molina & Sundar, 2022).

**[brief]** Encryption at rest and in transit · **never train on user data, and say so plainly** · one-click delete-all · user-scoped storage, no cross-user leakage by design · report and block before launch.

`[analysis]` Three additions:

1. **Say what you do when the government asks.** Both documents cover privacy from a GDPR/CCPA angle — compliance with commercial regulation. Neither addresses the fear this population actually has, which is not marketing spam. Publish a plain-language policy on how you respond to government data requests, and minimise what you hold so the answer is short. This is a *feature*, and it's the single strongest trust differentiator available to you.
2. **The safety agent is a legal control, not a UX nicety.** Routing high-risk visa questions to humans with disclaimers is what keeps the platform on the right side of unauthorised-practice-of-law lines. Treat a mis-route on a `risk: high` question as a Sev-1, with a written escalation path.
3. **Moderator wellbeing is already in the deck — keep it.** It is unusual, it is correct, and it is the kind of detail that signals the team is serious.

---

## 11. Risks

**[deck]** four categories: financial (delayed break-even → milestone funding + $250K reserve), managerial (not enough regional experts → phased city rollout), product/market (verification trust breach → multi-level verification + safety budget), legal (cross-border exposure → disclaimers, jurisdictional handling).

`[analysis]` Reordered by what will actually kill it:

| Rank | Risk | Why it's ranked here | Mitigation |
|---|---|---|---|
| **1** | **Cold start on the supply side** | Priya without Rahul is a chatbot with extra steps. Every marketplace dies here, and Homeis had money and still did. | Hand-recruit 50 Rahuls before launch. Measure helper reply rate weekly. Density before breadth, one metro. |
| **2** | **Retention** | The named cause of Homeis's death and the reason a "community" framing is dangerous. | Reframe as a utility: success = questions answered, not sessions. Trigger re-engagement on life events (visa dates), not on feed activity. |
| **3** | **A wrong high-risk answer** | One person losing status because of a mis-routed answer ends the brand permanently. | Conservative routing thresholds, mandatory disclaimers, golden-set evals in CI, Sev-1 process. |
| **4** | **Trust/verification breach** | Deck's #3, correctly identified. | Multi-level verification, dedicated safety budget, published incident policy. |
| **5** | **Monetization timing** | Charging too early kills the loop; too late kills the runway. | Free until PMF **[brief]**, then Connect+ — with the free/paid line written down in advance. |
| **6** | **Policy volatility** | Category-wide, not company-specific (see §4). | Dated, versioned answers; make the change feed a feature. |

---

## 12. Metrics

**[brief]** Pre-launch: 50+ landing-page signups before building. Post-launch: 100 active users in 30 days; 40% ask a second question within a week.

`[analysis]` Those are right for Phase 1–2. Add the supply-side and safety metrics they're missing, and treat these as the v1 scorecard:

| Layer | Metric | Target |
|---|---|---|
| Demand | Second question within 7 days **[brief]** | 40% |
| **Supply** | **Helper reply rate within 24h** | **≥60%** |
| **Supply** | **Helpers answering ≥2 questions in 30 days** | **≥40%** |
| Match quality | Asker marks the match helpful | ≥70% |
| Routing | High-risk questions correctly routed to a human | 100% — any miss is a Sev-1 |
| Routing | AI-answered questions later escalated by the asker | <10% |
| Density | Active users in launch metro | 500 before opening a second city |
| Cost | Blended cost per answered question | Track from day one — it's the input to §7's contribution margin |

The North Star `[analysis]`: **questions answered well, per active user, per month** — where "well" means the asker marked it helpful and no escalation followed. It moves only if routing, supply and demand are all working, which is exactly the property you want.

---

## 13. Roadmap

**[brief]** Seven phases, roughly nine weekends, validate before you build:

1. **Product foundation** — talk to 5 real immigrants, write the brief *(done — this is that deliverable, extended)*
2. **Name, brand, landing page** — 50+ signups to continue; under 10, rethink
3. **System design** *(done — [arch])*
4. **Backend triage engine** — classifier, answer, matching, safety + pytest eval harness, 20 golden pairs
5. **Frontend** — onboarding, feed, SSE streaming, matches, notifications
6. **Auth, security, privacy** — non-negotiable before real users
7. **CI/CD, observability, launch**

`[analysis]` Two amendments. **Insert supply recruitment as Phase 2.5** — 50 hand-recruited Rahuls before any Priya sees the product, because a launch into an empty helper pool burns the waitlist you just built and you only get one. And **move the free/paid line and the government-request policy into Phase 6**, where the rest of the trust work already sits.

Immediate, from **[Action Items]**: talk to 5 real immigrants (*listen, don't pitch*), settle the name and buy the domain, set up the repo, draft the landing copy.

---

## 14. Open decisions — for Sharad & Prathma

Ordered by how much each unblocks.

1. **One name.** Landed or ImmigrantConnect. Recommendation in §2; decide it this week and retire the other everywhere.
2. **One financial model.** Recommendation: the Wk7 model. Rebuild the business-model slide from it. *(§8)*
3. **Whose venture is this?** A capstone, a startup, or a portfolio project? The deck asks for a seed round and a founding team; the brief is a solo nine-weekend build. Both are legitimate — they are not the same commitment, and the answer changes Phase 2 onward.
4. **Beachhead: Indian tech workers, or all immigrants?** The brief's density argument is strong and I'd take it. But it narrows the mission the deck is built on, and Prathma should agree to that narrowing explicitly rather than discover it later.
5. **Toronto: in or out of Year 1?** Recommendation: out. *(§1, contradiction #5)*
6. **What's free forever?** Write the line before the first paying user, not after. *(§8)*
7. **Legal opinion on the law-firm revenue streams** before they appear in an investor deck. *(§8)*

---

## Appendix — sources

**Primary (the folder):** `ImmigrantConnect_Venture_Plan_Presentation.pptx` and PDF export · `Landed_Product_Brief` · `Landed_System_Design` · `Landed_Agent_Architecture` · `Action Items` — all in *Immigrants Idea WORK*, owner prathma0909@gmail.com.

**Cited in the deck:** [Pew Research Center (2025)](https://www.pewresearch.org/short-reads/2025/08/21/key-findings-about-us-immigrants/) · [Migration Policy Institute (2025)](https://www.migrationpolicy.org/article/frequently-requested-statistics-immigrants-and-immigration-united-states) · Molina & Sundar (2022), *When AI Moderates Online Content*, JCMC 27(4) · Ma & Agarwal (2007), *Identity Verification and Knowledge Contribution*, ISR 18(1) · Rochet & Tirole (2003) · Adedeji (2021, 2024) · Akter et al. (2024) · Safari & Das (2023) · plus the full reference slide in the deck.

**Added in this document:**
- [American Immigration Council — USCIS filing trends, FY2026](https://www.americanimmigrationcouncil.org/blog/uscis-immigration-processing-trends-2026/)
- [American Immigration Council — USCIS backlog dashboard](https://www.americanimmigrationcouncil.org/blog/uscis-backlogs-processing-trends-dashboard/)
- [USCIS — FY2027 H-1B registration selection completed](https://www.uscis.gov/newsroom/alerts/fy-2027-h-1b-initial-registration-selection-process-completed)
- [Vorys — Court strikes down the $100,000 H-1B fee](https://www.vorys.com/publication-court-strikes-down-100-000-h-1b-entry-fee-but-fee-still-applies-pending-appeal)
- [Greenberg Traurig — The $100,000 H-1B filing fee](https://www.gtlaw.com/en/insights/2025/9/the-new-100000-h1b-filing-fee-employer-considerations)
- [Startup Nation Central — Homeis](https://finder.startupnationcentral.org/company_page/homeis?section=news) · [Grokipedia — Homeis](https://grokipedia.com/page/homeis)
- [Boundless — Request for Evidence explained](https://www.boundless.com/immigration-resources/what-is-a-request-for-evidence-rfe-and-what-should-i-do-about-it)
- [IBISWorld — Immigration lawyers & attorneys in the US](https://www.ibisworld.com/united-states/market-size/immigration-lawyers-attorneys/4808/)
