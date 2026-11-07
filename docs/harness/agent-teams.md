# Agent Teams adapter

QA Stack maps lifecycle stages to teammates with disjoint write scopes. The
mapping is [skills/qa-mode/references/team.md](../../skills/qa-mode/references/team.md).

## Spawning

spawn_teammate creates durable members. One stage per member, one writer
per file. The task board records stage, member, artifact. Fresh-context
review goes to a member who has not touched the artifact; the Lead reviews
the final diff and runs the checks.

## Evidence upload

The tracker CLI attaches files when the host allows it; otherwise the issue
body links `evidence/` paths in the repository.
