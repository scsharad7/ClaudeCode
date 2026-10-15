/*
 * research.js — Fix My Itch, USA edition
 * ---------------------------------------
 * Deep-dive research for each itch, keyed by problem id. Rendered in the
 * detail view when someone opens an itch.
 *
 * Fields:
 *   why       – why this itches now (1–2 sentences)
 *   who       – the people who feel it most
 *   evidence  – signals that the pain is real and large
 *   players   – existing companies/tools and what they cover
 *   gap       – what the incumbents leave unsolved
 *   wedges    – concrete startup angles to attack it
 *   model     – how a company here makes money
 *   validate  – first steps to test demand cheaply
 *   risks     – what could kill the idea
 *
 * This is illustrative desk research for founders, not investment advice.
 * Figures are approximate; verify before relying on them.
 */

const RESEARCH = {
  1: {
    why: "Peer-to-peer payments won, but they fragmented: every friend group uses a different mix of apps, and none of them owns the 'who owes what' ledger.",
    who: ["Friend groups splitting dinners and trips", "Roommates sharing rent and utilities", "Group-trip organizers who front large bookings"],
    evidence: [
      "Venmo, Cash App, Zelle and Apple Cash each have tens of millions of US users, with little cross-app interoperability.",
      "Organizers routinely front costs for group travel and chase repayment for weeks.",
      "Splitwise built a large following on tracking alone — demand for the ledger exists even without payments."
    ],
    players: [
      { name: "Splitwise", note: "Tracks shared expenses; settlement still happens in other apps." },
      { name: "Venmo groups", note: "Splitting inside Venmo only works if everyone is on Venmo." },
      { name: "Settle Up", note: "Expense-sharing ledger, popular for trips." }
    ],
    gap: "No neutral layer that both tracks the split and settles it across whatever rail each person already uses.",
    wedges: [
      "Snap-the-receipt splitter that sends each person a pay link for their preferred app",
      "Trip wallet: a pooled card everyone pre-funds, with automatic reconciliation",
      "Roommate OS that auto-splits recurring bills as they post"
    ],
    model: "Free core; fees on pooled cards and instant settlement; premium for trip and household features.",
    validate: [
      "Run 10 group dinners with a manual 'I'll send you a pay link' concierge and time how long settlement takes",
      "Survey 50 frequent trip organizers about how much they front and how long repayment takes",
      "Landing page with a waitlist for 'one link, any app' splitting"
    ],
    risks: [
      "The big wallets could ship interoperability or better group features",
      "Payments compliance and money-transmission licensing if you hold funds"
    ]
  },
  2: {
    why: "Overdraft fees fall hardest on people with the least cushion, and the fix — knowing a shortfall is coming — is a prediction problem banks have little incentive to solve.",
    who: ["Hourly and gig workers with irregular pay", "Households living paycheck to paycheck", "Customers of regional banks and credit unions"],
    evidence: [
      "US banks have historically collected billions per year in overdraft and NSF fees, concentrated among a small share of customers.",
      "The CFPB has pushed repeatedly on 'junk fees', and many large banks cut or eliminated NSF fees since 2022.",
      "Earned-wage access and small-dollar advance apps grew quickly by targeting the same moment."
    ],
    players: [
      { name: "Chime SpotMe", note: "Fee-free overdraft buffer for Chime customers." },
      { name: "Dave", note: "Small cash advances to cover shortfalls." },
      { name: "MoneyLion / Brigit", note: "Advances plus budgeting, often subscription-based." }
    ],
    gap: "Most tools react with an advance after the fact; few forecast the shortfall days ahead and move money or bills to prevent it.",
    wedges: [
      "Cash-flow forecaster that predicts the exact day you'll go negative and reschedules bill dates",
      "Credit-union white-label 'shortfall shield' sold B2B",
      "Employer-paid financial-wellness benefit focused on fee avoidance"
    ],
    model: "B2B licensing to banks and credit unions, or employer-paid benefit; avoid tipping models that draw regulatory scrutiny.",
    validate: [
      "Connect 30 users' accounts via an aggregator and backtest how often you'd have predicted their overdrafts",
      "Interview 5 credit-union product leads on fee-revenue pressure",
      "Measure fees saved per user in a 60-day pilot"
    ],
    risks: [
      "Banks continuing to drop overdraft fees could shrink the pain",
      "Regulatory treatment of advances and tips keeps shifting"
    ]
  },
  3: {
    why: "Small landlords own a big slice of US rentals but run them like a side hustle, collecting rent through personal apps that weren't built for it.",
    who: ["Owners of 1–10 rental units", "Accidental landlords renting out a former home", "Tenants who want a receipt and a paper trail"],
    evidence: [
      "Individual investors own a large share of single-family and small multifamily rentals in the US.",
      "Personal P2P apps restrict business use and offer weak records for taxes and disputes.",
      "Several property-management tools now offer free tiers aimed at small landlords — a signal the segment is contested but valuable."
    ],
    players: [
      { name: "Avail", note: "Listings, screening and rent collection for small landlords." },
      { name: "TurboTenant", note: "Free landlord software monetized via tenant fees." },
      { name: "Baselane", note: "Banking and bookkeeping built for landlords." }
    ],
    gap: "Rent collection is solved on paper, but small landlords still lack one place that ties rent, deposits, repairs and Schedule E tax prep together.",
    wedges: [
      "Rent-to-taxes pipeline that produces a ready Schedule E at year end",
      "Security-deposit escrow that handles state-specific rules and move-out deductions",
      "Repair marketplace with vetted local trades priced for one-off jobs"
    ],
    model: "Banking interchange and float, premium tax features, and take rate on repairs.",
    validate: [
      "Join 3 landlord forums and catalog the top 20 complaints",
      "Offer to build 10 landlords' Schedule E by hand and charge for it",
      "Track how many use personal Venmo for rent today"
    ],
    risks: [
      "Crowded field with free incumbents",
      "State-by-state deposit and landlord-tenant law complexity"
    ]
  },
  4: {
    why: "Even after the No Surprises Act, patients receive confusing follow-on bills from separate facility, physician and lab entities — and almost nobody checks them.",
    who: ["Insured patients after an ER or hospital visit", "Families managing a child's or parent's care", "High-deductible plan members"],
    evidence: [
      "Medical debt is one of the most common debts on US credit reports, affecting tens of millions of people.",
      "The No Surprises Act (effective 2022) bans many out-of-network surprise bills, but awareness and enforcement are uneven.",
      "Independent billing advocates report frequent errors and successful reductions on hospital bills."
    ],
    players: [
      { name: "Goodbill", note: "Reviews hospital bills for errors and negotiates." },
      { name: "Resolve", note: "Medical bill negotiation service." },
      { name: "Independent billing advocates", note: "Effective but expensive and hard to find." }
    ],
    gap: "Help exists for big bills after people get angry; nobody automatically audits every EOB and bill as it arrives.",
    wedges: [
      "Forward-your-bill inbox that matches bills to EOBs and flags mismatches",
      "No Surprises Act dispute generator for out-of-network charges",
      "Employer benefit that audits employees' claims proactively"
    ],
    model: "Contingency fee on savings for consumers; per-member pricing as an employer benefit.",
    validate: [
      "Collect 50 real ER bills and EOBs and measure the error rate yourself",
      "Win reductions for 10 people manually and track hours per win",
      "Pitch 3 HR leaders on a claims-audit benefit"
    ],
    risks: [
      "Access to claims data is slow without payer partnerships",
      "Contingency models can look adversarial to providers"
    ]
  },
  5: {
    why: "Insurer directories list therapists who don't take the plan or aren't taking patients, so people in distress have to cold-call a dozen offices.",
    who: ["People seeking mental-health care for the first time", "Parents searching for a child therapist", "Employees using EAP referrals"],
    evidence: [
      "Secret-shopper studies of insurer directories have repeatedly found large shares of listed providers unreachable or not accepting new patients.",
      "Ghost networks have drawn attention from Congress and state regulators.",
      "Venture-backed networks grew fast by credentialing therapists with insurers."
    ],
    players: [
      { name: "Headway", note: "Helps therapists take insurance; patient-facing search." },
      { name: "Alma / Rula", note: "Therapist networks with insurance billing." },
      { name: "Psychology Today directory", note: "Largest directory; availability is self-reported." }
    ],
    gap: "Real-time, verified 'accepting new patients with your plan this week' availability across all networks still doesn't exist.",
    wedges: [
      "Availability API that therapists update with one tap",
      "Concierge matching that guarantees a first appointment within 7 days",
      "Directory-accuracy auditing sold to health plans facing regulatory pressure"
    ],
    model: "Health-plan contracts for directory accuracy; employer contracts for guaranteed access.",
    validate: [
      "Call 50 listed in-network providers in one city and publish the hit rate",
      "Offer 20 people a 'we find you a therapist' concierge and measure time-to-appointment",
      "Interview 5 health-plan network managers"
    ],
    risks: [
      "Therapist supply is the real bottleneck in many areas",
      "Payer sales cycles are long"
    ]
  },
  6: {
    why: "The same generic drug can cost wildly different amounts at pharmacies a block apart, and patients only find out at the counter.",
    who: ["Uninsured and high-deductible patients", "Seniors in the Part D coverage gap", "People on chronic generic medications"],
    evidence: [
      "Discount-card companies built large businesses on cash-price spreads between pharmacies.",
      "Mark Cuban Cost Plus Drugs showed many generics can sell for a fraction of typical retail cash prices.",
      "PBM pricing practices are under scrutiny from the FTC and Congress."
    ],
    players: [
      { name: "GoodRx", note: "Discount coupons and price comparison." },
      { name: "Cost Plus Drugs", note: "Transparent cost-plus pricing by mail." },
      { name: "Amazon Pharmacy", note: "Mail-order with membership pricing." }
    ],
    gap: "Nobody automatically picks the cheapest path per prescription — insurance vs. coupon vs. mail-order — and moves the prescription for you.",
    wedges: [
      "Prescription autopilot that reprices every refill and transfers it",
      "Employer tool that steers employees to the lowest total cost",
      "Price-transparency tool for independent pharmacies competing with chains"
    ],
    model: "Per-member employer pricing, pharmacy referral fees, or a savings share.",
    validate: [
      "Price the top 20 generics across 5 local pharmacies and mail-order",
      "Manually optimize 15 people's prescriptions and log savings",
      "Interview independent pharmacists about competing on price"
    ],
    risks: [
      "PBM and coupon economics are opaque and can change quickly",
      "Prescription transfers create friction for patients"
    ]
  },
  7: {
    why: "Medicare plans change every year, the choices are dizzying, and most 'free' help comes from commissioned brokers.",
    who: ["New Medicare enrollees turning 65", "Adult children helping parents choose", "Seniors with multiple chronic medications"],
    evidence: [
      "Medicare covers more than 60 million people, and roughly half of eligible beneficiaries are in Medicare Advantage.",
      "Regulators have cracked down on misleading Medicare Advantage marketing.",
      "Free state SHIP counseling exists but is capacity-constrained."
    ],
    players: [
      { name: "Medicare.gov Plan Finder", note: "Official comparison tool; hard for many seniors to use." },
      { name: "eHealth / SelectQuote", note: "Broker platforms paid by carriers." },
      { name: "Chapter", note: "Advisory that compares across plans." }
    ],
    gap: "Unbiased, family-friendly comparison that uses a person's actual doctors and prescriptions and re-checks every year.",
    wedges: [
      "Annual 'plan checkup' that alerts families when a better plan appears",
      "Caregiver dashboard to manage a parent's coverage remotely",
      "Fee-only Medicare advice sold through employers' retiree benefits"
    ],
    model: "Flat fee from families or employers instead of carrier commissions; or a broker model with transparent disclosure.",
    validate: [
      "Help 10 families through open enrollment and measure out-of-pocket savings",
      "Ask adult children what they would pay for unbiased help",
      "Partner with one SHIP office to understand overflow demand"
    ],
    risks: [
      "Carrier-commission competitors offer the service for 'free'",
      "Heavy marketing rules in Medicare"
    ]
  },
  8: {
    why: "Renters in competitive markets pay non-refundable application fees to multiple landlords for the same background and credit checks.",
    who: ["Renters in tight markets applying to many units", "Young renters and movers", "Small landlords wanting reliable screening"],
    evidence: [
      "Application fees commonly run $40–75 per application in high-demand cities.",
      "Several states regulate fees — New York caps them at $20, and Colorado allows portable screening reports.",
      "The CFPB and FTC have scrutinized accuracy problems in tenant screening."
    ],
    players: [
      { name: "Apartments.com / Zillow", note: "Apply-once flows within their own listings." },
      { name: "TransUnion SmartMove", note: "Tenant-initiated screening for landlords." },
      { name: "Experian RentBureau", note: "Rental payment data." }
    ],
    gap: "A truly portable, tenant-owned screening report that landlords across platforms trust and accept.",
    wedges: [
      "Portable screening passport built to comply with state portable-report laws",
      "Landlord verification API so small landlords accept it in one click",
      "Fee-tracking advocacy tool that flags illegal application fees"
    ],
    model: "Tenant pays once per year; landlords pay for verification and fraud checks.",
    validate: [
      "Survey renters on how many applications and fees they paid in their last move",
      "Get 10 small landlords in Colorado to accept a portable report",
      "Map fee caps and portability laws by state"
    ],
    risks: [
      "Large listing sites can lock tenants into their own apply flows",
      "Credit-reporting regulations (FCRA) apply"
    ]
  },
  9: {
    why: "Assessments can jump after a purchase or reappraisal, appeals vary by county, and most owners never challenge an over-assessment.",
    who: ["Recent homebuyers", "Owners in fast-appreciating metros", "Small commercial property owners"],
    evidence: [
      "Property tax is one of the largest recurring costs of homeownership.",
      "County appeal success rates are often meaningful for those who file, yet most owners never do.",
      "Venture-backed appeal services have grown on contingency models."
    ],
    players: [
      { name: "Ownwell", note: "Contingency-fee property tax appeals." },
      { name: "Local tax consultants", note: "Common in Texas and other high-tax states." },
      { name: "County assessor portals", note: "Data is public but hard to use." }
    ],
    gap: "Nationwide, automated appeal filing with transparent comps, plus exemption checks (homestead, senior, veteran) most owners miss.",
    wedges: [
      "Exemption finder that files missed homestead and senior exemptions",
      "Comps engine that builds an appeal packet in minutes",
      "Mortgage-servicer partnership to flag escrow spikes before they hit"
    ],
    model: "Contingency share of first-year savings; B2B for servicers and lenders.",
    validate: [
      "Pull assessments for 200 recent sales in one county and estimate over-assessment",
      "File 10 appeals manually and track win rates",
      "Check how many owners are missing homestead exemptions"
    ],
    risks: [
      "County-by-county rules make scaling slow",
      "Strong competition in high-tax states"
    ]
  },
  10: {
    why: "Tens of millions of Americans live in HOAs run by volunteer boards on email, spreadsheets and paper notices.",
    who: ["Volunteer HOA board members", "Homeowners disputing fees or violations", "Small self-managed condo associations"],
    evidence: [
      "Community Associations Institute estimates more than 70 million Americans live in community associations.",
      "Many associations are self-managed without professional software.",
      "Disputes over dues, special assessments and transparency are common."
    ],
    players: [
      { name: "AppFolio / Buildium", note: "Property-management software for professionals." },
      { name: "PayHOA", note: "Dues and accounting for self-managed HOAs." },
      { name: "TownSq", note: "Community communication app." }
    ],
    gap: "Simple, transparent software for small self-managed associations that handles dues, votes, reserves and records in one place.",
    wedges: [
      "Board-in-a-box: dues, voting, and meeting minutes for under-50-unit HOAs",
      "Reserve-study and special-assessment planner",
      "Transparency portal homeowners can trust during disputes"
    ],
    model: "Per-unit monthly SaaS plus payment processing.",
    validate: [
      "Interview 15 volunteer board treasurers about their tools",
      "Offer free setup to 5 small HOAs and measure retention",
      "Map state HOA disclosure requirements"
    ],
    risks: [
      "Small HOAs have tiny budgets",
      "Board turnover disrupts adoption"
    ]
  },
  11: {
    why: "First-time buyers make the biggest financial decision of their lives from a stack of disclosures they can't decode.",
    who: ["First-time homebuyers", "Buyers comparing rate buydowns and points", "Couples deciding rent vs. buy"],
    evidence: [
      "The CFPB's standardized Loan Estimate helps, but comparing offers across lenders is still hard.",
      "Shopping multiple lenders can save meaningful money over the life of a loan, yet many buyers get only one quote.",
      "High rates have made buydowns, points and ARMs more common and more confusing."
    ],
    players: [
      { name: "Rocket / Better.com", note: "Digital lenders with their own quotes." },
      { name: "NerdWallet / Bankrate", note: "Calculators and lead generation." },
      { name: "CFPB tools", note: "Free educational resources." }
    ],
    gap: "A buyer-side tool that reads your actual Loan Estimates and shows the true cost across scenarios, without selling you a lender.",
    wedges: [
      "Upload-your-Loan-Estimate analyzer with side-by-side lifetime cost",
      "Buydown vs. points vs. refinance simulator",
      "Buyer advocate subscription during the 30–60 day closing window"
    ],
    model: "Flat fee from buyers, or employer and credit-union partnerships; avoid lender referral conflicts.",
    validate: [
      "Collect 20 real Loan Estimates and see how much buyers could save",
      "Charge 10 buyers for a one-hour review",
      "Interview buyer's agents about client confusion"
    ],
    risks: [
      "Free calculators are everywhere",
      "Housing-market cycles affect volume"
    ]
  },
  12: {
    why: "Package theft is common, and when it happens the buyer gets bounced between the carrier, the retailer and the platform.",
    who: ["Apartment dwellers without secure delivery", "Suburban homeowners away during the day", "Small online sellers absorbing losses"],
    evidence: [
      "Surveys consistently find a large share of Americans have had a package stolen.",
      "Package protection became a common checkout add-on for online stores.",
      "Smart locks, lockers and doorbell cameras grew partly in response."
    ],
    players: [
      { name: "Route", note: "Checkout package protection and tracking." },
      { name: "Amazon Key / Lockers", note: "Secure delivery within Amazon's network." },
      { name: "Ring", note: "Deters theft but doesn't resolve losses." }
    ],
    gap: "A cross-retailer claims and replacement layer that resolves theft in minutes regardless of carrier.",
    wedges: [
      "Building-level smart locker network for small apartment buildings",
      "Universal claims agent that files with any retailer or carrier",
      "Insurance product priced on neighborhood theft data"
    ],
    model: "Per-package protection fees or building subscriptions.",
    validate: [
      "Survey 100 renters on theft frequency and how claims were resolved",
      "Pilot lockers in 2 buildings and measure usage",
      "Analyze loss rates with 5 small online sellers"
    ],
    risks: [
      "Fraudulent claims",
      "Carriers and Amazon control delivery behavior"
    ]
  },
  13: {
    why: "Online returns are huge, and for consumers they still mean labels, boxes, printers and trips to a carrier.",
    who: ["Frequent online shoppers", "Apparel buyers who order multiple sizes", "Mid-size DTC brands managing returns cost"],
    evidence: [
      "US retail returns are estimated in the hundreds of billions of dollars annually.",
      "Boxless drop-off networks scaled quickly through partnerships.",
      "Some retailers now charge for mail returns to offset cost."
    ],
    players: [
      { name: "Happy Returns (UPS)", note: "Boxless return bars." },
      { name: "Loop Returns", note: "Returns software for Shopify brands." },
      { name: "Narvar", note: "Post-purchase tracking and returns." }
    ],
    gap: "A consumer-side returns concierge that handles any retailer from one place, including pickup.",
    wedges: [
      "Doorstep pickup of all your returns in one weekly trip",
      "Return-deadline tracker that reads receipts from email",
      "Resale-first returns that list items before shipping them back"
    ],
    model: "Per-pickup fee or subscription; retailer fees for faster processing.",
    validate: [
      "Run a weekly returns pickup in one neighborhood",
      "Measure how many missed return windows people have",
      "Interview 5 brands about returns cost per order"
    ],
    risks: [
      "Logistics margins are thin",
      "Retailers own the return policy"
    ]
  },
  14: {
    why: "Small e-commerce brands pay far more per package than giants, and shipping often decides whether they're profitable.",
    who: ["Shopify and Etsy sellers", "Small DTC brands", "Makers shipping heavy or oversized goods"],
    evidence: [
      "Large shippers get steep negotiated discounts unavailable to small sellers.",
      "Multi-carrier software and discounted-label tools grew by reselling volume rates.",
      "Annual carrier rate increases squeeze small-business margins."
    ],
    players: [
      { name: "Pirate Ship", note: "Discounted USPS and UPS labels." },
      { name: "Shippo / ShipStation / EasyPost", note: "Multi-carrier shipping software." },
      { name: "ShipBob", note: "Outsourced fulfillment." }
    ],
    gap: "Collective bargaining and regional-carrier routing optimized for small sellers by zone and package type.",
    wedges: [
      "Regional-carrier routing engine that picks the cheapest carrier per ZIP",
      "Shipping co-op that aggregates small sellers' volume",
      "Packaging optimizer to cut dimensional-weight charges"
    ],
    model: "Per-label margin or SaaS subscription.",
    validate: [
      "Analyze 3 months of shipping data from 10 small sellers",
      "Quote regional carriers for those lanes",
      "Measure dimensional-weight waste"
    ],
    risks: [
      "Carrier rate changes can erase arbitrage",
      "Strong incumbents"
    ]
  },
  15: {
    why: "Student-loan rules keep changing through policy shifts and court cases, leaving borrowers unsure which plan or forgiveness path applies to them.",
    who: ["Federal student-loan borrowers", "Public servants pursuing PSLF", "Parents with Parent PLUS loans"],
    evidence: [
      "More than 40 million Americans hold federal student loans.",
      "Repayment plans like SAVE have faced legal challenges and policy reversals.",
      "Servicer errors and transitions have caused widespread confusion."
    ],
    players: [
      { name: "StudentAid.gov Loan Simulator", note: "Official but generic." },
      { name: "Summer", note: "Student-loan and PSLF help, often via employers." },
      { name: "Chipper", note: "Repayment and forgiveness guidance app." }
    ],
    gap: "A borrower-first optimizer that models lifetime cost under each plan and updates automatically as rules change.",
    wedges: [
      "PSLF tracker that checks every certification and payment count",
      "Employer benefit for student-loan matching and repayment",
      "Rule-change alert service that tells borrowers exactly what to do"
    ],
    model: "Employer-paid benefit or consumer subscription.",
    validate: [
      "Model 20 borrowers' options manually and measure savings",
      "Interview HR teams about student-loan benefits",
      "Track borrower forum questions after each rule change"
    ],
    risks: [
      "Policy instability",
      "Scam perception in student-loan help"
    ]
  },
  16: {
    why: "College aid letters mix grants, loans and work-study with no standard format, so families can't compare true costs.",
    who: ["Parents of high-school seniors", "First-generation college students", "Families deciding between offers"],
    evidence: [
      "Research has found many aid letters omit or obscure net cost.",
      "Federal law requires net price calculators, but quality varies.",
      "Appealing aid offers can result in increases for some families."
    ],
    players: [
      { name: "College Board BigFuture", note: "College search and planning." },
      { name: "Net price calculators", note: "Required on college websites; inconsistent." },
      { name: "Independent counselors", note: "Expensive and limited." }
    ],
    gap: "A tool that reads any aid letter, normalizes it, and helps families appeal.",
    wedges: [
      "Upload-your-letter decoder showing four-year net cost",
      "Appeal-letter generator using competing offers",
      "School counselor dashboard for under-resourced high schools"
    ],
    model: "Family subscription during admissions season; B2B for schools and nonprofits.",
    validate: [
      "Collect 30 aid letters and normalize them",
      "Help 10 families appeal",
      "Interview high-school counselors"
    ],
    risks: [
      "Seasonal demand",
      "Colleges may resist standardization"
    ]
  },
  17: {
    why: "Career-changers spend $10k–20k on bootcamps and trade programs whose job-placement numbers are mostly self-reported and hard to compare.",
    who: ["Mid-career workers switching into tech or the trades", "Veterans using GI Bill benefits", "Employers sponsoring reskilling"],
    evidence: [
      "Several coding bootcamps closed or downsized after 2022 as tech hiring cooled, stranding students mid-program.",
      "Voluntary standards like CIRR exist precisely because outcome reporting was inconsistent.",
      "Short-term credentials keep expanding as states and the federal government fund workforce programs."
    ],
    players: [
      { name: "Course Report / SwitchUp", note: "Reviews and rankings, largely self-reported." },
      { name: "CIRR", note: "Voluntary outcomes-reporting standard; limited adoption." },
      { name: "State workforce boards", note: "Approve programs for public funding with uneven data." }
    ],
    gap: "Independently verified outcomes — who got hired, where, and at what salary — using payroll or employment data instead of surveys.",
    wedges: [
      "Outcomes-verification service that programs pay to be certified by",
      "Comparison marketplace ranked only on verified placement and salary lift",
      "Income-share or tuition-refund insurance priced on verified outcomes"
    ],
    model: "Certification fees from programs, plus lead fees from a verified marketplace.",
    validate: [
      "Survey 100 recent graduates of 5 programs and compare to advertised placement rates",
      "Pitch 5 program directors on paid third-party verification",
      "Interview 3 workforce boards about the data they wish they had"
    ],
    risks: [
      "Weaker programs will resist transparency",
      "Collecting employment data raises privacy and consent issues"
    ]
  },
  18: {
    why: "Platforms show gig drivers a payout per trip, but not what's left after gas, wear, insurance and the unpaid miles between trips.",
    who: ["Full-time rideshare drivers", "Food-delivery couriers", "Workers juggling 2–3 apps at once"],
    evidence: [
      "Independent studies of rideshare pay find net hourly earnings well below gross once expenses and dead miles are counted.",
      "Driver-earnings trackers built sizable communities of 'multi-apping' drivers.",
      "Cities and states, including New York City, Seattle and Minnesota, have set or debated minimum pay standards."
    ],
    players: [
      { name: "Gridwise", note: "Mileage, earnings and demand insights for drivers." },
      { name: "Solo", note: "Earnings analytics and pay-guarantee experiments." },
      { name: "Platform dashboards", note: "Show gross earnings for one app only." }
    ],
    gap: "A real-time 'is this trip worth it?' answer across apps, based on true per-mile and per-hour cost.",
    wedges: [
      "Per-offer profitability scorer that tells drivers what to accept",
      "Automatic mileage and expense log that produces a Schedule C",
      "Earnings data cooperative that drivers own and license"
    ],
    model: "Driver subscription, plus financial products (fuel cards, insurance) priced on real data.",
    validate: [
      "Have 30 drivers log every trip and expense for two weeks; compute true hourly pay",
      "Test whether drivers change behavior when shown per-trip profit",
      "Talk to driver advocacy groups about data they need"
    ],
    risks: [
      "Platforms can restrict data access or screen-reading apps",
      "Low willingness to pay among cash-strapped drivers"
    ]
  },
  19: {
    why: "1099 workers have no employer withholding, so they owe quarterly estimated taxes — and many only discover the bill in April.",
    who: ["Freelancers and consultants", "Creators and influencers", "W-2 employees with a side business"],
    evidence: [
      "Tens of millions of Americans earn some 1099 income each year.",
      "The IRS charges underpayment penalties when quarterly estimates fall short.",
      "Freelancer banking and tax apps grew by bundling set-asides with accounts."
    ],
    players: [
      { name: "Keeper", note: "Write-off detection and tax filing." },
      { name: "Found", note: "Banking with automatic tax set-asides." },
      { name: "QuickBooks Solopreneur", note: "Bookkeeping and estimates." }
    ],
    gap: "True W-2-style withholding for 1099 income: every payment split, set aside and remitted to the IRS and state automatically.",
    wedges: [
      "Payment-in, tax-out autopilot that files quarterly estimates for you",
      "Embedded withholding API for freelance marketplaces and payout platforms",
      "Year-round tax health score with penalty forecasts"
    ],
    model: "Subscription, banking interchange, and per-filing fees; B2B API fees from platforms.",
    validate: [
      "Survey 100 freelancers on their last surprise tax bill",
      "Manually compute and remit estimates for 20 people for one quarter",
      "Pitch 3 payout platforms on embedded withholding"
    ],
    risks: [
      "Errors create real tax liability for users",
      "Crowded freelancer-fintech space"
    ]
  },
  20: {
    why: "Off-platform freelance deals run on trust and a deposit; when work goes half-done, the hiring business has little recourse.",
    who: ["Small businesses hiring designers, developers and marketers", "Freelancers who want to signal they're reliable", "Agencies subcontracting overflow work"],
    evidence: [
      "Marketplaces offer escrow but take meaningful fees, pushing repeat relationships off-platform.",
      "Small-claims court is slow and impractical for most freelance disputes.",
      "Contract and invoicing tools for freelancers are widely adopted, but most don't hold funds."
    ],
    players: [
      { name: "Upwork / Fiverr", note: "Marketplaces with escrow and dispute processes." },
      { name: "Escrow.com", note: "General-purpose escrow, not built for milestones." },
      { name: "Bonsai", note: "Contracts, proposals and invoicing." }
    ],
    gap: "Lightweight milestone escrow and portable reputation for deals that happen outside marketplaces.",
    wedges: [
      "Milestone escrow link that drops into any contract or email",
      "Portable freelancer reputation built from completed escrowed milestones",
      "Fast, low-cost arbitration for disputes under $10k"
    ],
    model: "Small percentage fee per escrowed milestone; premium for arbitration.",
    validate: [
      "Interview 20 small-business owners about their last freelancer gone wrong",
      "Run 10 escrowed projects manually through a business account",
      "Test willingness to pay 2–3% for protection"
    ],
    risks: [
      "Holding funds triggers money-transmission rules",
      "Dispute resolution is operationally heavy"
    ]
  },
  21: {
    why: "Landlords and lenders want W-2s and pay stubs; workers with variable 1099 income get extra scrutiny or rejection.",
    who: ["Rideshare and delivery workers", "Freelancers and creators", "Self-employed renters and car buyers"],
    evidence: [
      "A large share of US workers earn at least part of their income outside traditional W-2 jobs.",
      "Income-verification APIs grew because lenders need better signals for non-W-2 applicants.",
      "Applicants with variable income are often asked for months of bank statements."
    ],
    players: [
      { name: "Argyle", note: "Employment and earnings data API across gig platforms." },
      { name: "Pinwheel", note: "Payroll connectivity for verification." },
      { name: "Plaid Income", note: "Bank- and payroll-based income verification." }
    ],
    gap: "A consumer-owned, verified income report that the worker controls and landlords and lenders accept as readily as a pay stub.",
    wedges: [
      "Gig income passport the worker shares with one link",
      "Rental-application integration built for small landlords",
      "Credit-union partnership for auto loans to gig workers"
    ],
    model: "Verification fees paid by landlords and lenders; free to workers.",
    validate: [
      "Ask 10 landlords how they evaluate gig-worker applicants today",
      "Produce reports for 20 workers and see if landlords accept them",
      "Pilot with one community credit union"
    ],
    risks: [
      "Depends on data access from platforms and aggregators",
      "FCRA obligations if reports are used for eligibility decisions"
    ]
  },
  22: {
    why: "Face-value tickets disappear to bots in seconds and reappear on resale sites at multiples, while fans pay hefty fees either way.",
    who: ["Concert and sports fans", "Families buying for big events", "Artists who want tickets to reach real fans"],
    evidence: [
      "High-profile tour presales have crashed or sold out amid bot traffic, drawing congressional hearings.",
      "The BOTS Act of 2016 bans ticket-buying bots, but enforcement has been rare.",
      "The US Justice Department sued Live Nation-Ticketmaster in 2024 on antitrust grounds."
    ],
    players: [
      { name: "Ticketmaster", note: "Dominant primary ticketing; Verified Fan presales." },
      { name: "StubHub / SeatGeek", note: "Secondary marketplaces." },
      { name: "AXS / Dice", note: "Alternative primary platforms; Dice uses locked tickets." }
    ],
    gap: "Fan-first ticketing with identity-bound tickets and face-value resale, sized for venues outside exclusive contracts.",
    wedges: [
      "Face-value resale exchange for independent venues",
      "Verified-fan identity layer artists can bring to any ticketing provider",
      "Fan-club presale tools that bypass bots"
    ],
    model: "Per-ticket fees or SaaS paid by artists and independent venues.",
    validate: [
      "Partner with 3 independent venues on a face-value resale pilot",
      "Survey fans on what they paid vs. face value at their last show",
      "Interview artist managers about fan-access goals"
    ],
    risks: [
      "Exclusive venue contracts lock out new entrants",
      "Fraud and identity verification are hard at scale"
    ]
  },
  23: {
    why: "Price-adjustment windows, return deadlines and card purchase protections are worth real money, but no one tracks them across every receipt.",
    who: ["Frequent online shoppers", "Families making big-ticket purchases", "Credit-card users with unused protections"],
    evidence: [
      "Many retailers and some credit cards offer price adjustments or protections that most people never claim.",
      "Paribus, which automated price-drop refunds, was acquired by Capital One — a signal of value.",
      "Email receipts now make purchase histories machine-readable."
    ],
    players: [
      { name: "Capital One Shopping", note: "Price tracking and deals; includes former Paribus tech." },
      { name: "Honey", note: "Coupons and price history." },
      { name: "Retailer apps", note: "Purchase history for one store only." }
    ],
    gap: "An agent that files the claim for you — price adjustment, warranty repair, or card protection — instead of just alerting you.",
    wedges: [
      "Inbox receipt scanner that auto-files price-drop claims",
      "Warranty vault that knows what's covered and starts the claim",
      "Card-benefits optimizer that claims extended warranties and protections"
    ],
    model: "Share of money recovered, or subscription.",
    validate: [
      "Scan receipts for 50 volunteers and total the unclaimed value",
      "File 30 claims manually and measure success rate",
      "Test pricing as a percentage of recovered value"
    ],
    risks: [
      "Retailers can tighten policies once claims are automated",
      "Inbox access raises privacy concerns"
    ]
  },
  24: {
    why: "Resale is booming, but listing one item — photos, title, description, price, shipping — still takes 10–20 minutes per platform.",
    who: ["Casual sellers clearing closets", "Parents selling outgrown kids' gear", "Small vintage and thrift resellers"],
    evidence: [
      "The US secondhand apparel market has grown steadily, outpacing traditional apparel retail.",
      "Cross-listing tools are popular with serious resellers who list on several marketplaces.",
      "Modern vision models can draft a listing from a single photo."
    ],
    players: [
      { name: "Poshmark / eBay / Depop / Mercari", note: "Marketplaces with their own listing flows." },
      { name: "Vendoo", note: "Cross-listing software for resellers." },
      { name: "List Perfectly", note: "Reseller automation and inventory." }
    ],
    gap: "Snap-a-photo, list-everywhere for casual sellers who won't learn reseller tools.",
    wedges: [
      "One-photo AI listing generator with pricing from recent sales",
      "Closet-cleanout concierge that picks up, lists and ships for a cut",
      "Kids' gear trade-in loop for growing families"
    ],
    model: "Subscription for power users; commission for concierge service.",
    validate: [
      "List 50 items for friends and track time saved and sell-through",
      "Compare AI-suggested prices to final sale prices",
      "Test a pickup-and-sell service in one neighborhood"
    ],
    risks: [
      "Marketplace API limits on cross-listing",
      "Many items are low value, so economics are thin"
    ]
  },
  25: {
    why: "Menu markups, service fees, delivery fees and default tips can nearly double a delivery order, and no one shows the total before checkout.",
    who: ["Frequent delivery customers", "Office teams ordering lunch", "Families ordering dinner on weeknights"],
    evidence: [
      "Delivery apps commonly price menu items above in-store prices on top of service and delivery fees.",
      "Cities including New York and San Francisco have regulated delivery commissions or fees.",
      "Subscription programs reduce some fees but add a monthly charge."
    ],
    players: [
      { name: "DoorDash / DashPass", note: "Largest US delivery platform and membership." },
      { name: "Uber Eats / Uber One", note: "Delivery bundled with rides membership." },
      { name: "Grubhub", note: "Delivery marketplace." }
    ],
    gap: "Transparent all-in price comparison across apps and the restaurant's own direct-order option.",
    wedges: [
      "All-in delivery price comparison with a direct-order fallback",
      "Office group-order tool that minimizes fees per person",
      "Neighborhood pickup batching for big savings"
    ],
    model: "Affiliate fees from restaurants' direct ordering; premium for teams.",
    validate: [
      "Price 100 identical orders across apps and direct ordering",
      "Survey users on whether they'd switch for a 20% saving",
      "Pilot with 10 restaurants offering direct-order discounts"
    ],
    risks: [
      "Platforms can block price scraping",
      "Convenience often beats savings for users"
    ]
  },
  26: {
    why: "Third-party delivery commissions can take a large cut of each order from restaurants that already run on single-digit margins.",
    who: ["Independent restaurant owners", "Small multi-location groups", "Ghost kitchens and virtual brands"],
    evidence: [
      "Full-service restaurants typically operate on low single-digit profit margins.",
      "Several cities capped delivery commissions during and after the pandemic.",
      "Commission-free direct-ordering platforms have grown quickly."
    ],
    players: [
      { name: "Toast", note: "POS with online ordering built in." },
      { name: "Owner.com", note: "Websites, ordering and marketing for independents." },
      { name: "ChowNow / Olo", note: "Direct ordering infrastructure." }
    ],
    gap: "Direct ordering is solved; getting customers to order direct again and again is not.",
    wedges: [
      "Loyalty and SMS marketing that converts app customers to direct ordering",
      "Shared local delivery fleet owned by member restaurants",
      "Commission-cost dashboard showing true profit per channel"
    ],
    model: "SaaS subscription plus payment processing.",
    validate: [
      "Analyze channel profitability for 10 restaurants",
      "Run a direct-order loyalty campaign for 3 restaurants and measure repeat rate",
      "Interview owners on what they pay delivery apps"
    ],
    risks: [
      "Restaurant churn and closures",
      "Customer acquisition costs for direct channels"
    ]
  },
  27: {
    why: "Diners with allergies, celiac disease or religious dietary rules must interrogate staff at every restaurant to find a safe meal.",
    who: ["People with celiac disease or severe food allergies", "Parents of allergic children", "Kosher, halal and diabetic diners"],
    evidence: [
      "Food allergies affect an estimated tens of millions of Americans, including many children.",
      "Restaurants are a common setting for allergic reactions, according to medical studies.",
      "Niche dietary apps have intensely loyal communities."
    ],
    players: [
      { name: "Spokin", note: "Food-allergy community, reviews and products." },
      { name: "Find Me Gluten Free", note: "Gluten-free restaurant reviews." },
      { name: "Yelp", note: "Basic dietary filters." }
    ],
    gap: "Verified, dish-level ingredient and cross-contact data from restaurants, kept current.",
    wedges: [
      "Restaurant allergen-matrix tool that generates safe menus per diner",
      "Allergy-safe certification program for restaurants",
      "Safe-order card that communicates restrictions to the kitchen"
    ],
    model: "Restaurant subscriptions and certification fees; consumer premium.",
    validate: [
      "Interview 20 allergy families about how they choose restaurants",
      "Build allergen matrices for 30 local restaurants",
      "Test whether certification drives traffic"
    ],
    risks: [
      "Liability if data is wrong",
      "Keeping menus current is operationally hard"
    ]
  },
  28: {
    why: "Flight credits, expiring miles and vouchers are scattered across a dozen loyalty accounts, so value quietly evaporates.",
    who: ["Frequent travelers", "Families who cancelled trips and hold credits", "Small-business travelers"],
    evidence: [
      "Airlines issued billions of dollars in flight credits during the pandemic, much of it unused before expiry.",
      "Loyalty programs frequently change earning, redemption and expiry rules.",
      "Points-tracking and award-search tools have dedicated paying users."
    ],
    players: [
      { name: "AwardWallet", note: "Tracks loyalty balances and expirations." },
      { name: "TripIt", note: "Itineraries and travel alerts." },
      { name: "Point.me", note: "Award flight search." }
    ],
    gap: "A wallet that tracks credits and vouchers, not just points, and applies them automatically when you book.",
    wedges: [
      "Travel-credit wallet that parses credits from airline emails",
      "Credit-aware booking search that uses expiring value first",
      "Corporate tool to recover unused business-travel credits"
    ],
    model: "Subscription for consumers; SaaS for companies.",
    validate: [
      "Audit 50 people's inboxes for unused travel credits",
      "Measure total recoverable value",
      "Test a corporate pilot with one travel manager"
    ],
    risks: [
      "Airlines restrict account access",
      "Loyalty rules change frequently"
    ]
  },
  29: {
    why: "Cities issue millions of contestable parking and camera tickets, but contesting one costs more time than paying it.",
    who: ["Urban drivers", "Delivery and service-vehicle operators", "Rental-car and fleet customers hit with toll fees"],
    evidence: [
      "Large cities collect hundreds of millions of dollars a year in parking fines.",
      "Appeals often succeed when filed with photo evidence, but most drivers never file.",
      "Ticket-fighting apps have found traction in dense cities like New York."
    ],
    players: [
      { name: "WinIt", note: "Contests NYC tickets for a share of savings." },
      { name: "City appeal portals", note: "Online but slow and inconsistent." },
      { name: "Fleet management software", note: "Tracks fines but rarely fights them." }
    ],
    gap: "Multi-city, automated appeals with evidence gathered for you, plus toll-fee disputes with rental companies.",
    wedges: [
      "Snap-a-ticket appeal generator with city-specific rules",
      "Fleet ticket-fighting service for delivery and trades companies",
      "Rental-car toll and admin-fee dispute agent"
    ],
    model: "Contingency on dismissed fines; subscriptions for fleets.",
    validate: [
      "Fight 50 tickets manually in one city and track dismissal rate",
      "Interview 5 fleet managers on annual fine spend",
      "Map appeal rules for the top 10 cities"
    ],
    risks: [
      "Cities can change appeal processes",
      "Per-ticket revenue is small"
    ]
  },
  30: {
    why: "Depreciation, insurance, financing, fuel and maintenance make the real cost of a car opaque — and the dealer's math favors the dealer.",
    who: ["First-time car buyers", "Families deciding between EV and gas", "Drivers weighing lease vs. buy"],
    evidence: [
      "Average new-car prices and auto-loan rates rose sharply after 2021.",
      "Total cost of ownership varies widely by model, driven largely by depreciation.",
      "Car subscriptions and EV incentives add new options and confusion."
    ],
    players: [
      { name: "Edmunds True Cost to Own", note: "Five-year cost estimates by model." },
      { name: "Kelley Blue Book", note: "Pricing and cost-to-own data." },
      { name: "Dealer finance offices", note: "Where the real decision gets made." }
    ],
    gap: "A personalized advisor that uses your driving, ZIP, insurance and credit to compare buy, lease, subscribe and EV options honestly.",
    wedges: [
      "Personalized total-cost-of-mobility calculator",
      "Deal-review service that checks a dealer quote before you sign",
      "Employer commute benefit that includes car-cost coaching"
    ],
    model: "Flat-fee deal reviews; insurance and loan referrals with clear disclosure.",
    validate: [
      "Review 20 real dealer quotes and find savings",
      "Test willingness to pay $49–99 for a deal review",
      "Compare predicted vs. actual ownership cost for volunteers"
    ],
    risks: [
      "Free calculators exist",
      "Referral revenue can create conflicts"
    ]
  },
  31: {
    why: "Licensed childcare is scarce and expensive, and parents still find openings by calling providers one by one and joining long waitlists.",
    who: ["Working parents of infants and toddlers", "Parents returning from parental leave", "Employers losing staff to childcare gaps"],
    evidence: [
      "Infant care costs exceed in-state college tuition in many states, per Child Care Aware of America.",
      "About half of Americans live in areas described as childcare deserts.",
      "Federal pandemic childcare funding expired in 2023, pressuring provider supply."
    ],
    players: [
      { name: "Winnie", note: "Childcare marketplace and availability search." },
      { name: "Care.com", note: "Nannies, sitters and caregivers." },
      { name: "Kinside", note: "Employer-backed childcare benefits." }
    ],
    gap: "Real-time openings across licensed centers and home daycares, plus tools that help new home-based providers get licensed and full.",
    wedges: [
      "Waitlist aggregator that holds one application across many providers",
      "Home-daycare-in-a-box: licensing, software and enrollment for new providers",
      "Employer-reserved seats at partner centers"
    ],
    model: "Provider SaaS, employer contracts, and parent subscriptions.",
    validate: [
      "Call every licensed provider in one ZIP and map real openings",
      "Help 5 people launch licensed home daycares",
      "Pitch 5 employers on reserved seats"
    ],
    risks: [
      "Supply, not discovery, is the binding constraint",
      "State licensing rules vary heavily"
    ]
  },
  32: {
    why: "School portals, sports apps, group texts and paper flyers don't talk to each other, so parents become the integration layer.",
    who: ["Parents of school-age kids", "Co-parents in separate households", "Carpool coordinators"],
    evidence: [
      "Most families juggle multiple school, district and activity apps.",
      "Shared family calendars are popular but rely on manual entry.",
      "AI can now read emails and flyers and turn them into events."
    ],
    players: [
      { name: "Cozi / FamilyWall", note: "Shared family calendars and lists." },
      { name: "Skylight", note: "Wall-mounted family calendar." },
      { name: "ParentSquare / TeamSnap", note: "School and sports communication." }
    ],
    gap: "Something that reads every school email, flyer and team app automatically and builds one family schedule with assigned drivers.",
    wedges: [
      "Forward-anything-to-the-calendar assistant for parents",
      "Carpool coordination with rotation and swap requests",
      "Co-parenting schedule and expense sharing"
    ],
    model: "Family subscription; premium hardware display.",
    validate: [
      "Collect a month of school emails from 20 families and test parsing accuracy",
      "Run carpool coordination for one school team",
      "Test willingness to pay $5–10 per month"
    ],
    risks: [
      "Parents have app fatigue",
      "Schools and leagues change tools often"
    ]
  },
  33: {
    why: "Adult children are managing parents' medications, appointments, bills and aides — often from another state — with phone calls and spreadsheets.",
    who: ["Long-distance adult-child caregivers", "Sandwich-generation parents", "Seniors aging in place"],
    evidence: [
      "AARP estimates tens of millions of Americans provide unpaid care to an adult.",
      "The 65+ population is the fastest-growing US age group.",
      "Caregivers report significant lost work time and out-of-pocket costs."
    ],
    players: [
      { name: "A Place for Mom", note: "Senior-living referral service." },
      { name: "Honor (Home Instead)", note: "In-home care network." },
      { name: "Papa", note: "Companionship and support for seniors, often via health plans." }
    ],
    gap: "One caregiver command center: meds, appointments, bills, aides and siblings' responsibilities in a shared view.",
    wedges: [
      "Sibling-shared care dashboard with task assignment",
      "Bill-pay and fraud monitoring for aging parents",
      "Employer caregiving benefit with a care coordinator"
    ],
    model: "Family subscription; employer and health-plan contracts.",
    validate: [
      "Interview 20 long-distance caregivers about their weekly tasks",
      "Run care coordination manually for 5 families",
      "Pitch 3 HR leaders on caregiving benefits"
    ],
    risks: [
      "Seniors may resist monitoring",
      "Fragmented health data access"
    ]
  },
  34: {
    why: "DMV visits mean booking scarce appointments, guessing document requirements, and often getting turned away anyway.",
    who: ["New state residents", "Teens getting licenses", "Anyone upgrading to a REAL ID"],
    evidence: [
      "REAL ID enforcement for domestic flights began in May 2025, driving visits.",
      "Many states moved to appointment-only service after the pandemic.",
      "Document mistakes are a common reason visits fail."
    ],
    players: [
      { name: "State DMV online portals", note: "Expanding, but uneven across states." },
      { name: "Third-party appointment services", note: "Some states restrict resale of slots." },
      { name: "Auto-registration services", note: "Handle some paperwork for a fee." }
    ],
    gap: "A state-specific document checklist and readiness check that guarantees you won't be turned away.",
    wedges: [
      "Document readiness checker for REAL ID and licenses",
      "Move-to-a-new-state checklist: license, registration, voter, insurance",
      "Dealership and fleet registration automation"
    ],
    model: "Per-task consumer fees; B2B for dealers and relocation services.",
    validate: [
      "Map document rules for 10 states",
      "Pre-check 30 people's documents and track success",
      "Pitch relocation companies"
    ],
    risks: [
      "States improve their own portals",
      "Appointment resale is restricted in some states"
    ]
  },
  35: {
    why: "Benefit applications are long, confusing and easy to abandon, so eligible people leave billions in support unclaimed.",
    who: ["Low-income families", "Recently unemployed workers", "Seniors eligible for multiple programs"],
    evidence: [
      "Participation rates for programs like SNAP and the EITC fall well short of full eligibility.",
      "Code for America's GetCalFresh showed that simpler applications increase enrollment.",
      "Unemployment systems struggled badly during the pandemic surge."
    ],
    players: [
      { name: "Propel", note: "App for SNAP/EBT households." },
      { name: "GetCalFresh (Code for America)", note: "Simplified SNAP applications in California." },
      { name: "Benefits Data Trust", note: "Nonprofit benefits outreach." }
    ],
    gap: "A single application assistant that checks eligibility across federal, state and local programs and tracks every claim.",
    wedges: [
      "Multi-program eligibility screener with one intake",
      "Status tracker and renewal reminders",
      "Employer and hospital benefits navigator"
    ],
    model: "Government contracts, health-system contracts, and philanthropy; avoid charging recipients.",
    validate: [
      "Help 30 families apply and measure completion and approval",
      "Interview caseworkers about drop-off points",
      "Pilot with one hospital social-work team"
    ],
    risks: [
      "Government procurement is slow",
      "Data security requirements are strict"
    ]
  },
  36: {
    why: "Federal processing times swing from weeks to months, status updates are vague, and people pay expediters to avoid missing trips.",
    who: ["International travelers", "Families with kids needing first passports", "Frequent flyers renewing Global Entry"],
    evidence: [
      "Passport backlogs in 2022–2023 caused widespread missed trips.",
      "The State Department rolled out online passport renewal for eligible adults.",
      "Paid expediting services persist because timelines are unpredictable."
    ],
    players: [
      { name: "State Department online renewal", note: "Covers eligible adult renewals only." },
      { name: "ItsEasy and other expediters", note: "Paid courier and expedite services." },
      { name: "Trusted Traveler Programs portal", note: "Global Entry and TSA PreCheck." }
    ],
    gap: "Proactive tracking: expiration alerts tied to trips, application prep, and status monitoring across documents.",
    wedges: [
      "Family travel-document vault with expiration alerts",
      "Trip-aware renewal planner",
      "Corporate travel-document compliance tool"
    ],
    model: "Family subscription; B2B for travel managers.",
    validate: [
      "Survey travelers on near-misses with expired documents",
      "Pilot with a corporate travel manager",
      "Test pricing for a family vault"
    ],
    risks: [
      "Government improvements reduce pain",
      "Low-frequency use"
    ]
  },
  37: {
    why: "Federal and state incentives for solar, heat pumps and EVs keep changing, and homeowners can't tell whether the math works for their house.",
    who: ["Homeowners considering upgrades", "Owners replacing a failing furnace or water heater", "Small contractors selling electrification"],
    evidence: [
      "The 2022 Inflation Reduction Act expanded residential clean-energy credits, and 2025 legislation phased several of them out early.",
      "Rebate programs vary by state and utility.",
      "Installers often oversell savings."
    ],
    players: [
      { name: "EnergySage", note: "Solar and heat-pump quote marketplace." },
      { name: "Rewiring America", note: "Incentive calculators." },
      { name: "Palmetto", note: "Home electrification services." }
    ],
    gap: "An unbiased, house-specific payback analysis using real bills, local rates and current incentives.",
    wedges: [
      "Upload-your-utility-bill payback calculator",
      "Emergency-replacement guidance when equipment fails",
      "Contractor tool that stacks incentives on quotes"
    ],
    model: "Contractor referral fees with disclosure; utility program contracts.",
    validate: [
      "Model payback for 20 homes",
      "Compare installer claims to actual savings",
      "Interview contractors about incentive paperwork"
    ],
    risks: [
      "Policy changes reduce incentives",
      "Lead-gen conflicts of interest"
    ]
  },
  38: {
    why: "Time-of-use rates and weather-driven spikes make bills swing, but customers get a lump total with no actionable explanation.",
    who: ["Renters with electric heat", "Small businesses with variable usage", "EV owners charging at home"],
    evidence: [
      "Residential electricity prices rose faster than inflation in many states recently.",
      "More utilities are moving customers to time-of-use rates.",
      "Smart meters provide interval data most customers never see."
    ],
    players: [
      { name: "Arcadia", note: "Utility data platform and community solar." },
      { name: "Sense", note: "In-home energy monitoring hardware." },
      { name: "Opower (Oracle)", note: "Utility customer engagement." }
    ],
    gap: "Plain-language bill explanations and shift recommendations using smart-meter data — no hardware required.",
    wedges: [
      "Bill explainer that answers 'why was this month so high?' using smart-meter interval data",
      "Rate-plan optimizer that tests time-of-use vs. flat plans against your real usage",
      "Small-business energy dashboard that flags equipment left running overnight"
    ],
    model: "Utility contracts or small subscription.",
    validate: [
      "Download Green Button data for 30 households and explain each bill",
      "Test whether shift recommendations change usage over two billing cycles",
      "Pitch a municipal utility or co-op on a customer-facing pilot"
    ],
    risks: [
      "Utility data access varies",
      "Savings per household may be small"
    ]
  },
  39: {
    why: "EV chargers show as available but are often broken, blocked or occupied, which makes road trips stressful.",
    who: ["EV drivers on road trips", "Apartment dwellers without home charging", "Rideshare drivers in EVs"],
    evidence: [
      "Studies of public fast chargers have found meaningful shares out of service at any time.",
      "Most automakers are moving to Tesla's NACS connector standard.",
      "Federal charger funding came with uptime requirements."
    ],
    players: [
      { name: "PlugShare", note: "Crowdsourced charger reviews." },
      { name: "ChargePoint / Electrify America", note: "Charging networks with apps." },
      { name: "Tesla Supercharger network", note: "Opening to other brands." }
    ],
    gap: "Verified, real-time reliability data across networks, plus reservations.",
    wedges: [
      "Cross-network uptime score built from driver check-ins and charger telemetry",
      "Reservation layer for chargers at hotels, offices and apartment buildings",
      "Maintenance-as-a-service for site hosts who own chargers but can't fix them"
    ],
    model: "Network data licensing and maintenance contracts.",
    validate: [
      "Physically audit 100 public chargers in one metro and compare to app status",
      "Survey 50 EV drivers about their last failed charging attempt",
      "Pitch 5 site hosts (hotels, retail) on an uptime guarantee"
    ],
    risks: [
      "Networks may not share data",
      "Tesla network improves rapidly"
    ]
  },
  40: {
    why: "Small-business owners still lose weekends to categorizing expenses, matching receipts and chasing unpaid invoices because most tools assume an accountant is in the loop.",
    who: ["Solo owner-operators and freelancers with an LLC", "Main Street retailers and cafes", "Contractors and home-service businesses"],
    evidence: [
      "The US has more than 30 million small businesses, and the large majority have no employees.",
      "Bench, a popular bookkeeping service, abruptly shut down in late 2024 before being acquired, stranding many customers mid-year.",
      "Late payments are a chronic cash-flow problem for small firms, and modern AI can now categorize and reconcile most transactions."
    ],
    players: [
      { name: "QuickBooks", note: "Dominant SMB accounting; powerful but assumes bookkeeping knowledge." },
      { name: "Xero", note: "Cloud accounting popular with accountants." },
      { name: "Pilot", note: "Bookkeeping services aimed at venture-backed startups." }
    ],
    gap: "Books that close themselves each month and only ask the owner a handful of plain-English questions, with a human checking the result.",
    wedges: [
      "AI bookkeeper with human review and a guaranteed monthly close",
      "Invoice-chasing assistant that sends reminders and offers pay-by-link",
      "Tax-ready books for sole proprietors that hand off cleanly to a CPA"
    ],
    model: "Monthly subscription tiered by transaction volume; payment-processing revenue on invoices.",
    validate: [
      "Do the books by hand for 10 businesses for one quarter and log where time goes",
      "Measure AI categorization accuracy on their real transactions",
      "Ask former Bench customers what they'd switch to and why"
    ],
    risks: [
      "Errors create tax and liability exposure",
      "Incumbents are bundling AI features quickly"
    ]
  },
  41: {
    why: "Restaurants, salons and clinics run schedules, shift swaps and call-outs through group texts and whiteboards, so gaps surface at the last minute.",
    who: ["Managers of small restaurants and cafes", "Salon and spa owners", "Hourly employees juggling school or second jobs"],
    evidence: [
      "Cities and states including New York City, San Francisco, Seattle, Chicago and Oregon have predictive-scheduling (fair workweek) laws.",
      "Turnover in hospitality and retail is among the highest of any US industry.",
      "Scheduling software is standard at chains but much less common at single-location businesses."
    ],
    players: [
      { name: "7shifts", note: "Restaurant-focused scheduling and labor tools." },
      { name: "Homebase", note: "Free-tier scheduling and time clock for small teams." },
      { name: "When I Work / Deputy", note: "General shift scheduling." }
    ],
    gap: "Scheduling that works over plain text messages for very small teams, with fair-workweek compliance handled automatically.",
    wedges: [
      "Text-to-swap: employees trade shifts by SMS, manager approves in one tap",
      "Fair-workweek compliance checker for small employers in covered cities",
      "Shared on-call labor pool across nearby small businesses"
    ],
    model: "Per-location monthly subscription; premium compliance features.",
    validate: [
      "Interview 20 small-business managers about last week's call-outs",
      "Pilot SMS shift-swapping at 3 locations for a month",
      "Measure reduction in uncovered shifts"
    ],
    risks: [
      "Crowded category with free tiers",
      "Low switching costs and high churn among small businesses"
    ]
  },
  42: {
    why: "Plumbers, cleaners and trainers live on reviews and word of mouth, yet asking happy customers for a review or referral is awkward and easy to forget.",
    who: ["Home-service trades", "Cleaning and landscaping companies", "Personal trainers, tutors and wellness practitioners"],
    evidence: [
      "Most consumers read online reviews before choosing a local business.",
      "Google Business Profile listings are a primary discovery channel for local services.",
      "Reputation-management software is a large category, but most of it is priced for multi-location businesses."
    ],
    players: [
      { name: "Podium", note: "Messaging and review requests; priced for larger SMBs." },
      { name: "Birdeye", note: "Reputation management suite." },
      { name: "NiceJob", note: "Review and referral automation for small service businesses." }
    ],
    gap: "Dead-simple review and referral automation tied to job completion, priced for one-truck and one-person businesses.",
    wedges: [
      "Job-complete trigger that sends a review request from the invoice",
      "Referral rewards that pay customers when a neighbor books",
      "Neighborhood reputation page that aggregates reviews across sites"
    ],
    model: "Low monthly SaaS, bundled with invoicing or field-service tools.",
    validate: [
      "Pilot with 10 local businesses and measure review growth over 60 days",
      "Test referral rewards with 3 businesses",
      "Ask owners what they pay today for marketing"
    ],
    risks: [
      "Google review-policy changes (e.g., rules against incentivized reviews)",
      "Crowded category"
    ]
  },
  43: {
    why: "Everyday legal tasks such as a will, an LLC or a lease review are either expensive with a lawyer or risky to do yourself.",
    who: ["Young families without a will", "First-time business founders", "Renters signing leases with unusual clauses"],
    evidence: [
      "Surveys consistently find that most American adults do not have a will.",
      "Online legal-document companies built large businesses on formation and estate documents.",
      "The legal-services gap for middle-income households is well documented by access-to-justice research."
    ],
    players: [
      { name: "LegalZoom", note: "Formation, estate documents and attorney plans." },
      { name: "Rocket Lawyer", note: "Documents plus attorney access by subscription." },
      { name: "Trust & Will", note: "Online wills and trusts." }
    ],
    gap: "Guided legal help for a specific situation, with a licensed attorney's review at a fixed, transparent price.",
    wedges: [
      "Lease-review service with a red-flag summary in 24 hours",
      "Life-event legal bundles: new baby, new home, new business",
      "Employer legal benefit focused on wills and estate planning"
    ],
    model: "Fixed-fee services and subscriptions; employer benefit contracts.",
    validate: [
      "Review 30 leases and categorize problematic clauses",
      "Sell 10 fixed-fee will packages with attorney review",
      "Interview HR teams about legal-benefit usage"
    ],
    risks: [
      "Unauthorized-practice-of-law rules vary by state",
      "Price pressure from free templates"
    ]
  },
  44: {
    why: "Licenses, registrations, sales-tax filings and annual reports differ by city, county and state, and small businesses often learn they missed one from a penalty notice.",
    who: ["Businesses expanding into new states", "E-commerce sellers with nexus in multiple states", "Employers hiring remote workers across states"],
    evidence: [
      "The 2018 Wayfair Supreme Court decision let states require out-of-state sellers to collect sales tax.",
      "Remote hiring creates payroll registration obligations in each employee's state.",
      "Missed annual reports can cost a company its good standing."
    ],
    players: [
      { name: "Avalara", note: "Sales-tax calculation and filing." },
      { name: "Mosey", note: "Multi-state compliance for employers." },
      { name: "Harbor Compliance", note: "Licensing and registered agent services." }
    ],
    gap: "One compliance map that turns where you sell, hire and operate into a calendar of obligations — and files them.",
    wedges: [
      "Compliance radar connected to payroll and sales data",
      "Annual-report and registered-agent autopilot",
      "Local license finder for new storefronts and contractors"
    ],
    model: "Subscription priced per state or location.",
    validate: [
      "Map obligations for 10 small multi-state businesses",
      "Measure how many have missed filings",
      "Interview accountants who serve small businesses"
    ],
    risks: [
      "Errors create real penalties",
      "Rules change frequently"
    ]
  },
  45: {
    why: "Credit-report errors and wrongful collections can block apartments, loans and jobs, and disputing them is slow, manual and adversarial.",
    who: ["People with medical or disputed collections", "Identity-theft victims", "Young adults building credit"],
    evidence: [
      "Credit-reporting complaints are consistently among the top categories at the CFPB.",
      "The three nationwide credit bureaus announced in 2022–2023 that they would remove most medical-debt collections under $500.",
      "The Fair Credit Reporting Act gives consumers dispute rights that many never use."
    ],
    players: [
      { name: "AnnualCreditReport.com", note: "Free official reports." },
      { name: "Credit Karma", note: "Free monitoring and education." },
      { name: "CFPB complaint portal", note: "Escalation route for disputes." }
    ],
    gap: "Evidence-based dispute workflows that track every response deadline and escalate automatically.",
    wedges: [
      "Credit-report audit that flags likely errors",
      "Dispute tracker with FCRA deadline reminders",
      "Identity-theft recovery concierge"
    ],
    model: "Subscription or fixed fee; partnerships with credit unions and lenders.",
    validate: [
      "Review 50 credit reports and count errors",
      "File disputes manually and track resolution times",
      "Interview credit counselors"
    ],
    risks: [
      "Credit repair is heavily regulated (Credit Repair Organizations Act)",
      "Reputation problems in the category"
    ]
  },
  46: {
    why: "Recurring charges accumulate quietly across cards and app stores, and canceling them is deliberately inconvenient.",
    who: ["Busy households", "People with free trials that roll into paid plans", "Families sharing many streaming services"],
    evidence: [
      "Consumers routinely underestimate their monthly subscription spending in surveys.",
      "The FTC's click-to-cancel rule was struck down by a federal appeals court in 2025, leaving state laws as the main lever.",
      "Subscription-tracking apps reached millions of users."
    ],
    players: [
      { name: "Rocket Money", note: "Subscription tracking and cancellation concierge." },
      { name: "Bank and card apps", note: "Increasingly show recurring charges." },
      { name: "Apple / Google subscription settings", note: "Manage app-store subscriptions only." }
    ],
    gap: "One place that sees all recurring charges, cancels any of them, and negotiates better prices.",
    wedges: [
      "Virtual cards per subscription that can be frozen instantly",
      "Free-trial guardian that cancels before conversion",
      "Household subscription optimizer"
    ],
    model: "Subscription or savings share.",
    validate: [
      "Audit 50 households' recurring charges",
      "Cancel subscriptions manually and track time required",
      "Test virtual-card adoption"
    ],
    risks: [
      "Banks offer similar features",
      "Merchants block automated cancellations"
    ]
  },
  47: {
    why: "Shows and live sports move between services every few months, so households pay for several subscriptions and still hunt through apps to find one title.",
    who: ["Households with 3+ streaming services", "Sports fans following leagues split across platforms", "Cord-cutters trying to keep costs below cable"],
    evidence: [
      "Every major streaming service has raised prices at least once since 2022, and most have added ad tiers.",
      "NFL, NBA and other sports rights are now spread across broadcast, cable and multiple streaming platforms.",
      "Industry data shows rising 'serial churn' — viewers who cancel and rejoin services repeatedly."
    ],
    players: [
      { name: "JustWatch / Reelgood", note: "Search for where a title streams." },
      { name: "Google TV / Apple TV app", note: "Aggregated home screens tied to their own platforms." },
      { name: "Service bundles (e.g., Disney+/Hulu/Max)", note: "Reduce cost, but only within partner families." }
    ],
    gap: "A planner that tells each household which services to keep, pause or rejoin this month based on what they actually watch.",
    wedges: [
      "Subscription rotation planner with one-click pause and rejoin reminders",
      "'Where's the game tonight?' finder for every league and local team",
      "Shared household watchlist that picks the cheapest service mix"
    ],
    model: "Affiliate fees when users rejoin services; premium household plan.",
    validate: [
      "Track 30 households' viewing for a month and model savings from rotating",
      "Survey sports fans on how many services they pay for to follow one team",
      "Test whether users act on 'pause this service' prompts"
    ],
    risks: [
      "Bigger bundles reduce the problem",
      "Affiliate income depends on the services you're advising people to pause"
    ]
  },
  48: {
    why: "Gyms, newspapers, cable and some apps still require phone calls, retention scripts or mailed letters to cancel — and charge again while you wait.",
    who: ["People with legacy subscriptions from years ago", "Movers shutting down local services", "Seniors and caregivers cleaning up old accounts"],
    evidence: [
      "Cancellation difficulty is one of the most common subscription complaints filed with regulators.",
      "The FTC's 2024 click-to-cancel rule was vacated by a federal appeals court in 2025.",
      "California and other states have strengthened automatic-renewal laws requiring online cancellation."
    ],
    players: [
      { name: "Rocket Money", note: "Concierge cancellation for supported merchants." },
      { name: "DoNotPay", note: "Consumer-rights automation, including cancellations." },
      { name: "State auto-renewal laws", note: "Protections vary widely by state." }
    ],
    gap: "Guaranteed cancellation for the hardest-to-quit services, with proof of cancellation and automatic chargeback support if billing continues.",
    wedges: [
      "Cancel-anything concierge that handles calls and letters",
      "Proof-of-cancellation vault that triggers disputes when charges continue",
      "Moving-day shutdown checklist for utilities, gyms and memberships"
    ],
    model: "Per-cancellation fee or annual subscription.",
    validate: [
      "Cancel 50 hard-to-cancel services for volunteers and log time and outcomes",
      "Track how often billing continues after cancellation",
      "Test $10–20 per cancellation pricing"
    ],
    risks: [
      "Labor-intensive when phone calls are required",
      "Merchants actively resist automated cancellation"
    ]
  },
  49: {
    why: "401(k)s, IRAs, HSAs and old employer plans are scattered across providers, so most people can't answer the simple question: am I on track?",
    who: ["Mid-career workers with several old 401(k)s", "Households without a financial advisor", "Workers whose employer offers no retirement plan"],
    evidence: [
      "Surveys repeatedly find many Americans are unsure whether they're saving enough for retirement.",
      "Tens of millions of private-sector workers lack access to a workplace retirement plan.",
      "More than a dozen states have launched auto-IRA programs to close the coverage gap."
    ],
    players: [
      { name: "Empower Personal Dashboard", note: "Free aggregation and planning; monetizes advisory." },
      { name: "Boldin (formerly NewRetirement)", note: "Detailed DIY retirement planning." },
      { name: "Betterment / Vanguard", note: "Managed accounts and advice." }
    ],
    gap: "A plain-English readiness score with a short action plan, from a provider that doesn't earn more when you move assets to it.",
    wedges: [
      "15-minute readiness check that produces a one-page plan",
      "Employer financial-wellness benefit focused on retirement",
      "Retirement-plan setup for small businesses facing state auto-IRA mandates"
    ],
    model: "Flat subscription or employer-paid benefit; small-business plan fees.",
    validate: [
      "Build readiness plans for 20 people and check behavior after 60 days",
      "Interview small-business owners about state auto-IRA mandates",
      "Test flat-fee vs. free-with-advisory pricing"
    ],
    risks: [
      "Investment-advice regulation",
      "Free aggregators are entrenched"
    ]
  },
  50: {
    why: "Moving an old 401(k) still involves calls, paper forms and mailed checks between recordkeepers, so many people just leave the money behind.",
    who: ["Job changers", "Workers with small balances at former employers", "HR teams managing ex-employee accounts"],
    evidence: [
      "Estimates of 'forgotten' 401(k) accounts run into the tens of millions, holding a large total balance.",
      "Major recordkeepers formed the Portability Services Network to auto-transfer small balances between plans.",
      "SECURE 2.0 created a federal 'lost and found' database for retirement plans."
    ],
    players: [
      { name: "Capitalize", note: "Helps people find and roll over old 401(k)s." },
      { name: "Portability Services Network", note: "Auto-portability for small balances." },
      { name: "Recordkeepers (Fidelity, Vanguard, Empower)", note: "Control the transfer process." }
    ],
    gap: "End-to-end digital rollovers across every recordkeeper, triggered automatically when you change jobs.",
    wedges: [
      "Rollover concierge that handles forms, calls and check routing",
      "Lost-401(k) finder using the federal database and past employers",
      "HR offboarding integration that offers a rollover at exit"
    ],
    model: "Fees from receiving institutions or employers; free to the worker.",
    validate: [
      "Complete rollovers for 20 people and log every point of friction",
      "Measure time from request to funds landing",
      "Interview HR leaders about small-balance cleanup"
    ],
    risks: [
      "Recordkeepers control access and speed",
      "Referral fees can create conflicts with fiduciary duties"
    ]
  },
  51: {
    why: "Modern couples keep some money joint and some separate, but most finance tools force all-or-nothing sharing, so 'who paid for what' turns into arguments.",
    who: ["Newlyweds and couples moving in together", "Couples with very different incomes", "Blended families with kids from earlier relationships"],
    evidence: [
      "Money is consistently ranked among the top sources of conflict in relationships.",
      "Surveys show more couples now keep a mix of joint and individual accounts.",
      "Several couple-focused finance apps launched in the last decade, signaling demand."
    ],
    players: [
      { name: "Honeydue", note: "Couples budgeting and bill reminders." },
      { name: "Zeta", note: "Joint banking designed for couples." },
      { name: "Monarch Money", note: "Household budgeting with shared access." }
    ],
    gap: "Flexible rules like splitting by income ratio, tracking each person's contributions, and settling automatically without merging everything.",
    wedges: [
      "Proportional bill-splitting tied to each partner's income",
      "Shared goals funded from separate accounts",
      "Moving-in-together and pre-marriage money planner"
    ],
    model: "Subscription plus banking partnerships.",
    validate: [
      "Interview 30 couples about how they split costs today",
      "Pilot proportional splitting with 10 couples for two months",
      "Measure retention and conflict-reduction self-reports"
    ],
    risks: [
      "Privacy and trust inside relationships",
      "Banks may add similar joint features"
    ]
  },
  52: {
    why: "State treasuries hold billions in forgotten deposits, refunds and insurance payouts, but many people never search — or assume it's a scam.",
    who: ["People who have moved several times", "Families settling an estate", "Small businesses with old deposits and refunds"],
    evidence: [
      "State unclaimed-property programs collectively hold tens of billions of dollars.",
      "MissingMoney.com, endorsed by NAUPA, searches participating states in one place.",
      "Common sources include old paychecks, utility deposits, insurance proceeds and dormant bank accounts."
    ],
    players: [
      { name: "MissingMoney.com", note: "Multi-state search endorsed by state administrators." },
      { name: "State treasury portals", note: "Official, free claim systems." },
      { name: "Heir-finder services", note: "Often charge large percentage fees." }
    ],
    gap: "A trusted service that searches every state each year, verifies identity and files claims, for a fair flat fee.",
    wedges: [
      "Annual found-money check for families",
      "Unclaimed-property search bundled into estate settlement",
      "Business recovery of old deposits and refunds"
    ],
    model: "Low flat fee or capped success fee; partnerships with estate attorneys and banks.",
    validate: [
      "Search for 100 volunteers and record the share with claimable money",
      "Track claim sizes and processing times",
      "Test messaging that overcomes scam fears"
    ],
    risks: [
      "Scam perception in the category",
      "Some states cap finder fees"
    ]
  },
  53: {
    why: "Itemized hospital bills often contain duplicate charges, upcoding or services never received, but patients lack the coding knowledge and leverage to push back.",
    who: ["Patients after hospital stays or surgery", "Families managing chronic illness", "Self-insured employers paying claims"],
    evidence: [
      "Federal hospital price-transparency rules took effect in 2021, making negotiated rates more visible.",
      "Billing advocates and auditors commonly report finding errors on complex hospital bills.",
      "Nonprofit hospitals must offer charity care, yet many eligible patients never apply."
    ],
    players: [
      { name: "Goodbill", note: "Reviews itemized hospital bills and negotiates." },
      { name: "Resolve", note: "Medical bill negotiation service." },
      { name: "Independent billing advocates", note: "Expert help, priced by the hour or contingency." }
    ],
    gap: "Automatic itemized-bill requests and audits, plus charity-care screening, before a bill goes to collections.",
    wedges: [
      "Request-and-audit service that obtains itemized bills for patients",
      "Charity-care eligibility checker for nonprofit hospitals",
      "Claims-audit service for self-insured employers"
    ],
    model: "Contingency on savings for patients; per-member fees for employers.",
    validate: [
      "Audit 50 itemized bills and measure error frequency and value",
      "Screen 30 patients for charity-care eligibility",
      "Pilot claims audits with one self-insured employer"
    ],
    risks: [
      "Provider resistance and slow responses",
      "Access to complete billing data"
    ]
  },
  54: {
    why: "For many renters, rent is the biggest bill they pay every month, yet on-time rent usually doesn't build credit the way a mortgage does.",
    who: ["Young renters starting out", "Immigrants building a US credit history", "Renters with thin or damaged credit files"],
    evidence: [
      "Roughly a third of US households rent.",
      "Fannie Mae and Freddie Mac have begun considering positive rent history in some mortgage underwriting.",
      "Rent-reporting startups and rewards programs have raised significant capital."
    ],
    players: [
      { name: "Esusu", note: "Rent reporting through property managers." },
      { name: "Bilt Rewards", note: "Rewards and optional reporting for rent payments." },
      { name: "Experian RentBureau", note: "Bureau data on rental payments." }
    ],
    gap: "Rent reporting that works for any renter, including those with small landlords who will never sign up for a platform.",
    wedges: [
      "Renter-initiated reporting verified through bank data",
      "Free reporting integration for small landlords",
      "Credit-builder bundle for new arrivals to the US"
    ],
    model: "Renter subscription, landlord partnerships, or lender referrals.",
    validate: [
      "Report rent for 50 renters and measure score changes after 3 months",
      "Survey newcomers on credit barriers they've hit",
      "Interview small landlords about verification burden"
    ],
    risks: [
      "Not all scoring models weigh rent data",
      "Verifying payments without landlord participation"
    ]
  },
  55: {
    why: "Specialist referrals still move by fax and phone tag, waits stretch for weeks, and patients rarely hear about cancellations that could get them in sooner.",
    who: ["Patients referred to dermatology, neurology, cardiology and similar", "Primary-care referral coordinators", "Rural patients with few nearby specialists"],
    evidence: [
      "Physician-staffing surveys report multi-week average waits for new-patient appointments in several specialties.",
      "Fax remains common for referrals between practices using different health-record systems.",
      "Online self-scheduling is widespread in primary care but patchier among specialists."
    ],
    players: [
      { name: "Zocdoc", note: "Online booking across independent practices." },
      { name: "Epic MyChart", note: "Scheduling inside a single health system." },
      { name: "Referral-management software", note: "Used by large provider networks." }
    ],
    gap: "Cross-system specialist availability and automatic cancellation-fill alerts for patients who are already referred.",
    wedges: [
      "Cancellation waitlist that texts referred patients when a slot opens",
      "Digital referral hub replacing fax between practices",
      "Specialist availability API for primary-care offices"
    ],
    model: "Subscriptions from specialty practices; health-system contracts.",
    validate: [
      "Call 30 specialists in one metro and measure new-patient wait times",
      "Pilot cancellation alerts with 2 specialty practices",
      "Interview referral coordinators about lost referrals"
    ],
    risks: [
      "Health-record integration is slow",
      "Practice adoption and staff workflows"
    ]
  },
  56: {
    why: "PTAs, booster clubs and small nonprofits still collect dues and reimburse volunteers with checks, spreadsheets and personal payment apps that flag the activity.",
    who: ["PTA and booster-club treasurers", "Youth sports league organizers", "Small nonprofits run by volunteers"],
    evidence: [
      "The US has well over a million registered nonprofits, plus many informal clubs and associations.",
      "Volunteer treasurers rotate often, so records and access get lost at every handoff.",
      "Free nonprofit payment platforms gained adoption by removing processing fees."
    ],
    players: [
      { name: "Zeffy", note: "Free payments for nonprofits, funded by optional tips." },
      { name: "Givebutter", note: "Fundraising and donor management." },
      { name: "MemberPlanet", note: "Membership dues and communication." }
    ],
    gap: "A treasurer toolkit that survives volunteer turnover: dues, reimbursements, budgets and year-end reporting in one place.",
    wedges: [
      "Treasurer-in-a-box with clean handoff to the next volunteer",
      "Receipt-snap reimbursements for volunteers",
      "Year-end report and IRS Form 990-N filing assistant"
    ],
    model: "Optional tips and payment processing; premium for leagues and multi-chapter groups.",
    validate: [
      "Interview 20 treasurers about their last handoff",
      "Pilot with 5 clubs for one season",
      "Measure time saved at year-end"
    ],
    risks: [
      "Very small budgets",
      "Free competitors"
    ]
  }
};

/* Expose for app.js (loaded via <script>, works offline). */
window.FMI_RESEARCH = RESEARCH;
