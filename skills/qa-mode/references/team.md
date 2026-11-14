# Team mapping

When the host exposes teammates or a task board, map lifecycle stages to
members. Disjoint write scopes only. One writer per file.

| Stage | Who | Write scope |
| --- | --- | --- |
| Intake | the member talking to the user | none, conversation only |
| Reproduce | repro worker | evidence/ |
| Diagnose | diagnosis worker | qa/reports/diagnosis/ |
| Spec | spec worker | features/ |
| File | intake member | issue tracker only |
| Fix-Verify | verify worker | tests/ |
| Gate | a member who fixed nothing | qa/reports/gate/ |

## Rules

- Fresh-context review goes to a member who has not touched the artifact.
  This is mandatory when teammates exist. Never review your own stage.
- The Lead keeps the todo list and the gates. Workers report artifacts, not
  summaries.
- Record the stage, the member, and the artifact on the task board before a
  stage starts.
- Two members never write the same file. When scopes touch, the Lead splits
  the file or sequences the stages.
- A blocked stage goes back on the board with the blocking condition named.
  Never block silently.
