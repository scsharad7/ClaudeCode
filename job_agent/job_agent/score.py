"""Score a job posting's fit against the candidate profile.

Uses structured outputs (output_config.format json_schema) so the result
is guaranteed-parseable JSON — no regex extraction.
"""

from __future__ import annotations

import json

from .claude_client import MODEL
from .ingest import Job

FIT_SCHEMA = {
    "type": "object",
    "properties": {
        "fit_score": {
            "type": "integer",
            "description": "0-100 overall fit of the candidate for this job",
        },
        "verdict": {
            "type": "string",
            "enum": ["strong_match", "worth_applying", "stretch", "skip"],
        },
        "matching_strengths": {
            "type": "array",
            "items": {"type": "string"},
            "description": "Profile facts that map directly to job requirements",
        },
        "gaps": {
            "type": "array",
            "items": {"type": "string"},
            "description": "Requirements the profile does not clearly satisfy",
        },
        "angle": {
            "type": "string",
            "description": "The single strongest positioning angle for this application",
        },
    },
    "required": ["fit_score", "verdict", "matching_strengths", "gaps", "angle"],
    "additionalProperties": False,
}


def score_job(client, system: list[dict], job: Job) -> dict:
    response = client.messages.create(
        model=MODEL,
        max_tokens=2048,
        thinking={"type": "adaptive"},
        output_config={
            "effort": "medium",  # scoring is routine; keep it fast and cheap
            "format": {"type": "json_schema", "schema": FIT_SCHEMA},
        },
        system=system,
        messages=[{
            "role": "user",
            "content": (
                "Score this job posting against the candidate profile.\n\n"
                f"TITLE: {job.title}\nCOMPANY: {job.company}\n"
                f"LOCATION: {job.location}\nURL: {job.url}\n\n"
                f"DESCRIPTION:\n{job.description}"
            ),
        }],
    )
    text = next(b.text for b in response.content if b.type == "text")
    result = json.loads(text)
    result["_usage"] = {
        "cache_read": response.usage.cache_read_input_tokens,
        "cache_write": response.usage.cache_creation_input_tokens,
        "input": response.usage.input_tokens,
        "output": response.usage.output_tokens,
    }
    return result
