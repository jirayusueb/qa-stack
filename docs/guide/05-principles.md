# Principles

Nine rules, cited by the skills, not invoked by users. The router indexes
them with links in its generated section.

## Discipline

- **Reproduce before you trust.** No diagnosis or fix without a
  reproduction.
- **One variable at a time.** One change, one rerun, one observation.
- **Quarantine flakes.** Triage and quarantine; never retry until green.

## Reporting

- **Report behavior, not code.** Domain language, no file paths.
- **Thin issues.** Independently fixable, honestly blocked.
- **Cite or delete.** Every claim carries evidence or is removed.

## Verification

- **Prove the fix.** Repro passes, scenarios pass, regression test lands.
- **Fresh eyes find bugs.** Review with no prior context when possible.
- **Gate before release.** No verdict without the cited checklist.

Each rule lives at `skills/principle-<name>/SKILL.md`.

Next: [browser QA](06-browser-qa.md).
