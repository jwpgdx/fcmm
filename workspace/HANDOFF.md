# FCMM — Durable Handoff

Status date: 2026-10-06 KST

This file defines takeover procedure for a new ChatGPT/Prime session, CoS session, Codex CLI worker, account, or operator. The goal is that another GPT account can continue from GitHub + Slack without relying on the prior chat transcript.

## Authority order

1. `docs/FCMM_PORTFOLIO_SCOPE.md` for stable portfolio/product and attribution boundaries.
2. Actual checked-out source/assets/config and actual Firebase Hosting state for implementation/runtime facts.
3. `workspace/CURRENT.md` as the moving navigation pointer.
4. This handoff for takeover procedure.
5. Dated audits/reports as evidence snapshots only.
6. Slack as coordination/navigation only.

A lower layer must not silently override a higher layer.

## Fast takeover checklist

Before writing or performing a remote action:

1. Confirm repository `jwpgdx/fcmm`.
2. Read the latest `#fcmm-dev` START HERE / CHECKPOINT / NEXT / OWNERSHIP messages as navigation only.
3. Read `AGENTS.md`, `workspace/CURRENT.md`, this file, and `docs/FCMM_PORTFOLIO_SCOPE.md`.
4. Do not assume default `main` contains the active work. Read CURRENT for the named active branch and verify its remote tip.
5. Verify intended worktree, branch, `git rev-parse HEAD`, `git status --short`, and remote divergence.
6. If a worktree is dirty, identify its owner and intent. Do not reset/stash/clean/pull over unknown or intentional work.
7. Check for active Codex/CoS/npm/Vite/Firebase/browser verification before starting a duplicate package.
8. For any release claim, verify actual Firebase Hosting state separately from Git.
9. Name the exact bounded package, mutation owner, acceptance criteria, and adjacent prohibited boundaries.
10. Only then continue from the first actually unfinished boundary.

## Current continuation authority

Remote checkpoints at this handoff:

- `main@a65743fc347b736650bdab3a1e2d0b720d0589a7`
- P1 clean candidate:
  `fix/fcmm-p1-accuracy-final-20261005@7fcb80fe42346cb8fcf6361d0b8ec94d437183f4`
- active Home branch:
  `feat/fcmm-home-comp-01`
- verified Home source checkpoint before docs refresh:
  `870657b1e2aff4008f6d9e3a31313ebcc1ab8b79`

The active Home branch is descended from the P1 candidate. Do not restart P1 from `main`.

### P1 status

P1 is closed as a verified candidate. It already covers colour-variant routing, apparel Size Guide correction, and portfolio-accurate legal copy. Existing verification includes build, diff check, 90/90 variant-target validation and focused 390/1440 browser acceptance.

### Home status

The user is making visual composition decisions interactively.

Already frozen for the current Home package:

- keep `Main-1`;
- remove `Main-5` / Run The Line from Home exposure;
- remove `Main-Lookbook-Test` from Home exposure;
- preserve both components and their assets;
- do not perform destructive cleanup from this decision.

Current next visible section: `Main-3`.

Do not reopen those settled removals unless the user explicitly changes the decision.

## Original local worktree: preserve

The original worktree is:

`/Users/admin/Documents/github/fcmm`

Verified 2026-10-06:

- local `main@66b088a06088c5fa8b816feb586e5eb8d7a24d8b`;
- fetched `origin/main@a65743fc347b736650bdab3a1e2d0b720d0589a7`;
- local branch behind remote by two commits;
- modified `src/assets/css/fonts.css`;
- five untracked font binaries: one Google Sans Flex TTF and four SamsungSSHeadKR WOFF2 files.

These files were intentionally kept out of the public repository because redistribution permission was not established. Do not delete, reset, stash, overwrite, or casually pull over this worktree. Use an isolated clean worktree from the active remote branch for new packages unless Prime explicitly reconciles the font state.

## Portfolio provenance boundary

The FCMM portfolio must distinguish real commissioned-project lineage from later self-initiated portfolio work.

Current explicit user facts:

- the site/UI project has commissioned FCMM lineage;
- current Home banner visual content was added later by the user for portfolio presentation, not requested as a client deliverable;
- FCMM did run an IVE REI collaboration/campaign in the relevant period/context;
- the user did not design/deliver the IVE REI campaign/event page during the commissioned work;
- the current IVE REI editorial is a later personal extension showing how the user would have designed that experience;
- using real campaign/celebrity assets does not authorize a claim that the user led the campaign, celebrity collaboration, photography, styling, or commissioned event page.

Use this distinction in all portfolio copy and case-study decisions.

## Deployment handoff rule

Firebase presentation URL:

`https://fcmm-app.web.app`

Workflow behavior:

- `main` / `master` push → live Firebase deployment;
- same-repository PR → Firebase preview deployment;
- ordinary non-PR feature branch push → neither of those two workflows.

A docs-only main push can therefore deploy production. Do not use main merely to make handoff docs visible.

P1 and Home branches are not proof of deployed production state. Verify Hosting separately before release/deploy work and after ambiguous output.

## Durable evidence

Historical audits:

- `docs/fcmm-finishing-audit-2026-10-05@15ac5bc9217a71837e287c167d0d13c4c6521412`
- `docs/fcmm-home-featured-audit-20261005@dcc4b74713895ccc0008c28ee789a22159fedba4`

Treat their observations as evidence snapshots. Their old "next" instructions may be superseded by CURRENT.

Slack channel:

- `#fcmm-dev` — `C0C6MCU79J6`

Slack must point to durable Git state; it is never the sole authority for a decision that must survive account/session loss.

## Codex selection during takeover

Do not automatically start a Codex worker when taking over FCMM. First inspect the bounded task directly. Use Codex only when reasoning complexity, repo breadth, implementation/testing efficiency, or the value of an independent review makes it materially better than direct Prime/CoS work. If used, choose the lowest sufficient effort; reserve xhigh for tasks that genuinely need it.

## Ownership transfer

One active mutation owner per worktree/package. Read-only reviewers may parallel.

When ownership moves between GPT accounts/Prime/CoS/Codex/operator:

1. outgoing owner closes or pauses at a concrete boundary;
2. durable Git checkpoint and CURRENT are updated;
3. post `OWNERSHIP` or `NEXT` in `#fcmm-dev`;
4. incoming owner independently performs the takeover checklist.

The Slack post itself does not transfer technical authority.

## What must not be copied into GitHub or Slack

Do not store credentials, tokens, private keys, private customer/client material, redistribution-sensitive source assets, or font binaries merely to simplify handoff.

Point to the approved local/secure custody boundary instead.
