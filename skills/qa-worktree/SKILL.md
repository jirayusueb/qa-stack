---
name: qa-worktree
description: Run /qa-worktree to create isolated git worktrees for parallel QA work. Use it when verification needs the pre-fix tree while the fix is checked out, when parallel reproduction attempts each need their own checkout, or when teammates need disjoint write scopes. Worktrees are named, single-purpose, and cleaned up.
license: Apache-2.0
---

# QA worktree

One worktree, one purpose, one owner. The main tree stays untouched.

## When

- **Pre-fix checkout.** qa-verify reproduces on the pre-fix tree. With
  the fix in the main tree, a worktree at the pre-fix commit is that
  tree. No stashing, no checkout dance.
- **Parallel attempts.** qa-repro spawns workers with different seeds or
  environments. Each gets its own worktree, so disjoint write scopes are
  structural, not negotiated.
- **Team scopes.** Teammates run stages that would otherwise write the
  same files. One worktree per member makes the scopes disjoint by
  construction.
- **Side builds.** A gate or a compare needs a second build of another
  commit. Build it in a worktree.

## Rules

1. Name worktrees after their purpose: `qa-verify-<issue>`,
   `qa-repro-<attempt>`, `qa-<member>`. The name says the owner.
2. Worktrees live outside the main tree, never nested inside it.
3. Evidence, reports, and artifacts write back to the main tree's
   `evidence/` and `docs/` paths, or are copied there before cleanup. A
   finding that lives only in a deleted worktree is a lost finding.
4. One worktree is one purpose. A second purpose is a second worktree.
5. Clean up when the purpose ends: remove the worktree, say so in the
   run notes. Stale worktrees from dead runs are removed on sight.
6. Dependencies install per worktree when the project requires it. Say
   the cost before creating the third copy.
7. Worktrees are read-mostly toward git history: checkout, never commit
   from a QA worktree unless the stage's deliverable is a change.

## Report

Worktrees created (name, path, purpose, owner), artifacts copied back,
and worktrees removed. One line each. What remains open says why.
