# First session

From "it's broken" to a filed, evidence-backed issue.

1. Run `/qa-mode` and describe the problem in your own words. The router
   enters at Intake.
2. `/qa-session` asks at most three questions: expected versus actual, the
   steps, consistent or intermittent.
3. `/qa-repro` follows your steps, shrinks the case, and captures a video
   of the failure and a screenshot of the failure state under `evidence/`.
4. `/qa-file` writes the issue in domain language, attaches the media, and
   a fresh-context reviewer checks the body against the standard when your
   host can spawn one.
5. The run replies with issue URLs and blocking relationships.

## What good looks like

- The issue reads in thirty seconds and survives a refactor.
- The video shows the failure; the screenshot shows the failure state.
- Every claim about expected behavior carries a citation or a label.

## When there is a fix

`/qa-mode` with "verify the fix for issue 12" enters at Fix-Verify:
reproduce on the pre-fix tree, apply, record before and after, run the
tagged scenarios, land the regression test.

Next: [BDD specs](03-bdd.md).
