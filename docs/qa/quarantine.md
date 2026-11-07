# Quarantine list

The canonical quarantine for flaky tests. One row per quarantined test.
Every row carries an open question. Empty quarantine is a healthy default.

| Test | Trigger | Filed issue | Quarantined | Open question |
| --- | --- | --- | --- | --- |
| (example) tests/export.test.ts | full disk on CI runner | #12 | 2026-11-07 | does the runner free disk before the suite? |

## Rules

- A row enters only through qa-regression, with a trigger or a named
  unknown.
- A row leaves through qa-drift or a fix: resolved, or re-filed with what
  changed.
- Untriaged rows older than one cycle surface in qa-drift and qa-report.
- Retrying until green is not triage.
