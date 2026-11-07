---
name: qa-delegate
description: Run /qa-delegate to brief any subagent or teammate spawn in the QA Stack. Use it before spawning repro workers, explorers, browser drivers, or fresh-context reviewers. It builds the self-contained brief, fixes the write scope, states the report format, and refuses overlaps.
license: Apache-2.0
---

# QA delegate

Every spawn gets a brief. No brief, no spawn.

## The brief

Read `references/brief.md` for the full format. The fields:

1. **Context.** What the spawn needs and nothing else. No parent history, no
   deliberation.
2. **Write scope.** The exact files or directories the spawn may write.
   One writer per file. Overlapping scopes stop the spawn.
3. **Task.** The concrete steps, in order.
4. **Success criteria.** How the spawn knows it is done.
5. **Verification.** The command or check the spawn runs on its own artifact.
6. **Report format.** What comes back: artifact path plus one line per
   finding.

## Who gets briefed

- **Repro workers.** One environment each. Parallel attempts only when the
  write scopes are disjoint.
- **Explorers.** One charter slice each. The persona is
  `agents/qa-explorer.md`.
- **Browser drivers.** The persona is `agents/qa-browser-driver.md` and the
  driver mapping is `../qa-browser/references/drivers.md`.
- **Fresh-context reviewers.** The artifact and the standard, nothing else.
  The issue reviewer persona is `agents/qa-issue-reviewer.md`. Never send
  parent history to a reviewer.

## Rules

- The spawn cap from `qa-setup` applies. Count retries.
- Trust no summary without its artifact. Ask for the artifact path.
- Reviewers are read-only. Their scope is empty.
- Tool names per host live in `docs/harness.md`. Name the action, not the
  tool, in the brief body.
- A spawn that cannot start or finish is reported, never retried blind.

Read `references/harnesses.md` for host tool mapping, `references/teams.md`
for the team variant, and `references/report.md` for scoring reports.
