# FCMM Agent Guide

Before substantive work, read in this order:

1. `workspace/CURRENT.md`
2. `workspace/HANDOFF.md`
3. `docs/FCMM_PORTFOLIO_SCOPE.md`
4. only the source, asset, deployment config, or evidence needed for the bounded package

## Authority

`docs/FCMM_PORTFOLIO_SCOPE.md` owns the stable portfolio/product and attribution boundary.

Actual checked-out source, assets, config, build output, and actual Firebase Hosting state remain authoritative for implementation and runtime facts.

`workspace/CURRENT.md` is the short moving navigation pointer. `workspace/HANDOFF.md` defines takeover procedure. Slack is coordination/navigation only and never overrides Git or runtime evidence.

When CURRENT identifies an active feature branch newer than `main`, do not assume default `main` is the continuation source. Verify the named branch and exact SHA first.

## Roles

Prime / Web GPT owns:

- portfolio/product direction and art-direction decisions;
- bounded work-package definition and acceptance criteria;
- Codex model and reasoning-effort selection;
- approval boundaries, result review, and the next package.

Codex CLI owns repo-local work inside the approved package:

`inspect -> implement -> test -> fix -> retest -> compact report -> STOP`

Do not invoke Codex CLI by default. Prime should handle straightforward inspection, decisions, and small edits directly. Use Codex only when it materially improves the work: the task needs substantial reasoning, repo-wide or cross-file investigation, difficult coupled debugging, an independent review, or CLI execution is meaningfully faster/safer than doing it directly.

When Codex is justified, choose the lowest sufficient effort. `gpt-6.1-sol/high` is appropriate for genuinely nontrivial multi-file work; `gpt-6.1-sol/xhigh` is reserved for reasoning-heavy broad audits, difficult coupled layout/performance investigations, or important independent closeout review. Do not use Codex merely because it is available, and do not automatically escalate model/effort or start the next package.

CoS owns local workspace/browser/runtime work that benefits from the connected machine: exact worktree inspection, browser/UI acceptance, asset inspection, Firebase CLI execution, and other approved external/runtime operations.

Do not let CoS and Codex CLI mutate the same worktree/package concurrently.

## Single-writer rule

One worktree has one active mutation owner. Read-only reviewers may run in parallel.

If the worktree is dirty and ownership or intent is unclear, stop writes and reconcile first. Never use `reset --hard`, arbitrary stash/clean, history rewrite, or unknown-work deletion to recover context.

For FCMM, the original local worktree may contain intentional font work that is not safe to publish. Prefer an isolated worktree for remote feature-branch work until CURRENT says the original worktree has been reconciled.

## Resume and retry safety

After a network/stream interruption, verify actual HEAD, worktree, running process, and relevant remote/runtime state before repeating work. Completed or still-running work must not be restarted merely because a response was lost.

A missing deployment response is not proof that deployment did not occur. Inspect Firebase Hosting state before retrying an ambiguous deploy.

## Durable closeout rule

A bounded package or user decision is not cross-account durable merely because it exists in chat or Slack.

At a meaningful package boundary, Prime should ensure that:

- source/decision state is committed or otherwise referenced by an exact Git SHA on a durable branch;
- `workspace/CURRENT.md` points to the active checkpoint and the next unfinished boundary;
- `workspace/HANDOFF.md` is updated when takeover procedure, ownership, worktree custody, or external boundaries changed materially;
- Slack receives one concise `CHECKPOINT`, `DECISION`, `CORRECTION`, `RESOLVED`, `NEXT`, or `OWNERSHIP` pointer.

Long logs and detailed evidence stay in GitHub. Slack only points to them.

## Deployment trigger boundary

Repository automation matters even for documentation-only changes:

- a push to `main` or `master` triggers the Firebase live deploy workflow;
- a same-repository pull request triggers the Firebase preview workflow;
- a plain non-PR feature-branch push does not trigger those two workflows.

Therefore a docs-only main push or PR can still have an external Firebase effect. Do not merge/push to those trigger surfaces without accounting for that effect.

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
