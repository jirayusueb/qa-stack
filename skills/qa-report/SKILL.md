---
name: qa-report
description: Run /qa-report to summarize QA status from evidence. Use it when the deliverable is a weekly or release status summary. It writes a fixed-template report with a machine-readable header, a one-line digest, cited tables per section, and a trend delta. Every number cites its query; no verdicts.
license: Apache-2.0
---

# QA report

Counts with citations, a digest a human reads first, and a header a tool
can parse. No number without its query.

## Template

The report lands at `qa/reports/<date>-status.md` with this exact shape:

```
---
period: <e.g. 2026-W46>
project: <slug>
generated: <date>
open: <n>
blockers: <n>
proven: <n> of <claimed>
quarantined: <n>
---

# QA status - <period>

Digest: open <n> (<b> blockers), proven <p> of <c> fixes,
quarantine <q> (<u> untriaged), drift <d> findings.

## Open work
| Issue | Severity | Age | Blocked by |
| --- | --- | --- | --- |

## Verification
| Issue | Regression | Scenarios | State |
| --- | --- | --- | --- |

State is `proven` or `claimed`. Merged is not a state.

## Quarantine
| Test | Age | Open question |
| --- | --- | --- |

## Drift
<latest drift summary, or "no drift run">

## Trend
| | This period | Last period | Delta |
| --- | --- | --- | --- |
| Opened | | | |
| Closed | | | |
| Quarantine in | | | |
| Quarantine out | | | |

## Queries
<one line per count above, the exact query that produced it>
```

## Rules

- Digest first, one line, no verdicts. The gate decides releases; this
  report informs.
- The frontmatter mirrors the digest counts so tools and the gate read
  the report without parsing prose.
- Proven means proven: regression green and scenarios passing. Merged is
  not a state.
- Trend needs the previous report. None exists means a first-period
  note, not invented zeros. Two points make a line, not a trend; label
  short histories.
- Derive, never invent. Missing data is reported as missing.
- Run from the tracker and the repository. Cite both in Queries.

## Modes

`brief` before the request keeps the reply to a chat-pasteable digest:
the digest line, the counts, and the report path. The full report is
still written; `brief` shapes the reply, not the artifact.
