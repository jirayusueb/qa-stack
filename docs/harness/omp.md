# omp adapter

omp installs Claude Code marketplace plugins, so it reads `.claude-plugin/`
and the root `skills/` directory.

```sh
omp plugin marketplace add jirayusueb/qa-stack
omp plugin install qa-stack@qa-stack
```

Restart omp, or run `/reload-plugins`. Skills are invoked as
`/skill:qa-mode` or read through `skill://qa-mode`. Personas in `agents/`
register as task agents. Do not also install through the skills route for
this project, because the plugin already provides the same skills and the
duplicate names shadow each other.

## Spawning

spawn_agent runs a fresh agent per worker brief. Never resume a worker.

## Evidence upload

The tracker CLI attaches files when the host allows it; otherwise the issue
body links `evidence/` paths in the repository.
