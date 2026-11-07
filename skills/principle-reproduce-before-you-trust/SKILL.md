---
name: principle-reproduce-before-you-trust
description: Apply when diagnosing, fixing, or verifying any reported failure. Nothing downstream of a bug report is trusted until the failure is reproduced: same steps, same failure, recorded. An unreproduced report returns to intake, never to diagnosis.
license: Apache-2.0
---

# Reproduce Before You Trust

A report is a claim. The reproduction is the fact. Diagnosis on an
unreproduced report invents causes for a failure you have not seen.

- Reproduce before hypothesizing.
- Record the smallest failing case and the environment.
- Say "not reproduced" plainly when it does not fail.

Sources: qa-repro skill; QA Stack design spec.
