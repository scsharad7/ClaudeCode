"""Job ingestion from public sources.

Supported sources (all opt-in via config/preferences.yaml):
  - Greenhouse public board API   (boards-api.greenhouse.io)
  - Lever public postings API     (api.lever.co)
  - Any RSS/Atom job feed
  - A local jobs.json file (manual paste — always works, no network)

Deliberately NOT included: LinkedIn scraping. LinkedIn has no public
jobs API and scraping violates its User Agreement. Paste interesting
LinkedIn postings into jobs.json instead, or wire in a licensed
provider (e.g. an Apify actor) behind the same Job dataclass.
"""

from __future__ import annotations

import html
import json
import re
from dataclasses import dataclass, field
from pathlib import Path

import requests

USER_AGENT = "job-agent/0.1 (personal job search assistant)"


@dataclass
class Job:
    title: str
    company: str
    location: str
    url: str
    description: str
    source: str
    extra: dict = field(default_factory=dict)

    def key(self) -> str:
        return f"{self.company.lower()}::{self.title.lower()}::{self.url}"


def _strip_html(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text or "")
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


def fetch_greenhouse(board: str) -> list[Job]:
    url = f"https://boards-api.greenhouse.io/v1/boards/{board}/jobs?content=true"
    resp = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=30)
    resp.raise_for_status()
    jobs = []
    for j in resp.json().get("jobs", []):
        jobs.append(Job(
            title=j.get("title", ""),
            company=board,
            location=(j.get("location") or {}).get("name", ""),
            url=j.get("absolute_url", ""),
            description=_strip_html(j.get("content", ""))[:8000],
            source="greenhouse",
        ))
    return jobs


def fetch_lever(company: str) -> list[Job]:
    url = f"https://api.lever.co/v0/postings/{company}?mode=json"
    resp = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=30)
    resp.raise_for_status()
    jobs = []
    for j in resp.json():
        jobs.append(Job(
            title=j.get("text", ""),
            company=company,
            location=(j.get("categories") or {}).get("location", ""),
            url=j.get("hostedUrl", ""),
            description=_strip_html(j.get("descriptionPlain") or j.get("description", ""))[:8000],
            source="lever",
        ))
    return jobs


def fetch_rss(feed_url: str) -> list[Job]:
    import feedparser  # optional dep — only needed when rss_feeds is configured

    parsed = feedparser.parse(feed_url)
    jobs = []
    for entry in parsed.entries:
        jobs.append(Job(
            title=entry.get("title", ""),
            company=parsed.feed.get("title", feed_url),
            location="",
            url=entry.get("link", ""),
            description=_strip_html(entry.get("summary", ""))[:8000],
            source="rss",
        ))
    return jobs


def load_local(path: str | Path) -> list[Job]:
    """Load jobs from a hand-maintained JSON file.

    Format: [{"title": ..., "company": ..., "location": ...,
              "url": ..., "description": ...}, ...]
    """
    path = Path(path)
    if not path.exists():
        return []
    data = json.loads(path.read_text(encoding="utf-8"))
    return [Job(source="local", **{k: j.get(k, "") for k in
                ("title", "company", "location", "url", "description")})
            for j in data]


def title_prefilter(jobs: list[Job], target_titles: list[str]) -> list[Job]:
    """Cheap keyword prefilter so Claude only scores plausible matches."""
    if not target_titles:
        return jobs
    keywords = {w.lower() for t in target_titles for w in t.split()}
    keywords -= {"of", "the", "and"}
    return [j for j in jobs if any(k in j.title.lower() for k in keywords)]


def ingest_all(prefs: dict, local_jobs_path: str | Path = "jobs.json") -> list[Job]:
    sources = prefs.get("sources", {}) or {}
    jobs: list[Job] = []
    for board in sources.get("greenhouse_boards") or []:
        try:
            jobs.extend(fetch_greenhouse(board))
        except Exception as e:  # noqa: BLE001 — one bad source shouldn't kill the run
            print(f"[ingest] greenhouse:{board} failed: {e}")
    for company in sources.get("lever_companies") or []:
        try:
            jobs.extend(fetch_lever(company))
        except Exception as e:  # noqa: BLE001
            print(f"[ingest] lever:{company} failed: {e}")
    for feed in sources.get("rss_feeds") or []:
        try:
            jobs.extend(fetch_rss(feed))
        except Exception as e:  # noqa: BLE001
            print(f"[ingest] rss:{feed} failed: {e}")
    jobs.extend(load_local(local_jobs_path))

    # de-dupe, prefilter, cap
    seen: set[str] = set()
    unique = []
    for j in jobs:
        if j.key() not in seen:
            seen.add(j.key())
            unique.append(j)
    filtered = title_prefilter(unique, prefs.get("target_titles", []))
    return filtered[: prefs.get("max_jobs_per_run", 25)]
