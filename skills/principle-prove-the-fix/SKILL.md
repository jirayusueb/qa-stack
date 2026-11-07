---
name: principle-prove-the-fix
description: Apply when a change claims to fix a bug. The fix is done when the reproduction passes, every tagged scenario passes, and a regression test that failed before now passes. Review, approval, and "looks right" do not count.
license: Apache-2.0
---

# Prove the Fix

A fix without proof is a prediction. Proof has a fixed shape:

- Reproduced before the fix, gone after.
- Scenarios pass on the fixed build.
- The regression test fails on the pre-fix tree, passes on the fix.

Anything less is reported as not proven.

Sources: qa-verify and qa-regression skills.
