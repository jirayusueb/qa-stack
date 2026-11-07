# ADR 0003: Role-neutral skills across solo, subagents, and team

Date: 2026-11-08

## Status

Accepted.

## Context

Hosts differ: some agents run alone, some expose a spawn tool, some expose
durable teammates with a task board. Writing per-mode skill variants
triples the surface and drifts.

## Decision

Every skill names its input, artifact, and exit condition, never who runs
it. qa-setup records the execution mode; qa-mode dispatches stages per
mode; qa-delegate carries the brief for any spawn. Fresh-context review is
mandatory when a spawn exists and degrades to a labeled self-review
otherwise.

## Consequences

- One skill set, three execution modes.
- The router owns mode detection and dispatch; skills stay ignorant of it.
- Self-review must be labeled, never passed off as fresh context.
