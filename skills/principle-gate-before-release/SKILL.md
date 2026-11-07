---
name: principle-gate-before-release
description: Apply when asked whether a release ships. No verdict without the checklist: blockers closed or deferrable by name, regressions green, scenarios passing, flakes triaged, every claim cited. The verdict is one word first.
license: Apache-2.0
---

# Gate Before Release

"Seems fine" is not a release decision. The gate runs the checklist and
cites every line.

- Blockers closed or deferrable by name.
- Suite green on the release build.
- Scenarios pass, quarantine triaged.
- Verdict first: go, no-go, or go with named risks.

Sources: qa-gate skill.
