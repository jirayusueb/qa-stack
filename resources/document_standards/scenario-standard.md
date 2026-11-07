# Scenario standard

The contract for every Gherkin feature qa-bdd writes.

## Grounding

1. Every expected behavior in a scenario cites its source: documentation, a
   standard, an issue, a user statement, or the codebase.
2. Local claims cite the file and the command output.
3. A behavior with no source is deleted, not written.
4. Contradictory sources are recorded and resolved in the feature file's
   comments.

## Shape

1. Domain language only. Internal module names and implementation
   vocabulary are banned from every line.
2. One behavior per scenario. Shared context in a Background block.
3. Given states are concrete and set up in the scenario or the Background,
   never assumed.
4. When steps are user or system actions, one per line.
5. Then steps state observable behavior: what the user sees, what the
   system does. Not which function runs.
6. Steps are concrete enough to execute as a test.

## Tags

1. `@issue-<n>` when the scenario backs a filed issue.
2. `@regression` when a regression test implements it.
3. A scenario may carry both tags.

## Review

A fresh-context reviewer gets the feature file and this standard. Self
review is labeled when no reviewer can be spawned.
