# Artifacts

Every artifact the stack produces, its stage, and its home. One page.

| Artifact | Stage | Location | Owner skill |
| --- | --- | --- | --- |
| Intake notes | Intake | conversation + run notes | qa-session |
| Intake log | Intake | docs/qa/intake-log.md | qa-session |
| Repro notes + media | Reproduce | evidence/<issue-slug>-<seq>.{png,mp4} | qa-repro |
| Diagnosis report | Diagnose | docs/diagnosis/<slug>.md | qa-diagnose |
| Feature files | Spec | features/<name>.feature | qa-bdd |
| Issues | File | the issue tracker | qa-file |
| Verify report | Fix-Verify | docs/verification/<issue-n>.md | qa-verify |
| Regression tests | Fix-Verify | the project test suite | qa-regression |
| Exploration log | Explore track | evidence/explore-<date>.mp4 + findings | qa-explore |
| Gate verdict | Gate | docs/gate/<version>.md | qa-gate |
| Drift report | maintenance | docs/drift/<date>.md | qa-drift |
| Status report | maintenance | docs/reports/<date>-status.md | qa-report |
| Quarantine list | ongoing | docs/qa/quarantine.md | qa-regression, qa-drift |

Rules: every media file captioned per the evidence standard. Locations are
defaults; a project config may override, and the artifact says where it
landed.
