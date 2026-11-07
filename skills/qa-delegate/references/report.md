# Scoring reports

A report is accepted only when all hold.

1. The artifact path exists and is readable.
2. The report lines match the artifact. Spot-check one line against the
   file.
3. Verification ran and its output is in the artifact or the report.
4. The write scope was respected. Any file outside the scope is rejected.
5. No claim in the report lacks its evidence. A summary of a summary is a
   rejection.

Reject by naming the broken rule and the line. Accept by recording the
artifact path in the run notes. A rejected spawn may be re-briefed once with
the missing piece; a second rejection ends the stage.
