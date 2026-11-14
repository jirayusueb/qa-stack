# Runner mapping

qa-regression names the test's job; this reference maps it to the
project's test runner. Detect the runner from the project config before
writing the test. Never assume a runner.

| Runner | Detect from | Test location | Tag convention |
| --- | --- | --- | --- |
| node:test | package.json script `node --test` | tests/*.test.mjs | name the issue in the test name |
| vitest | vite or vitest.config | *.spec.ts, *.test.ts | describe/test title names the issue |
| jest | jest.config or jest key | __tests__/, *.test.js | title names the issue |
| bun test | bunfig.toml, bun.lock | *.test.ts | title names the issue |
| pytest | pytest.ini, pyproject | tests/test_*.py | @pytest.mark.issue("n") |
| go test | *_test.go alongside code | same package | t.Run names the issue |
| playwright | playwright.config | e2e/*.spec.ts | test title names the issue; scenario step in the title |

## Rules

- The regression test lands where the runner will pick it up by default.
  No custom config just for the regression.
- The issue number reaches the test name or tag so a failure traces back.
- Quarantined tests use the runner's native skip or focus mechanism plus
  the quarantine row in `qa/quarantine.md`.
- An unknown runner means ask which command runs the suite, then record it
  here for the project.
