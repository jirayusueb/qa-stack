# Driver mapping

QA Stack does not vendor a browser driver. It detects one and maps actions
to it. The preferred driver is fast-browser-use
(https://github.com/APUS-AI-Lab/fast-browser-use), a local-first
browser-automation agent skill.

## Install the preferred driver

- Skills route: `npx skills add APUS-AI-Lab/fast-browser-use`
- Manual copy: copy its skill directory into a host skill directory,
  project scope or user scope.

Detection: the driver's skill directory or tool is present on the host.
`qa-setup` records the result as `# browser-driver:`. Re-run `/qa-setup`
after installing.

## Action map

| Action | fast-browser-use | Generic fallback |
| --- | --- | --- |
| Open | driver opens the page in its isolated space | user opens it, shares the URL |
| Follow | driver executes the steps, one per line | user follows the steps on screen |
| Fill | driver types the named data set | user fills from the data set |
| Screenshot | driver captures the state | host screenshot tool, saved to evidence/ |
| Record | driver records the flow | host screen recording, saved to evidence/ |
| Capture console | driver reads the console log | user copies the console output |
| Capture network | driver reads the network log | user exports the network log |
| Compare | two recorded runs of the same flow | two manual recordings, labeled builds |

## Rules

- Skill bodies never name the driver. Only this file and `docs/harness.md`
  do.
- A missing driver is never an error. Say `fallback: manual` and hand the
  user the steps.
- Driver failures during a flow are findings: log them with the console
  capture, do not silently retry.
- Credentials stay with the user's own browser state. Never record them.
