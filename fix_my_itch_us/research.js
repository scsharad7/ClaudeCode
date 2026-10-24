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
    why: "Modern couples keep some money joint and some separate, but most finance tools force all-or-nothing sharing, so 'who paid for what' turns into arguments. The twist: this itch has been scratched at three times and the companies are gone \u2014 the problem is real, the consumer business is the hard part.",
    who: [
      "Co-parents and divorcing couples who must document and split by agreement",
      "Couples with very different incomes who want proportional, not 50/50, splitting",
      "Newlyweds and couples moving in together, setting the pattern for the first time"
    ],
    evidence: [
      "Money is consistently ranked among the top sources of conflict in relationships.",
      "The couples-specific category has not held: Zeta's couples banking app closed in May 2025, Honeydue was sunset around August 2023, and Tandem was acquired in November 2025 by Reseda Group, the credit-union arm of MSUFCU and one of its early investors, with its founders joining as VPs and terms undisclosed.",
      "The survivor is not couples software at all: Monarch is general household budgeting at about $100 a year, and its breakout came from Intuit shutting down Mint \u2014 subscribers grew roughly 20x \u2014 rather than from couples positioning. It raised $75M in May 2025 at an $850M valuation. Published ARR estimates conflict by an order of magnitude, so treat them as unverified."
    ],
    players: [
      { name: "Monarch / Copilot / YNAB", note: "General household budgeting with partner access; the category that actually survived." },
      { name: "Tandem (now Reseda Group)", note: "Couples expense sharing, acquired by a credit union that wants to move members to joint accounts." },
      { name: "Splitwise", note: "Still the default ledger for splitting, and still only a tracker: it does not settle or hold money." }
    ],
    gap: "Not another couples budgeting app \u2014 that has been tried and buried. The gaps are proportional splitting by income, and serving people for whom splitting is compulsory rather than optional.",
    wedges: [
      "Co-parenting and post-divorce expense splitting, where the records are court-relevant and giving up is not an option",
      "Sell to credit unions, banks and employers as a joint-account onboarding product, the path Tandem's acquisition actually validated",
      "A proportional-split engine (by income share) that layers on existing accounts instead of replacing anyone's bank"
    ],
    model: "B2B2C licensing to credit unions, banks and employers, or a subscription aimed at co-parents rather than happy couples. Ledger-only, settling through existing rails: holding funds turns this into a money-transmission business and a licensing problem.",
    validate: [
      "Interview 5 couples with very unequal incomes and 5 co-parents, and compare how hard each group has already tried to solve it",
      "Pitch 3 credit unions on a joint-account onboarding tool and see who takes a second meeting",
      "Ask the losing group what they currently pay for: if the answer is nothing, that segment is a feature, not a business"
    ],
    risks: [
      "Three companies have already failed or exited here; assume the consumer version does not work until you have evidence it does",
      "Churn is structural: breakups end the account, and couples who settle into a system stop needing the tool",
      "Itemizing who paid for what can be weaponized in financially controlling relationships, which is a design responsibility, not an edge case",
      "Banks, credit unions and general budgeting apps can add joint features as a checkbox"
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
  },
  57: {
    why: "Homeowners pay premiums for decades, then meet an adjuster, a depreciation schedule and a partial denial at the one moment they need the policy to work.",
    who: ["Homeowners after storm, water or fire damage", "Older homeowners with aging roofs", "People in states where insurers are pulling back"],
    evidence: [
      "Insurers have raised premiums sharply and withdrawn from parts of California, Florida and Louisiana after catastrophe losses.",
      "Many policies now pay actual cash value rather than replacement cost on roofs, which sharply reduces payouts.",
      "Public adjusters exist precisely because claim disputes are common, but they typically take a percentage and focus on large losses."
    ],
    players: [
      { name: "Public adjusters", note: "Represent policyholders for a percentage; concentrated on big claims." },
      { name: "Insurer claim apps", note: "Fast to file, but the insurer still sets the valuation." },
      { name: "State insurance departments", note: "Accept complaints; most policyholders never file one." }
    ],
    gap: "Affordable, everyday claim advocacy that reads your actual policy, prices the loss independently, and tells you when an offer is low.",
    wedges: [
      "Policy reader that explains your real coverage before a loss happens",
      "Independent damage estimate priced from the same software contractors use",
      "Appraisal-clause and complaint filing assistant for disputed claims"
    ],
    model: "Flat fee per claim review, or a capped success fee; partnerships with contractors and realtors.",
    validate: [
      "Review 30 denied or partially paid claims and measure how many were underpaid",
      "Produce independent estimates for 10 open claims and compare to the insurer's offer",
      "Interview 5 public adjusters about which claims they turn away"
    ],
    risks: [
      "Public adjusting is licensed in most states, which limits what you can do for a fee",
      "Insurers control the data and the timeline"
    ]
  },
  58: {
    why: "Auto premiums jump at renewal for reasons that are never explained, and the only remedy is re-entering the same information across a dozen quote forms.",
    who: ["Long-tenured policyholders", "Drivers whose rates rose without a claim", "Households with multiple cars and drivers"],
    evidence: [
      "Auto insurance costs rose steeply after 2022 as repair, parts and medical costs climbed.",
      "Regulators in several states have scrutinized price optimization, which charges customers based on how likely they are to shop.",
      "Shopping around commonly produces meaningful savings, yet most drivers renew without comparing."
    ],
    players: [
      { name: "The Zebra / Insurify", note: "Comparison marketplaces monetized by carrier referrals." },
      { name: "Jerry", note: "App that re-shops auto policies periodically." },
      { name: "Independent agents", note: "Shop multiple carriers, paid by commission." }
    ],
    gap: "Set-and-forget re-shopping that re-quotes every renewal automatically and switches you when the savings clear a threshold you set.",
    wedges: [
      "Automatic renewal re-shopping with one-click switching",
      "Rate-increase explainer that tells you what actually changed",
      "Employer or credit-union benefit that audits members' policies annually"
    ],
    model: "Commission as a licensed agent, or a flat subscription that avoids carrier conflicts.",
    validate: [
      "Re-shop 50 real policies and record the distribution of savings",
      "Measure how many people switch when handed a cheaper equivalent quote",
      "Test flat-fee pricing against commission for trust"
    ],
    risks: [
      "Requires insurance producer licensing in each state",
      "Commission models create pressure to recommend the wrong carrier"
    ]
  },
  59: {
    why: "Two policies can price within a few dollars of each other and differ enormously in what they pay, because the differences live in exclusions nobody reads.",
    who: ["First-time homebuyers choosing a policy", "People rebuying after a non-renewal", "Small landlords insuring rentals"],
    evidence: [
      "Replacement cost versus actual cash value, roof schedules, and water-damage exclusions can swing a payout by tens of thousands of dollars.",
      "Standard homeowners policies generally exclude flood, which requires separate NFIP or private coverage.",
      "Insurers increasingly apply percentage deductibles for wind, hail and hurricane rather than flat amounts."
    ],
    players: [
      { name: "Policygenius", note: "Comparison and brokerage across carriers." },
      { name: "Carrier quote engines", note: "Compare price far better than coverage." },
      { name: "Independent agents", note: "Can explain differences, but coverage varies by agent." }
    ],
    gap: "Side-by-side comparison of what each policy actually pays in concrete scenarios, not just the premium.",
    wedges: [
      "Upload-your-policy analyzer that scores coverage against common loss scenarios",
      "Scenario comparison: 'here's what each policy pays if your roof fails'",
      "Mortgage or realtor integration at the moment coverage is chosen"
    ],
    model: "Brokerage commission with disclosure, or flat-fee policy reviews.",
    validate: [
      "Collect 30 real policies and score them on the same loss scenarios",
      "Test whether scenario framing changes which policy people choose",
      "Interview agents about the differences buyers never notice"
    ],
    risks: [
      "Policy language varies by carrier and state",
      "Saying a policy is worse carries liability"
    ]
  },
  60: {
    why: "Renters insurance is one of the cheapest useful financial products in America, and most renters still don't have it because nobody explains it at the right moment.",
    who: ["First-time renters", "Students and young professionals", "Renters whose landlord requires proof of coverage"],
    evidence: [
      "Renters insurance commonly costs on the order of $15–25 a month and covers theft, certain water damage, liability and loss of use.",
      "Industry surveys consistently find homeowners insured at far higher rates than renters.",
      "Many landlords now require renters insurance, creating a natural purchase moment."
    ],
    players: [
      { name: "Lemonade", note: "App-first renters insurance with fast onboarding." },
      { name: "Assurant / ePremium", note: "Renters programs distributed through property managers." },
      { name: "Major carriers", note: "Bundle renters with auto policies." }
    ],
    gap: "Embedding coverage into the lease-signing flow for small landlords, who have no program and no software.",
    wedges: [
      "One-tap renters coverage at lease signing for small landlords",
      "Liability-only product priced for students",
      "Proof-of-coverage tracking for landlords who require it"
    ],
    model: "Commission per policy, plus SaaS for landlord compliance tracking.",
    validate: [
      "Offer coverage at signing with 10 small landlords and measure attach rate",
      "Survey uninsured renters about why they skipped it",
      "Test which single benefit drives purchase"
    ],
    risks: [
      "Low premiums mean thin per-policy economics",
      "Requires licensing and carrier partnerships"
    ]
  },
  61: {
    why: "Term life is a simple product sold through a slow process: paper applications, a paramedical exam, and weeks of underwriting that cause young families to give up.",
    who: ["New parents", "First-time homebuyers with a mortgage", "Primary earners with no coverage outside work"],
    evidence: [
      "Industry research consistently finds a large share of Americans say they need more life insurance than they have.",
      "Accelerated underwriting using data instead of exams expanded substantially in recent years.",
      "Employer group coverage is usually a multiple of salary and is lost when you change jobs."
    ],
    players: [
      { name: "Ethos / Ladder", note: "Instant-decision term life with no exam for many applicants." },
      { name: "Haven Life", note: "Digital term life backed by MassMutual." },
      { name: "Traditional agents", note: "Commission-driven, often steering to whole life." }
    ],
    gap: "Reaching people at the life events that trigger the need, with honest education about term versus permanent coverage.",
    wedges: [
      "Coverage prompt embedded in mortgage closing or birth-related services",
      "Portability tool that shows the gap when employer coverage ends",
      "Honest term-versus-whole-life calculator"
    ],
    model: "Commission per policy; employer benefits distribution.",
    validate: [
      "Test conversion at mortgage closing with one lender",
      "Survey new parents about why they haven't bought coverage",
      "Measure drop-off at each application step"
    ],
    risks: [
      "Customer acquisition costs are high and well-funded incumbents exist",
      "Licensing and suitability regulation"
    ]
  },
  62: {
    why: "When a car is totaled the insurer chooses the valuation method and the comparable vehicles, and most drivers have no basis to argue even when the offer is low.",
    who: ["Drivers after an accident or theft", "Borrowers who owe more than the car is worth", "Owners of modified or low-mileage vehicles"],
    evidence: [
      "Total-loss valuations often rely on vendor reports whose comparables and condition adjustments have been challenged in litigation.",
      "Negative equity is common on auto loans, so a low payout can leave a borrower owing money on a car they no longer have.",
      "Most policies contain an appraisal clause that few policyholders know exists."
    ],
    players: [
      { name: "CCC / Mitchell valuation reports", note: "Vendor valuations used by many insurers." },
      { name: "KBB / Edmunds", note: "Consumer pricing references, not claim valuations." },
      { name: "Appraisal-clause attorneys", note: "Available, but usually only worth it on large disputes." }
    ],
    gap: "A cheap independent valuation plus a guided appraisal-clause demand for the ordinary driver facing a few thousand dollars of disagreement.",
    wedges: [
      "Independent total-loss valuation with local comparables",
      "Appraisal-clause demand letter generator",
      "Gap-insurance and negative-equity checker at claim time"
    ],
    model: "Flat fee per valuation, or a share of the increase obtained.",
    validate: [
      "Re-value 40 total-loss claims and measure the gap against insurer offers",
      "Run 10 appraisal-clause demands and track outcomes",
      "Interview body shops about valuation disputes"
    ],
    risks: [
      "Appraisal rules vary by state and policy",
      "Insurers may simply hold firm"
    ]
  },
  63: {
    why: "A working-age adult is far more likely to be disabled for a period than to die, yet disability coverage is confusing, inconsistently offered, and decided by definitions nobody reads until they file.",
    who: ["Primary earners without private coverage", "Self-employed workers with no group benefits", "Workers facing a long illness or injury"],
    evidence: [
      "Social Security's disability program has a strict definition and a lengthy determination process with high initial denial rates.",
      "Only a minority of private-sector workers have employer-provided long-term disability coverage.",
      "'Own occupation' versus 'any occupation' definitions decide whether many claims pay at all."
    ],
    players: [
      { name: "Guardian / Principal / Unum", note: "Major group and individual disability carriers." },
      { name: "Atticus / Social Security advocates", note: "Help with SSDI claims and appeals." },
      { name: "Breeze", note: "Digital individual disability insurance." }
    ],
    gap: "Explaining what someone's existing coverage actually does before they need it, and filling the gap when it falls short.",
    wedges: [
      "Benefits reader that decodes your employer's disability policy",
      "Coverage-gap calculator with a supplemental individual policy",
      "Claim-support service for people navigating a denial"
    ],
    model: "Commission on supplemental policies; employer benefits contracts; fees for claim support.",
    validate: [
      "Read 30 employer disability policies and test whether people can predict their coverage",
      "Survey self-employed workers about income protection",
      "Interview claimants who were denied"
    ],
    risks: [
      "Long sales cycles and low consumer awareness",
      "Claims support is labor-intensive"
    ]
  },
  64: {
    why: "A warning light turns into a four-figure estimate with no way to check parts prices, labor hours or whether the work is needed at all.",
    who: ["Drivers of out-of-warranty cars", "People without a trusted mechanic after a move", "Lower-income drivers for whom a repair is a crisis"],
    evidence: [
      "Surveys repeatedly find many Americans could not cover an unexpected four-figure expense without borrowing.",
      "Labor time guides and parts catalogs exist but are priced and sold to the trade, not to consumers.",
      "Undercover investigations by consumer outlets have repeatedly documented unnecessary recommended repairs."
    ],
    players: [
      { name: "RepairPal", note: "Fair-price estimates and a certified shop network." },
      { name: "YourMechanic", note: "Mobile mechanics with upfront pricing." },
      { name: "Shop management software", note: "Digital inspections with photos, aimed at shops." }
    ],
    gap: "An independent second opinion that reads the actual estimate, line by line, before the customer approves the work.",
    wedges: [
      "Upload-your-estimate review that flags unnecessary or overpriced lines",
      "Fair-price benchmark by job, vehicle and ZIP code",
      "Fleet and small-business repair auditing"
    ],
    model: "Per-review consumer fee, subscription for fleets, or lead fees to vetted shops.",
    validate: [
      "Review 50 real estimates against labor guides and parts pricing",
      "Measure how often a second opinion changes the job",
      "Test $20–40 pricing for an estimate review"
    ],
    risks: [
      "Access to labor-time and parts data is licensed",
      "Shops may resist and consumers decide under time pressure"
    ]
  },
  65: {
    why: "Service advisors are frequently paid on ticket size, so a routine oil change becomes a menu of flushes and filters the owner's manual never required.",
    who: ["Owners servicing cars under warranty at dealerships", "Drivers unfamiliar with maintenance schedules", "Lease customers required to use dealer service"],
    evidence: [
      "Manufacturer maintenance schedules are published in every owner's manual, yet dealer service menus routinely exceed them.",
      "Service departments are a major profit center for dealerships relative to new-car sales.",
      "Consumer-protection actions have targeted unnecessary recommended services at national chains."
    ],
    players: [
      { name: "Owner's manual schedules", note: "Authoritative and free, but rarely consulted." },
      { name: "RepairPal / AAA-approved shops", note: "Vetted alternatives to the dealer." },
      { name: "Dealer service apps", note: "Built to sell, not to filter." }
    ],
    gap: "A simple answer to 'does my car actually need this right now?', based on the manufacturer schedule and real mileage.",
    wedges: [
      "Maintenance schedule assistant that filters a dealer quote against the manual",
      "Warranty-protection checker so owners know what they can decline safely",
      "Fleet maintenance policy enforcement"
    ],
    model: "Consumer subscription, or fleet and employer contracts.",
    validate: [
      "Compare 40 dealer service quotes to manufacturer schedules",
      "Measure the dollars declined after a check",
      "Interview former service advisors"
    ],
    risks: [
      "Owners worry about voiding warranties if they decline work",
      "Schedule data must be accurate per model and trim"
    ]
  },
  66: {
    why: "A used car is one of the largest purchases most people make with the least information: history reports miss unreported damage, and a real inspection requires finding a willing mechanic.",
    who: ["First-time used-car buyers", "Private-party buyers", "Buyers in regions hit by floods"],
    evidence: [
      "Vehicle history reports only capture incidents that were reported to insurers, police or shops, so cash repairs are invisible.",
      "Flooded vehicles from major storms are routinely resold across state lines, a pattern consumer agencies warn about after every hurricane season.",
      "Odometer fraud remains a persistent problem tracked by federal regulators."
    ],
    players: [
      { name: "Carfax / AutoCheck", note: "History reports limited to reported events." },
      { name: "Lemon Squad / mobile inspectors", note: "Pre-purchase inspections, availability varies." },
      { name: "Carvana / CarMax", note: "Return windows substitute for inspection." }
    ],
    gap: "Fast, trustworthy condition verification for private-party sales, where the savings are biggest and the risk is highest.",
    wedges: [
      "On-demand pre-purchase inspection booked from a listing",
      "Guided self-inspection with photo checks and paint-depth readings",
      "Escrow for private-party sales contingent on inspection"
    ],
    model: "Per-inspection fee; marketplace partnerships.",
    validate: [
      "Inspect 30 private-party cars and record undisclosed damage",
      "Measure willingness to pay $150–250 before purchase",
      "Partner with one local marketplace"
    ],
    risks: [
      "Inspector supply and quality control",
      "Liability if an inspection misses a defect"
    ]
  },
  67: {
    why: "EV high-voltage work requires training and equipment most independent shops don't have, so owners get routed to dealers and wait weeks for parts and appointments.",
    who: ["EV owners past the warranty period", "Rural EV owners far from dealers", "Used-EV buyers facing battery questions"],
    evidence: [
      "EV adoption has grown steadily, so a rising share of EVs is aging out of factory warranty.",
      "High-voltage service requires specific technician certification and equipment, which limits the independent repair network.",
      "Battery health is the dominant factor in used-EV value, and standardized reporting is still emerging."
    ],
    players: [
      { name: "Dealer service networks", note: "Certified but capacity-constrained and expensive." },
      { name: "Recurrent", note: "Battery health reports for used EVs." },
      { name: "Independent EV specialists", note: "Growing, but geographically sparse." }
    ],
    gap: "A trusted independent EV service layer: certified technicians, battery diagnostics and transparent pricing outside the dealer channel.",
    wedges: [
      "Certified independent EV repair network",
      "Battery health certification for used-EV transactions",
      "Mobile EV diagnostics and software-issue triage"
    ],
    model: "Service margin, franchise or certification fees, per-report fees for battery certification.",
    validate: [
      "Map certified EV repair capacity in 3 metros and measure wait times",
      "Survey out-of-warranty EV owners about their last repair",
      "Test demand for battery certification among used-EV buyers"
    ],
    risks: [
      "Technician training is slow and capital intensive",
      "Manufacturers restrict diagnostic access"
    ]
  },
  68: {
    why: "The advertised daily rate is roughly half the real one once concession recovery fees, facility charges, tolls, insurance and fuel options land at the counter.",
    who: ["Leisure travelers renting at airports", "Business travelers expensing rentals", "People renting while their car is repaired"],
    evidence: [
      "Airport rentals carry concession recovery fees and facility charges that off-airport locations often avoid.",
      "Counter upsells for insurance and prepaid fuel are a significant profit center for rental companies.",
      "Toll transponder programs commonly charge a daily convenience fee on top of the tolls themselves."
    ],
    players: [
      { name: "Kayak / AutoSlash", note: "Comparison and rate re-checking after booking." },
      { name: "Costco Travel", note: "Negotiated rates that usually include an additional driver." },
      { name: "Turo", note: "Peer-to-peer alternative with its own fee structure." }
    ],
    gap: "All-in rental pricing that models the fees, insurance and tolls you will actually face, including whether your card already covers damage.",
    wedges: [
      "True-total rental comparison including airport fees and tolls",
      "Coverage checker that tells you to decline counter insurance your card duplicates",
      "Automatic rate re-checking that rebooks when prices fall"
    ],
    model: "Affiliate commissions on bookings; premium tier for business travel.",
    validate: [
      "Book 30 rentals and compare quoted versus final totals",
      "Measure how often travelers buy duplicate coverage",
      "Test rate re-checking savings over a month"
    ],
    risks: [
      "Rental companies restrict rate data access",
      "Affiliate economics push toward volume, not honesty"
    ]
  },
  69: {
    why: "Damage claims arrive weeks after the return, for marks nobody documented at pickup, and the renter is disputing with a company that already holds their card.",
    who: ["Anyone renting without documenting the car", "Travelers who returned a car after hours", "Renters who declined the damage waiver"],
    evidence: [
      "Rental companies have faced consumer complaints and regulatory scrutiny over how damage is assessed and billed.",
      "Credit card rental coverage is often secondary and requires documentation most renters never collect.",
      "After-hours returns leave no counter inspection and no witness."
    ],
    players: [
      { name: "Credit card benefit administrators", note: "Will cover damage, but the claims process is paperwork-heavy." },
      { name: "Rental company apps", note: "Some offer photo check-in, inconsistently." },
      { name: "Consumer complaint channels", note: "Slow and case-by-case." }
    ],
    gap: "Timestamped condition evidence captured in two minutes, plus a dispute path when a bogus claim arrives.",
    wedges: [
      "Guided photo walkaround that stores dated evidence",
      "Damage-claim dispute generator citing your own documentation",
      "Credit-card claim filing assistant"
    ],
    model: "Freemium app with paid dispute support; corporate travel contracts.",
    validate: [
      "Collect 30 damage-claim stories and classify how they resolved",
      "Test whether documented renters win disputes more often",
      "Pitch a corporate travel manager on issuing it to staff"
    ],
    risks: [
      "Low purchase intent until someone has been burned",
      "Rental contracts are written in the company's favor"
    ]
  },
  70: {
    why: "Unbundling turned seats, bags and boarding into separate products, so comparing two fares now means modeling each airline's fee menu for your exact party.",
    who: ["Families who need to sit together", "Budget-carrier passengers", "Travelers comparing basic economy against standard fares"],
    evidence: [
      "Ancillary revenue from seats, bags and fees has become a major share of airline earnings.",
      "The US Department of Transportation has pressed airlines on family seating and fee disclosure.",
      "Basic economy often costs more than a standard fare once a bag and seat assignment are added."
    ],
    players: [
      { name: "Google Flights / Kayak", note: "Fare search with partial fee awareness." },
      { name: "Airline apps", note: "Sell the add-ons rather than compare them." },
      { name: "Corporate travel tools", note: "Model policy, less so family needs." }
    ],
    gap: "Fare comparison that prices your actual trip: two adults, a child, two bags, seats together.",
    wedges: [
      "Party-aware true-cost fare search",
      "Family seating planner that flags fares likely to split you up",
      "Fee-aware booking policy for small companies"
    ],
    model: "Affiliate booking commissions; SaaS for travel managers.",
    validate: [
      "Price 50 family trips on basic versus standard fares",
      "Measure how often basic economy ends up more expensive",
      "Test whether travelers switch when shown true totals"
    ],
    risks: [
      "Airline fare data licensing is restrictive",
      "Metasearch is dominated by large incumbents"
    ]
  },
  71: {
    why: "Mandatory resort and destination fees are added after the nightly rate is compared, so the cheapest-looking hotel frequently is not.",
    who: ["Leisure travelers in Las Vegas, Hawaii and major cities", "Points redeemers who still owe cash fees", "Business travelers reconciling expenses"],
    evidence: [
      "Resort fees are charged whether or not a guest uses the bundled amenities.",
      "State attorneys general have sued major hotel chains over how these fees were displayed.",
      "Federal and state rules have pushed toward all-in upfront price display."
    ],
    players: [
      { name: "ResortFeeChecker", note: "Crowdsourced fee lookup." },
      { name: "Booking sites", note: "Display varies; totals often appear late in the flow." },
      { name: "Hotel loyalty programs", note: "Sometimes waive fees on award stays." }
    ],
    gap: "Honest total-price hotel search including fees, parking and taxes, sorted by what you will actually pay.",
    wedges: [
      "All-in hotel comparison including parking and fees",
      "Fee-waiver finder for loyalty members and award stays",
      "Expense reconciliation for business travelers"
    ],
    model: "Affiliate commissions; corporate travel subscriptions.",
    validate: [
      "Compare advertised versus final totals for 50 hotels",
      "Test whether all-in sorting changes which hotel people book",
      "Interview corporate travel managers about fee surprises"
    ],
    risks: [
      "Regulation may solve the display problem directly",
      "Booking sites control inventory and data"
    ]
  },
  72: {
    why: "Travel insurance is bought in a hurry at checkout, and standard policies exclude many of the reasons trips actually fall apart.",
    who: ["Travelers booking expensive non-refundable trips", "Older travelers needing medical coverage abroad", "Families traveling during storm season"],
    evidence: [
      "Standard trip-cancellation policies pay only for listed covered reasons; broader cancel-for-any-reason coverage costs more and reimburses only part of the trip.",
      "Pre-existing condition waivers typically require buying coverage within a short window after the first trip deposit.",
      "Domestic health plans often provide little or no coverage outside the United States, which travelers discover too late."
    ],
    players: [
      { name: "Squaremouth / InsureMyTrip", note: "Comparison marketplaces for travel policies." },
      { name: "Allianz / Travel Guard", note: "Large underwriters sold at checkout." },
      { name: "Credit card trip protection", note: "Included on some cards, with its own limits." }
    ],
    gap: "Matching a policy to the real risks of this specific trip, and telling travelers when the card they already hold is enough.",
    wedges: [
      "Trip-specific coverage matcher that reads the itinerary",
      "Card-benefit checker so travelers do not double-buy",
      "Claim assistant that assembles the required documentation"
    ],
    model: "Commission on policies sold; fees for claim support.",
    validate: [
      "Analyze 30 denied travel claims and categorize why they failed",
      "Test how often existing card benefits would have sufficed",
      "Measure conversion when coverage is explained in plain language"
    ],
    risks: [
      "Insurance licensing requirements",
      "The checkout upsell owns the purchase moment"
    ]
  },
  73: {
    why: "When weather or a crew shortage cancels hundreds of flights at once, rebooking becomes a race won by whoever knows the rules and the right phone number.",
    who: ["Travelers stranded by cancellations", "Families with connections to miss", "Passengers owed refunds they never claim"],
    evidence: [
      "The December 2022 Southwest meltdown stranded hundreds of thousands of passengers and led to a record DOT penalty.",
      "DOT rules require refunds for cancelled flights, yet many travelers accept vouchers instead.",
      "US compensation rules for delays are far weaker than the EU's EC261 regime, and awareness is low."
    ],
    players: [
      { name: "AirHelp / Compensair", note: "Claim services focused mainly on EU-regulated flights." },
      { name: "Airline apps", note: "Offer self-rebooking, with limited options during mass disruptions." },
      { name: "Travel agents and corporate desks", note: "Effective, but unavailable to most travelers." }
    ],
    gap: "Automatic cross-carrier rebooking plus automatic refund and compensation claims for ordinary US travelers.",
    wedges: [
      "Disruption agent that rebooks and files refund claims automatically",
      "Rights explainer that states what you are owed right now",
      "Duty-of-care tool for companies with stranded employees"
    ],
    model: "Subscription, success fee on recovered money, or corporate contracts.",
    validate: [
      "Track 50 disrupted itineraries and measure unclaimed refunds",
      "Test rebooking speed against doing it by phone",
      "Survey travelers on what they accepted after a cancellation"
    ],
    risks: [
      "Airline systems are hard to integrate with",
      "US rules cap how much can be recovered"
    ]
  },
  74: {
    why: "Grocery bills rose sharply and stayed there, and shoppers cannot see which items drove it or where the same basket is cheaper this week.",
    who: ["Families on a fixed grocery budget", "SNAP households", "Anyone whose bill grew without their list changing"],
    evidence: [
      "Federal price data show food-at-home prices rose roughly a quarter in the few years after 2020 and did not revert.",
      "Unit-pricing rules vary by state and are displayed inconsistently, which makes comparison harder.",
      "Loyalty-card and digital-only prices mean the shelf tag is often not the price you pay."
    ],
    players: [
      { name: "Flipp", note: "Digital weekly circulars and deal search." },
      { name: "Instacart", note: "Shows several stores, with its own markups." },
      { name: "Basket", note: "Crowdsourced grocery price comparison." }
    ],
    gap: "Basket-level intelligence: track the items you actually buy over time and show where that exact basket costs less nearby.",
    wedges: [
      "Receipt-scanning basket tracker with store-to-store comparison",
      "Unit-price normalizer across package sizes and brands",
      "Swap suggestions that keep the meal but cut the bill"
    ],
    model: "Retail media and affiliate revenue, or a small subscription that keeps you on the shopper's side.",
    validate: [
      "Scan 100 receipts and quantify the spread across nearby stores",
      "Test whether swap suggestions get accepted",
      "Measure monthly savings for 20 households"
    ],
    risks: [
      "Collecting price data at scale is operationally hard",
      "Retailers restrict scraping of loyalty pricing"
    ]
  },
  75: {
    why: "Tablet checkout turned tipping into a default prompt on transactions that involved no service, with high preset percentages and a line of people watching.",
    who: ["Customers at counters, kiosks and self-checkout", "Workers who see little of what is prompted", "Small businesses that never chose the defaults"],
    evidence: [
      "Tip prompts spread to counter-service and retail transactions as payment tablets became standard.",
      "Consumer surveys since 2023 consistently report rising tipping fatigue and annoyance.",
      "Preset tip percentages on screens are often higher than historical norms."
    ],
    players: [
      { name: "Square / Toast / Clover", note: "Payment platforms whose defaults created the pattern." },
      { name: "Service-charge models", note: "Replace tipping, with their own transparency problems." },
      { name: "No-tipping restaurants", note: "Tried repeatedly, often reversed." }
    ],
    gap: "Nobody has redesigned the tipping moment so that it is honest for the customer and genuinely better for the worker.",
    wedges: [
      "Merchant tipping configuration matched to the service actually provided",
      "Transparent 'where your tip goes' disclosure at the terminal",
      "Higher-wage, no-tip pricing toolkit for small businesses"
    ],
    model: "POS add-on or merchant SaaS.",
    validate: [
      "A/B test tip prompts at 5 merchants and measure tips and satisfaction together",
      "Survey 100 customers on which prompts feel fair",
      "Interview workers about what they actually receive"
    ],
    risks: [
      "POS platforms control the checkout screen",
      "Merchants fear reducing tip revenue"
    ]
  },
  76: {
    why: "Package sizes shrink while prices hold, so a real price increase hides exactly where shelf tags and memory cannot catch it.",
    who: ["Regular grocery shoppers", "Budget-tracking households", "Shoppers comparing brands against store labels"],
    evidence: [
      "Shrinkflation has been documented across snacks, paper goods and household staples by consumer advocates and federal data analyses.",
      "Unit-price display requirements vary by state and the type is often small or inconsistent.",
      "Package changes are rarely announced, so shoppers notice the size and miss the per-unit increase."
    ],
    players: [
      { name: "Consumer World", note: "Long-running independent shrinkflation tracking." },
      { name: "Retailer apps", note: "Show current price, rarely package-size history." },
      { name: "Online communities", note: "Crowd documentation, not systematic coverage." }
    ],
    gap: "Automatic detection: tell me when something in my regular basket shrank, and show the real per-unit change.",
    wedges: [
      "Shrinkflation alerts tied to your own purchase history",
      "Unit-price normalizer built into the shopping list",
      "Brand-versus-store-label true cost comparison"
    ],
    model: "Subscription, or retail media with clear disclosure.",
    validate: [
      "Track package sizes for 200 staples over several months",
      "Test whether alerts change brand choices",
      "Measure what shoppers would pay for this"
    ],
    risks: [
      "Package size data is hard to collect reliably",
      "Brands may push back on the framing"
    ]
  },
  77: {
    why: "Weekly sales, loyalty prices and digital coupons live in apps that do not connect to meal planning, so saving money means cross-referencing by hand every week.",
    who: ["Families cooking most meals at home", "Budget-conscious shoppers", "People cooking for dietary needs on a budget"],
    evidence: [
      "Retailers increasingly gate their best prices behind loyalty accounts and digital coupon clipping.",
      "Meal-kit and recipe apps optimize for taste and convenience, not this week's local prices.",
      "Weekly circulars remain a major driver of where households choose to shop."
    ],
    players: [
      { name: "Flipp", note: "Aggregates circulars but does not plan meals." },
      { name: "Mealime / Paprika", note: "Meal planning without local price awareness." },
      { name: "Retailer apps", note: "Deals for a single chain only." }
    ],
    gap: "Meal plans built from what is actually discounted this week at the stores you already use.",
    wedges: [
      "Sale-aware weekly meal planner with an auto-built shopping list",
      "Budget-capped planning: feed four for a set weekly amount",
      "Coupon auto-clipping tied to the plan"
    ],
    model: "Subscription plus retail affiliate revenue.",
    validate: [
      "Build sale-aware plans for 20 families and measure real savings",
      "Test whether people actually cook what was planned",
      "Compare the result against their normal shop"
    ],
    risks: [
      "Circular and loyalty price data access",
      "Meal planning has notoriously high abandonment"
    ]
  },
  78: {
    why: "Mandatory service, kitchen and wellness charges now appear on checks with vague labels, and diners cannot tell whether the money reaches workers or the house.",
    who: ["Diners facing added charges", "Tipped and back-of-house staff", "Owners trying to raise wages fairly"],
    evidence: [
      "Service charges are legally distinct from tips, and in many states the business may keep them.",
      "Several cities and states have introduced disclosure requirements for mandatory restaurant fees.",
      "Restaurants adopted these charges partly to raise back-of-house pay under tip-pooling constraints."
    ],
    players: [
      { name: "Toast / Square", note: "Enable the fees; disclosure is left to the restaurant." },
      { name: "State labor regulators", note: "Set tip-pooling and service-charge rules." },
      { name: "Fair-wage restaurant groups", note: "Experimenting with transparent models." }
    ],
    gap: "A credible way for restaurants to show exactly where a service charge goes, and for diners to see it before they order.",
    wedges: [
      "Verified 'where the fee goes' disclosure badge",
      "All-in menu pricing toolkit for restaurants",
      "Compliance checker for state service-charge rules"
    ],
    model: "Restaurant SaaS or certification fees.",
    validate: [
      "Survey 100 diners on how they interpret service charges",
      "Test whether disclosure affects tipping and repeat visits",
      "Interview 10 owners about why they added the fee"
    ],
    risks: [
      "Many restaurants will not want this transparency",
      "Rules differ sharply by state"
    ]
  },
  79: {
    why: "Nutrition advice ignores price and price tools ignore nutrition, so eating well on a fixed budget becomes a weekly manual optimization problem.",
    who: ["SNAP and WIC households", "Families managing diabetes or hypertension on a budget", "Students and low-wage workers"],
    evidence: [
      "Federal nutrition guidance and food-assistance benefit levels are set separately from local price realities.",
      "Produce-prescription and food-as-medicine programs have expanded through health plans and Medicaid pilots.",
      "Diet quality in the US correlates strongly with income across nutrition research."
    ],
    players: [
      { name: "Propel", note: "Serves SNAP households with balance and savings tools." },
      { name: "Instacart Health", note: "Food-as-medicine initiatives with health plans." },
      { name: "WIC shopping apps", note: "Benefit-specific support, narrow scope." }
    ],
    gap: "Cost-per-nutrition planning anchored to real local prices and actual benefit balances.",
    wedges: [
      "Budget-and-nutrition meal planner for benefit households",
      "Produce-prescription fulfillment for health plans",
      "Clinic-referred grocery planning for chronic conditions"
    ],
    model: "Health-plan and Medicaid contracts, grocery partnerships, philanthropy.",
    validate: [
      "Build plans for 20 benefit households and track adherence and cost",
      "Pitch one Medicaid plan on a produce-prescription pilot",
      "Measure diet-quality change over 8 weeks"
    ],
    risks: [
      "Healthcare sales cycles are long",
      "In some areas food access, not planning, is the binding constraint"
    ]
  },
  80: {
    why: "A low headline price followed by mandatory fees at the final screen now spans tickets, travel, delivery, rentals and utilities, which breaks comparison shopping everywhere at once.",
    who: ["Anyone comparing prices online", "Event and travel buyers", "Households budgeting against advertised prices"],
    evidence: [
      "The FTC finalized a rule effective in 2025 requiring all-in upfront pricing for live events and short-term lodging.",
      "California's SB 478 banned most drip pricing statewide starting in July 2024.",
      "Research on drip pricing consistently finds it raises what people pay and degrades comparison."
    ],
    players: [
      { name: "SeatGeek / StubHub all-in toggles", note: "Optional all-in display on some platforms." },
      { name: "State attorneys general", note: "Enforcement is category by category." },
      { name: "Browser price extensions", note: "Focused on coupons, not true totals." }
    ],
    gap: "One cross-category true-price layer that shows final cost wherever you shop, instead of one rule per industry.",
    wedges: [
      "Browser extension that computes the real total before checkout",
      "True-price comparison API that merchants and comparison sites embed",
      "Compliance toolkit for merchants facing new all-in pricing laws"
    ],
    model: "Affiliate revenue, merchant compliance SaaS, or data licensing.",
    validate: [
      "Measure headline-to-final price gaps across 100 checkouts in 5 categories",
      "Test whether showing true totals changes what people buy",
      "Interview 5 merchants about complying with the new rules"
    ],
    risks: [
      "Regulation may close the gap before a business is built",
      "Merchants control their own checkout flows"
    ]
  },
  81: {
    why: "The fees you will actually pay sit in long disclosure documents nobody reads, so customers learn about charges only after incurring them.",
    who: ["Bank and brokerage customers", "Small businesses choosing payment processors", "Anyone comparing utility or telecom plans"],
    evidence: [
      "The CFPB has pushed banks to publish clearer fee information and targeted so-called junk fees.",
      "Overdraft, maintenance, wire, and paper-statement fees vary widely between institutions.",
      "Fee schedules are published as PDFs that are not machine readable or comparable across providers."
    ],
    players: [
      { name: "NerdWallet / Bankrate", note: "Editorial comparisons, partly lead-generation driven." },
      { name: "CFPB data tools", note: "Useful but not consumer-friendly." },
      { name: "Bank websites", note: "Disclose fees in PDFs by design." }
    ],
    gap: "Machine-readable fee comparison: parse every provider's schedule and show what it costs someone who behaves like you.",
    wedges: [
      "Fee-schedule parser that ranks providers by your actual usage pattern",
      "Small-business processor comparison on effective rate, not headline rate",
      "Fee-audit service that finds charges you can get refunded"
    ],
    model: "Referral fees with disclosure, or subscription for small businesses.",
    validate: [
      "Parse fee schedules from 50 institutions and test comparability",
      "Audit 30 people's statements for refundable fees",
      "Measure how much the average account pays annually"
    ],
    risks: [
      "Referral models bias recommendations",
      "Parsing inconsistent PDFs is ongoing work"
    ]
  },
  82: {
    why: "Terminating a contract triggers fees people agreed to but never saw again, usually at the worst moment: a move, a job change, a tight month.",
    who: ["People moving mid-lease or mid-contract", "Customers switching internet or mobile providers", "Gym and membership holders"],
    evidence: [
      "Early termination fees are standard in telecom, gym, lease and equipment agreements.",
      "Many providers will waive or prorate fees when asked, but customers rarely know to ask.",
      "Competitors frequently offer to buy out termination fees as a switching incentive."
    ],
    players: [
      { name: "Carrier switching promotions", note: "Buy out fees to win customers." },
      { name: "Lease-break marketplaces", note: "Help sublet, mostly in large cities." },
      { name: "Consumer advice sites", note: "Generic guidance, not personalized." }
    ],
    gap: "Nothing tracks the obligations a household has already signed, or surfaces them before a decision triggers a penalty.",
    wedges: [
      "Contract vault that tracks termination dates, notice periods and fees",
      "Move planner that sequences cancellations to minimize penalties",
      "Fee-waiver negotiation service"
    ],
    model: "Subscription, or success fee on waived charges.",
    validate: [
      "Collect 50 contracts and count avoidable fees",
      "Attempt waivers on 20 and measure the success rate",
      "Test demand at the moment of a move"
    ],
    risks: [
      "Requires users to upload contracts, which is friction",
      "Savings are episodic rather than recurring"
    ]
  },
  83: {
    why: "Providers reserve their best pricing for people who call and threaten to leave, which quietly taxes every customer who stays put.",
    who: ["Long-tenured internet and mobile customers", "Insurance renewers", "Anyone whose promotional rate expired"],
    evidence: [
      "Promotional pricing that expires after 12 or 24 months is standard practice in telecom and streaming.",
      "Retention departments exist specifically to offer discounts not advertised publicly.",
      "Bill-negotiation services built real businesses on calling providers on customers' behalf."
    ],
    players: [
      { name: "Rocket Money", note: "Bill negotiation for a share of savings." },
      { name: "BillFixers", note: "Negotiation service for consumers and businesses." },
      { name: "Provider retention desks", note: "The discount exists, but only if you ask." }
    ],
    gap: "Automated, repeatable renegotiation across every recurring provider, rather than a one-off call you forget to repeat.",
    wedges: [
      "Annual auto-renegotiation across all recurring bills",
      "Promo-expiry alerts that tell you exactly when to call and what to ask for",
      "Small-business version for telecom and utility accounts"
    ],
    model: "Share of savings, or flat subscription.",
    validate: [
      "Negotiate 50 real bills and record savings per hour of work",
      "Measure how much is recovered in year two versus year one",
      "Test flat fee versus savings share"
    ],
    risks: [
      "Providers increasingly resist third-party negotiation",
      "Savings shrink once everyone is doing it"
    ]
  },
  84: {
    why: "Surcharges, cash discounts and card minimums vary by merchant and by state, and the rules are widely misunderstood on both sides of the counter.",
    who: ["Shoppers at small businesses", "Small merchants setting payment policy", "Customers paying rent, tuition or taxes by card"],
    evidence: [
      "Card network rules cap surcharges and require disclosure, and some states regulate them further.",
      "Cash discounts and surcharges are legally distinct, which merchants frequently conflate.",
      "Processing costs are a significant expense for small merchants, driving the practice."
    ],
    players: [
      { name: "Card networks", note: "Set surcharge rules and disclosure requirements." },
      { name: "Payment processors", note: "Sell surcharging programs to merchants." },
      { name: "State regulators", note: "Rules vary and change." }
    ],
    gap: "Clarity on both sides: merchants that stay compliant, and customers who can predict final cost by payment method.",
    wedges: [
      "Compliance checker and signage generator for small merchants",
      "Payment-method cost predictor for large recurring payments",
      "Processing-cost audit that finds cheaper alternatives to surcharging"
    ],
    model: "Merchant SaaS and processing referral revenue.",
    validate: [
      "Audit surcharge practices at 50 local merchants for compliance",
      "Interview 15 owners about why they added a surcharge",
      "Test whether an audit leads to switching processors"
    ],
    risks: [
      "Rules differ by state and network and keep changing",
      "Processors are entrenched with merchants"
    ]
  },
  85: {
    why: "Emergency and specialty veterinary care consolidated under corporate ownership, prices climbed, and owners make four- and five-figure decisions in a waiting room with no estimates to compare.",
    who: ["Pet owners facing an emergency", "Owners of aging pets with chronic conditions", "Households without savings for a surprise bill"],
    evidence: [
      "Veterinary prices have risen faster than general inflation for several years, per federal price data.",
      "Large corporate groups, including Mars Veterinary Health, now own a significant share of specialty and emergency practices.",
      "Economic euthanasia, where cost drives the decision, is a widely discussed problem within the profession."
    ],
    players: [
      { name: "CareCredit / Scratchpay", note: "Financing at the point of care, not price transparency." },
      { name: "Vetster / Dutch", note: "Telehealth triage that can avoid some visits." },
      { name: "Nonprofit and community clinics", note: "Low-cost care with limited capacity." }
    ],
    gap: "Price transparency and triage before the emergency room: what this costs here versus there, and whether it is truly an emergency.",
    wedges: [
      "Emergency vet price transparency and cost estimates by procedure and metro",
      "24/7 triage line that routes cases to the right level of care",
      "Pet health savings product for predictable aging-pet costs"
    ],
    model: "Subscription, clinic referral fees, or employer pet-benefit contracts.",
    validate: [
      "Call 30 emergency clinics for quotes on the same procedures and map the spread",
      "Run a triage line and measure how many ER visits it avoids",
      "Survey owners about their last unexpected vet bill"
    ],
    risks: [
      "Clinics resist publishing prices",
      "Triage carries clinical liability"
    ]
  },
  86: {
    why: "Pre-existing condition definitions, breed exclusions and waiting periods strip coverage from exactly the claims most likely to happen, and buyers only find out at claim time.",
    who: ["New pet owners comparing policies", "Owners of breeds with known conditions", "People who bought coverage after symptoms appeared"],
    evidence: [
      "Pet insurance is reimbursement-based: owners pay the vet first and claim afterward.",
      "Pre-existing conditions are excluded across the industry, and the definition varies by insurer.",
      "Premiums typically rise as a pet ages, which is when claims become most likely."
    ],
    players: [
      { name: "Trupanion / Healthy Paws / Lemonade", note: "Major pet insurers with differing exclusion terms." },
      { name: "Pawlicy Advisor", note: "Comparison that accounts for breed-specific risk." },
      { name: "Wellness plans", note: "Sold by clinics; cover routine care, not emergencies." }
    ],
    gap: "Comparison based on what a policy will actually pay for your breed and age, including lifetime premium escalation.",
    wedges: [
      "Breed-and-age aware policy comparison with projected lifetime cost",
      "Claims-outcome database built from real reimbursements",
      "Direct-pay product that settles with the clinic instead of reimbursing"
    ],
    model: "Commission on policies, with transparent disclosure.",
    validate: [
      "Compare 20 policies on identical claim scenarios",
      "Collect 100 real claim outcomes and measure reimbursement rates",
      "Survey owners on whether coverage matched expectations"
    ],
    risks: [
      "Commission conflicts with honest comparison",
      "Insurance licensing requirements"
    ]
  },
  87: {
    why: "A veterinarian shortage met a pandemic pet boom, so routine appointments run weeks out and urgent cases get pushed into expensive emergency clinics.",
    who: ["Owners needing a same-week appointment", "New pet owners establishing care", "Rural pet owners with few local clinics"],
    evidence: [
      "Industry workforce studies have projected a sustained shortage of veterinarians and credentialed technicians.",
      "US pet ownership rose notably during the pandemic, increasing demand.",
      "Burnout and attrition among veterinary staff are well documented within the profession."
    ],
    players: [
      { name: "Vetster / Dutch", note: "Telehealth, limited by state VCPR rules." },
      { name: "Chewy Vet Care / Modern Animal", note: "New clinic models with better scheduling." },
      { name: "Clinic practice software", note: "Scheduling built for staff, not availability discovery." }
    ],
    gap: "Real-time availability across clinics plus triage that sends each case to the right level of care.",
    wedges: [
      "Cross-clinic availability and cancellation-fill alerts",
      "Triage-first routing between telehealth, urgent care and the ER",
      "Scheduling and efficiency tools that expand clinic capacity"
    ],
    model: "Clinic SaaS and booking fees; consumer subscription for triage.",
    validate: [
      "Survey wait times at 40 clinics in two metros",
      "Pilot cancellation alerts with 3 clinics",
      "Measure how many triaged cases avoid the ER"
    ],
    risks: [
      "Supply of veterinarians is the real constraint",
      "Telehealth rules vary by state"
    ]
  },
  88: {
    why: "The same prescription can cost very differently at the clinic, an online pet pharmacy, or a human pharmacy stocking the identical drug, and owners rarely know they can shop it.",
    who: ["Owners of pets on long-term medication", "Owners of large dogs with weight-based dosing", "Households managing several pets"],
    evidence: [
      "Many veterinary drugs are the same molecules used in human medicine and are available at retail pharmacies.",
      "Federal and state rules generally entitle owners to a written prescription they can fill elsewhere.",
      "Online pet pharmacies compete aggressively on price for chronic medications."
    ],
    players: [
      { name: "Chewy Pharmacy", note: "Online fulfillment with autoship pricing." },
      { name: "GoodRx", note: "Discounts that can apply to some pet prescriptions at human pharmacies." },
      { name: "Clinic dispensaries", note: "Convenient, usually the most expensive option." }
    ],
    gap: "Telling owners, at the moment of prescribing, where this exact drug is cheapest and how to get the written prescription.",
    wedges: [
      "Pet prescription price comparison across vet, online and retail pharmacies",
      "Written-prescription request assistant",
      "Chronic-medication autoship optimizer for multi-pet households"
    ],
    model: "Pharmacy referral fees or a small subscription.",
    validate: [
      "Price the 20 most common pet medications across all three channels",
      "Test how often owners successfully obtain a written prescription",
      "Measure annual savings for chronic-medication households"
    ],
    risks: [
      "Clinics lose dispensary revenue and may resist",
      "Prescription transfer rules vary by state"
    ]
  },
  89: {
    why: "Immigration status governs housing, jobs and travel, yet tracking a case means refreshing government pages and reading forum posts for signals.",
    who: ["Visa holders and green card applicants", "Employers sponsoring workers", "Families waiting on relative petitions"],
    evidence: [
      "USCIS publishes case status and processing-time estimates, but they are broad and change without notice.",
      "Visa Bulletin priority dates move unpredictably month to month, and can retrogress.",
      "Applicants widely rely on community forums and trackers to interpret their own timelines."
    ],
    players: [
      { name: "USCIS online account", note: "Official status, minimal interpretation." },
      { name: "Boundless / Legalpad", note: "Application preparation and sponsorship services." },
      { name: "Community trackers", note: "Crowdsourced timelines with no guarantees." }
    ],
    gap: "Predictive, personalized timelines with alerts, so people can make real decisions about jobs, leases and travel.",
    wedges: [
      "Case tracker with predicted timelines and priority-date alerts",
      "Employer dashboard for sponsored employees' statuses and deadlines",
      "Decision assistant for travel and job changes under a pending case"
    ],
    model: "Consumer subscription plus employer SaaS.",
    validate: [
      "Model historical processing data and test prediction accuracy",
      "Interview 20 applicants about decisions they delayed",
      "Pitch 5 employers who sponsor visas"
    ],
    risks: [
      "Policy changes can invalidate predictions overnight",
      "Unauthorized practice of immigration law is a real constraint"
    ]
  },
  90: {
    why: "Foreign-trained doctors, nurses, engineers and teachers face state-by-state credential evaluation, exams and supervised practice that can take years, while shortages persist in those same fields.",
    who: ["Internationally trained healthcare professionals", "Engineers and architects seeking licensure", "Refugees and immigrant professionals"],
    evidence: [
      "Research has repeatedly documented significant numbers of college-educated immigrants working below their skill level, often called brain waste.",
      "Several states have created alternative licensure pathways for internationally trained physicians in recent years.",
      "Credential evaluation, exams and supervised practice requirements vary by state and profession."
    ],
    players: [
      { name: "WES / ECE", note: "Credential evaluation services." },
      { name: "Upwardly Global", note: "Nonprofit helping immigrant professionals re-enter their fields." },
      { name: "State licensing boards", note: "Rules vary widely by state and profession." }
    ],
    gap: "A navigator that maps the exact fastest path to licensure for a given credential, profession and state, and assembles the evidence.",
    wedges: [
      "Licensure pathfinder by profession, country of training and state",
      "Employer tool for recruiting internationally trained staff into shortage roles",
      "Document and evidence assembly for board applications"
    ],
    model: "Employer and health-system contracts; philanthropy; modest consumer fees.",
    validate: [
      "Map licensure requirements for 3 professions across 10 states",
      "Guide 10 professionals through the first steps and measure time saved",
      "Interview rural hospitals about hiring shortages"
    ],
    risks: [
      "Requirements are set by boards and change slowly",
      "Long timelines make outcomes hard to attribute"
    ]
  },
  91: {
    why: "A move means re-registering a car, transferring a license, updating voter registration, insurance, banks, benefits and subscriptions, each on its own portal with its own deadline.",
    who: ["People relocating across state lines", "Military families with frequent moves", "New arrivals to the US setting up everything at once"],
    evidence: [
      "Millions of Americans move between states each year, according to Census data.",
      "States set their own deadlines for vehicle registration and license transfer, often 30 to 90 days, with penalties for missing them.",
      "USPS mail forwarding redirects mail but does not update any account of record."
    ],
    players: [
      { name: "USPS change of address", note: "Forwards mail only." },
      { name: "Updater", note: "Moving-related updates, distributed through real estate and property managers." },
      { name: "State DMV portals", note: "One state, one task at a time." }
    ],
    gap: "A sequenced, deadline-aware checklist that knows your origin and destination states and actually completes the updates.",
    wedges: [
      "State-to-state move checklist with legal deadlines and penalties",
      "Account-update assistant for banks, insurers and subscriptions",
      "Employer relocation benefit for new hires moving states"
    ],
    model: "Employer relocation contracts; partnerships with movers and property managers.",
    validate: [
      "Map required updates and deadlines for 10 state pairs",
      "Run the checklist with 20 movers and count missed items",
      "Pitch 3 employers that relocate staff"
    ],
    risks: [
      "Low frequency: people move rarely",
      "Many updates cannot be fully automated"
    ]
  },
  92: {
    why: "The first year in a new country is a dense run of irreversible decisions \u2014 which visa path, which employer, which lease, which credit card \u2014 and the person best placed to advise is someone from the same country, in the same city, who did it two years ago. Finding that person is pure luck.",
    who: [
      "International students and first-year work-visa holders",
      "Families relocating where a spouse must rebuild a career from zero",
      "Arrivals from smaller communities with no established local network"
    ],
    evidence: [
      "The US foreign-born population is roughly 47 million people, per Census Bureau estimates, and hundreds of thousands arrive on student and work visas each year.",
      "Newcomers lean on ad-hoc WhatsApp groups, Facebook groups and Reddit threads where advice is anonymous, unverifiable and often out of date.",
      "USCIS runs a standing public campaign warning immigrants about unauthorized practitioners, the long-documented notario problem, because bad advice in this space is both common and costly."
    ],
    players: [
      { name: "Facebook and WhatsApp community groups", note: "Enormous reach and real generosity, but zero verification: advice quality is a lottery." },
      { name: "Reddit (r/immigration, r/USCIS)", note: "Useful and candid, yet anonymous and national \u2014 no matching by city or stage." },
      { name: "InterNations / Meetup", note: "Expat socializing rather than guidance matched to your visa, city and situation." }
    ],
    gap: "Verified matching on the three things that actually matter \u2014 same origin, same city, one or two steps ahead \u2014 plus a way to tell a good-faith veteran from someone selling immigration services.",
    wedges: [
      "Mentor matching on origin country, city and visa stage, with light verification via school or employer email",
      "Stage-based playbooks (first 90 days, first lease, first car, first tax return) written by people who just did it",
      "Employer and university buddy programs for relocating hires and incoming international students"
    ],
    model: "Employer and university contracts for onboarding international hires and students, plus sponsorship from the banks, telecoms and insurers that compete hard for new-arrival customers. Charging newcomers directly is the wrong move: they have the least cash and the most at stake.",
    validate: [
      "Hand-match 25 new arrivals to someone from their country in their city and measure how many lead to a second conversation",
      "Ask 50 people who arrived in the last two years what they got wrong and who could have warned them",
      "Pitch 3 employers or university international offices on a paid buddy program"
    ],
    risks: [
      "Community products monetize poorly, and the people who need this most can pay least",
      "Trust and safety is the whole product: bad immigration advice carries real consequences, and this format attracts exactly the predators USCIS warns about",
      "Cold start is per city and per origin country, so the network has to be rebuilt in every pocket"
    ]
  }
};

/* Expose for app.js (loaded via <script>, works offline). */
window.FMI_RESEARCH = RESEARCH;
