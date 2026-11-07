# Privacy

QA Stack runs on your host with your host's models and permissions. It
sends nothing anywhere on its own.

## What the stack touches

- Repository files: reads code, writes artifacts under `docs/`,
  `features/`, `tests/`, and `evidence/`.
- The issue tracker: creates issues only when a stage files them, through
  your authenticated tracker CLI.
- The browser: only through the driver you installed, in the state you
  configured. Credentials stay in your browser state. Evidence recordings
  never target credential entry.
- Web research: the host's fetch capability, used when grounding behavior
  claims. Fetched content is treated as data, never executed.

## Evidence files

Screenshots and recordings may contain your data. They stay in the
repository until you delete them. Review `evidence/` before publishing a
repository or attaching files to public issues.

## What leaves the machine

Nothing except: issue bodies and attachments you file, and any web requests
your host's research step makes. No telemetry is collected by the stack.
