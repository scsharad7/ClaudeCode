/*
 * data.js — Fix My Itch, USA edition
 * ------------------------------------
 * The problem dataset. Each record represents a real, everyday American pain
 * point curated for founders. Scores are on the following scales:
 *   severity   4–10  (how painful is it when it happens?)
 *   frequency  2–10  (how often does it bite?)
 *   whitespace 4–9   (how underserved is the space today?)
 *   tam        6–10  (size of the US total addressable market)
 *   itch       ~55–100 composite "Itch Score" (see computeItch below)
 *
 * The Itch Score is a weighted blend of the four dimensions, normalized to a
 * ~55–100 range so every problem in the database feels build-worthy.
 */

/* The 16 industry categories that power the filter chips. */
const CATEGORIES = [
  "Fintech & Payments",
  "Healthcare & Insurance",
  "Housing & Real Estate",
  "Logistics & Delivery",
  "Education & Student Debt",
  "Gig & Freelance Work",
  "Retail & Commerce",
  "Food & Restaurants",
  "Travel & Mobility",
  "Family & Childcare",
  "Government & Bureaucracy",
  "Climate & Energy",
  "SMB Operations",
  "Legal & Compliance",
  "Media & Subscriptions",
  "Personal Finance"
];

/*
 * computeItch — proprietary "Itch Index" composite.
 * Weights: Severity 30%, Frequency 25%, Market Whitespace 20%, TAM 25%.
 * Each sub-score is on a 0–10 feel; we scale the weighted average to 55–100
 * so the database reads as a shortlist of genuinely worth-building problems.
 */
function computeItch({ severity, frequency, whitespace, tam }) {
  const weighted =
    severity * 0.30 +
    frequency * 0.25 +
    whitespace * 0.20 +
    tam * 0.25; // roughly 4–10
  // Map ~4–10 onto ~55–100.
  const score = 55 + ((weighted - 4) / 6) * 45;
  return Math.round(Math.max(55, Math.min(100, score)));
}

/* The raw problem records. `itch` is filled in below via computeItch. */
const RAW_PROBLEMS = [
  // --- Fintech & Payments ---
  {
    id: 1,
    title: "Why is splitting a restaurant bill across five payment apps still a group-chat argument?",
    description:
      "Americans juggle Venmo, Cash App, Zelle, and Apple Cash, yet splitting a $180 dinner still means someone fronts it and chases friends for weeks. Group settlement across apps is fragmented and awkward. A neutral splitter that reconciles across rails could own the after-dinner moment.",
    category: "Fintech & Payments",
    severity: 6, frequency: 9, whitespace: 6, tam: 8
  },
  {
    id: 2,
    title: "Why do overdraft fees still surprise Americans living paycheck to paycheck?",
    description:
      "Roughly 60% of US households live paycheck to paycheck, and banks still pulled billions in overdraft fees last year. Real-time balance clarity and pre-empted shortfalls are unevenly served across regional banks and credit unions. There's whitespace in proactive, fee-killing cash-flow tooling.",
    category: "Fintech & Payments",
    severity: 8, frequency: 7, whitespace: 6, tam: 8
  },
  {
    id: 3,
    title: "Why can't small landlords collect rent without Venmo fees or a paper check?",
    description:
      "Mom-and-pop landlords own a huge share of US rentals but lack clean rent-collection tooling. They resort to personal payment apps that flag business use, or wait on mailed checks. A trust-and-deposit layer built for the 1–10 unit owner is underbuilt.",
    category: "Fintech & Payments",
    severity: 6, frequency: 6, whitespace: 7, tam: 7
  },

  // --- Healthcare & Insurance ---
  {
    id: 4,
    title: "Why does a routine ER visit produce three surprise bills months later?",
    description:
      "Even with the No Surprises Act, Americans get hit with confusing out-of-network charges and duplicate facility fees weeks after care. Bill negotiation and error-catching is manual and intimidating. A consumer-side claims auditor with real leverage is a massive opportunity.",
    category: "Healthcare & Insurance",
    severity: 10, frequency: 7, whitespace: 9, tam: 10
  },
  {
    id: 5,
    title: "Why is finding an in-network therapist who's actually accepting patients nearly impossible?",
    description:
      "Insurer directories are riddled with 'ghost networks' — listed providers who don't take the plan or aren't taking clients. Patients call 15 offices before giving up. Verified, real-time behavioral-health availability is a painful, high-demand gap.",
    category: "Healthcare & Insurance",
    severity: 9, frequency: 5, whitespace: 8, tam: 8
  },
  {
    id: 6,
    title: "Why do prescriptions cost 4x more at one pharmacy than another across the street?",
    description:
      "Cash prices for the same drug swing wildly between chains, and GoodRx-style savings are inconsistent. Patients rarely know the cheapest option before standing at the counter. Transparent, real-time drug pricing with automatic coupon stacking still has room.",
    category: "Healthcare & Insurance",
    severity: 7, frequency: 6, whitespace: 6, tam: 8
  },
  {
    id: 7,
    title: "Why can't seniors and caregivers manage Medicare Advantage choices without a broker's bias?",
    description:
      "Every fall, 60M+ Americans face Medicare open enrollment with plans engineered to confuse. Most 'free' advisors are commissioned brokers. Unbiased, data-driven plan matching for seniors and their adult children is underserved and time-sensitive.",
    category: "Healthcare & Insurance",
    severity: 8, frequency: 4, whitespace: 7, tam: 8
  },

  // --- Housing & Real Estate ---
  {
    id: 8,
    title: "Why is applying to apartments a $50-per-application credit-check racket?",
    description:
      "Renters in hot markets pay non-refundable application and screening fees to multiple buildings, often $40–75 each, with no portability. A reusable, tenant-owned screening report accepted by landlords could kill redundant fees for millions of movers.",
    category: "Housing & Real Estate",
    severity: 7, frequency: 6, whitespace: 7, tam: 7
  },
  {
    id: 9,
    title: "Why does every homeowner get blindsided by their first property-tax reassessment?",
    description:
      "Property-tax bills spike after purchase or reassessment, and appeals are opaque and county-specific. Most owners overpay because appealing is a bureaucratic maze. Automated assessment-appeal tooling has proven demand and clear ROI per user.",
    category: "Housing & Real Estate",
    severity: 7, frequency: 4, whitespace: 8, tam: 7
  },
  {
    id: 10,
    title: "Why is HOA communication still run over email chains and printed newsletters?",
    description:
      "Over 74M Americans live under an HOA, yet dues, violations, and votes are managed on spreadsheets and Gmail. Transparency disputes are constant. A modern HOA operating system for the self-managed community is a sticky, recurring-revenue niche.",
    category: "Housing & Real Estate",
    severity: 6, frequency: 5, whitespace: 7, tam: 6
  },
  {
    id: 11,
    title: "Why can't first-time buyers understand what their mortgage actually costs over time?",
    description:
      "Between PMI, escrow, points, and rate buydowns, buyers sign 40-page packets they don't understand. Comparison tools optimize for lead-gen, not clarity. A buyer-first mortgage explainer and true-cost simulator addresses a high-stakes decision.",
    category: "Housing & Real Estate",
    severity: 7, frequency: 4, whitespace: 6, tam: 8
  },

  // --- Logistics & Delivery ---
  {
    id: 12,
    title: "Why do stolen porch packages still have no real recourse for the average person?",
    description:
      "Porch piracy hits tens of millions of US deliveries a year, and carriers/retailers push blame around while the buyer eats the loss. Claims are slow and inconsistent. A package-protection and instant-resolution layer for everyday deliveries is wide open.",
    category: "Logistics & Delivery",
    severity: 6, frequency: 7, whitespace: 6, tam: 7
  },
  {
    id: 13,
    title: "Why is returning an online order a scavenger hunt for a box, a label, and a drop-off?",
    description:
      "US e-commerce returns top $700B+ annually, but the consumer experience is printing labels, taping boxes, and driving to a carrier. Boxless, instant-refund returns are still inconsistent across retailers. A universal returns concierge has real pull.",
    category: "Logistics & Delivery",
    severity: 5, frequency: 7, whitespace: 6, tam: 8
  },
  {
    id: 14,
    title: "Why can't a small e-commerce brand get fair shipping rates without hitting Amazon's scale?",
    description:
      "Sub-scale DTC brands pay retail carrier rates that crush margins, while giants get 40% off. Rate-pooling and negotiated multi-carrier access for small sellers is fragmented. Aggregated shipping leverage for the long tail is a durable SMB play.",
    category: "Logistics & Delivery",
    severity: 7, frequency: 6, whitespace: 6, tam: 7
  },

  // --- Education & Student Debt ---
  {
    id: 15,
    title: "Why is figuring out which student-loan repayment plan you qualify for a full-time job?",
    description:
      "With SAVE, PAYE, IBR, and PSLF churning through court challenges, 40M+ borrowers can't tell which plan minimizes lifetime cost. Servicer advice is unreliable. A borrower-side optimizer that models forgiveness scenarios is high-value and high-anxiety.",
    category: "Education & Student Debt",
    severity: 8, frequency: 5, whitespace: 7, tam: 8
  },
  {
    id: 16,
    title: "Why do families still overpay for college because financial-aid letters are intentionally confusing?",
    description:
      "Award letters mix grants, loans, and work-study with no standard format, making true net cost impossible to compare. Families sign up for debt blindly. A net-price decoder and appeal generator sits on a huge, recurring annual cohort.",
    category: "Education & Student Debt",
    severity: 7, frequency: 4, whitespace: 8, tam: 7
  },
  {
    id: 17,
    title: "Why is there no trusted way to know if a bootcamp or trade program actually pays off?",
    description:
      "Career-changers spend $15k+ on programs with self-reported outcome stats. Verified, audited placement and salary data by program is absent. An outcomes-transparency layer for non-degree training taps a growing reskilling market.",
    category: "Education & Student Debt",
    severity: 6, frequency: 4, whitespace: 8, tam: 6
  },

  // --- Gig & Freelance Work ---
  {
    id: 18,
    title: "Why do rideshare and delivery drivers have no idea what they actually earn per hour?",
    description:
      "After gas, mileage depreciation, and dead miles, gig drivers can't compute real take-home across Uber, Lyft, and DoorDash. Platforms obscure it. A cross-platform earnings and true-cost tracker for 7M+ gig workers is a proven, sticky wedge.",
    category: "Gig & Freelance Work",
    severity: 7, frequency: 8, whitespace: 6, tam: 7
  },
  {
    id: 19,
    title: "Why do freelancers still spend a weekend every quarter on estimated taxes they might get wrong?",
    description:
      "70M+ Americans do freelance or 1099 work and must self-withhold quarterly, but tools don't auto-calculate and set aside in real time. Underpayment penalties hurt. An auto-withholding tax layer for the self-employed is a large, underbuilt space.",
    category: "Gig & Freelance Work",
    severity: 8, frequency: 5, whitespace: 7, tam: 8
  },
  {
    id: 20,
    title: "Why do freelancers ghost projects after a partial deposit with zero consequences?",
    description:
      "Small businesses hiring freelancers on marketplaces get burned by half-finished work and no accountability once the deposit clears. Escrow and reputation are weak outside the big platforms. Trust infrastructure for direct freelance deals is open.",
    category: "Gig & Freelance Work",
    severity: 6, frequency: 6, whitespace: 6, tam: 7
  },
  {
    id: 21,
    title: "Why can't gig workers get proof-of-income for an apartment or car loan?",
    description:
      "Lenders and landlords want W-2s or pay stubs, which gig and freelance workers don't have. Aggregating and certifying variable income into a lender-accepted format is clunky. Verified income for the 1099 economy unlocks huge downstream credit access.",
    category: "Gig & Freelance Work",
    severity: 7, frequency: 5, whitespace: 7, tam: 7
  },

  // --- Retail & Commerce ---
  {
    id: 22,
    title: "Why is buying concert or game tickets a bot-driven markup nightmare?",
    description:
      "Face-value tickets vanish in seconds to bots and resell at 3–5x on secondary markets. Fans overpay or get scammed on fake PDFs. Verified, transferable, anti-scalp ticketing that fans actually trust is a recurring high-emotion purchase.",
    category: "Retail & Commerce",
    severity: 6, frequency: 5, whitespace: 6, tam: 8
  },
  {
    id: 23,
    title: "Why do price-drop refunds and warranty claims require you to remember every purchase?",
    description:
      "Retailers offer price-adjustment windows and extended warranties, but no one tracks eligibility across their receipts. Money is left on the table constantly. A receipt-aware refund and warranty automation quietly saves households real cash.",
    category: "Retail & Commerce",
    severity: 5, frequency: 6, whitespace: 7, tam: 7
  },
  {
    id: 24,
    title: "Why is reselling clothes and gear online 20 minutes of listing work per item?",
    description:
      "Resale is booming, but listing on Poshmark, eBay, and Depop means shooting, describing, and pricing each item by hand. Cross-listing and AI cataloging is fragmented. Frictionless resale for closet-clearing Americans has strong tailwinds.",
    category: "Retail & Commerce",
    severity: 5, frequency: 6, whitespace: 6, tam: 7
  },

  // --- Food & Restaurants ---
  {
    id: 25,
    title: "Why does a $12 burrito on a delivery app cost $27 after fees and tips?",
    description:
      "Delivery markups, service fees, and default tips inflate orders 80–120%. Consumers can't see true cost or compare across apps before checkout. A transparency and best-price delivery meta-layer speaks to daily, high-frequency spending.",
    category: "Food & Restaurants",
    severity: 6, frequency: 8, whitespace: 5, tam: 8
  },
  {
    id: 26,
    title: "Why do independent restaurants lose 30% of every order to delivery platforms?",
    description:
      "Third-party delivery commissions gut razor-thin restaurant margins, but building direct ordering is beyond most owners. Affordable, owned ordering and loyalty for small restaurants is still underdelivered. A restaurant-first commerce stack is durable.",
    category: "Food & Restaurants",
    severity: 8, frequency: 6, whitespace: 6, tam: 7
  },
  {
    id: 27,
    title: "Why is there no easy way to eat around dietary restrictions when ordering out?",
    description:
      "Celiac, allergy, kosher, halal, and diabetic diners can't reliably filter safe menu items across restaurants. Cross-referencing ingredients is manual and risky. Trusted dietary filtering for eating out serves a large, motivated, underserved base.",
    category: "Food & Restaurants",
    severity: 7, frequency: 6, whitespace: 7, tam: 6
  },

  // --- Travel & Mobility ---
  {
    id: 28,
    title: "Why do Americans lose hundreds in airline vouchers and points they forget to use?",
    description:
      "Flight credits, expiring miles, and travel vouchers sit unused across a dozen loyalty programs. There's no unified wallet that tracks and nudges before expiry. Consolidated travel-credit management captures money people already own.",
    category: "Travel & Mobility",
    severity: 5, frequency: 5, whitespace: 7, tam: 7
  },
  {
    id: 29,
    title: "Why is fighting a bogus parking ticket or toll violation not worth the time it takes?",
    description:
      "Cities and toll authorities issue millions of contestable citations; appealing means portals, mailed forms, and hearings. Most people just pay. Automated citation-dispute tooling has clear per-ticket ROI and viral, local demand.",
    category: "Travel & Mobility",
    severity: 5, frequency: 6, whitespace: 7, tam: 6
  },
  {
    id: 30,
    title: "Why can't you compare the true all-in cost of owning vs. leasing vs. subscribing to a car?",
    description:
      "Between depreciation, insurance, financing, and new subscription models, the real cost of a vehicle is opaque. Dealer math favors the dealer. An unbiased total-cost-of-mobility advisor addresses a major recurring household decision.",
    category: "Travel & Mobility",
    severity: 6, frequency: 3, whitespace: 6, tam: 7
  },

  // --- Family & Childcare ---
  {
    id: 31,
    title: "Why is finding reliable, licensed childcare with an open spot a months-long ordeal?",
    description:
      "Daycare waitlists run 6–18 months and cost more than in-state college in many metros. Real-time availability and vetted matching are nonexistent. Solving childcare discovery and access touches every working American parent.",
    category: "Family & Childcare",
    severity: 10, frequency: 8, whitespace: 9, tam: 9
  },
  {
    id: 32,
    title: "Why do parents coordinate school pickups, sports, and sitters across six group chats?",
    description:
      "Family logistics live in texts, paper flyers, and school portals that don't talk to each other. Double-bookings and missed forms are constant. A true family operating system for the school-age household is a sticky, daily-use wedge.",
    category: "Family & Childcare",
    severity: 6, frequency: 8, whitespace: 6, tam: 7
  },
  {
    id: 33,
    title: "Why is managing an aging parent's care from another state a full-time job with no tools?",
    description:
      "Adult children coordinate meds, appointments, finances, and in-home aides for aging parents remotely, using calls and spreadsheets. Purpose-built eldercare coordination is thin. The silver tsunami makes this a fast-growing, high-stakes market.",
    category: "Family & Childcare",
    severity: 8, frequency: 6, whitespace: 8, tam: 8
  },

  // --- Government & Bureaucracy ---
  {
    id: 34,
    title: "Why is a trip to the DMV still an all-day, appointment-roulette experience?",
    description:
      "State DMVs run on legacy systems with unpredictable waits and confusing document requirements. People take PTO and still get turned away. Document-readiness and slot-finding tools for government services have universal, cross-state appeal.",
    category: "Government & Bureaucracy",
    severity: 6, frequency: 4, whitespace: 7, tam: 6
  },
  {
    id: 35,
    title: "Why does applying for unemployment or SNAP benefits feel designed to make you give up?",
    description:
      "Benefits portals are so hostile that eligible Americans abandon claims worth billions. Navigation, document prep, and status tracking are painful. A benefits-access navigator with real completion rates does enormous social and market good.",
    category: "Government & Bureaucracy",
    severity: 8, frequency: 4, whitespace: 8, tam: 7
  },
  {
    id: 36,
    title: "Why is renewing a passport or Global Entry a mystery box of processing times?",
    description:
      "Federal processing times swing from weeks to months with no reliable status. People miss trips or overpay for expediting. Predictable, guided government-document renewal with proactive alerts is a recurring, high-anxiety need.",
    category: "Government & Bureaucracy",
    severity: 6, frequency: 3, whitespace: 7, tam: 6
  },

  // --- Climate & Energy ---
  {
    id: 37,
    title: "Why can't homeowners tell if solar, a heat pump, or an EV actually pencils out for them?",
    description:
      "Federal and state incentives (IRA credits, rebates) are complex and change constantly, so households can't model real payback. Installers oversell. An unbiased electrification advisor that stacks incentives serves a fast-growing retrofit market.",
    category: "Climate & Energy",
    severity: 6, frequency: 4, whitespace: 8, tam: 8
  },
  {
    id: 38,
    title: "Why do renters and small businesses have no visibility into their wildly variable energy bills?",
    description:
      "Utility bills spike with time-of-use rates and weather, but customers get a lump sum with no actionable breakdown. Usage intelligence for non-tech-savvy users is thin. Energy-cost clarity and shift-recommendations tap millions of ratepayers.",
    category: "Climate & Energy",
    severity: 6, frequency: 6, whitespace: 6, tam: 7
  },
  {
    id: 39,
    title: "Why is finding an available, working EV charger still a road-trip gamble?",
    description:
      "Chargers show as available but are broken, ICE'd, or occupied, stranding EV drivers. Real-time reliability data across networks is fragmented. A trustworthy charging-reliability layer becomes essential as EV adoption climbs.",
    category: "Climate & Energy",
    severity: 6, frequency: 5, whitespace: 6, tam: 7
  },

  // --- SMB Operations ---
  {
    id: 40,
    title: "Why does a small business owner still spend Sundays reconciling receipts by hand?",
    description:
      "33M US small businesses drown in shoebox bookkeeping, chasing invoices and categorizing expenses. Existing tools assume an accountant. Dead-simple, automated books for the solo owner-operator is a huge, underserved base.",
    category: "SMB Operations",
    severity: 7, frequency: 8, whitespace: 6, tam: 8
  },
  {
    id: 41,
    title: "Why is scheduling shift workers still a whiteboard-and-group-text disaster?",
    description:
      "Restaurants, salons, and clinics juggle availability, swaps, and no-shows manually, leading to understaffing and burnout. Affordable scheduling built for the sub-20-employee shop is thin. Frontline workforce tooling for small teams is durable.",
    category: "SMB Operations",
    severity: 6, frequency: 7, whitespace: 6, tam: 7
  },
  {
    id: 42,
    title: "Why can't a local service business get reviews and referrals without begging customers?",
    description:
      "Plumbers, cleaners, and trainers live and die by reviews but have no smooth way to prompt happy clients or turn them into referrals. Reputation automation for the trades is underbuilt. Owning the review flywheel for local services is high-value.",
    category: "SMB Operations",
    severity: 6, frequency: 6, whitespace: 6, tam: 6
  },

  // --- Legal & Compliance ---
  {
    id: 43,
    title: "Why does a simple will, LLC, or lease review still cost $500 and a week of waiting?",
    description:
      "Everyday legal needs — wills, LLC formation, lease review, demand letters — are overpriced or intimidatingly DIY. The middle ground of guided, affordable legal help is thin outside a few incumbents. Accessible legal workflows have broad household demand.",
    category: "Legal & Compliance",
    severity: 7, frequency: 4, whitespace: 6, tam: 8
  },
  {
    id: 44,
    title: "Why do small businesses have no idea which licenses and filings they're missing?",
    description:
      "State and local licensing, sales-tax registration, and annual reports vary by jurisdiction, and small businesses miss filings until fined. A compliance radar that maps obligations by location and activity addresses real, recurring risk.",
    category: "Legal & Compliance",
    severity: 7, frequency: 5, whitespace: 7, tam: 7
  },
  {
    id: 45,
    title: "Why is fighting a wrongful debt-collection or credit-report error a paperwork marathon?",
    description:
      "Millions of Americans dispute inaccurate collections and credit-report errors under the FCRA, but the process is slow and manual. Automated dispute generation with real success rates has strong, repeatable demand and clear consumer upside.",
    category: "Legal & Compliance",
    severity: 7, frequency: 5, whitespace: 7, tam: 7
  },

  // --- Media & Subscriptions ---
  {
    id: 46,
    title: "Why does the average American pay for subscriptions they forgot they had?",
    description:
      "Households average a dozen+ recurring subscriptions and forget several, quietly bleeding $200+/month. Detection and one-tap cancel across cards is inconsistent. A subscription auditor that actually cancels, not just lists, has mass-market pull.",
    category: "Media & Subscriptions",
    severity: 5, frequency: 8, whitespace: 6, tam: 8
  },
  {
    id: 47,
    title: "Why do you need five streaming apps to find where one show is actually streaming?",
    description:
      "Content shuffles between Netflix, Max, Peacock, and others, and viewers app-hop to find it. Unified search and true cost-per-watch guidance is fragmented. A neutral streaming concierge that optimizes the household's app mix is high-frequency.",
    category: "Media & Subscriptions",
    severity: 4, frequency: 8, whitespace: 5, tam: 7
  },
  {
    id: 48,
    title: "Why is canceling a gym, newspaper, or cable subscription still a phone-call obstacle course?",
    description:
      "Dark-pattern cancellation flows force calls, retention scripts, and mailed letters. Even with new FTC 'click-to-cancel' rules, enforcement lags. A concierge that cancels the hard-to-quit services on your behalf resonates broadly.",
    category: "Media & Subscriptions",
    severity: 5, frequency: 5, whitespace: 6, tam: 7
  },

  // --- Personal Finance ---
  {
    id: 49,
    title: "Why does the average American have no idea if they're on track to retire?",
    description:
      "401(k)s, IRAs, HSAs, and old employer plans scatter across providers with no unified picture. Advice is gated behind AUM fees. A clear, unbiased retirement-readiness view for the mass affluent and below is a durable, high-trust opportunity.",
    category: "Personal Finance",
    severity: 7, frequency: 5, whitespace: 6, tam: 9
  },
  {
    id: 50,
    title: "Why is rolling over an old 401(k) still a fax-and-paper-check ordeal in 2026?",
    description:
      "Job-changers leave billions in orphaned 401(k)s because rollovers require calls, forms, and mailed checks between providers. Automated, guided rollovers are underbuilt. Capturing job-change moments unlocks large, sticky balances.",
    category: "Personal Finance",
    severity: 6, frequency: 5, whitespace: 7, tam: 8
  },
  {
    id: 51,
    title: "Why can't couples manage shared and separate money without a spreadsheet war?",
    description:
      "Modern couples split bills, keep some accounts separate, and argue over categories. Tools force either full-merge or full-separate. Flexible shared-finance tooling for how couples actually live is an emotionally charged, underserved niche.",
    category: "Personal Finance",
    severity: 6, frequency: 6, whitespace: 7, tam: 7
  },
  {
    id: 52,
    title: "Why do Americans leave hundreds in unclaimed money and rewards sitting with the states?",
    description:
      "Billions in unclaimed property — old deposits, refunds, dormant accounts — sit with state treasuries, plus unredeemed credit-card and airline rewards. Discovery and claiming is manual and skeptical-feeling. A trusted found-money engine has viral appeal.",
    category: "Personal Finance",
    severity: 5, frequency: 4, whitespace: 8, tam: 7
  },

  // --- A few extra spread across categories for depth ---
  {
    id: 53,
    title: "Why is disputing a medical bill error something patients have to become experts to do?",
    description:
      "Up to 80% of US medical bills contain errors, from duplicate charges to upcoding, yet patients lack the codes and leverage to challenge them. Automated bill auditing with negotiation muscle sits on a giant, recurring spend base.",
    category: "Healthcare & Insurance",
    severity: 9, frequency: 7, whitespace: 9, tam: 10
  },
  {
    id: 54,
    title: "Why do renters build zero credit from years of on-time rent payments?",
    description:
      "Mortgages build credit; rent — often a household's biggest payment — usually doesn't report. Rent-reporting products exist but are fragmented and landlord-dependent. Turning rent into credit for 44M renter households is a large, mission-aligned wedge.",
    category: "Housing & Real Estate",
    severity: 6, frequency: 7, whitespace: 6, tam: 8
  },
  {
    id: 55,
    title: "Why is booking a same-week appointment with a specialist a game of phone tag?",
    description:
      "Specialist scheduling runs through fax referrals and hold music, with weeks-long waits and no visibility into cancellations. Real-time specialist availability and cancellation-fill tooling addresses a painful, high-value healthcare bottleneck.",
    category: "Healthcare & Insurance",
    severity: 7, frequency: 5, whitespace: 7, tam: 8
  },
  {
    id: 56,
    title: "Why do small nonprofits and clubs still collect dues with checks and a shared spreadsheet?",
    description:
      "Booster clubs, PTAs, and small nonprofits handle dues, donations, and reimbursements on paper and personal apps that flag them. Purpose-built money tooling for micro-organizations is thin. It's a wide, underserved slice of community finance.",
    category: "SMB Operations",
    severity: 5, frequency: 5, whitespace: 7, tam: 6
  }
];

/* Attach the computed Itch Score to every record and freeze the export. */
const PROBLEMS = RAW_PROBLEMS.map((p) => ({
  ...p,
  itch: computeItch(p)
}));

/* Expose for app.js when loaded via <script> (no modules, works offline). */
window.FMI_DATA = { CATEGORIES, PROBLEMS, computeItch };
