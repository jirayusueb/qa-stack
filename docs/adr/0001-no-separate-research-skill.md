# ADR 0001: No separate research skill

Date: 2026-11-08

## Status

Accepted.

## Context

Early design had a qa-research pipeline skill for deep research with an
evidence standard. It duplicated the consumer: research findings existed to
be cited inside specs, issues, and reports, and a separate artifact risked
drifting from them.

## Decision

There is no research skill and no deep-research playbook. Research is the
inline first step of writing: any plan, spec, or issue written without
grounded knowledge gathers evidence first, with citations, per the evidence
standard.

## Consequences

- One artifact less to maintain; citations live next to their claims.
- Research cannot run as a standalone deliverable; a pure research question
  routes to qa-ask, which answers read-only.
- The evidence standard must be strict, since it is the only enforcement.
