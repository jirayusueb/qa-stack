# Artifacts

Every artifact the stack produces, its stage, and its home. One root.

## The tree in your project

```
qa/
  evidence/        screenshots, recordings, console and network captures
  features/        Gherkin feature files
  plans/           test plans per cycle
  reports/
    diagnosis/     root-cause reports
    verification/  fix-verification reports
    gate/          release verdicts
    drift/         drift reports
    <date>-status.md   weekly and release status reports
  intake-log.md    parked reports, resumable across sessions
  quarantine.md    flaky-test quarantine
  prep-<date>.md   prep records: cases, data, machine state
```

The default root is `qa/`. The config's `# artifact-root:` line moves it;
paths below the root stay the same. A project that must keep Gherkin or
page objects where its tooling expects them (for example `features/` for
Cucumber, `e2e/pages/` for Playwright) sets the override once in config
and the skills follow.

## Map

| Artifact | Stage | Location | Owner skill |
| --- | --- | --- | --- |
| Intake notes | Intake | conversation + run notes | qa-session |
| Test plan | planning | qa/plans/<cycle>-plan.md | qa-plan |
| Intake log | Intake | qa/intake-log.md | qa-session |
| Repro notes + media | Reproduce | qa/evidence/<issue-slug>-<seq>.{png,mp4} | qa-repro |
| Prep record | preparation | qa/prep-<date>.md + seed scripts | qa-prep |
| Diagnosis report | Diagnose | qa/reports/diagnosis/<slug>.md | qa-diagnose |
| Feature files | Spec | qa/features/<name>.feature | qa-bdd |
| Issues | File | the issue tracker | qa-file |
| Verify report | Fix-Verify | qa/reports/verification/<issue-n>.md | qa-verify |
| Regression tests | Fix-Verify | the project test suite | qa-regression |
| Exploration log | Explore track | qa/evidence/explore-<date>.mp4 + findings | qa-explore |
| Gate verdict | Gate | qa/reports/gate/<version>.md | qa-gate |
| Drift report | maintenance | qa/reports/drift/<date>.md | qa-drift |
| Status report | maintenance | qa/reports/<date>-status.md | qa-report |
| Quarantine list | ongoing | qa/quarantine.md | qa-regression, qa-drift |

Rules: every media file captioned per the evidence standard. The root is
configurable; the artifact says where it landed.
