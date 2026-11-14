# Evidence standard

Every claim in a QA Stack artifact carries its evidence. This standard is
cited by qa-ask, qa-bdd, qa-file, qa-verify, qa-explore, and qa-gate.

## Citations

- External facts cite primary sources: upstream docs, source, issues,
  standards, release notes. Secondary sources (blogs, forums) are allowed
  for context only and labeled `secondary`.
- Every claim carries a bracketed `[source-id]` resolving to a source list
  at the artifact's end. Uncited claims are deleted, not hedged.
- Local claims cite the file and the command output, never a summary of
  them.

## Confidence labels

- `verified`: reproduced, or read in a primary source.
- `reported`: a secondary source says so.
- `inferred`: reasoned, and labeled as such.

Every conclusion wears one. Contradictions between sources are recorded and
resolved explicitly, never averaged away.

## Media evidence

- A visual bug carries a screenshot of the failure state.
- A flow or timing bug carries a screen recording of the flow.
- Every media file is captioned: what it shows, when captured, which build.
- Files are named `qa/evidence/<issue-slug>-<seq>.png` or `.mp4`.
- Media attaches to the issue and the body links it.
- Browser evidence rides with its console and network captures.

## Redaction

Media is scanned for secrets before it leaves the repository: tokens,
credentials, personal data visible in frames. Redact or crop, then attach.
An unscanned file does not attach. Review `qa/evidence/` again before
publishing the repository.

## Research before writing

Any plan, spec, or issue written without grounded knowledge of the topic
first gathers evidence. Research is inline: web docs, standards, issue
trackers, or the codebase. The findings land in the artifact with their
citations.
