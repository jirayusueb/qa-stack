# ADR 0004: The lifecycle rewind rule

Date: 2026-11-08

## Status

Accepted.

## Context

A stack of independent skills invites stage skipping: verify a fix that was
never reproduced, spec behavior nobody grounded. The first design used many
discrete playbooks; they allowed implicit skips.

## Decision

One lifecycle loop of eight stages. A request enters at its matching stage
unless an earlier stage's artifact is missing; then it enters at the
earliest missing stage. Skipping a stage is an explicit user decision,
never a default.

## Consequences

- The router needs the lifecycle map with artifacts and exit conditions
  (`skills/qa-mode/references/lifecycle.md`).
- Stage artifacts are cheap to check for existence, so the rewind is
  mechanical.
- Users can still skip, but the skip is visible in the todo list.
