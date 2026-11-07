# Brief format

Copy this skeleton into every spawn brief. Field order is fixed.

```
Context: <what the spawn needs to know, three sentences maximum>
Write scope: <exact paths, or "read-only">
Task:
1. <step>
2. <step>
Success criteria: <observable end state>
Verification: <command or check to run on the artifact>
Report: <artifact path> plus <one line per finding>
```

## Rules

- Context names files by path, never by summary.
- Write scope lists paths, not directories with exceptions.
- Task steps are runnable without asking the parent a question.
- Success criteria are observable by the spawn itself.
- Verification runs before the report. A spawn that cannot verify says so
  instead of reporting success.
- The report is the artifact path plus lines. No prose conclusion without
  the artifact.
