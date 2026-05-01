# FCMM

FCMM storefront rebuild project.  
This repository is a Vue 3 + Vite reimplementation of an earlier outsourced FCMM site that was originally built in Cafe24 with jQuery. The current version is being cleaned up and finalized for portfolio use.

## Overview

- Rebuilt as a single-page app with Vue 3, Vue Router, and Pinia
- Uses Firebase Hosting for deployment
- Includes editorial feature pages, product listing/detail flows, legal content pages, and wish/cart overlays
- Static product data is currently served from `public/items.json`

## Stack

- Vue 3
- Vite
- Vue Router
- Pinia
- Tailwind CSS
- Firebase
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
- `/legal/:section` legal documents

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

## Deployment

Firebase Hosting is configured through:

- `firebase.json`
- `.firebaserc`
- `.github/workflows/firebase-hosting-merge.yml`
- `.github/workflows/firebase-hosting-pull-request.yml`

Current Firebase project:

```text
fcmm-app
```

The merge deploy workflow now listens to both `main` and `master`.

Useful commands:

```bash
npm run firebase:login
npm run firebase:whoami
npm run deploy:preview
npm run deploy:hosting
```

At the moment, no Firebase account is authorized in this local environment yet, so login is still required before a manual deploy can succeed.

## Notes

- This working tree currently contains a large set of local asset changes that have not been pushed anywhere yet.
- There is no Git remote configured in the current repository state.
- Product data and many page assets are static, so content QA depends heavily on matching file names in `public/images` and entries in `public/items.json`.
- The current build succeeds with `npm run build`, but the main bundle is still relatively large.

## Recent Cleanup

- Fixed product detail fallback when an invalid product URL is opened
- Fixed missing special feature slug handling so invalid pages no longer throw runtime errors
- Fixed product gallery loading when image numbers are non-sequential
- Replaced the unfinished catch-all route with a proper 404 page
- Removed a dead `/cryptofont.css` reference from `index.html`
