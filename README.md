# QA Stack

Evidence-first QA for coding agents. One lifecycle loop: intake bugs,
ground expected behavior in cited sources, reproduce with video and image
evidence, diagnose root causes, spec behavior in Gherkin, file durable
issues, verify fixes, and gate releases.

QA Stack is a harness-neutral collection of Agent Skills. One router,
`/qa-mode`, finds where a request enters the lifecycle and refuses to skip
stages. Research is inline: any plan, spec, or issue written without
grounded knowledge gathers evidence first, with citations. BDD scenarios
are the acceptance definition; a fix is proven when they pass and the
regression test lands.

## Install

The skills route works everywhere. The plugin route adds worker personas,
rules, and update management on hosts that support plugins.

The command form depends on the route. A plugin namespaces its skills.

| Route | Command form |
| --- | --- |
| Claude Code plugin | `/qa-stack:qa-setup` |
| Claude Code skills route | `/qa-setup` |
| omp | `/skill:qa-setup` |
| Codex, Cursor, OpenCode | the skill picker, or the skill name |

```sh
npx skills add jirayusueb/qa-stack
```

### Claude Code

```sh
claude plugin marketplace add jirayusueb/qa-stack
claude plugin install qa-stack@qa-stack
```

Restart the session after install.

### omp

```sh
omp plugin marketplace add jirayusueb/qa-stack
omp plugin install qa-stack@qa-stack
```

Restart omp, or run `/reload-plugins`. Do not also run the skills route for
this project; duplicate names shadow each other.

### Browser driver (optional)

For web-app QA, install Playwright in your project and re-run `/qa-setup`
to detect it. The stack drives flows through the Page Object Model, with
screenshot, video, console, and network evidence. Without Playwright the
stack falls back to manual repro steps and says so.

### Manual copy

Copy `skills/<name>/` into a host skill directory, project scope or user
scope.

## Skills

<!-- generated:skills:start -->
| Skill | Tier | What it does |
| --- | --- | --- |
| `qa-ask` | Core | Run /qa-ask for read-only answers about QA work. |
| `qa-bdd` | Core | Run /qa-bdd to turn research and bug reports into Gherkin behavior specifications. |
| `qa-browser` | Core | Run /qa-browser to exercise a web app through a browser driver for QA. |
| `qa-delegate` | Core | Run /qa-delegate to brief any subagent or teammate spawn in the QA Stack. |
| `qa-diagnose` | Core | Run /qa-diagnose to find the root cause of a reproduced failure. |
| `qa-drift` | Core | Run /qa-drift to check whether filed issues and their scenarios still match the code. |
| `qa-explore` | Core | Run /qa-explore to hunt for unknown bugs under a charter. |
| `qa-file` | Core | Run /qa-file to write and file durable GitHub issues from scoped reports. |
| `qa-gate` | Core | Run /qa-gate to decide whether a release ships. |
| `qa-mode` | Core | Run /qa-mode to route any QA task through the QA Stack lifecycle. |
| `qa-prep` | Core | Run /qa-prep to prepare test cases and their environment before a run. |
| `qa-regression` | Core | Run /qa-regression to lock a verified fix in place with a regression test. |
| `qa-report` | Core | Run /qa-report to summarize QA status from evidence. |
| `qa-repro` | Core | Run /qa-repro to reproduce a reported bug and shrink it to the smallest failing case. |
| `qa-session` | Core | Run /qa-session to take a bug report conversationally. |
| `qa-setup` | Core | Run /qa-setup once per project to configure the QA Stack. |
| `qa-verify` | Core | Run /qa-verify to prove a fix kills the reported bug. |
| `qa-worktree` | Core | Run /qa-worktree to create isolated git worktrees for parallel QA work. |
<!-- generated:skills:end -->

## Playbooks

<!-- generated:playbooks:start -->
| Playbook | Use it when |
| --- | --- |
| `Browser pass` | Exercise a web app through the browser driver. Use when the bug or the sweep lives in a browser and the deliverable is captured evidence. |
| `Bug intake` | Take a user report from words to a filed, evidence-backed issue. Use when the user reports something broken and the deliverable is a GitHub issue. |
| `Exploratory pass` | Hunt for unknown bugs under a charter. Use when the deliverable is a findings report from a bounded exploration session. |
| `Fix verify` | Prove a fix kills the reported bug. Use when a change claims to fix an issue and the deliverable is proof. |
| `Investigate` | Explain why a known failure happens. Use when the deliverable is a root-cause explanation, not a fix. |
| `Release gate` | Answer one question: is it safe to ship. Use when the deliverable is a go or no-go verdict for a release. |
<!-- generated:playbooks:end -->

## Principles

<!-- generated:principles:start -->
| Principle | Rule |
| --- | --- |
| `principle-cite-or-delete` | Apply when writing any claim in a spec, issue, report, or verdict. |
| `principle-fresh-eyes-find-bugs` | Apply when reviewing issue bodies, scenarios, or findings. |
| `principle-gate-before-release` | Apply when asked whether a release ships. |
| `principle-one-variable-at-a-time` | Apply when investigating why something fails or why a fix works. |
| `principle-prove-the-fix` | Apply when a change claims to fix a bug. |
| `principle-quarantine-flakes` | Apply when a test fails intermittently. |
| `principle-report-behavior-not-code` | Apply when writing any issue, finding, or scenario. |
| `principle-reproduce-before-you-trust` | Apply when diagnosing, fixing, or verifying any reported failure. |
| `principle-thin-issues` | Apply when scoping a report into issues. |
<!-- generated:principles:end -->

## Execution modes

Role-neutral skills run solo, with spawned subagents for fresh-context
review, parallel reproduction, and exploration sweeps, or as a team with
disjoint write scopes. `/qa-setup` records the mode.

## Development

```sh
npm run check
```

runs validation, build check, tests, evals, regressions, the skill graph,
and injection checks. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Apache-2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
