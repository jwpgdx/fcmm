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

Portfolio copy should distinguish:

- work performed during the commissioned FCMM project;
- later portfolio-specific refinement or redesign;
- direct user design/implementation work;
- any external concept/design contribution;
- any later AI-assisted implementation.

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

A successful local build or GitHub push is not equivalent to a Firebase deployment. GitHub source state and deployed Hosting state must be tracked separately.

## Repository visibility

At adoption of this operating model, `jwpgdx/fcmm` is public. Public visibility is not required for the Firebase-hosted portfolio to remain viewable. Repository-visibility changes are a separate explicit operation.
