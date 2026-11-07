# routing live run

- Commit: a895c67
- Host: DeepSeek Harness
- Model: subagent fresh-context
- Operator: lead
- Date: 2026-11-07T17:27:32.766Z

| Case | Expected | Observed | Verdict | Evidence |
| --- | --- | --- | --- | --- |
| route-session | qa-session | matched expected skill | pass | live smoke run: fresh-context subagent read skills/*/SKILL.md descriptions |
| route-gate | qa-gate | matched expected skill | pass | live smoke run: fresh-context subagent read skills/*/SKILL.md descriptions |
| route-bdd | qa-bdd | matched expected skill | pass | live smoke run: fresh-context subagent read skills/*/SKILL.md descriptions |
| route-ask | qa-ask | matched expected skill | pass | live smoke run: fresh-context subagent read skills/*/SKILL.md descriptions |
| route-drift | qa-drift | matched expected skill | pass | live smoke run: fresh-context subagent read skills/*/SKILL.md descriptions |
| route-repro | qa-repro | matched expected skill | pass | live smoke run: fresh-context subagent read skills/*/SKILL.md descriptions |
| route-report | qa-report | matched expected skill | pass | live smoke run: fresh-context subagent read skills/*/SKILL.md descriptions |
| route-verify | qa-verify | matched expected skill | pass | live smoke run: fresh-context subagent read skills/*/SKILL.md descriptions |
