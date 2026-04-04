---
name: ai-toolkit-root-cause-debug
description: Debug systematically before changing code. Use when a bug, failing test, broken setup, or unexpected behavior needs root-cause analysis instead of guesswork.
metadata:
  owner: global-codex
  tier: contextual
  canonical_source: ~/.opencode/skills/codex/ai-toolkit-root-cause-debug/SKILL.md
---

## Use When

- A bug or failure is reported.
- The first fix is not obvious.
- You need to avoid shotgun debugging.

## Inputs / Prereqs

- Error output, failing command, or reproduction steps.

## Workflow

1. Reproduce the problem.
2. Gather direct evidence from logs/errors.
3. Compare expected vs actual behavior.
4. Form one root-cause hypothesis.
5. Test the smallest fix that proves or disproves it.

## Outputs / Evidence

- Reproduction path.
- Root-cause hypothesis.
- Minimal fix candidate.
- Verification result.

## Failure / Stop Conditions

- Do not bundle multiple unrelated fixes.
- Do not claim root cause without evidence.
