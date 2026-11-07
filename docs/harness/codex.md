# Codex adapter

```sh
codex plugin marketplace add jirayusueb/qa-stack
codex plugin add qa-stack@qa-stack
```

Codex support is documented but unverified in this release. The skills
route is the fallback.

## Spawning

A task per worker, with a local executor required. Briefs follow
qa-delegate. Fresh task per worker, never resumed.

## Evidence upload

The tracker CLI attaches files when the host allows it; otherwise the issue
body links `evidence/` paths in the repository.
