# Browser QA

qa-browser exercises web apps through a driver and captures evidence.

## Actions

Open, follow a flow, fill a form, screenshot, record video, capture console
and network logs, compare before and after. Skill bodies name the action;
[the driver map](../../skills/qa-browser/references/drivers.md) names the
tool.

## Driver

The driver is Playwright, structured with the Page Object Model:
selectors live inside page objects, flows compose page object methods,
and evidence capture rides in the page object base. Install it as a
project dev dependency, re-run `/qa-setup`, and the config records it. No
Playwright means manual steps: the run hands you the flow and you record
the evidence.

## Evidence

Every capture lands under `evidence/` with the naming rules and captions
from [the evidence guide](04-evidence.md). Console and network captures ride
next to the media they explain. Before and after comparisons name both
builds.

## Where it feeds

- A reproduced flow feeds qa-file as issue evidence.
- A before/after pair feeds qa-verify as proof.
- A recorded sweep feeds qa-explore as the session log.

Next: [solo, team, subagents](07-solo-team-subagents.md).
