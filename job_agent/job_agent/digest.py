"""Render the daily digest — the human-approval surface.

Everything the agent produced lands here as copy-paste-ready markdown.
YOU review, edit, and send. The agent never submits anything.
"""

from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from .ingest import Job


def render_digest(results: list[tuple[Job, dict, dict]], min_score: int) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    kept = [(j, s, d) for j, s, d in results if s["fit_score"] >= min_score]
    kept.sort(key=lambda x: -x[1]["fit_score"])
    skipped = len(results) - len(kept)

    lines = [
        f"# Job Digest — {now}",
        "",
        f"**{len(kept)} matches** (min score {min_score}); {skipped} below threshold.",
        "",
        "> Review each item, edit to taste, then send manually. "
        "Connection notes go in LinkedIn's 'Add a note' box (300-char limit).",
        "",
    ]
    for job, score, draft in kept:
        lines += [
            "---",
            f"## {score['fit_score']}/100 · {job.title} — {job.company}",
            f"**Verdict:** {score['verdict']}  ·  **Location:** {job.location or 'n/a'}",
            f"**Link:** {job.url}",
            "",
            f"**Angle:** {score['angle']}",
            "",
            "**Strengths:** " + "; ".join(score["matching_strengths"]),
            "**Gaps:** " + ("; ".join(score["gaps"]) or "none identified"),
            "",
            "### Connection note (copy-paste, check <300 chars)",
            "```",
            draft["connection_note"],
            "```",
        ]
        if draft.get("connection_note_warning"):
            lines.append(f"⚠️ {draft['connection_note_warning']}")
        lines += [
            "",
            "### Follow-up message (after they accept)",
            "```",
            draft["followup_message"],
            "```",
            "",
            "### Tailored resume summary",
            draft["tailored_summary"],
            "",
            "### Tailored bullets",
        ]
        lines += [f"- {b}" for b in draft["tailored_bullets"]]
        lines += [
            "",
            "**Keywords covered:** " + ", ".join(draft["keywords_covered"]),
            "",
        ]
    return "\n".join(lines)


def write_digest(content: str, out_dir: str | Path = "output") -> Path:
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M")
    path = out / f"digest-{stamp}.md"
    path.write_text(content, encoding="utf-8")
    return path
