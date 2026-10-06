# FCMM Slack Coordination Policy v1

Date: 2026-10-06 KST

Status: ADOPTED / SLACK_NON_AUTHORITATIVE / SINGLE_CHANNEL

## Purpose

Slack provides a lightweight operational timeline for FCMM finishing work. It answers what is active, what changed, what is blocked, and where durable evidence lives.

Slack does not replace GitHub, the actual worktree, or Firebase Hosting state.

The operating goal is cross-account continuity: another GPT account should be able to locate the current package from GitHub + Slack without depending on the prior chat transcript.

## Channel topology

Use one channel:

- `#fcmm-dev` (`C0C6MCU79J6`) — implementation, visual polish, browser verification, asset/content cleanup, closeout, and deployment coordination.

Do not add a release channel unless repeated deployment work proves a need. FCMM does not need MOCHUNG's heavier topology by default.

## Authority layers

1. `docs/FCMM_PORTFOLIO_SCOPE.md` owns stable portfolio/product/attribution boundaries.
2. Versioned source, operational docs, decisions, and checkpoint evidence live in GitHub.
3. Actual worktree and Firebase Hosting own their real current state.
4. `workspace/CURRENT.md` is the current navigation pointer.
5. Slack coordinates and points to those authorities; it never overrides them.

## Message discipline

Post only at meaningful boundaries:

- `START`
- `CHECKPOINT`
- `BLOCKER`
- `DECISION`
- `CORRECTION`
- `RESOLVED`
- `NEXT`
- `OWNERSHIP`

Preferred compact shape:

```text
<TYPE> | FCMM | <YYYY-MM-DD HH:mm KST> | owner=<Prime|CoS|Codex>
Scope/state: <bounded package and exact status>
Evidence: jwpgdx/fcmm@<full SHA> — <durable file/route/check>
Worktree/runtime: <clean|dirty + owner>; <Firebase state if relevant>
Authority: <branch/local-only|deploy approved|deploy not authorized>
Result/blocker: <one concrete result>
Next: <single next boundary>
```

Long diffs, detailed audits, screenshots, test matrices, and handoff instructions belong in GitHub or the relevant durable artifact, not repeated in Slack.

## Durable package closeout

At a meaningful package boundary:

1. make the implementation/decision durable in Git or record the exact existing Git evidence;
2. update `workspace/CURRENT.md` when active branch, completed work, next boundary, verification, provenance, or custody changed;
3. update `workspace/HANDOFF.md` when takeover procedure/ownership/worktree/external boundaries changed materially;
4. post one concise Slack pointer.

A Slack-only decision is not sufficient for cross-account continuation.

If main is intentionally stale because updating it would trigger deployment, the Slack message must point to the active feature branch and CURRENT on that branch.

## GitHub versus Slack

Use GitHub for:

- operating rules and handoff;
- source and asset changes;
- durable design/product/attribution decisions;
- exact commit identities;
- verification evidence worth preserving.

Use Slack for:

- current package ownership;
- concise checkpoints;
- blockers, corrections, and decisions;
- links/pointers to GitHub evidence;
- deployment boundary/status;
- next-step navigation.

A Slack `DECISION` or reaction is not permission for an unrelated deployment or destructive action.

## Single mutation owner

CoS and Codex CLI must not concurrently mutate the same FCMM worktree/package.

Read-only review may run concurrently. A new writer must verify dirty state and active processes before taking ownership.

## Deployment discipline

Repository automation currently has external effects:

- push to `main` / `master` → Firebase live deploy;
- same-repository PR → Firebase preview deploy.

Therefore neither a docs-only main push nor "just opening a PR" is neutral.

When deploy is explicitly approved, record:

- source commit/worktree identity;
- build result;
- Firebase target/project;
- deployment result;
- production URL verification;
- whether source/config changed during deploy.

After ambiguous deployment output, inspect actual Firebase state before retrying.

## Public repository caution

The repository is currently public. Do not upload new font binaries or other potentially restricted/licensed assets solely for convenience. Repository-visibility change is a separate explicit decision.
