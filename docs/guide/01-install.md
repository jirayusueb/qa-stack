# Install

The skills route works everywhere. The plugin route adds worker personas,
rules, and update management on hosts that support plugins.

The command form depends on the route. A plugin namespaces its skills.

| Route | Command form |
| --- | --- |
| Claude Code plugin | `/qa-stack:qa-setup` |
| Claude Code skills route | `/qa-setup` |
| omp | `/skill:qa-setup` |
| Codex, Cursor, OpenCode | the skill picker, or the skill name |

## Skills route

```sh
npx skills add jirayusueb/qa-stack
```

Select the core skills and the principles. The router routes to what is
installed.

## Claude Code

```sh
claude plugin marketplace add jirayusueb/qa-stack
claude plugin install qa-stack@qa-stack
```

Restart the session after install.

## omp

```sh
omp plugin marketplace add jirayusueb/qa-stack
omp plugin install qa-stack@qa-stack
```

Restart omp, or run `/reload-plugins`. Do not also run the skills route for
this project; duplicate names shadow each other.

## Manual copy

Copy `skills/<name>/` into a host skill directory, project scope or user
scope.

## Browser driver (optional)

For web-app QA, install the preferred driver,
[fast-browser-use](https://github.com/APUS-AI-Lab/fast-browser-use):

```sh
npx skills add APUS-AI-Lab/fast-browser-use
```

Then re-run `/qa-setup` so the driver is detected. Without a driver the
stack falls back to manual repro steps and says so.

Next: [first session](02-first-session.md).
