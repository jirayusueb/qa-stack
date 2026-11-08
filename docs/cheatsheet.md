# Cheatsheet

One page. Say the left column; the stack does the rest.

| You want | Say this | What runs |
| --- | --- | --- |
| Report a bug | "the export button does nothing" | intake, then the loop |
| File it properly | "file this report" | qa-file, evidence attached |
| Know why it breaks | "why does sync drop the last file" | qa-diagnose |
| Check a fix | "verify the fix for issue 12" | qa-verify, qa-regression |
| Hunt for bugs | "explore checkout for an hour" | qa-explore |
| Ask without running | "ask: what makes repro notes good" | qa-ask, read-only |
| Decide a release | "can we ship 2.4" | qa-gate |
| Test in a browser | "reproduce this flow in the browser" | qa-browser |
| Spec behavior | "write scenarios for refunds" | qa-bdd |
| Weekly status | "qa-report brief" | qa-report, digest reply |
| Check for rot | "run drift" | qa-drift |
| Preview an issue | "file this, preview first" | qa-file shows the body |
| Resume parked reports | new session, log read | qa-session + intake log |
| Configure once | "qa-setup" | detection + config |

Prefix any request with `brief` for one-screen replies, `detail` to
restore. Configure language with `/qa-setup`: `reply-language` and
`artifact-language`.

No skill named? Just describe the problem. The router classifies and
enters the lifecycle at the right stage.
