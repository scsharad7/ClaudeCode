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
| `data.js`    | The problem dataset (92 problems) + the 21 categories + `computeItch`. |
| `research.js`| Deep-dive research for every itch, keyed by problem `id`.          |
| `config.js`  | Supabase keys for community submissions (blank = not connected).  |
| `app.js`     | Filtering, sorting, search, rendering, the itch detail view, and the share form. |
| `README.md`  | This file.                                                        |

## Connecting submissions (Supabase)

Out of the box the "Share your itch" form is **not connected**: it says so
plainly and nothing is sent. To make submissions persist and show up for
every visitor, point it at a free Supabase project.

**1. Create the project.** At [supabase.com](https://supabase.com), create a
project (free tier is fine).

**2. Create the table and its security rules.** Open the SQL Editor and run:

```sql
create table public.itches (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title      text not null check (char_length(title) between 10 and 300),
  category   text not null check (char_length(category) between 2 and 60),
  submitter  text check (char_length(submitter) <= 60)
);

alter table public.itches enable row level security;

-- Anyone may read submissions.
create policy "anyone can read" on public.itches
  for select to anon using (true);

-- Anyone may add one. No update or delete policy exists, so visitors
-- cannot edit or remove anything — including their own submission.
create policy "anyone can submit" on public.itches
  for insert to anon with check (true);
```

**3. Paste your keys into `config.js`:**

```js
window.FMI_CONFIG = {
  SUPABASE_URL: "https://YOUR-PROJECT.supabase.co",
  SUPABASE_ANON_KEY: "YOUR-ANON-PUBLIC-KEY",
  TABLE: "itches"
};
```

Both values come from **Project Settings → API Keys**, and both are
**public by design** — the anon key is meant to ship in client code, and the
policies above are what limit it. **Never put the `service_role` key here:**
it bypasses every policy and this file is served to every visitor.

### Moderating

Submissions appear immediately, so anyone with the link can post. To remove
something, delete the row in the Supabase Table Editor. To stop submissions
entirely, drop the insert policy:

```sql
drop policy "anyone can submit" on public.itches;
```

There is no rate limiting: if the link spreads and gets abused, drop that
policy, clean up, and consider adding a captcha or moving to moderated
submissions.

### Promoting a submission into the curated database

Community itches are deliberately kept separate from the 92 curated ones and
carry **no Itch Score**, because a score means research was done. To promote
one, add a record to `data.js` and a matching research entry to `research.js`,
then delete the Supabase row.

## Research entries

`research.js` holds one entry per problem `id` with these fields: `why`,
`who`, `evidence`, `players` (`{ name, note }`), `gap`, `wedges`, `model`,
`validate`, and `risks`. To add an itch, add a record to `data.js` and a
matching entry to `research.js`. Itches without research (including
community submissions) show a do-it-yourself research plan instead.

The research is illustrative desk research to give founders a head start.
Figures are approximate and should be verified before relying on them.

## The data & the Itch Index model

The dataset holds **92 US problem statements** across **21 industry
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
- **Community itches** — when Supabase is configured (see below), submissions
  are saved and shown to every visitor in their own section, clearly marked as
  unscored and unresearched. Without it the form says plainly that nothing was
  sent.
- **Share your itch** — a simple form; on submit it confirms and
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
