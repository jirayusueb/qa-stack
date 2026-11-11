# Upstream

QA Stack adapts material from these projects. See NOTICE for license
details.

## egm-stack (jirayusueb/egm-stack)

Apache-2.0. The repository tooling and layout are adapted: the build,
validate, eval, describe-eval, run-evals, sync-assets, skill-graph,
check-injection, check-regressions, and check-skill-changelog scripts, the
frontmatter and yaml libraries, the manifest structure, the per-skill
changelog contract, and the playbook format. All egm-specific content was
replaced with the QA Stack skill set and contract.

## Playwright (microsoft/playwright)

Referenced as the browser driver. Not vendored, not redistributed. The
action map and Page Object Model rules live in
`skills/qa-browser/references/drivers.md`.
