# Evidence

The evidence standard governs every artifact the stack produces. The full
text is [resources/document_standards/evidence-standard.md](../../resources/document_standards/evidence-standard.md).

## Citations

- External facts cite primary sources. Secondary sources are labeled.
- Every claim wears a confidence label: `verified`, `reported`, or
  `inferred`.
- Local claims cite the file and the command output.
- Uncited claims are deleted.

## Media

- Visual bug: screenshot of the failure state.
- Flow or timing bug: screen recording of the flow.
- Caption per file: what it shows, when captured, which build.
- Naming: `evidence/<issue-slug>-<seq>.png` or `.mp4`.
- Media attaches to the issue; the body links it.

## Research before writing

Any plan, spec, or issue written without grounded knowledge of the topic
gathers evidence first. The research is inline: web docs, standards, issue
trackers, or the codebase. Findings land in the artifact with citations.
There is no separate research skill; grounding is the first step of
writing.

Next: [principles](05-principles.md).
