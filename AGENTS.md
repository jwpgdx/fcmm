# FCMM Agent Guide

Before substantive work, read in this order:

1. `workspace/CURRENT.md`
2. `workspace/HANDOFF.md`
3. `docs/FCMM_PORTFOLIO_SCOPE.md`
4. only the source, asset, deployment config, or evidence needed for the bounded package

## Authority

`docs/FCMM_PORTFOLIO_SCOPE.md` owns the stable portfolio/product boundary.

Actual checked-out source, assets, config, build output, and actual Firebase Hosting state remain authoritative for implementation and runtime facts.

`workspace/CURRENT.md` is the short moving navigation pointer. `workspace/HANDOFF.md` defines takeover procedure. Slack is coordination/navigation only and never overrides Git or runtime evidence.

## Roles

Prime / Web GPT owns:

- portfolio/product direction and art-direction decisions;
- bounded work-package definition and acceptance criteria;
- Codex model and reasoning-effort selection;
- approval boundaries, result review, and the next package.

Codex CLI owns repo-local work inside the approved package:

`inspect -> implement -> test -> fix -> retest -> compact report -> STOP`

Use Codex CLI actively when it improves repo-wide search, implementation, verification, or independent review. For FCMM, prefer `gpt-6.1-sol/high` for normal multi-file implementation/debugging and `gpt-6.1-sol/xhigh` for broad final audits, difficult cross-cutting layout/performance work, or independent closeout review. Use lighter effort for narrow mechanical edits when higher effort adds little. Prime may choose differently per package.

CoS owns local workspace/browser/runtime work that benefits from the connected machine: exact worktree inspection, browser/UI acceptance, asset inspection, Firebase CLI execution, and other approved external/runtime operations.

Do not let CoS and Codex CLI mutate the same worktree/package concurrently.

## Single-writer rule

One worktree has one active mutation owner. Read-only reviewers may run in parallel.

If the worktree is dirty and ownership or intent is unclear, stop writes and reconcile first. Never use `reset --hard`, arbitrary stash/clean, history rewrite, or unknown-work deletion to recover context.

## Resume and retry safety

After a network/stream interruption, verify actual HEAD, worktree, running process, and relevant remote/runtime state before repeating work. Completed or still-running work must not be restarted merely because a response was lost.

A missing deployment response is not proof that deployment did not occur. Inspect Firebase Hosting state before retrying an ambiguous deploy.

## External mutation boundary

The following require explicit package approval before execution:

- Firebase Hosting deployment;
- repository visibility changes;
- secrets or external-service configuration changes;
- destructive asset cleanup;
- history rewrite / force push;
- any future backend/data mutation if such a backend is introduced.

A normal local edit or verification package does not implicitly authorize deployment.

## Public-repository asset safety

The repository is currently public. Do not commit newly introduced fonts, licensed source assets, credentials, private client material, or other redistribution-sensitive files without checking whether public repository distribution is intended and permitted.

Changing the repository to private is a separate explicit decision and does not itself establish asset-license permission.

## Verification discipline

This repository currently has no established lint/typecheck/test framework. Match verification to the change:

- always use `git diff --check`;
- use `npm run build` for source/config changes that affect the build;
- use focused browser checks for responsive, sticky, animation, interaction, or routing changes;
- do not invent broad test claims that the repository cannot actually support.

When a final portfolio closeout package is reached, perform a broader route/responsive/performance/accessibility review as a separate bounded package rather than silently expanding a small fix.
