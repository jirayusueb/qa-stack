# Harness tool mapping

Hosts name the spawn action differently. The brief stays host-neutral; the
dispatch uses the host tool.

| Host | Spawn action | Notes |
| --- | --- | --- |
| Claude Code | Agent tool | one Task per worker, never resumed |
| omp | spawn_agent | fresh agent per worker |
| Codex | task | local executor required |
| Cursor | fresh task | no resume |
| OpenCode | task | subagent per brief |
| Agent Teams | spawn_teammate | durable member, disjoint scopes |
| DeepSeek Harness | subagent or spawn_teammate | fresh or team member |

See `docs/harness.md` for the full capability matrix and per-host adapter
pages.

When the host exposes none of these, do not spawn. Run the stage solo and
label the review as a self-review.
