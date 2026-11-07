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
