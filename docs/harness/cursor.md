# Cursor adapter

Cursor reads `.cursor-plugin/`, the root `skills/` directory, `agents/`,
and the rules in `.cursor-plugin/rules/qa-stack.mdc`.

Select skills from the picker. Runtime routing follows the rules file:
resolve the repository root from the invoked skill's path and dispatch
workers as fresh tasks.

## Spawning

A fresh task per worker. Never resume a worker. Workers receive absolute
paths to the persona, the standard, and the artifact.

## Evidence upload

The tracker CLI attaches files when the host allows it; otherwise the issue
body links `evidence/` paths in the repository.
