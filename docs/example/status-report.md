# Example status report

What `qa/reports/<date>-status.md` looks like when filled in.

---
period: 2026-W46
project: narbel
generated: 2026-11-14
open: 12
blockers: 3
proven: 7 of 9
quarantined: 2
---

# QA status - 2026-W46

Digest: open 12 (3 blockers), proven 7 of 9 fixes, quarantine 2 (1
untriaged), drift 4 findings.

## Open work

| Issue | Severity | Age | Blocked by |
| --- | --- | --- | --- |
| #412 | high | 6d | none |
| #430 | high | 2d | #412 |
| #431 | medium | 1d | none |

## Verification

| Issue | Regression | Scenarios | State |
| --- | --- | --- | --- |
| #401 | green | 3/3 | proven |
| #405 | green | 2/2 | proven |
| #418 | missing | 0/2 | claimed |

## Quarantine

| Test | Age | Open question |
| --- | --- | --- |
| tests/export.test.ts | 18d | does the runner free disk before the suite? |

## Drift

4 findings from qa/reports/drift/2026-11-12.md: 1 stale issue, 2 orphan
scenarios, 1 untriaged quarantine.

## Trend

| | This period | Last period | Delta |
| --- | --- | --- | --- |
| Opened | 5 | 8 | -3 |
| Closed | 7 | 4 | +3 |
| Quarantine in | 1 | 2 | -1 |
| Quarantine out | 0 | 0 | 0 |

## Queries

- open, blockers: `gh issue list --state open --json number,labels`
- proven, claimed: CI run 2026-11-13, issue tracker cross-check
- quarantine: qa/quarantine.md
- drift: qa/reports/drift/2026-11-12.md
