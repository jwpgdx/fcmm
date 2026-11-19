# FCMM — Current State

Status date: 2026-11-19 KST

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

Current Home order after the latest portfolio-focused review:

1. `Main-1`
2. `Marquee-1` / TRACK SESSION
3. `Main-3` / IVE REI campaign editorial (Essential · Fluid · Adaptive)
4. `ProductList tag="ive-rei"` with four REI products directly below Main-3
5. `Main-4` / SALE
6. `Grid-Container-1` with only Most Wanted + New Arrival
7. Footer

Latest frozen decisions:

- keep the first TRACK SESSION marquee as the single intermission between Hero and Main-3;
- remove the second Essential / Fluid / Adaptive marquee because it repeats Main-3 without adding a new design idea;
- treat `Main-3` itself as the Home IVE REI campaign/editorial block; its Essential / Fluid / Adaptive language and `main-3-*` visual system are reused by the IVE REI detail implementation;
- do not render a separate `IveReiMain` on Home;
- keep the existing four IVE REI-tagged products directly under Main-3 so the campaign/editorial block flows into its products;
- keep `Main-4` / SALE after that four-product REI row;
- remove the Countdown third tile from the final grid; keep a 2-up Most Wanted + New Arrival exit for now;
- do not change Main-3 height yet. Judge the current sequence first, then decide whether Main-3 should be shortened.

The latest Home source commit is `b137c0456d653969f942b9f988f7a1d5d199146d`.

Verification on the updated preview lineage:

- `npm ci` PASS;
- `npm run build` PASS;
- `git diff --check` PASS;
- Firebase Preview channel update PASS;
- rendered preview contains Main-3, then the four IVE REI product cards, then SALE;
- browser verification found zero `feature/ive-rei/*` campaign image elements on Home, confirming that the separately-added IVE REI main block is gone;
- Main-3 performance polish removed the 0.05s transitions from scroll-driven transforms and replaced scroll-varying blur values with fixed blur values, preserving the composition while reducing per-scroll style work;
- directional 150-step headless-Chrome comparison: TaskDuration 1.270s → 0.765s (~40% lower) and RecalcStyleDuration 0.242s → 0.140s (~42% lower);
- the two floating Main-3 objects now use requestAnimationFrame + frame-rate-adjusted lerp smoothing rather than rendering the raw scroll target directly;
- deployed-browser verification after an abrupt scroll showed both floating transforms converging continuously across 12 sampled animation frames instead of jumping to the final target in one frame;
- local directional scroll check with smoothing remained lightweight (TaskDuration 0.546s, RecalcStyleDuration 0.129s) with zero runtime errors;
- Main-3 large text no longer waits on the previous element-visibility observer timing. It now reveals once when the Main-3 section top crosses 88% of the viewport height;
- Main-3 AnimatedText timing is 480ms with 2px initial blur and 0/100/200/300ms word staggering, while other AnimatedText users retain the existing 700ms / 4px defaults;
- deployed-browser wheel verification: text starts hidden at section entry, begins reveal after the first ~150px wheel movement, and settles to opacity 1 / blur 0; runtime errors 0;
- 390px Main-3 browser QA: no horizontal overflow and no runtime errors;
- no repeated Essential marquee and no Countdown tile are present.

Next user-guided decision: review this exact Preview visually, especially whether Main-3 still occupies too much vertical space and whether the 2-up final Explore block deserves to remain.

## Completed bounded package — HOME-HERO-NATIVE-01

The Hero audit remains recorded at:

`docs/FCMM_HERO_PERFORMANCE_AUDIT_2026-10-08.md`

Implementation source:

`9549120220c844e21a82ee5526671dcfb8f67ca9` — `perf: replace FCMM Home hero Swipers`

The Home Hero now:

- removes the three synchronized Swiper instances from `Main-1.vue`;
- uses Vue state + CSS transforms + Pointer Events for the 3-slide loop;
- preserves the existing Hero art direction, copy, crops, height, layered background/text/foreground composition, 4-second autoplay, pagination and background-colour transitions;
- defers later-slide layer attachment while keeping the first slide immediately available;
- leaves the project-wide Swiper dependency intact because other routes still use it.

2026-11-19 re-verification on the exact source commit:

- `npm ci` PASS;
- `npm run build` PASS;
- `git diff --check` PASS;
- large Home/initial JS chunk: 168.99 kB raw / 63.70 kB gzip;
- Chrome 1440×900: Hero height 844px, no horizontal overflow;
- Chrome 390×844: Hero height 788px, no horizontal overflow;
- autoplay verified 1 → 2 → 3 → 1;
- pagination verified 1 ↔ 3;
- pointer drag verified left and right;
- vertical page scroll remains functional;
- runtime/console errors observed during the scripted QA: 0.

The restored Firebase Preview contains this source and should be used for visual approval before any main/production release.

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

### Current Home review preview

Firebase Preview channel:

- channel: `fcmm-home-review-v2`
- URL: `https://fcmm-app--fcmm-home-review-v2-w8rzrimt.web.app`
- deployed source: `b137c0456d653969f942b9f988f7a1d5d199146d`
- expires: 2026-12-20 02:21:50 KST

Preview deployment verification:

- exact source rebuilt successfully with `npm run build` on 2026-11-19;
- `git diff --check` PASS;
- a fresh Preview channel URL was created after stale-cache confusion on the prior stable URL, and the release completed successfully;
- rendered Home no longer includes Run The Line, the two-image Lookbook Test block, SALE, the repeated Essential marquee, or the Countdown tile;
- `Main-1` remains, followed by TRACK SESSION and `Main-3`;
- the existing IVE REI campaign main visual now sits directly above four IVE REI products;
- the preview retains the project noindex directives.

Firebase CLI warned that it could not add/sync the preview channel domain with Firebase Auth. The current FCMM login/auth UI is demo-only with no application authentication backend, so this warning is not a blocker for the approved Home visual-review purpose. Do not treat this preview as authentication acceptance evidence.

Production `https://fcmm-app.web.app` was not changed by this preview deployment.

## Operating model

- Prime / Web GPT: direction, design/product decisions, bounded packages, model/effort, approval, review.
- Codex CLI: repo-local inspect/implement/test/review work inside a bounded package.
- CoS: exact local worktree, browser/UI, asset and Firebase/runtime operations.
- GitHub: durable source/decision/handoff authority.
- Slack `#fcmm-dev` (`C0C6MCU79J6`): coordination/navigation only.
- One active mutation owner per worktree/package.
- Another GPT account must be able to resume from GitHub + Slack without this chat.

## Codex use policy

Codex CLI is optional, not the default execution path.

Prime should do straightforward inspection, decisions, and small edits directly. Use Codex only when at least one of these is true:

- the task is difficult enough that additional reasoning is materially useful;
- repo-wide/cross-file investigation or coupled debugging would be faster or safer in Codex CLI;
- a substantial implementation is more efficient to execute/test through the CLI;
- an independent review materially improves confidence.

When Codex is used, choose the lowest sufficient reasoning effort. Use `gpt-6.1-sol/high` for genuinely nontrivial multi-file work and `gpt-6.1-sol/xhigh` only for reasoning-heavy broad audits, difficult coupled layout/performance investigations, or important independent closeout review.

Do not invoke Codex merely because it is available, and do not escalate automatically. Prime chooses per package.

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
