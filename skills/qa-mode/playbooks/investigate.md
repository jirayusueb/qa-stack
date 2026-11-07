### Investigate

**Explain why a known failure happens.** Use when the deliverable is a root-cause explanation, not a fix.

Read first: ../qa-repro/SKILL.md, ../qa-diagnose/SKILL.md, ../qa-bdd/SKILL.md

1. Run **qa-repro**. No reproduction, no investigation. Record the smallest failing case and the environment.
2. Run **qa-diagnose**. One variable at a time. Every hypothesis carries the observation that killed it or confirmed it.
3. When expected behavior is uncertain, run the grounding half of **qa-bdd** and cite the sources.
4. File the finding with **qa-file** when the user needs it tracked.

**Reply:** the root cause in one sentence, the evidence chain as one line per link, and the reproduction cost.
