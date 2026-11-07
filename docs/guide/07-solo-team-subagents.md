# Solo, team, subagents

The same skills run in three modes. `qa-setup` records the choice; `auto`
detects on first run.

## Solo

One agent runs every stage in order. Fresh-context review degrades to a
labeled self-review checklist. The run says so; it never claims fresh eyes
it did not use.

## Subagents

Whenever the host exposes a spawn tool, the stack uses it:

- Fresh-context review of issue bodies and scenarios.
- Parallel reproduction attempts, one environment each.
- Exploration sweeps split by heuristic group.
- Browser driver work as a worker persona.

Every spawn carries a qa-delegate brief: context, write scope, task,
success criteria, verification, report format. The spawn cap applies.

## Team

Teammates own stages with disjoint write scopes. One writer per file. The
mapping is
[skills/qa-mode/references/team.md](../../skills/qa-mode/references/team.md).
Fresh-context review goes to a member who has not touched the artifact. The
Lead keeps the todo list, reviews the diff, runs the checks.
