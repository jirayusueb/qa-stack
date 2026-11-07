# Lifecycle map

The eight stages and two tracks of the QA Stack. Every artifact names its
stage. A stage never runs on top of a missing predecessor.

| Stage | Skill | Artifact | Exit condition |
| --- | --- | --- | --- |
| Intake | qa-session | intake notes | report understood, scope decided |
| Ground | inline in the consumer | cited behavior claims | every claim carries a source |
| Reproduce | qa-repro | repro notes + video + screenshot | smallest failing case recorded |
| Diagnose | qa-diagnose | diagnosis report | one root cause, chain complete |
| Spec | qa-bdd | feature file | scenarios cited, tagged, reviewed |
| File | qa-file | issue URL | durable body, media attached |
| Fix-Verify | qa-verify, qa-regression | verify report + test | before/after proof, test landed |
| Gate | qa-gate | gate verdict | checklist complete, verdict given |

Tracks: Explore (qa-explore) feeds Intake. Ask (qa-ask) stays outside.

## Entry points

- Fresh report -> Intake.
- "Why does this happen" -> Diagnose, rewound through Reproduce.
- "Is this fix good" -> Fix-Verify, rewound through Reproduce.
- "Is it safe to ship" -> Gate.
- "Look for bugs" -> Explore track, then Intake per finding.
- A question only -> Ask track.

## Rewind rule

Walk back from the requested stage. The first stage whose artifact is missing
is the entry. Say which stage you rewound to and why. Skipping a stage is a
decision the user makes, never a default.
