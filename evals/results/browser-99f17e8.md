# browser live run

- Commit: 99f17e8
- Host: DeepSeek Harness
- Model: Playwright 1.65.0 local
- Operator: lead
- Date: 2026-11-11T03:13:33.681Z

| Case | Expected | Observed | Verdict | Evidence |
| --- | --- | --- | --- | --- |
| browser-driver-detect | uses Playwright page object methods per the mapping in references/drivers.md | POM flow ran end to end against example.com | pass | smoke /tmp/qa-smoke: 1 test passed 6.8s; evidence/example-1.png, example-2.png, video.webm per naming rules |
| browser-evidence-capture | video of the flow and screenshot of the failure state plus console and network captures | POM flow ran end to end against example.com | pass | smoke /tmp/qa-smoke: 1 test passed 6.8s; evidence/example-1.png, example-2.png, video.webm per naming rules |
