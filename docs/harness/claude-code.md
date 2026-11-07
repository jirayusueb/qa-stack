# Claude Code adapter

Install as a plugin or through the skills route.

```sh
claude plugin marketplace add jirayusueb/qa-stack
claude plugin install qa-stack@qa-stack
```

Restart the session after install. Plugin skills carry the namespace, for
example `/qa-stack:qa-mode`.

## Spawning

The Agent tool runs one worker per brief. Never resume a worker; start a
new one. Reviewers get the artifact path and the standard path only.

## Evidence upload

The tracker CLI attaches files when the host allows it; otherwise the issue
body links `evidence/` paths in the repository.
