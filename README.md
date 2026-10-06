# FCMM

FCMM storefront rebuild and portfolio project.

This repository is a Vue 3 + Vite reimplementation/reconstruction with real FCMM commissioned-project lineage and later portfolio-specific extensions. It is being finalized as a non-commercial portfolio presentation, not operated as the current official FCMM commerce service.

For current authority and takeover, read:

1. `AGENTS.md`
2. `workspace/CURRENT.md`
3. `workspace/HANDOFF.md`
4. `docs/FCMM_PORTFOLIO_SCOPE.md`

Do not infer current branch/runtime/deployment state from this README alone.

## Overview

- Vue 3 + Vue Router + Pinia SPA
- Firebase Hosting
- Editorial feature pages
- Product listing/detail flows
- Browser-local wish/cart demonstrations
- Static product data from `public/items.json`

## Stack

- Vue 3
- Vite
- Vue Router
- Pinia
- Tailwind CSS
- Firebase Hosting
- Swiper
- DOMPurify + marked

## Main Routes

- `/` home landing page
- `/best` best item listing
- `/shop/all` full product listing
- `/shop/:group/:value/:id` product detail
- `/feature` editorial feature index
- `/feature/campaign/:value` markdown-based campaign page
- `/feature/special/:value` component-based special page
- `/brand` brand overview
- `/collection` collection index
- `/legal/:section` portfolio/legal notices

## Current Structure

```text
src/
  components/        shared UI, header, footer, icons, global modals
  pages/             route-level pages
  router/            route definitions
  stores/            Pinia stores for items, cart, wish, overlays
  composables/       shared behavior hooks
public/
  images/            product and editorial assets
  md/                campaign markdown content
  legal/             legal markdown content
  items.json         product catalog source
```

## Local Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Before modifying an existing checkout, inspect `git status`, branch/HEAD, remote divergence, and `workspace/CURRENT.md`. The original Mac worktree may contain intentional local-only font work and must not be reset/stashed/cleaned merely to synchronize it.

## Deployment

Firebase Hosting is configured through:

- `firebase.json`
- `.firebaserc`
- `.github/workflows/firebase-hosting-merge.yml`
- `.github/workflows/firebase-hosting-pull-request.yml`

Firebase project:

```text
fcmm-app
```

Important automation:

- push to `main` or `master` triggers live Firebase deployment;
- same-repository PR triggers Firebase preview deployment;
- ordinary non-PR feature-branch pushes do not trigger those two workflows.

A documentation-only main push can therefore deploy production.

Useful manual commands, only inside an explicitly approved deployment package:

```bash
npm run firebase:whoami
npm run deploy:preview
npm run deploy:hosting
```

Verify current Firebase authentication and actual Hosting state rather than relying on historical machine notes.

## Portfolio attribution

The repository mixes real commissioned-project lineage with later portfolio-specific work. The exact attribution boundary is defined in `docs/FCMM_PORTFOLIO_SCOPE.md`.

In particular, do not assume that every current banner, campaign page, editorial treatment, or Featured page was a client-requested deliverable.

## Notes

- Product data and many page assets are static, so content QA depends heavily on matching files in `public/images` and entries in `public/items.json`.
- The project currently has no established lint/typecheck/test script; verification is package-specific and typically includes `git diff --check`, `npm run build`, and focused browser checks.
- GitHub, Slack, local worktrees, and Firebase runtime are separate state surfaces; `workspace/CURRENT.md` is the navigation pointer, not a substitute for direct verification.
