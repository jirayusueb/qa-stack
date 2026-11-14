# Example test plan

What `qa/plans/<cycle>-plan.md` looks like when filled in.

---
cycle: 2026-W47-release
scope: export and billing
window: 2026-11-16 to 2026-11-18
cases: 14
environments: local, staging
risks: 3
---

# Test plan - 2026-W47-release

## Objective

Answer whether export and billing changes are safe to ship in 2.5.

## Scope

In: export flows, billing retry, refund scenarios.
Out: auth and onboarding, unchanged this cycle and covered by their
regressions.

## Cases

| Id | Source | Type | Environment |
| --- | --- | --- | --- |
| P1 | @issue-412 @regression | scenario | local, staging |
| P2 | @issue-430 @regression | scenario | staging |
| P3 | @issue-418 | verify | local |
| E1 | charter lens: interrupted flow | exploratory | local |
| E2 | charter lens: stale data | exploratory | staging |

## Environments

- local: qa-prep record 2026-11-15, worktree qa-verify-412
- staging: qa-prep record 2026-11-15, shared with team

## Risks

- Staging is shared; another team's deploy mid-cycle invalidates P2.
- Export fixtures depend on disk state; quarantine history exists.
- Single-machine evidence for P3 unless a second run lands.

## Exit criteria

- Every case row has a result.
- Every finding is filed or parked in the intake log.
- Evidence complete for every filed finding.

## Amendments

| Date | Change | Reason |
| --- | --- | --- |
| 2026-11-17 | billing retry moved to Out | staging deploy conflict; refiled next cycle |
