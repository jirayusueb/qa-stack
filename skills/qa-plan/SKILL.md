---
name: qa-plan
description: Run /qa-plan to write the plan for a test cycle before it runs. Use it when a batch of testing needs a contract: scope in and out, cases derived from scenarios and reports, environments, risks, and measurable exit criteria. The plan cites every case's source; nothing is invented.
license: Apache-2.0
---

# QA plan

A cycle without a plan is wandering with a budget. The plan is the
contract: what is tested, where, and when it is done.

## Template

The plan lands at `qa/plans/<cycle>-plan.md` with this exact shape:

```
---
cycle: <e.g. 2026-W47-release>
scope: <area or release>
window: <start to end>
cases: <n>
environments: <list>
risks: <n>
---

# Test plan - <cycle>

## Objective
<one line: what this cycle answers>

## Scope
In: <areas and flows>
Out: <explicitly untested, and why>

## Cases
| Id | Source | Type | Environment |
| --- | --- | --- | --- |

Source cites a scenario tag, a repro note, an issue, or a charter lens.
Type is scenario, regression, exploratory, or verify.

## Environments
<one line each: machine state reference from qa-prep, worktree layout
from qa-worktree when the cycle runs parallel>

## Risks
<what could invalidate the cycle: stale data, shared environments,
flaky dependencies, single-machine evidence>

## Exit criteria
<measurable: every case has a result, every finding is filed or
parked, evidence complete for filed findings>

## Amendments
| Date | Change | Reason |
| --- | --- | --- |
```

## Rules

- Cases are derived, never invented: from `@regression` scenarios, repro
  notes, open issues, or charter lenses. A case with no source is out.
- Scope Out is mandatory. A plan that tests everything tests nothing.
- Exit criteria are measurable by the cycle itself, not by opinion.
- A plan that changes mid-cycle gets an Amendment row, not a silent
  rewrite. The history is the audit.
- Environments reference the qa-prep record; they do not restate it.
- The plan precedes qa-prep and the run. A plan written after the run is
  a report wearing a plan's clothes.

## Reply

Plan path, case count by type, the top risk, and the exit criteria. The
run reports against the plan, citing case ids.
