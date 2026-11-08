# CI automation

Run drift and the gate on a schedule in your repository. The stack stays
harness-neutral; this page is a copy-paste starting point for GitHub
Actions.

## Weekly drift sweep

```yaml
name: qa-drift
on:
  schedule:
    - cron: "0 6 * * 1"
  workflow_dispatch:

jobs:
  drift:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Drift sweep
        run: npx skills run qa-drift
        # Or, with an agent host in CI: invoke /qa-drift and commit
        # docs/drift/<date>.md from the run.
```

## Release gate input

Before a release, generate the status report the gate reads:

```yaml
name: qa-report
on:
  workflow_dispatch:

jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npx skills run qa-report
      - uses: actions/upload-artifact@v4
        with:
          name: qa-status
          path: docs/reports/
```

## Rules

- CI runs drift and report, never the gate. The verdict belongs to a
  member who can name the risks.
- Commit generated reports back on a branch, not main, and let the gate
  read them from there.
- The Gherkin lint travels with your features: run
  `node scripts/feature-lint.mjs features/` in your own CI if you vendor
  the script.
