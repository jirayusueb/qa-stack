# Issue standard

The contract for every issue qa-file writes. An issue that breaks a rule
does not ship to the tracker.

## Body rules

1. Behavior, not code. No file paths, no line numbers, no internal module
   names. They go stale and baffle later readers.
2. Domain language. Use the project's glossary or ubiquitous language.
3. Reproduction steps are mandatory, numbered, runnable, in domain terms.
4. Expected and actual stated in separate sections.
5. Evidence attached: the repro video and the failure screenshot, each
   captioned, linked in an Evidence section.
6. Thirty-second read. A developer absorbs it in one sitting.
7. Durable: still meaningful after a major refactor.

## Breakdown rules

1. One wrong behavior per issue.
2. Split when fixes are independent or parallelizable.
3. File in dependency order so Blocked by cites real issue numbers.
4. "None - can start immediately" when unblocked. Honest blocking only:
   mark a dependency when testing genuinely cannot start, not when it is
   merely convenient.

## Templates

The single-issue and breakdown templates live in the qa-file skill and are
copied verbatim. Section order is fixed. Additional context never carries
file paths.

## Review

A fresh-context reviewer reads the body against this standard before
filing. Verdicts: file, fix, block. Findings cite the rule and the line.
