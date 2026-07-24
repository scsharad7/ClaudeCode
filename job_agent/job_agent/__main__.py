"""Run the full pipeline: python -m job_agent [path/to/jobs.json]"""

from __future__ import annotations

import sys

import yaml

from .claude_client import build_client, build_system
from .digest import render_digest, write_digest
from .draft import draft_materials
from .ingest import ingest_all
from .profile import load_preferences, load_profile, render_profile_block
from .score import score_job


def main() -> int:
    local_jobs = sys.argv[1] if len(sys.argv) > 1 else "jobs.json"

    profile = load_profile()
    prefs = load_preferences()
    profile_block = render_profile_block(profile)
    # Deterministic serialization — sort_keys keeps the cache prefix stable.
    prefs_block = "JOB SEARCH PREFERENCES\n" + yaml.dump(
        {k: prefs[k] for k in ("target_titles", "target_domains", "locations")
         if k in prefs},
        sort_keys=True,
    )

    jobs = ingest_all(prefs, local_jobs)
    if not jobs:
        print("No jobs ingested. Add sources to config/preferences.yaml "
              f"or create {local_jobs} (see job_agent/ingest.py for format).")
        return 1
    print(f"Ingested {len(jobs)} job(s). Scoring...")

    client = build_client()
    system = build_system(profile_block, prefs_block)
    min_score = prefs.get("min_fit_score", 70)

    results = []
    for i, job in enumerate(jobs, 1):
        score = score_job(client, system, job)
        cache = score.pop("_usage")
        print(f"  [{i}/{len(jobs)}] {job.title} @ {job.company}: "
              f"{score['fit_score']}/100 ({score['verdict']}) "
              f"[cache read {cache['cache_read']}t]")
        if score["fit_score"] >= min_score:
            draft = draft_materials(client, system, job, score)
        else:
            draft = None
        results.append((job, score, draft or _empty_draft()))

    digest = render_digest(results, min_score)
    path = write_digest(digest)
    print(f"\nDigest written to {path}")
    return 0


def _empty_draft() -> dict:
    return {
        "tailored_summary": "", "tailored_bullets": [],
        "connection_note": "", "followup_message": "", "keywords_covered": [],
    }


if __name__ == "__main__":
    raise SystemExit(main())
