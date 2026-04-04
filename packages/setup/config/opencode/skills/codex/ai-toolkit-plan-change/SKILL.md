---
name: ai-toolkit-plan-change
description: Plan a code change before editing. Use when the request is non-trivial, spans multiple files, or needs explicit sequencing and verification criteria.
metadata:
  owner: global-codex
  tier: contextual
  canonical_source: ~/.opencode/skills/codex/ai-toolkit-plan-change/SKILL.md
---

## Use When

- The task is bigger than a one-line fix.
- You are about to touch multiple files.
- The repo is unfamiliar and you need a safe execution plan.

## Inputs / Prereqs

- The user request.
- Repository-local docs and verification commands if present.

## Workflow

1. Restate the task in one sentence.
2. Identify the minimum files/systems likely involved.
3. Produce a short ordered plan.
4. Include verification commands or evidence required for each meaningful step.
5. Call out ambiguity or risk before editing.

## Outputs / Evidence

- A small execution plan.
- Verification criteria.
- Risks/blockers if any.

## Failure / Stop Conditions

- Do not jump into implementation if the request is ambiguous.
- Do not produce a huge abstract plan for a small task.
