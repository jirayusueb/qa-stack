# Execution instructions

How a host runs one QA Stack lifecycle stage end to end.

1. Resolve the repository root from the invoked skill's path.
2. Read the config `qa-stack.config.md` if present. Reply language, spawn
   cap, execution mode, tracker, driver.
3. Open the stage skill named by the router. Copy its steps into the run's
   only todo list.
4. Dispatch stage work per the execution mode: run inline, spawn per the
   qa-delegate brief, or assign on the team board.
5. Workers resolve `references/` against the invoked skill directory and
   `agents/`, `resources/`, `docs/` against the repository root. Absolute
   paths only when passing files to a child.
6. A stage ends when its artifact exists and meets its exit condition from
   the lifecycle map (`skills/qa-mode/references/lifecycle.md`).
7. The run reports artifacts, never summaries. Evidence files are named per
   the evidence standard.

Stage order and rewind rules are owned by the router, not by this file.
