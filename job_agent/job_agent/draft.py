"""Draft tailored application materials for a scored job.

Produces, per job:
  - tailored resume summary + reordered/rephrased bullets (grounded in
    the profile — the model is instructed never to invent facts)
  - a <290-char LinkedIn connection note for the hiring manager
  - a longer follow-up message for after the connection is accepted

Uses streaming (long outputs) and the same cached system prefix as
scoring, so per-job marginal input cost is mostly the job text itself.
"""

from __future__ import annotations

import json

from .claude_client import MODEL
from .ingest import Job

DRAFT_SCHEMA = {
    "type": "object",
    "properties": {
        "tailored_summary": {
            "type": "string",
            "description": "3-4 sentence resume summary tailored to this job",
        },
        "tailored_bullets": {
            "type": "array",
            "items": {"type": "string"},
            "description": "6-8 resume bullets, reordered/rephrased for this job, grounded in the profile",
        },
        "connection_note": {
            "type": "string",
            "description": "LinkedIn connection-request note, UNDER 290 characters including spaces",
        },
        "followup_message": {
            "type": "string",
            "description": "Longer message to send after the connection is accepted",
        },
        "keywords_covered": {
            "type": "array",
            "items": {"type": "string"},
            "description": "Job-posting keywords the tailored materials now cover",
        },
    },
    "required": [
        "tailored_summary", "tailored_bullets", "connection_note",
        "followup_message", "keywords_covered",
    ],
    "additionalProperties": False,
}


def draft_materials(client, system: list[dict], job: Job, score: dict) -> dict:
    with client.messages.stream(
        model=MODEL,
        max_tokens=16000,
        thinking={"type": "adaptive"},
        output_config={
            "effort": "high",  # drafting quality matters more than scoring speed
            "format": {"type": "json_schema", "schema": DRAFT_SCHEMA},
        },
        system=system,
        messages=[{
            "role": "user",
            "content": (
                "Draft tailored application materials for this job. "
                f"Positioning angle from the fit analysis: {score['angle']}\n"
                f"Strengths to lead with: {json.dumps(score['matching_strengths'])}\n\n"
                f"TITLE: {job.title}\nCOMPANY: {job.company}\nURL: {job.url}\n\n"
                f"DESCRIPTION:\n{job.description}"
            ),
        }],
    ) as stream:
        response = stream.get_final_message()

    text = next(b.text for b in response.content if b.type == "text")
    draft = json.loads(text)

    # Hard-enforce the connection-note length client-side as a backstop.
    note = draft["connection_note"]
    if len(note) > 300:
        draft["connection_note_warning"] = (
            f"Note is {len(note)} chars — over LinkedIn's 300 limit; trim before sending."
        )
    return draft
