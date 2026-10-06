# FCMM Portfolio Scope

Status: ACTIVE

## Purpose

This repository is a non-commercial portfolio presentation derived from the FCMM commissioned-project lineage and subsequently developed further for portfolio presentation.

It is not the current official FCMM commerce service.

## Current product boundary

The current project is a Vue 3 / Vite SPA with static product/content data and Firebase Hosting.

Current repository behavior does not provide an application backend for:

- ordering or payment;
- customer accounts or authentication;
- inventory or delivery;
- commerce customer-service workflows.

Wishlist and cart behavior are browser-side portfolio/demo interactions. Their persisted state is local to the browser through `localStorage`.

Firebase is currently used for Hosting configuration; repository/runtime facts must be reverified before claiming any later Firebase service use.

## Portfolio lineage and claims

Do not describe this as a wholly unrelated greenfield redesign if that conflicts with the actual project lineage.

Portfolio copy must distinguish:

- work performed during the commissioned FCMM project;
- later portfolio-specific refinement, redesign, or reconstruction;
- direct user design/implementation work;
- any external concept/design contribution;
- any later AI-assisted implementation.

### Explicit current provenance

The following distinctions are frozen unless the user later corrects them:

- the FCMM site/UI work has real commissioned-project lineage;
- the current portfolio Home banner visual content was created later by the user for portfolio presentation and was not a client-requested deliverable;
- FCMM did run an IVE REI collaboration/campaign in the relevant brand context, but the user did not design or deliver that campaign/event page as part of the commissioned work;
- the current IVE REI editorial implementation is a later self-initiated portfolio extension: a demonstration of how the user would have designed/presented that campaign surface;
- real brand, campaign, celebrity, product, photography, styling, and other supplied assets remain attributable to their respective rights holders/contributors;
- retaining or featuring IVE REI must not imply that the user owned the celebrity collaboration, campaign creative direction, photography, styling, or original commissioned event-page delivery;
- other Featured/campaign pages are not automatically evidence of the user's commissioned contribution unless separately supported.

It is acceptable to present commissioned work and later portfolio extensions in the same FCMM case study when the boundary is explicit.

Do not infer unsupported research, performance results, business outcomes, or ownership claims from the codebase.

## Completion goal

The near-term goal is to finish the existing portfolio build through bounded polish rather than perform another wholesale rewrite.

Typical closeout work may include:

- visible UI/layout defects;
- responsive consistency;
- interaction and animation polish;
- asset/fallback correctness;
- content/portfolio-boundary accuracy;
- focused performance and accessibility cleanup;
- final desktop/mobile route acceptance.

Large architecture rewrites require an explicit Prime decision.

## Deployment boundary

Firebase Hosting is the presentation runtime.

Repository automation currently means:

- a push to `main` or `master` triggers live Firebase deployment;
- a same-repository pull request triggers Firebase preview deployment.

Therefore a documentation-only main push or PR is not operationally neutral. GitHub source state and deployed Hosting state must be tracked separately.

## Repository visibility

At adoption of this operating model, `jwpgdx/fcmm` is public. Public visibility is not required for the Firebase-hosted portfolio to remain viewable. Repository-visibility changes are a separate explicit operation.
