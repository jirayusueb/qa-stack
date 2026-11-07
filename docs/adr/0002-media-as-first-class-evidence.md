# ADR 0002: Media as first-class evidence

Date: 2026-11-08

## Status

Accepted.

## Context

Text repro notes undersell visual and timing failures: "the button looks
wrong" and "it flickers" cannot be reviewed from prose. Hosts increasingly
provide screenshot and recording capability through browser drivers.

## Decision

Video and image evidence are mandatory parts of the standard: a visual bug
carries a screenshot, a flow or timing bug carries a recording, every file
is captioned and named `evidence/<issue-slug>-<seq>.{png,mp4}`, media
attaches to the issue, and unscanned files never leave the repository
(redaction rule).

## Consequences

- qa-file refuses to file without evidence attached.
- qa-browser and qa-explore must capture, not just execute.
- Redaction is an enforced step, since media leaks secrets.
- Storage cost: evidence directories grow; privacy doc tells users to
  review before publishing.
