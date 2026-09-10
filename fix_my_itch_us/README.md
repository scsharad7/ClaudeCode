# Fix My Itch — USA edition

A polished, self-contained static microsite: a **US-localized homage to
[Razorpay's "Fix My Itch"](https://razorpay.com/m/fix-my-itch)**.

The original is an AI-powered public database of 10,000+ real everyday problems
faced by Indians, curated for founders. This project rebuilds that idea for the
United States: real, everyday problems faced by **Americans** — healthcare and
insurance bills, student loans, the gig economy, housing, the DMV, childcare,
subscriptions, HOAs, taxes, and more — scored and made browsable for **US
founders** looking for something worth building.

> America is full of problems worth solving. Now they're all in one place.

## How to open it

No build step, no server, no dependencies, no network required.

**Just open `index.html` in any modern browser** (double-click it, or drag it
into a browser tab). Everything runs client-side and works fully offline.

## What's inside

| File         | Purpose                                                           |
|--------------|-------------------------------------------------------------------|
| `index.html` | Page structure: hero, how-it-works, Itch Index, database, share, footer. |
| `styles.css` | All styling — premium startup aesthetic, fully responsive.        |
| `data.js`    | The problem dataset (56 problems) + the 16 categories + `computeItch`. |
| `app.js`     | Client-side filtering, sorting, search, rendering, and the share form. |
| `README.md`  | This file.                                                        |

## The data & the Itch Index model

The dataset holds **56 US problem statements** across **16 industry
categories** (Fintech & Payments, Healthcare & Insurance, Housing & Real Estate,
Logistics & Delivery, Education & Student Debt, Gig & Freelance Work, Retail &
Commerce, Food & Restaurants, Travel & Mobility, Family & Childcare, Government &
Bureaucracy, Climate & Energy, SMB Operations, Legal & Compliance, Media &
Subscriptions, Personal Finance).

Each record has:

- `id`
- `title` — the problem phrased as a question
- `description` — 2–3 sentences of US market context
- `category`
- four sub-scores: `severity` (4–10), `frequency` (2–10), `whitespace` (4–9),
  `tam` (6–10)
- `itch` — the computed composite **Itch Score** (~55–100)

### The Itch Index

Each problem is scored on four dimensions and blended into one number:

```
Itch Score = Severity ×30% + Frequency ×25% + Whitespace ×20% + TAM ×25%
```

The weighted average (roughly 4–10) is then mapped onto a **55–100** range so
every problem in the database reads as genuinely build-worthy. Score badges are
color-coded by tier:

- **90+** — Scorching (red)
- **80–89** — Hot (orange)
- **70–79** — Worth it (green)
- **< 70** — Simmering (muted)

## Features

- **Hero** with US-localized messaging and headline stats
  (40,000+ problems · 100,000+ Americans · 16 industries).
- **How it works** — Listen everywhere → Score with the Itch Index → Surface
  build-worthy problems → Founders build.
- **The Itch Index explainer** — the four dimensions and the composite formula.
- **Problem database** — responsive card grid with a live client-side
  **category filter**, **sort** (Itch Score / Severity / TAM / Frequency),
  **keyword search**, and a live **count**.
- **Share your itch** — a simple, backend-free form; on submit it confirms and
  prepends the new itch to the top of the database.
- **Responsive & accessible** — works down to ~375px, semantic HTML, labeled
  controls, keyboard-usable filters, respects reduced-motion.

## Disclaimer

This is an independent, US-localized **demo / homage** built for illustration.
It is **not affiliated with, endorsed by, or connected to Razorpay**. All
problems, scores, and market figures shown are illustrative.
