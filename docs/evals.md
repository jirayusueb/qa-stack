# Evals

The stack is tested by static suites, executable regressions, and recorded
live runs. Nothing calls a model automatically.

## Static suites

`evals/*.yaml`, validated by `npm run eval`:

- `routing` - every skill and playbook has a case routing to it.
- `session` - intake conduct: question caps, scope decisions.
- `file` - issue standard compliance, breakdown order, media presence.
- `verify` - both-direction proof, before/after evidence.
- `gate` - checklist and verdict shape.
- `bdd` - grounding, domain language, tags.
- `ask` - read-only guarantees, correct deflection to stages.
- `browser` - driver detection, evidence capture, fallback.
- `delegation` - brief completeness, spawn cap, report scoring.
- `injection` - untrusted content stays data.

## Description triggers

`evals/descriptions.yaml` with `npm run describe-eval -- --check`. Every
core skill has at least two positive trigger queries and the suite has at
least eight negatives.

## Regressions

`npm run regressions` runs the executable checks declared in
`evals/regressions.yaml`: manifest parity, adapter completeness, skill and
prefix counts, command forms in the README, no shell scripts.

## Live runs

`node scripts/run-evals.mjs --suite <s> --case <id>` prints a case brief.
Run the prompt in a fresh session, score it, and record the verdict with
`--record`. Results land in `evals/results/`.
