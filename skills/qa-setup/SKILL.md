---
name: qa-setup
description: Run /qa-setup once per project to configure the QA Stack. Use it before the first /qa-mode run, when reply language, spawn caps, execution mode, the issue tracker, or the browser driver change. It detects capabilities, writes the config file the router reads, and reports what it found.
license: Apache-2.0
---

# QA setup

One config file, written once, read by every run.

## What to record

Write or update a config file at `qa-stack.config.md` in the repository root.
Record exactly these lines, each as `# key: value`.

- `# reply-language:` one of `en`, `th`, `match`. `match` mirrors the user's
  latest message. Unset means `en`. Artifacts follow `artifact-language`.
- `# artifact-language:` one of `en`, `th`, `match`. The language issues,
  reports, and specs are written in. Unset means `en`. `match` writes the
  artifact in the language of the report that produced it.
- `# max-spawns-per-run:` a number or `none`. The router counts every spawn,
  including retries and reviewers, and stops at the cap to ask.
- `# execution-mode:` one of `solo`, `subagents`, `team`, `auto`. `auto`
  detects on the next run.
- `# issue-tracker:` the tracker identifier when the repository declares
  it unambiguously, otherwise `none`. Never a setup question; qa-file
  resolves it at first file.
- `# browser-driver:` the scripted driver, `playwright` or `none`. See
  detection below.
- `# real-browser-driver:` the real-browser layer for logged-in flows,
  `ego-lite` or `none`. Absent means `none`, never a mid-run install.

## Detection

Run these checks and record the results. Never guess a capability.

1. **Spawn capability.** Does the host expose a subagent or spawn tool? See
   `docs/harness.md` for the name per host. Present means `subagents` or
   `team` is available.
2. **Team capability.** Does the host expose teammates or a task board?
   Present means team mode is available.
3. **Issue tracker.** Never touched at setup. Record `# issue-tracker:`
   only when the repository already declares its tracker unambiguously,
   for example a single tracked remote. Otherwise record `none` silently
   and let qa-file resolve the tracker at first file, not setup. Do not
   check authentication, do not ask about repositories, do not fail on a
   missing tracker CLI.
4. **Browser drivers.** Scripted layer: is Playwright installed? Detect it
   from the project config, for example `playwright.config.*`. Record
   `playwright` or `none`. Real-browser layer: is a real-browser agent
   browser such as ego lite installed on the machine? Record the result;
   absent is fine and the fallback chain applies. Detection details live
   in `../qa-browser/references/drivers.md`.

## Questions

Ask at most one gate question per turn, and only these:

- Reply language, when unset.
- Execution mode, when detection is ambiguous.

Everything else, detect and record. The tracker is never a setup
question.

## Reply

Report what was written, one line per setting, and what was detected but not
configured. Say the config path. A re-run changes settings; it never resets
the ones you did not name.
