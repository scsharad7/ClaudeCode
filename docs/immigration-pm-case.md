# Passage — Product Case

**A single source of truth for the immigration-help product.**

| | |
|---|---|
| **Status** | Draft v0.1 — for review by Sharad & Prathma |
| **Owner** | Sharad Tuli |
| **Date** | 19 August 2026 |
| **Working name** | "Passage" (placeholder — replace with the name used in Prathma's deck) |
| **Purpose** | The reference document every later artifact (deck, financial model, PRD, pitch) is derived from. If something contradicts this doc, this doc is wrong or the change wasn't landed here. |

---

## 0. Read this first — provenance and what is unverified

This document was assembled **without access to the source folder**. The Google Drive folder *"Immigrants Idea WORK"* (shared 19 Aug 2026 by sharad.tuli77@gmail.com) was shared to `scsharad7@gmail.com`; the Drive connector available to me is authenticated as `steverorgers12@gmail.com`, and `drive.google.com` is blocked from direct fetch in this environment. Prathma's MBA final presentation has therefore **not** been read.

Consequences, stated plainly:

- **Everything in §§1–3 and §§5–8 (problem, product, model, GTM) is a reasoned hypothesis, not a transcription of your idea.** Each section carries an `ASSUMPTION` marker where it is doing inference.
- **Everything in §4 (market), §9 (competition) and the appendix is externally sourced and verifiable.** Those numbers stand on their own regardless of what the deck says.
- To close the gap: share the folder with `steverorgers12@gmail.com`, or paste the deck's contents into the thread. §12 lists exactly which claims flip.

---

## 1. Thesis

> The United States asks skilled immigrants to run a 10–15 year, multi-employer, multi-agency legal process with no system of record, no continuity, and no one accountable for the whole path. Every existing product owns a *slice* — one filing, one employer, one law firm. **We own the person's file for the length of their journey.**

Three claims underneath it:

1. **The unit of value is the case history, not the filing.** A filing is a transaction that ends. A person's status history — every I-797, I-94, priority date, travel record, employer change, dependent — compounds in value for a decade and is required, in fragments, at every future step. Today it lives in a Gmail folder and a shoebox.
2. **Employer-owned tools structurally cannot hold it.** Envoy, Deel, Localyze and every HRIS-attached mobility product are scoped to the employment relationship. The moment you change jobs — which the average H-1B holder does two to four times during a 12-year green card queue — the record resets. The immigrant's need outlives every employer they will have.
3. **The error cost just went up, which makes correctness a purchasable product.** USCIS has stated it may deny a request outright, without first issuing a Request for Evidence or a Notice of Intent to Deny, where initial evidence is missing. Getting it right the first time used to be cheaper; it is now sometimes the only chance.

---

## 2. The problem

### 2.1 Who hurts

| Segment | Size (US, est.) | What breaks for them |
|---|---|---|
| **Skilled worker in a status chain** (F-1 → OPT → H-1B → O-1/EB-1A/NIW → I-485) | ~600k H-1B holders + dependents | No consolidated timeline; every job change, travel plan or dependent's birthday triggers a question nobody owns |
| **In the employment-based green card queue** | >1M Indian nationals affected; EB-2 India final action dates sit around **July 2014**, EB-3 India around **Jan 2014** — 12–13 year queues | Decade-long uncertainty with no planning tool; the plan changes with each monthly visa bulletin |
| **International students** | ~1.1M F-1/M-1 | Highest-stakes decisions (CPT/OPT/STEM extension timing, cap-gap) made with the least information and no budget for counsel |
| **Founders / researchers on O-1A, EB-1A, NIW** | Small but high-value | Evidence-assembly problem, not a form problem; $5k–$15k+ in fees, months of effort, opaque criteria |
| **Small & mid employers (10–500 people)** | Tens of thousands | Too small for Fragomen/BAL service levels, too exposed to skip compliance |

### 2.2 What actually goes wrong

- **Nobody holds the timeline.** The attorney holds the matter; the employer holds the employment; the person holds the anxiety. No party holds the ten-year path.
- **The documents are scattered and the extraction is manual.** Receipt numbers, priority dates, I-94 expiry, LCA validity, visa stamp dates — all of it exists as PDFs and photos, re-typed by a paralegal each time at billable rates.
- **Advice is expensive and lumpy.** Flat fees typically run **$2,000–$15,000** per matter, hourly **$150–$500+**, and initial consultations **$100–$400** — which prices out exactly the questions that are cheap to answer and catastrophic to get wrong ("can I travel in December?").
- **Self-filing is a real and badly-served behavior.** An estimated **50–80% of non-citizens have unmet legal needs**. Boundless's study of marriage-based adjustment found **RFE rates of 22–29%**; pro se filers skew worse, and the RFE-optional denial policy removes the safety net.
- **The rules move faster than the advice.** See §3.

`ASSUMPTION` — the beachhead pain is *coordination and correctness across a long timeline*, not *cheaper form filling*. If the deck's core insight is price disruption of legal fees, §5 changes materially.

---

## 3. Why now (2026)

Four things are true at once this year, and they weren't three years ago.

**1. The system is visibly failing at scale.** USCIS ended FY2026 Q1 with **11.3M cases pending**, up 17% year over year. The net backlog — cases inside the government's own control — went from under 4.3M to **6.3M** in twelve months. USCIS completed **1.8M cases in Q1, down 41%** year over year, and completed **86 cases for every 100 received** — the **eleventh consecutive quarter** below break-even. A backlog that compounds is a permanent demand signal for tools that help people wait intelligently.

**2. Policy volatility became the norm, not the exception.** The $100,000 H-1B fee proclamation was signed **19 Sept 2025**, applied to new petitions from **21 Sept 2025**, was **struck down 8 June 2026**, and the First Circuit declined to stay that ruling — leaving employers who budgeted for it, and candidates who declined offers over it, with a year of decisions made on a rule that no longer exists. Separately, FY2027 replaced the random lottery with **wage-weighted selection** (Level IV offers get four entries, Level I gets one) against **211,600 registrations for 85,000 slots (~40% selection)**. Volatility is the product opportunity: a versioned, diff-able policy corpus with a personalized change feed is a feature no PDF-and-blog incumbent can match.

**3. The error cost rose.** USCIS's move to deny without first issuing an RFE or NOID converts "complete and correct on first submission" from good practice into the entire game.

**4. The technology finally fits the problem.** Document extraction across messy scans, long-context reasoning over a person's full history, and retrieval grounded in primary sources are all now reliable enough to build on — *provided* the system is architected to answer only from the user's own record plus a cited corpus, and to route everything else to a licensed attorney (§10).

---

## 4. Market opportunity

### 4.1 Top-down

| Measure | Value | Source |
|---|---|---|
| US immigration lawyers & attorneys market | **$10.6B (2026)**, +2.5% YoY | IBISWorld |
| Global immigration legal services | **$23.3B (2026)** → **$29.7B (2030)** | The Business Research Company |
| US legal services overall | ~$488B by 2035 | Precedence Research |

The relevant frame is not "take share of law firms" — it's that **$10.6B/yr of US spend is already flowing through the workflow we intend to own**, most of it for work (intake, document handling, status tracking, form assembly) that does not require a JD.

### 4.2 Bottom-up (the number to defend)

`ASSUMPTION` — population figures are public-source estimates; per-unit prices are ours and must be pressure-tested.

**Consumer subscription pool**

| Input | Estimate |
|---|---|
| H-1B holders + dependents | ~600k principals, ~1.0M with dependents |
| International students (F-1/M-1) | ~1.1M |
| Employment-based green card queue (principals + derivatives) | ~1.8M |
| De-duplicated addressable individuals | **~3.0–3.5M** |
| Price | $240/yr (Plus) |
| **Subscription SAM** | **~$720M–$840M** |

**Filing services pool**

| Input | Estimate |
|---|---|
| Employment-based filings per year (H-1B new/extension/transfer, O-1, I-140, I-485, I-765, I-131, dependents) | ~1.2M |
| Average legal fee per matter | ~$2,500 |
| Gross services pool | **~$3.0B** |
| Share addressable by a tech-forward, attorney-of-record model | ~35% |
| **Filing SAM** | **~$1.05B** |

**Employer pool**

| Input | Estimate |
|---|---|
| US employers sponsoring, in the 10–500 employee band | ~25k |
| ACV | $12k |
| **Employer SAM** | **~$300M** |

> **SAM ≈ $1.5–1.9B.** **TAM ≈ $10.6B** (US) / **$23.3B** (global immigration legal services).

### 4.3 SOM — a model, not a forecast

Year 3, if the wedge works:

| Line | Volume | Net revenue |
|---|---|---|
| Free users (system of record) | 150,000 | — |
| Paid subscribers (8% conversion) | 12,000 | $2.9M |
| Filings via partner attorneys | 4,000 @ $900 net take | $3.6M |
| Employer accounts | 120 @ $18k | $2.2M |
| **Total** | | **~$8.7M ARR** |

Every figure above is a modeled assumption with a named driver, so each is falsifiable in beta (§11). Treat this table as a set of bets, not a projection.

---

## 5. What we're building

### 5.1 One sentence

**Passage is the immigrant's own system of record — a lifetime case file that reads your documents, watches your deadlines, answers questions with citations, and hands a complete, correct packet to a licensed attorney when you need to file.**

### 5.2 Three layers

**Layer 1 — The Case Graph (the moat).**
One structured timeline per person and household: every status, receipt number, priority date, I-94, travel event, employer, dependent, and deadline, extracted automatically from uploaded documents (I-797, I-94, I-20, EAD, visa stamps, LCA, DS-160 confirmations). This layer is free, forever, and portable across employers and attorneys. It is the thing no employer-owned tool can hold and no law firm has an incentive to give you.

**Layer 2 — The Copilot (the daily habit).**
Answers grounded in *two* sources only: your own case graph, and a versioned corpus of primary material (USCIS Policy Manual, monthly visa bulletins, the Foreign Affairs Manual, Federal Register notices). Every answer is cited to a paragraph and dated. Anything requiring judgment is routed to an attorney rather than guessed at. Plus: scenario planning — *"if I switch employers in November, what breaks?"* — which is the question people cannot get answered today at any price short of a consult.

**Layer 3 — Execution rails (the revenue).**
Evidence checklists mapped to the actual regulatory criteria for O-1A / EB-1A / NIW; packet assembly; RFE response builder; attorney-of-record marketplace with licensed partner firms; an employer/HR view for the sponsoring side.

### 5.3 Beachhead

**Employment-based, high-skilled immigrants in tech, starting with the F-1 → H-1B → O-1/EB-1A/NIW → I-485 chain.** They have urgency, budget, dense referral networks, repeat filings over a decade, and — critically — they are the population most likely to try a self-serve product before calling a lawyer.

### 5.4 Explicit non-goals for v1

- Asylum, removal defense, humanitarian relief — different risk profile, different economics, and doing them badly harms people.
- Family-based immigration — Boundless owns this and owns it well.
- Non-US destinations.
- Being the attorney. We are the record and the rails; licensed partners are the counsel.

`ASSUMPTION` — the whole of §5 is my construction. If Prathma's deck defines the product as (a) a marketplace for attorneys, (b) a student-focused advisory service, or (c) an employer compliance tool, §§5–8 need rewriting; §§2–4 and 9–10 largely survive.

---

## 6. Business model

| Tier | Price | What it buys | Why it exists |
|---|---|---|---|
| **Free** | $0 | Case graph, document vault, deadline tracking | Acquisition + the data asset. Never gate the record. |
| **Plus** | $29/mo or $240/yr | Copilot with citations, scenario planner, RFE risk review, unlimited extraction | The recurring habit |
| **Filings** | $1,500–$4,500 per matter (rev-share with partner firm) | Attorney-of-record representation on a pre-assembled packet | The margin, priced under the $5k–$15k boutique range for O-1/EB-1A |
| **Employer** | $12k–$24k ACV | HR dashboard, sponsorship pipeline, LCA/PAF and I-9 hygiene | Distribution + a second, stickier buyer |

**Why this shape:** the free tier makes the record universal, the subscription funds the habit between filings (the 11 months a year when nothing is due but anxiety is high), and the filing revenue captures the moment of highest willingness to pay — without us ever needing to be a law firm.

---

## 7. Go-to-market

1. **Community-led, immigrant-first.** The audience already congregates around specific creators, subreddits, and WhatsApp/Discord groups; they trade screenshots of approval notices. Seed where the screenshots are traded. Organic CAC target: **$40–$80**.
2. **University ISSO channel.** International student offices are structurally understaffed and legally constrained in what they can advise on. A free record-keeping tool for their students is an easy yes and reaches people at status-chain step one.
3. **Startup employer channel.** Accelerator portfolios (the same channel Alma has already validated with YC/Techstars/Pear) — sell the employer tier, acquire the individuals inside it, keep them when they leave.
4. **Attorney partners as a channel, not just supply.** Firms hand clients a portal that is genuinely better than their own, and get pre-assembled matters in return.

---

## 8. Moat

| Layer | Defensibility | Honest assessment |
|---|---|---|
| Case graph | Switching cost compounds with every document and year | **Strong** — but only if we win the record before an incumbent bundles it |
| Grounded policy corpus + change feed | Versioned primary-source corpus is expensive to build, cheap to copy once seen | **Medium** — a head start, not a wall |
| Outcome data (RFE/approval rates by evidence pattern) | Genuine data network effect: more cases → better checklists → better outcomes → more cases | **Strong, and slow** — this is the real long-term asset |
| Attorney supply network | Two-sided, but attorneys multi-home | **Weak** |
| Brand as the trusted, non-extractive party | In this market, trust is the scarcest input | **Strong if earned, unrecoverable if lost** |

---

## 9. Competitive landscape

| Player | Where they're strong | The gap we exploit |
|---|---|---|
| **Alma** | Attorney-led + AI, employment-based visas, YC/Techstars/Pear preferred-provider deals, startup tier for 0–25 foreign nationals | Transaction-scoped: engaged per matter, not the record between matters |
| **Boundless** | Family-based leader; acquired Bridge (2023) for business/career immigration and **Localyze** for European workforce mobility | Family DNA and an employer-mobility motion; the individual's lifetime file isn't the product |
| **Envoy Global** | Established corporate immigration platform + law firm | Employer-owned; nothing survives a job change |
| **Deel / Rippling (embedded immigration)** | HRIS bundling — the most dangerous distribution in the category | Same structural limit: scoped to employment; also the reason speed matters |
| **Lawfully** | Consumer case tracking, large user base | Tracking without execution; a widget, not a record |
| **Docketwise / Casebase and firm software** | Attorney-side workflow | Sells to the firm; the immigrant is the object, not the user |
| **Traditional firms (Fragomen, BAL)** | Enterprise trust and depth | Priced and staffed for the enterprise; the individual is not the client |

**The one-line position:** *Everyone else is organized around a filing or an employer. We are organized around a person.*

---

## 10. Regulatory, ethical and trust constraints

These are not a compliance appendix. In this category they are product architecture.

1. **Unauthorized practice of law (UPL).** A non-lawyer product that gives case-specific legal advice is illegal in every state and is the failure mode that has produced decades of *notario* harm. Architecture: information and document assembly are ours; advice requires a licensed attorney of record; the copilot refuses rather than approximates, and the refusal routes to a human. Get a state-by-state opinion before launch, not after.
2. **Model error in a high-stakes domain.** A hallucinated deadline can end someone's status. Mitigations: retrieval-only answers with dated citations; refusal outside the corpus; human review on anything filed; an evaluation suite built on real historical cases with known outcomes; a published error and correction policy.
3. **Data sensitivity is existential here.** Immigration status data is among the most sensitive categories a person can hand over, and the current enforcement climate makes users right to be cautious. Commit in writing and in architecture: data minimization, encryption, defined retention, one-click export and delete, no sale or sharing, and a published policy on how we respond to government requests. **If we are ever the reason someone's data was used against them, there is no version of this company that survives it.** Design as though that is the only failure that matters.
4. **Accuracy of policy content.** The corpus must be versioned and dated, and every answer must show *which version* it relied on. The $100k-fee whiplash is the standing example: correct advice in October 2025 was wrong advice in July 2026.

---

## 11. Success metrics

**North Star:** *case milestones completed on time and approved on first submission, per active user, per year.* It moves only if the product is used, correct, and consequential.

| Layer | Metric | Target (beta) |
|---|---|---|
| Adoption | % of new users with ≥3 documents extracted in week 1 | ≥45% |
| Quality | Document extraction field accuracy (human-audited) | ≥97% |
| Quality | Copilot answers fully grounded in a cited source | 100% (any exception is a Sev-1) |
| Value | Deadline capture rate vs. reconstructed ground truth | ≥95% |
| Outcome | RFE rate on Passage-assembled matters vs. category benchmark | Beat benchmark by ≥30% |
| Business | Free → Plus conversion | 6–9% |
| Business | Plus → filing conversion | ≥12% |
| Business | Gross margin per partner-attorney matter | ≥55% |
| Guardrail | Unresolved hallucination incidents | 0 |
| Guardrail | UPL escalation misses (should have gone to an attorney, didn't) | 0 |

**Kill criteria — the honest version.** If, after 100 beta users: fewer than 25% upload three or more documents in week one, the system-of-record wedge is wrong and we should reconsider being an execution-only service. If partner matters cannot clear 55% gross margin, the marketplace model is wrong and we should be software-only.

---

## 12. Roadmap

**Phase 1 — Prove the wedge (months 0–3).** 40 discovery interviews across the four beachhead sub-segments. Build extraction for the eight highest-frequency document types. Private beta, 100 users. **No filings, no legal advice, no revenue.** Exit criteria: the adoption and deadline-capture targets in §11.

**Phase 2 — Earn the right to charge (months 3–6).** Grounded copilot with citations. Evidence checklists for O-1A / EB-1A / NIW. One attorney partner firm, 25 pilot matters. First revenue. Exit criteria: RFE rate below category benchmark on pilot matters; ≥55% gross margin.

**Phase 3 — Make it a business (months 6–12).** Plus tier GA. Employer pilot with five companies in the 10–200 band. Policy change feed shipped. Decision point on expansion: family-based, or a second country, or deeper into employer compliance.

---

## 13. Open questions — reconcile against Prathma's deck

Ordered by how much each one changes the document.

1. **What is the product, in her framing?** Marketplace, copilot, employer tool, or student service? (Rewrites §§5–8.)
2. **Which segment does the deck start with?** Students, H-1B workers, founders, or employers? (Rewrites §7, resizes §4.2.)
3. **Is there primary research in the folder** — survey data, interview notes, an MBA-course customer discovery deliverable? Primary data replaces my assumption markers with evidence, and is the single highest-value thing in that folder.
4. **What is the actual product name**, and is there existing brand work?
5. **Is there a financial model already built?** If so, §4.3 should be replaced by it, not reconciled with it.
6. **What did the class or professor push back on?** Recorded objections are worth more than the deck itself.
7. **Is this a company, a course project, or a side project?** The answer changes Phase 1 entirely — a company needs the UPL opinion in month one; a course project does not.

---

## Appendix — Sources

Backlog and processing:
- [American Immigration Council — USCIS filing trends, FY2026](https://www.americanimmigrationcouncil.org/blog/uscis-immigration-processing-trends-2026/)
- [American Immigration Council — USCIS backlog dashboard](https://www.americanimmigrationcouncil.org/blog/uscis-backlogs-processing-trends-dashboard/)
- [Niskanen Center — Legal immigration in numbers, June 2026](https://www.niskanencenter.org/immigrationdata/)
- [USCIS — Reducing frivolous requests / evidence standards (RFE-optional denial policy)](https://www.uscis.gov/newsroom/alerts/uscis-to-reduce-frivolous-immigration-benefits-requests-by-reinforcing-evidence-standards)

Market size:
- [IBISWorld — Immigration lawyers & attorneys in the US](https://www.ibisworld.com/united-states/market-size/immigration-lawyers-attorneys/4808/)
- [The Business Research Company — Immigration legal services global market report 2026](https://www.thebusinessresearchcompany.com/report/immigration-legal-services-global-market-report)
- [National Law Review — Immigration legal services projected to $29.71B by 2030](https://natlawreview.com/press-releases/immigration-legal-services-market-projected-attain-value-us-2971-billion)
- [Precedence Research — US legal services market](https://www.precedenceresearch.com/us-legal-services-market)

Policy:
- [USCIS — FY2027 H-1B initial registration selection completed](https://www.uscis.gov/newsroom/alerts/fy-2027-h-1b-initial-registration-selection-process-completed)
- [USCIS — FY2027 H-1B cap registration period](https://www.uscis.gov/newsroom/alerts/fy-2027-h-1b-cap-initial-registration-period-opens-on-march-4)
- [Greenberg Traurig — The $100,000 H-1B filing fee](https://www.gtlaw.com/en/insights/2025/9/the-new-100000-h1b-filing-fee-employer-considerations)
- [Vorys — Court strikes down the $100,000 H-1B entry fee](https://www.vorys.com/publication-court-strikes-down-100-000-h-1b-entry-fee-but-fee-still-applies-pending-appeal)
- [Grossman Young & Hammond — H-1B fee litigation update](https://www.grossmanyoung.com/blog/h1b-litigation-update/)
- [WR Immigration — EB-2 India unavailable through 30 Sept 2026](https://wolfsdorf.com/united-states-eb-2-india-unavailable-through-september-30-2026-what-employers-and-indian-nationals-need-to-know/)
- [Beyond Border Global — EB-2 India wait time and forecast](https://www.beyondborderglobal.com/resources/eb2-india-green-card-wait-time-2025-predictions-backlogs-and-timeline-forecast)
- [Manifest Law — EB-3 green card statistics 2026](https://manifestlaw.com/blog/eb3-visa-statistics)

Cost and behavior:
- [Modern Law Group — Immigration lawyer cost, 2026 pricing guide](https://lawofficeimmigration.com/pricing.html)
- [Modern Law Group — 2026 USCIS filing fee guide](https://lawofficeimmigration.com/blog/hr1-immigration-fees-2026.html)
- [Boundless — Request for Evidence explained (RFE rate study)](https://www.boundless.com/immigration-resources/what-is-a-request-for-evidence-rfe-and-what-should-i-do-about-it)
- [Ayuda — Notario fraud remedies: a practical manual](https://ayuda.com/wp-content/uploads/2019/01/Notario-Fraud-Remedies_A-Practical-Manual-for-Immigration-Practitioners.pdf)

Competition:
- [Laborless — Immigration tech in 2025: AI funding and a rebrand](https://blog.laborless.io/immigration-tech-in-2025-serious-ai-funding-and-a-big-immigration-tech-rebrand/)
- [Alma vs Boundless vs Envoy Global](https://www.tryalma.com/learn/alma-vs-boundless-vs-envoy-global)
- [Alma vs BAL vs Boundless](https://www.tryalma.com/learn/alma-vs-bal-vs-boundless)
