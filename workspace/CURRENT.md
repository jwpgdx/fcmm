# FCMM — Current State

Status date: 2026-10-05 KST

This is the short moving navigation pointer for FCMM portfolio completion work. It is not a replacement for actual Git/worktree/Firebase state.

## Repository checkpoints

- Repository: `jwpgdx/fcmm`
- Primary branch: `main`
- Last implementation checkpoint before operations bootstrap:
  `66b088a06088c5fa8b816feb586e5eb8d7a24d8b`
- Operations foundation checkpoint:
  `1c922dea35bf49edf0c09063af8062bb4fd7d9d9`
- The operations foundation adds `AGENTS.md`, this handoff structure, portfolio scope, and Slack coordination policy; it does not change runtime/source behavior.

Always verify actual `HEAD`, `origin/main`, branch, and worktree before mutation.

## Current goal

Finish the existing FCMM portfolio build through bounded polish and closeout, not another broad rewrite.

The immediate workflow is:

1. reconcile the actual local worktree against remote GitHub;
2. preserve any intentional local-only asset/font work;
3. perform a read-only final-polish inventory against the deployed portfolio;
4. execute one bounded implementation package at a time;
5. verify desktop/mobile browser behavior for each visual package;
6. commit/push durable checkpoints;
7. deploy to Firebase only when explicitly approved;
8. finish with a separate final portfolio acceptance package.

## Verified project boundary

At the last repository audit:

- Vue 3 + Vite 6 + Vue Router + Pinia + Tailwind 3 SPA;
- static product/content data;
- cart/wishlist demo state in browser `localStorage`;
- Firebase Hosting configuration without runtime Firebase application imports;
- no application backend for ordering/payment/account/inventory/delivery;
- portfolio site is intentionally non-commercial.

Reverify these facts if later code changes affect them.

## Product Detail sticky-width fix

The Product Detail sticky-width defect was fixed by attaching the real `.sidebar__inner w-full min-w-0` to the DOM-rendered ProductInfo root rather than passing the class to a fragment.

Verified result:

- previous 768px behavior: static 448.25px -> sticky fixed 384px;
- fixed 768px behavior: 384px -> 384px;
- duplicate sticky-sidebar generated wrappers: 11 -> 0;
- responsive boundary checks were performed at 639/640/641, 767/768/769, 1023/1024/1025, 1279/1280/1281, 1439/1440;
- the bounded fix was deployed to Firebase Hosting and the deployed 768px result was verified.

## Current deployment evidence

Portfolio URL:

`https://fcmm-app.web.app`

The deployment that included the Product Detail fix succeeded and returned HTTP 200 for root and Product Detail during that verification.

Do not assume future GitHub docs/source commits are deployed merely because `main` moved.

## Local-only state that must be reverified

At the last successful local Git check before this operations bootstrap, the public GitHub push intentionally excluded:

- modified `src/assets/css/fonts.css`;
- `GoogleSansFlex-VariableFont_...` font binary;
- four `SamsungSSHeadKR-*.woff2` font binaries.

They were excluded because the repository is public and public redistribution permission had not been established. Those font families were only defined and were not observed as active font-family usage at that time.

The local CoS caller identity was unavailable during this 2026-10-05 operations bootstrap, so the current local worktree was not re-read. Do not infer that the above six-file state is still exact. Reverify locally before any edit, cleanup, pull, or commit.

Because this operations bootstrap was committed through the GitHub connector, a local checkout that still points to `66b088a...` may now be behind `origin/main`. Fetch and reconcile non-destructively; do not reset/stash/clean away local work.

## Older audit findings — revalidation required

The 2026-09-30 audit identified these items, but they are not automatically considered still-open after later changes:

- portfolio/legal copy versus commerce-service claims;
- three derived color target mismatches;
- IVE REI section 3 missing fallback still;
- unused/experimental components and stale asset references;
- large font/media payload;
- Google Maps placeholder/external-request behavior;
- full desktop/mobile route regression and scroll/performance checks not yet performed.

Before fixing any item above, inspect the current source/runtime and confirm it still exists.

## Operating model

- Prime / Web GPT: direction, bounded packages, model/effort, approval, review.
- Codex CLI: repo-local inspect/implement/test/review/document work.
- CoS: local worktree, browser/UI acceptance, asset inspection, Firebase/runtime operations.
- GitHub: durable code/state/handoff authority.
- Slack `#fcmm-dev` (`C0C6MCU79J6`): coordination/navigation only.
- One active mutation owner per worktree/package.

## Recommended Codex use

For FCMM finishing work:

- narrow mechanical edit: choose the lowest sufficient effort;
- normal multi-file responsive/interaction/debug package: `gpt-6.1-sol/high`;
- broad final polish audit, coupled performance/layout investigation, or independent closeout review: `gpt-6.1-sol/xhigh`.

Prime chooses per package; no model/effort choice is permanent.

## Next safe boundary

First re-establish actual local authority:

- actual local HEAD / branch / `origin/main` divergence;
- dirty/untracked state and ownership;
- whether the local-only font files still exist;
- any active CoS/Codex/Vite/Firebase process.

Then perform a **read-only FCMM portfolio finishing audit** against the current source and deployed site. Produce a prioritized, bounded polish list before making broad new changes.

No Firebase deploy, repository-visibility change, licensed-asset upload, destructive cleanup, or unrelated architecture rewrite is implied by this next boundary.
