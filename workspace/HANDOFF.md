# FCMM — Durable Handoff

Status date: 2026-10-05 KST

This file defines takeover procedure for a new ChatGPT/Prime session, CoS session, Codex CLI worker, account, or operator.

## Authority order

1. `docs/FCMM_PORTFOLIO_SCOPE.md` for stable portfolio/product boundary.
2. Actual checked-out source/assets/config and actual Firebase Hosting state for implementation/runtime facts.
3. `workspace/CURRENT.md` as the moving navigation pointer.
4. This handoff for takeover procedure.
5. Dated audits or reports as evidence snapshots.
6. Slack as coordination/navigation only.

A lower layer must not silently override a higher layer.

## Fail-closed takeover checklist

Before writing or performing a remote action:

1. Confirm repository `jwpgdx/fcmm` and intended local worktree.
2. Read Slack `#fcmm-dev` START HERE if available; treat it only as a pointer.
3. Read `AGENTS.md`, `workspace/CURRENT.md`, this file, and `docs/FCMM_PORTFOLIO_SCOPE.md`.
4. Verify actual branch, `git rev-parse HEAD`, `git status --short`, and remote divergence.
5. If dirty, identify which files are intentional and who owns them. Preserve them; do not reset/stash/clean to make the tree look clean.
6. Check for an active CoS/Codex/npm/Vite/Firebase/browser verification process relevant to the package before starting a duplicate.
7. For deployment, verify the currently deployed Firebase Hosting state instead of assuming GitHub HEAD is deployed.
8. Name the exact bounded package and its mutation owner.
9. Reconcile approval boundaries, especially deploy, repository visibility, secrets, and destructive asset cleanup.
10. Continue only from the first actually unfinished boundary.

## Current known lineage

The remote implementation checkpoint before this operations bootstrap is:

`66b088a06088c5fa8b816feb586e5eb8d7a24d8b`

That checkpoint includes the Product Detail sticky-width fix and the broader current portfolio source/assets that were pushed after the 2026-09-30 audit.

At the last successful local verification before this operations bootstrap, several local font-related files were intentionally excluded from the public repository because redistribution permission had not been established. Treat the current local state as unknown until it is rechecked; do not reconstruct or delete those files from this prose.

## Deployment handoff rule

The Firebase presentation URL used by the project is:

`https://fcmm-app.web.app`

The Product Detail sticky-width fix was previously deployed and browser-verified at 768px with ProductInfo remaining 384px before/after sticky transition.

This historical verification is evidence, not proof that every later GitHub commit is deployed. For each future deploy, record the source commit/worktree identity and verify the actual URL afterward.

## Ownership transfer

One active mutation owner per worktree/package. When ownership changes between Prime/CoS/Codex/operator, post an `OWNERSHIP` update in Slack and have the incoming owner verify the actual Git/runtime state. The Slack message itself does not transfer technical authority.

## What must not be copied into GitHub or Slack

Do not store credentials, tokens, private keys, private customer/client material, or redistribution-sensitive source assets merely to simplify handoff.

Point to the approved secure/local custody boundary instead.
