# Driver mapping

QA Stack drives browsers with Playwright and structures test code with the
Page Object Model (POM). Detect before you promise: the config from
`qa-setup` records `# browser-driver: playwright` or `none`.

## Install Playwright

- Project dev dependency: `npm install -D @playwright/test` then
  `npx playwright install`.
- Detect from `playwright.config.*` in the repository root.
- `qa-setup` records the result. Re-run `/qa-setup` after installing.

## Action map

| Action | Playwright + POM |
| --- | --- |
| Open | page object `open()` wrapping `page.goto()` with a named state |
| Follow | page object methods, one per user step, in order |
| Fill | page object `fill*()` methods taking a named data set |
| Screenshot | `page.screenshot()` saved to `evidence/` with a caption |
| Record | Playwright video on the context; saved to `evidence/` |
| Capture console | `page.on('console')` and `page.on('pageerror')`, errors first |
| Capture network | `page.on('response')`, failed responses first |
| Compare | two recorded runs of the same flow, labeled builds |

## Page Object Model rules

1. Page objects live in `e2e/pages/` (or the project's existing page
   object directory). One class or module per page or major component.
2. Selectors never appear outside page objects. Steps, scenarios, and
   workers call page object methods by name.
3. Page object methods name user actions (`exportProject()`,
   `openSettings()`), never implementation (`click('#btn-3')`).
4. Evidence capture hooks ride in the page object base: screenshot,
   video, console, and network helpers every page object inherits.
5. Flows compose page object calls. A repro is a sequence of method
   calls; the video is the same sequence recorded.

## Rules

- Skill bodies never name the driver. Only this file and `docs/harness.md`
  do.
- A missing Playwright install is never an error. Say `fallback: manual`
  and hand the user the steps.
- Driver failures during a flow are findings: log them with the console
  capture, do not silently retry.
- Credentials stay with the user's own browser state. Never record them.
