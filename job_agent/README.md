# Job Application Agent (human-in-the-loop)

Automates the *intelligence* of a job search — finding, scoring, and
drafting — while keeping a human on the trigger for anything outward-facing.
Inspired by the "I applied to 0 jobs, AI applied to 50" workflow, minus the
parts that violate platform terms of service.

```
ingest jobs ──> score fit vs profile ──> draft resume + outreach ──> daily digest
 (Greenhouse,      (Claude, structured       (Claude, grounded         (markdown you
  Lever, RSS,       outputs, 0-100 +          in profile.yaml,          review, edit,
  jobs.json)        strengths/gaps)           <290-char notes)          and send)
```

## What it deliberately does NOT do

- **No LinkedIn automation.** LinkedIn has no public API for connection
  requests or messaging, and automating them violates its User Agreement
  and risks your account. The agent drafts the notes; you paste and click.
- **No auto-submitting applications.** Every artifact lands in a digest
  for your review first.

## Setup

```bash
cd job_agent
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-ant-...   # or `ant auth login`
```

1. Edit `config/profile.yaml` — fill the `[FILL: ...]` placeholders.
   This file is the ground truth for all tailoring; the model is
   instructed to never invent facts beyond it.
2. Edit `config/preferences.yaml` — target titles, domains, sources,
   and `min_fit_score`.
3. Add job sources: Greenhouse board tokens, Lever company slugs, RSS
   feeds — or just paste postings into `jobs.json`:

```json
[{"title": "Product Management Director", "company": "AMD",
  "location": "Santa Clara, CA", "url": "https://careers.amd.com/...",
  "description": "paste the full job description here"}]
```

## Run

```bash
python -m job_agent            # uses ./jobs.json + configured sources
python -m job_agent my.json    # alternate local jobs file
```

Output: `output/digest-<timestamp>.md` with, per matching job:
fit score, verdict, strengths/gaps, positioning angle, a tailored resume
summary + bullets, a <290-char LinkedIn connection note, and a longer
follow-up message.

## Scheduling

Run it every morning (the article's 7am cron):

```cron
0 7 * * * cd /path/to/job_agent && python -m job_agent >> agent.log 2>&1
```

## Cost notes

- The profile + preferences are prompt-cached (1h TTL, one breakpoint):
  the first call of a run writes the cache, every later call reads it at
  ~0.1x input price. The per-run log prints `cache read` tokens so you
  can verify hits.
- Scoring runs at `effort: medium`; drafting at `effort: high` and only
  for jobs above `min_fit_score`.
