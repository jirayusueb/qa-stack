### Browser pass

**Exercise a web app through the browser driver.** Use when the bug or the sweep lives in a browser and the deliverable is captured evidence.

Read first: ../qa-browser/SKILL.md, ../qa-repro/SKILL.md

1. Run **qa-browser**. Read `references/drivers.md` and pick the driver. Detect before you promise.
2. Reproduce the reported flow. Capture console and network logs alongside the video.
3. Record the failure state in a screenshot at the moment it fails.
4. Feed the artifact into the stage that needs it: **qa-file**, **qa-verify**, or **qa-explore**.
5. Fall back to manual steps when no driver is installed. Say so.

**Reply:** the flow, the captured evidence files, and the driver used, or the fallback.
