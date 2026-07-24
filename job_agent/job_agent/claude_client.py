"""Shared Anthropic client + cached system prompt construction.

Caching strategy (see Anthropic prompt-caching docs):
  - The system prompt is [static instructions][profile block][preferences],
    all frozen for the run, with ONE cache_control breakpoint on the last
    block (1h TTL). Every scoring/drafting call in a run shares this
    prefix, so calls 2..N read it at ~0.1x input price.
  - Volatile content (the job posting) goes in the user message, after
    the cached prefix.
  - NOTE: Opus 4.8's minimum cacheable prefix is 4096 tokens. With a
    sparse profile the system prompt may fall below that and silently
    not cache (cache_read stays 0 — harmless, just full input price).
    It engages automatically once profile.yaml is fully fleshed out.
"""

from __future__ import annotations

import anthropic

MODEL = "claude-opus-4-8"

SYSTEM_INSTRUCTIONS = """\
You are a meticulous job-search analyst working for one specific candidate.
You evaluate job postings against the candidate profile provided below,
tailor application materials, and draft outreach messages.

Rules:
- Ground every claim in the candidate profile. Never invent employers,
  titles, dates, metrics, or credentials that are not in the profile.
- If the profile lacks something a job requires, say so in the gaps list
  rather than papering over it.
- Connection notes must be under 290 characters including spaces
  (LinkedIn's limit is 300; leave margin).
- Write like a sharp human, not a template. No "I hope this finds you well".
"""


def build_client() -> anthropic.Anthropic:
    # Resolves ANTHROPIC_API_KEY / ANTHROPIC_AUTH_TOKEN / `ant auth login`
    # profile from the environment.
    return anthropic.Anthropic()


def build_system(profile_block: str, prefs_block: str) -> list[dict]:
    """Frozen system prompt with a single cache breakpoint on the last block."""
    return [
        {"type": "text", "text": SYSTEM_INSTRUCTIONS},
        {"type": "text", "text": profile_block},
        {
            "type": "text",
            "text": prefs_block,
            "cache_control": {"type": "ephemeral", "ttl": "1h"},
        },
    ]
