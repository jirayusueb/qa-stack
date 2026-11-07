### Fix verify

**Prove a fix kills the reported bug.** Use when a change claims to fix an issue and the deliverable is proof.

Read first: ../qa-verify/SKILL.md, ../qa-regression/SKILL.md, ../qa-bdd/SKILL.md

1. Reproduce the bug on the pre-fix tree. No pre-fix reproduction, no verification.
2. Apply the fix. Record the same flow after. Video or screenshots for both sides.
3. Check the issue's scenarios. A fix is proven when every `@issue-<n>` scenario passes.
4. Run **qa-regression**. The test fails on the pre-fix tree and passes on the fix.
5. Sweep the edge cases the scenario list names.

**Reply:** proven or not proven, the before and after evidence, and the regression test location.
