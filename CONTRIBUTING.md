# Contributing

Read [docs/designs/qa-stack.md](docs/designs/qa-stack.md) and
[AGENTS.md](AGENTS.md) before changing anything.

## Workflow

1. Small changes, one concern per branch.
2. `npm run check` must pass before you hand off.
3. A changed `skills/<name>/SKILL.md` needs a matching entry in that
   skill's `CHANGELOG.md`. `npm run check:changelog` enforces it.
4. Generated regions are regenerated with `npm run build`. Never edit them.

## Adding a skill

1. `skills/<name>/SKILL.md` with exactly `name`, `description`, `license`.
2. Register it in `scripts/lib/contract.mjs` with a line budget.
3. Add routing and description eval cases.
4. Update the design spec if it changes the lifecycle shape.
