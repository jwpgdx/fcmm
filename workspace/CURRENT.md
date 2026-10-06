# FCMM — Current State

Status date: 2026-10-06 KST

This is the short moving navigation pointer for FCMM portfolio completion work. It is not a replacement for actual Git/worktree/Firebase state.

## Repository checkpoints

- Repository: `jwpgdx/fcmm`
- Remote default branch: `main@a65743fc347b736650bdab3a1e2d0b720d0589a7`
- Verified P1 clean candidate:
  `fix/fcmm-p1-accuracy-final-20261005@7fcb80fe42346cb8fcf6361d0b8ec94d437183f4`
- Active portfolio-finishing branch:
  `feat/fcmm-home-comp-01`
- Active Home checkpoint before this documentation refresh:
  `870657b1e2aff4008f6d9e3a31313ebcc1ab8b79`

The active Home branch descends from the verified P1 candidate. P1 and Home composition changes are not merged into `main`.

Always verify the actual remote branch tip before mutation; the SHA above is a checkpoint, not a guarantee that the branch has not advanced.

## Current goal

Finish the existing FCMM portfolio through user-guided Home composition, then complete selected editorial/Featured work, then perform final route/responsive/performance/accessibility acceptance.

Do not start another wholesale redesign.

## Completed bounded package — P1 accuracy

The P1 package is implementation-complete on the clean candidate `7fcb80f...`.

It fixes:

- explicit product colour-variant routing instead of name-derived target IDs;
- the V-Neck Sweatshirt spelling issue;
- the footwear-style size chart being shown for apparel;
- privacy/terms copy that described unrelated commerce/wedding/account behavior.

Verification already completed on the diagnostic lineage and preserved in the clean candidate tree:

- `npm ci` PASS;
- `npm run build` PASS;
- `git diff --check` PASS;
- 90/90 explicit colour-variant targets valid;
- focused browser acceptance at 390px and 1440px for the affected product/legal flows.

Do not reimplement P1 unless later source changes invalidate this evidence.

## Active package — HOME-COMP-01

The user is reviewing Home visually and removing weak sections before deeper polish.

Current user decision already applied:

- KEEP `Main-1`;
- REMOVE `Main-5` ("Run The Line") from Home exposure;
- REMOVE `Main-Lookbook-Test` from Home exposure;
- PRESERVE both components and their assets for possible later reuse;
- do not treat removal from Home as authorization for destructive cleanup.

Current Home order after that decision:

1. `Main-1`
2. `Marquee-1`
3. `Main-3`
4. `Marquee-2`
5. `ProductList tag="ive-rei"`
6. `Main-4`
7. `Grid-Container-1`

The Home composition change passed `npm ci`, `npm run build`, and `git diff --check` in GitHub Actions. It has not yet received a focused Home browser acceptance package after the composition is frozen.

The next user-guided decision is the current `Main-3` section ("Essential / Fluid / Adaptive / for Expression"), then the remaining Home sections in order.

## Portfolio provenance guard

Do not conflate commissioned FCMM work with later portfolio extensions.

Current user clarification:

- the project has real commissioned FCMM lineage, including site/UI structure and user design/implementation work;
- the current portfolio Home banner visual content was created later by the user for portfolio presentation and was not a client-requested deliverable;
- FCMM did run an IVE REI collaboration/campaign in the relevant brand context, but the user did not design or deliver that campaign/event page as commissioned work;
- the current IVE REI editorial implementation is a later self-initiated portfolio extension: effectively "how I would have presented the campaign/editorial if I had designed that surface";
- retaining IVE REI may be useful as a portfolio showcase, but it must not imply campaign creative direction, photography, celebrity collaboration ownership, or commissioned event-page delivery by the user;
- other Featured/campaign pages must not automatically be claimed as the user's commissioned work without separate evidence.

Use `docs/FCMM_PORTFOLIO_SCOPE.md` as the stable attribution rule.

## Home / Featured audit evidence

Dated audits remain evidence snapshots, not current authority:

- finishing audit:
  `docs/fcmm-finishing-audit-2026-10-05@15ac5bc9217a71837e287c167d0d13c4c6521412`
  → `docs/FCMM_FINISHING_AUDIT_2026-10-05.md`
- Home/Featured audit:
  `docs/fcmm-home-featured-audit-20261005@dcc4b74713895ccc0008c28ee789a22159fedba4`
  → `docs/FCMM_HOME_FEATURED_AUDIT_2026-10-05.md`

Those documents contain older "next" instructions. CURRENT supersedes them where work has since completed or the user has made a newer decision.

## Original local worktree custody

Verified through CoS on 2026-10-06:

- path: `/Users/admin/Documents/github/fcmm`
- branch: `main`
- local HEAD: `66b088a06088c5fa8b816feb586e5eb8d7a24d8b`
- after non-destructive fetch, `origin/main`:
  `a65743fc347b736650bdab3a1e2d0b720d0589a7`
- local main is behind remote main by two commits;
- intentional local-only font state is still present:
  - modified `src/assets/css/fonts.css`;
  - `GoogleSansFlex-VariableFont_GRAD,ROND,opsz,slnt,wdth,wght.ttf`;
  - `SamsungSSHeadKR-Bold.woff2`;
  - `SamsungSSHeadKR-Light.woff2`;
  - `SamsungSSHeadKR-Medium.woff2`;
  - `SamsungSSHeadKR-Regular.woff2`.

Do not reset, clean, stash, pull over, or overwrite this worktree merely to synchronize it. Prefer an isolated worktree based on the active remote branch for new FCMM packages until the font custody issue is deliberately reconciled.

At the verification time, no FCMM Codex/Vite/Firebase mutation process was active. A separate MOGO Codex process was active and unrelated.

## Deployment / runtime boundary

Portfolio URL:

`https://fcmm-app.web.app`

Important workflow behavior:

- pushes to `main` or `master` trigger the Firebase live deployment workflow;
- same-repository pull requests trigger Firebase preview deployment;
- ordinary feature-branch pushes without a PR do not trigger those two workflows.

The documentation bootstrap push to main already caused a real successful Firebase deployment in GitHub Actions. Therefore "docs only" does not mean "no deploy" on main.

P1 and HOME-COMP-01 are branch-only and are not evidence that production contains those changes. Verify the actual deployed site/runtime independently before any release statement or retry.

## Operating model

- Prime / Web GPT: direction, design/product decisions, bounded packages, model/effort, approval, review.
- Codex CLI: repo-local inspect/implement/test/review work inside a bounded package.
- CoS: exact local worktree, browser/UI, asset and Firebase/runtime operations.
- GitHub: durable source/decision/handoff authority.
- Slack `#fcmm-dev` (`C0C6MCU79J6`): coordination/navigation only.
- One active mutation owner per worktree/package.
- Another GPT account must be able to resume from GitHub + Slack without this chat.

## Recommended Codex use

- narrow mechanical work: lowest sufficient reasoning;
- normal multi-file responsive/interaction/debug work: `gpt-6.1-sol/high`;
- broad audit, difficult coupled layout/performance investigation, provenance/closeout review, or independent second opinion: `gpt-6.1-sol/xhigh`.

Do not escalate automatically. Prime chooses the package and effort.

## Next safe boundary

Continue `HOME-COMP-01` with the user, one visible section at a time.

Next section for decision: `Main-3`.

Do not automatically:

- re-add Main-5 or Main-Lookbook-Test;
- delete preserved Home components/assets;
- start IVE REI redesign before Home composition is decided;
- merge to `main`;
- open a PR merely to preview without accounting for Firebase preview deployment;
- deploy Firebase production.

After Home composition is frozen, run a focused browser acceptance package, then move to the next explicitly chosen editorial/Featured package.
