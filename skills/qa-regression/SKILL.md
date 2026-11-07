---
name: qa-regression
description: Run /qa-regression to lock a verified fix in place with a regression test. Use it after /qa-verify proves the fix. It writes the test that fails on the pre-fix tree and passes on the fix, prefers the tagged BDD scenario as its source, quarantines flakes instead of retrying them, and proves both directions before landing.
license: Apache-2.0
---

# QA regression

The test is the memory of the bug.

## Steps

1. **Source the test.** The `@regression` scenario from `qa-bdd` is the
   preferred source. No scenario means write the test from the repro steps
   and note the gap.
2. **Prove both directions.** The test fails on the pre-fix tree and passes
   on the fix. A test that passes both ways proves nothing; delete it or
   fix it.
3. **Land it.** The test runs with the suite, not in a skipped state, not
   behind a flag.
4. **Name it.** The test name or tag references the issue it guards.

## Flakes

A test that fails intermittently after the fix is a flake. Quarantine it:
add a row to `docs/qa/quarantine.md` with the trigger if known and its open
question. Quarantine is triage, not a parking lot. Each quarantined test
carries an open question. Retrying until green is forbidden.

## Scope

One regression test per fixed bug. Extra tests ride in their own change.
The suite's runtime is a budget; a slow regression test says why it is
worth its seconds.
