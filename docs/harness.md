# Harnesses

QA Stack is harness-neutral. Skill bodies name actions, not tools. This page
maps actions to each host.

## Capability matrix

| Host | Spawn action | Team support | Notes |
| --- | --- | --- | --- |
| Claude Code | Agent tool | no | one Task per worker, never resumed |
| omp | spawn_agent | partial | fresh agent per worker |
| Codex | task | no | local executor required |
| Cursor | fresh task | no | no resume |
| OpenCode | task | no | subagent per brief |
| Agent Teams | spawn_teammate | yes | durable members, task board |
| DeepSeek Harness | subagent or spawn_teammate | yes | fresh subagent or team member |

Adapters: [claude-code](harness/claude-code.md), [codex](harness/codex.md),
[cursor](harness/cursor.md), [opencode](harness/opencode.md),
[agent-teams](harness/agent-teams.md), [omp](harness/omp.md),
[deepseek-harness](harness/deepseek-harness.md).

## Spawn mapping

The qa-delegate brief is host-neutral. Dispatch uses the host's tool:
`Agent` on Claude Code, `spawn_agent` on omp, a `Task` or `task` on Codex,
Cursor, and OpenCode, `spawn_teammate` on team hosts. A host with none of
these runs stages solo and labels self-reviews.

## Issue tracker

Filing uses the tracker CLI on the host, authenticated as the user. The
repository is recorded by `qa-setup` and confirmed at first file.

## Browser driver

The browser driver is Playwright, structured with the Page Object Model:
selectors live inside page objects, flows compose page object methods, and
evidence capture (screenshot, video, console, network) rides in the page
object base. Install it as a project dev dependency and re-run `qa-setup`
to record `# browser-driver: playwright`. The full action map, including
the manual fallback, is
[skills/qa-browser/references/drivers.md](../skills/qa-browser/references/drivers.md).

## Media upload

Evidence attaches to issues through the tracker CLI or the host's upload
capability. Skills name the attach action; the adapter page for each host
names the mechanism. Hosts without an upload path link the evidence files
from the issue body and note their repository location.
