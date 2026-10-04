# FCMM Slack Coordination Policy v1

Date: 2026-10-05 KST

Status: ADOPTED / SLACK_NON_AUTHORITATIVE / SINGLE_CHANNEL_INITIAL_TOPOLOGY

## Purpose

Slack provides a lightweight operational timeline for FCMM finishing work. It answers what is active, what changed, what is blocked, and where durable evidence lives.

Slack does not replace GitHub, the actual worktree, or Firebase Hosting state.

## Channel topology

Initial topology intentionally uses one channel:

- `#fcmm-dev` — implementation, visual polish, browser verification, asset/content cleanup, closeout, and deployment coordination.

Do not add a separate release channel unless repeated deployment work makes the split useful. A simple portfolio project does not need MOCHUNG's heavier dev/release topology by default.

## Authority layers

1. `docs/FCMM_PORTFOLIO_SCOPE.md` owns stable portfolio/product boundaries.
2. Versioned source, operational docs, decisions, and checkpoint evidence live in GitHub.
3. Actual worktree and Firebase Hosting own their real current state.
4. Slack coordinates and points to those authorities; it never overrides them.

## Message discipline

Post only at meaningful boundaries:

- `START`
- `CHECKPOINT`
- `BLOCKER`
- `DECISION`
- `RESOLVED`
- `NEXT`
- `OWNERSHIP`

Preferred compact shape:

```text
<TYPE> | FCMM | <YYYY-MM-DD HH:mm KST> | owner=<Prime|CoS|Codex>
Scope/state: <bounded package and exact status>
Evidence: jwpgdx/fcmm@<full SHA> — <file/route/check>
Worktree/runtime: <clean|dirty + owner>; <Firebase state if relevant>
Authority: <local-only|deploy approved|deploy not authorized>
Result/blocker: <one concrete result>
Next: <single next boundary>
```

Long diffs, detailed audits, screenshots, test matrices, and durable handoff instructions belong in GitHub or the relevant artifact, not repeated in Slack.

## GitHub versus Slack

Use GitHub for:

- operating rules and handoff;
- source and asset changes;
- durable implementation decisions;
- exact commit identities;
- verification evidence worth preserving.

Use Slack for:

- current package ownership;
- concise checkpoints;
- blockers and decisions;
- links to GitHub evidence;
- deployment boundary/status;
- next-step navigation.

A Slack `DECISION` or reaction is not permission for an unrelated deployment or destructive action.

## Single mutation owner

CoS and Codex CLI must not concurrently mutate the same FCMM worktree/package.

Read-only review may run concurrently. A new writer must verify dirty state and active processes before taking ownership.

## Deployment discipline

A local fix, Git commit, or push does not automatically authorize Firebase deployment.

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
