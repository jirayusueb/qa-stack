### Release gate

**Answer one question: is it safe to ship.** Use when the deliverable is a go or no-go verdict for a release.

Read first: ../qa-gate/SKILL.md

1. Run **qa-gate**. List the blockers. A blocker is an open issue tagged to this release.
2. Verify every claimed fix. Each needs its regression test green and its scenarios passing.
3. Sweep the flaky quarantine. No release carries an untriaged flake.
4. Check the evidence. Every green claim cites a run, a log, or a scenario result.
5. Verdict: go, no-go, or go with named risks. One word, then the reasons.

**Reply:** the verdict first, the checklist with one line per item, and the named risks.
