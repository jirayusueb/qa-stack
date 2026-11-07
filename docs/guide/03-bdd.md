# BDD specs

qa-bdd turns research into Gherkin scenarios. Research first, spec second.

## The flow

1. **Ground.** List each behavior and its source. Documentation, a
   standard, an issue, a user statement, or the codebase. No source, no
   scenario.
2. **Spec.** Feature files in domain language. One behavior per scenario,
   shared context in a Background, Then steps state observable behavior.
3. **Tag.** `@issue-<n>` to back a filed issue, `@regression` to feed a
   regression test.
4. **Use.** qa-verify treats the scenarios as the acceptance definition;
   qa-regression implements the `@regression` ones.

## Example

```gherkin
@issue-12 @regression
Scenario: Export fails politely when the disk is full
  Given a project with one export saved
  And a disk with less free space than the export needs
  When the user starts a second export
  Then the export stops with the message "Not enough disk space"
  And no partial file remains
```

The contract is [the scenario standard](../../resources/document_standards/scenario-standard.md).

Next: [evidence](04-evidence.md).
