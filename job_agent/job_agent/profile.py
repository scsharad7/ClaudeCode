"""Load the candidate profile and render it as a stable text block.

The rendered block is placed in the system prompt with cache_control so
every scoring/drafting call in a run reads it from the prompt cache.
Rendering is deterministic (sorted, no timestamps) — see
shared prompt-caching guidance: any byte change invalidates the prefix.
"""

from __future__ import annotations

from pathlib import Path

import yaml

CONFIG_DIR = Path(__file__).resolve().parent.parent / "config"


def load_yaml(name: str) -> dict:
    with open(CONFIG_DIR / name, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def load_profile() -> dict:
    return load_yaml("profile.yaml")


def load_preferences() -> dict:
    return load_yaml("preferences.yaml")


def render_profile_block(profile: dict) -> str:
    """Render the profile as deterministic plain text for the system prompt."""
    lines: list[str] = [
        f"CANDIDATE PROFILE: {profile['name']}",
        f"Headline: {profile['headline']}",
        f"Contact: {profile['email']} | {profile['linkedin']}",
        "",
        "SUMMARY",
        profile["summary"].strip(),
        "",
        "EXPERIENCE",
    ]
    for role in profile.get("experience", []):
        lines.append(f"- {role['title']} — {role['company']} ({role['dates']})")
        for h in role.get("highlights", []):
            lines.append(f"  * {h}")
    lines.append("")
    lines.append("EDUCATION")
    lines.extend(f"- {e}" for e in profile.get("education", []))
    lines.append("")
    lines.append("PUBLICATIONS")
    lines.extend(f"- {p}" for p in profile.get("publications", []))
    lines.append("")
    lines.append("SKILLS")
    lines.append(", ".join(profile.get("skills", [])))
    return "\n".join(lines)
