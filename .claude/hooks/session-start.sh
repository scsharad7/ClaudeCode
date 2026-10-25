#!/bin/bash
# SessionStart hook: install CoCo Super Intelligence (github.com/coco-research/coco)
# into the user-level ~/.claude so its skills, /SI-* slash commands, and subagents
# are available in cloud sessions.
#
# CoCo is a home-folder tool and ~/.claude is ephemeral in cloud containers, so it
# has to be re-installed at the start of every session. The installer only writes
# inside ~/.claude (symlinks + a marked block in ~/.claude/CLAUDE.md), makes no
# network calls of its own, and is idempotent — safe to re-run each session.
set -euo pipefail

# Only run in Claude Code cloud (remote) sessions. A local machine keeps its own
# CoCo install and should not be touched by this repo's hook.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

COCO_DIR="$HOME/coco"
COCO_REPO="https://github.com/coco-research/coco.git"
LOG="$HOME/.coco-install.log"

# Fetch or refresh the CoCo clone. Idempotent: update in place if present,
# otherwise shallow-clone fresh. A failed update is non-fatal — the existing
# clone still installs.
if [ -d "$COCO_DIR/.git" ]; then
  git -C "$COCO_DIR" fetch --depth 1 origin 2>/dev/null \
    && git -C "$COCO_DIR" reset --hard '@{u}' >/dev/null 2>&1 \
    || echo "coco: update skipped; using existing clone" >&2
else
  rm -rf "$COCO_DIR"
  git clone --depth 1 "$COCO_REPO" "$COCO_DIR"
fi

# Install the Claude Code adapter. Keep the ~200 "Linked:" lines out of the
# session context by logging them to a file and printing only a one-line summary.
# CoCo is an add-on, not a hard dependency of this repo, so a failure here warns
# but never blocks the session from starting.
if bash "$COCO_DIR/install.sh" --adapter claude-code >"$LOG" 2>&1; then
  ver="$(grep -oE 'Coco v[0-9][0-9.]*' "$LOG" | head -1 || true)"
  echo "${ver:-CoCo} installed: skills, /SI-* commands, and subagents linked into ~/.claude (log: $LOG)"
else
  echo "coco: session-start install failed; see $LOG — continuing without CoCo" >&2
fi

exit 0
