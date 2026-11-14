# Changelog

## 0.1.0

- Initial release. Fourteen core skills around one lifecycle loop, nine
  principles, six playbooks, three worker personas, three standards.
- Evidence standard with citations, confidence labels, and video/image
  media rules.
- BDD spec stage grounded in cited sources, feeding verification and
  regression tests.
- fast-browser-use as the preferred browser driver, with a manual
  fallback.
- Solo, subagent, and team execution modes over role-neutral skills.
- Tooling adapted from egm-stack: build, validate, evals, injection,
  regressions, skill graph.

## 0.2.0

- qa-drift skill: stale issue, orphan scenario, and orphan regression
  detection.
- qa-report skill: cited-count status summaries.
- Thai documentation.
- Live routing smoke results recorded.
- CI hardening: pinned actions, dependabot, PR scope check.

## 0.2.1

- evals: drift and report suites; file redaction case.
- Canonical quarantine list format at docs/qa/quarantine.md.
- Evidence redaction rule: unscanned media never leaves the repository.
- qa-setup fails fast on an unauthenticated tracker.
- scripts/feature-lint.mjs linting Gherkin against the scenario standard,
  wired into npm run check.
- scripts/release.mjs one-command version bump, build, check, tag.
- ADRs 0001-0004 recording the core design decisions.
- describe-eval summary parsing fixed; live description results recorded
  (20 recorded triggers, 100% pass in two fresh-context runs).

## 0.2.2

- docs/artifacts.md: one-page artifact map with stage and location.
- PNG icon exports at 16/32/64/128 px under assets/.
- Fresh-install simulation verified (full check green from a clean copy).

## 0.3.0

Usage-driven improvements. Cheatsheet, preview filing, project issue
templates, intake log across sessions, report brief mode, test runner
mapping, artifact-language config, CI automation guide.

## 0.4.0

- Browser driver switched from fast-browser-use to Playwright.
- Page Object Model rules: selectors live inside page objects, flows
  compose page object methods, evidence capture rides in the page object
  base.

## 0.5.0

- Real-browser layer added: ego lite drives logged-in flows in an
  isolated agent space reusing the user's session.
- Layer selection rule: repeatable in CI means Playwright; real session
  means ego lite, with a fallback chain (stored session state, then
  manual) when absent.
- Regression tests never ride the real-browser layer.

## 0.5.1

- Setup no longer asks about or checks the issue tracker. It records
  issue-tracker: none silently and qa-file resolves the tracker at first
  file, once, from config or the tracked remote.

## 0.6.0

- qa-prep skill: test case preparation before a run. Cases from scenarios
  or repro steps, idempotent seed data, machine state record, teardown
  path. Consumed by qa-repro, qa-verify, and qa-explore.

## 0.7.0

- qa-worktree skill: isolated git worktrees for parallel QA work.
  Purpose-named, single-owner worktrees for pre-fix checkouts, parallel
  repro attempts, teammate scopes, and side builds. Artifacts copy back
  before cleanup; worktrees are read-mostly toward history.

## 0.7.1

- Real-browser layer switched from ego lite to agent-browser. Same
  isolation and session-reuse contract, same fallback chain.

## 0.8.0

- Single artifact root in the consuming project: qa/. Evidence, features,
  reports (diagnosis, verification, gate, drift, status), intake log,
  quarantine, and prep records all live under it. Configurable via
  artifact-root in qa-setup. docs/artifacts.md documents the tree.
