---
name: ai-toolkit-context-hygiene
description: Keep the session focused and efficient. Use when the conversation is getting bloated, slow, or spread across too many old outputs and decisions.
metadata:
  owner: global-codex
  tier: contextual
  canonical_source: ~/.opencode/skills/codex/ai-toolkit-context-hygiene/SKILL.md
---

## Use When

- The session feels slow or noisy.
- Old outputs are crowding current work.
- You are switching from one task to another.

## Inputs / Prereqs

- Current task and the active files/decisions that must be preserved.

## Workflow

1. Identify what must remain active.
2. Mark stale outputs, completed threads, and resolved questions as removable.
3. Recommend compaction or a fresh session when appropriate.
4. Preserve active task state explicitly.

## Outputs / Evidence

- What should be kept.
- What can be pruned.
- Whether to compact or start fresh.

## Failure / Stop Conditions

- Do not compact away active task state.
- Do not preserve irrelevant historical chatter.
