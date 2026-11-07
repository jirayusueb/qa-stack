# QA Stack design

Evidence-first QA for coding agents, structured as one lifecycle loop with
two parallel tracks.

## Why

Bug reports decay. Diagnoses run on unreproduced claims, issues cite line
numbers that go stale, fixes ship unproven, and release calls rest on
vibes. QA Stack makes each of those steps produce an artifact with evidence
attached, and makes the router refuse to skip stages.

## Shape

- One router, qa-mode, owns the only todo list, the gates, and the
  lifecycle map.
- Eight stages: Intake, Ground, Reproduce, Diagnose, Spec, File, Fix-Verify,
  Gate. Each is a skill or an inline rule with a named artifact and exit
  condition.
- Two tracks: Explore feeds Intake; Ask answers read-only and never enters.
- Nine principles, cited not invoked.
- Three personas: fresh-context issue reviewer, browser driver worker,
  explorer worker.
- Three standards: evidence, issue, scenario.

## Decisions

- **No separate research skill.** Grounding is the first step of writing.
  Any plan, spec, or issue written without grounded knowledge gathers
  evidence inline, with citations. This keeps research attached to its
  consumer instead of spawning a parallel pipeline.
- **BDD inside the loop.** Scenarios are the Spec stage. They ground
  expected behavior in cited sources and become the acceptance definition
  for verification and the source for regression tests.
- **Media as first-class evidence.** A visual bug carries a screenshot, a
  flow bug a recording, every file captioned. Browser evidence rides with
  console and network captures.
- **Role-neutral skills.** Every skill names input, artifact, exit
  condition. Solo, subagent, and team modes dispatch the same stages.
- **Driver-agnostic browser actions.** Skill bodies name actions; one
  reference maps them to fast-browser-use and a manual fallback.
- **Rewind rule.** A request enters at its stage unless an earlier stage's
  artifact is missing; then it enters earlier. Skipping is a user decision,
  never a default.

## Layout

- `skills/` - 16 core skills, 9 principles, 6 playbooks under qa-mode.
- `agents/` - 3 worker personas.
- `resources/document_standards/` - 3 standards.
- `scripts/` - build, validate, eval, graph, injection, regressions.
  Adapted from egm-stack, rewritten for this contract; see UPSTREAM.md.
- `evals/` - static suites, injection fixtures, regressions, descriptions.
- `docs/` - guides, harness adapters, Thai summary, this spec.

## Generated regions

`npm run build` writes: the principle index and playbook list inside
`skills/qa-mode/SKILL.md`, the skills, playbooks, and principles tables in
`README.md`, and `docs/skills.md` and `docs/commands.md`. Never edit these
regions by hand.
