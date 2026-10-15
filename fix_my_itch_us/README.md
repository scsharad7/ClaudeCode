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
| `styles.css` | All styling and the light/dark design tokens, fully responsive.    |
| `data.js`    | The problem dataset (91 problems) + the 21 categories + `computeItch`. |
| `research.js`| Deep-dive research for every itch, keyed by problem `id`.          |
| `app.js`     | Filtering, sorting, search, rendering, the itch detail view, and the share form. |
| `README.md`  | This file.                                                        |

## Research entries

`research.js` holds one entry per problem `id` with these fields: `why`,
`who`, `evidence`, `players` (`{ name, note }`), `gap`, `wedges`, `model`,
`validate`, and `risks`. To add an itch, add a record to `data.js` and a
matching entry to `research.js`. Itches without research (including
community submissions) show a do-it-yourself research plan instead.

The research is illustrative desk research to give founders a head start.
Figures are approximate and should be verified before relying on them.

## The data & the Itch Index model

The dataset holds **91 US problem statements** across **21 industry
categories** (Fintech & Payments, Healthcare & Insurance, Housing & Real Estate,
Logistics & Delivery, Education & Student Debt, Gig & Freelance Work, Retail &
Commerce, Food & Restaurants, Travel & Mobility, Family & Childcare, Government &
Bureaucracy, Climate & Energy, SMB Operations, Legal & Compliance, Media &
Subscriptions, Personal Finance, Insurance & Claims, Auto & Repair, Fees & Junk
Pricing, Pets & Veterinary, Immigration & Relocation).

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
  (40,000+ problems · 100,000+ Americans · 21 industries).
- **How it works** — Listen everywhere → Score with the Itch Index → Surface
  build-worthy problems → Founders build.
- **The Itch Index explainer** — the four dimensions and the composite formula.
- **Problem database** — responsive card grid with a live client-side
  **category filter**, **sort** (Itch Score / Severity / TAM / Frequency),
  **keyword search**, and a live **count**.
- **Itch detail view** — click any card to open its research in three tabs:
  - *Overview*: why it itches, who feels it, signals the pain is real
  - *Market & gap*: who's working on it, the gap they leave, what could kill it
  - *Build plan*: startup wedges, business model, a "test it this week"
    checklist, and private notes

  Each itch has its own shareable link (`#itch/<id>`). Prev/next buttons and
  ←/→ keys step through the current filtered list, related itches link
  across, and Esc or the browser back button closes it.
- **Personal shortlist** — save itches, tick off validation steps, and keep
  notes. All of it is stored in the browser (`localStorage`) and never uploaded;
  the "My shortlist" toggle filters the grid to saved itches.
- **Share your itch** — a simple, backend-free form; on submit it confirms and
  prepends the new itch to the top of the database.
- **Dark theme by default**, with a toggle in the header for light mode. The
  choice is remembered per browser and applied before first paint, so the page
  never flashes. Every color is a token defined for both themes in
  `styles.css` (`:root` = dark, `:root[data-theme="light"]` = light), so no
  element can end up with one theme's text on the other theme's background.
- **Responsive & accessible** — works down to ~375px, semantic HTML, labeled
  controls, keyboard-usable filters, respects reduced-motion. Text contrast
  meets WCAG AA in both themes (verified across ~1,200 text nodes).

## Disclaimer

This is an independent, US-localized **demo / homage** built for illustration.
It is **not affiliated with, endorsed by, or connected to Razorpay**. All
problems, scores, and market figures shown are illustrative.
