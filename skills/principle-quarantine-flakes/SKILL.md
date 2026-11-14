---
name: principle-quarantine-flakes
description: Apply when a test fails intermittently. Quarantine the test, name its trigger or record the open question, and file it. Retrying until green hides the failure and corrupts the suite's signal.
license: Apache-2.0
---

# Quarantine Flakes

A flake is a bug in the test or the system, not noise. Retry-until-green
destroys the suite's meaning.

- Mark it, add its row to `qa/quarantine.md`, record the trigger.
- Every quarantined test carries an open question.
- Quarantine is triage, not a parking lot.
- No release carries an untriaged flake.

Sources: qa-regression and qa-gate skills.
