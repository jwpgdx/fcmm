# FCMM Hero Performance Audit — 2026-10-08

Status: READ_ONLY AUDIT / LOCAL PROTOTYPE ONLY / NO PRODUCT SOURCE COMMITTED

## Scope

Evaluate whether Home `Main-1.vue` can preserve its current layered visual and carousel behavior with less runtime/bundle overhead, especially by removing Swiper from the Home Hero.

## Current implementation

`Main-1.vue` creates three Swiper instances:

1. background image Swiper;
2. foreground image Swiper;
3. transparent interaction Swiper with Pagination + Navigation + Autoplay.

The main Swiper owns the active index and calls `slideToLoop(..., 800)` on the other two instances.

The Hero needs only:

- 3 slides;
- background + foreground image layers around a shared text layer;
- 4-second autoplay;
- horizontal swipe/drag;
- pagination;
- per-slide background colour;
- existing text reveal/parallax behavior.

These requirements do not inherently require a carousel package.

## Repository-wide Swiper boundary

Swiper cannot currently be removed from `package.json` without a broader package because it is also used by:

- `src/pages/Shop/components/ProductImage.vue`;
- `src/pages/CollectionPage.vue`;
- `src/pages/Feature/Special/components/espacio-swiper.vue`;
- `src/pages/Feature/Special/components/ive-rei/ive-rei-section-3.vue`.

Recommendation here is therefore **remove Swiper from Home Hero only**, not remove the dependency project-wide.

## Hero asset weight

Six active Hero layer images total about **2.65 MiB**:

- main-1-1-1.webp — 531,668 bytes
- main-1-1-2.webp — 119,246 bytes
- main-1-2-1.webp — 1,246,506 bytes
- main-1-2-2.webp — 133,074 bytes
- main-1-3-1.webp — 579,722 bytes
- main-1-3-2.webp — 169,780 bytes

The first slide pair alone is about **0.62 MiB**. A native Hero can load the first pair immediately and defer/preload later pairs after first paint instead of eagerly attaching all six visual backgrounds at initial render.

## Build measurement

Baseline build from active branch source:

- large initial/home JS chunk: **272.15 kB raw / 94.18 kB gzip**
- corresponding main CSS chunk: **66.58 kB raw / 12.58 kB gzip**
- Home chunk contains 11 Swiper sources.

A local-only native Vue/CSS/Pointer Events proof replaced the three Hero Swipers while keeping the 3-slide state, 4s autoplay, layered assets, pagination and pointer-swipe intent.

Prototype build:

- large initial/home JS chunk: **168.04 kB raw / 63.36 kB gzip**
- corresponding main CSS chunk: **52.94 kB raw / 10.63 kB gzip**
- Home chunk contains **0 Swiper sources**.
- Swiper moved into separate lazy chunks for routes that still need it.

Measured delta for the initial/home chunk:

- JS raw: about **-104.1 kB (-38%)**
- JS gzip: about **-30.8 kB (-33%)**
- main CSS raw: about **-13.6 kB**
- main CSS gzip: about **-2.0 kB**

This is a build-level comparison, not a complete field-performance benchmark.

## Prototype smoke

The local prototype:

- built successfully;
- passed `git diff --check`;
- served HTTP 200;
- rendered three pagination controls;
- after a 5.2s headless Chrome virtual-time smoke, autoplay advanced from slide 1 to slide 2.

The prototype was intentionally discarded after measurement and was **not** committed. It should not be treated as implementation authority.

## Recommended implementation

Proceed with a bounded **HOME-HERO-NATIVE-01** package:

- preserve the current visual composition and assets;
- replace the three Swiper instances in `Main-1.vue` with one native carousel state machine;
- use Vue state + CSS transforms + Pointer Events;
- retain 4-second autoplay, swipe/drag, pagination and background-colour transition;
- preserve the text layer between background and foreground;
- preload only the first visual pair eagerly; defer later pairs safely;
- support `prefers-reduced-motion`;
- avoid changing Hero art direction, copy, image crop, height or Home composition in this package.

Implementation should use a robust wrap transition rather than the audit prototype's simplified circular-position proof.

## Acceptance

Before replacing the current Preview Hero:

- build + diff check;
- 390px and 1440px visual parity;
- slide 1/2/3 forward autoplay and 3→1 wrap;
- swipe left/right including 1→3 and 3→1 boundaries;
- pagination click;
- vertical page scroll not blocked on touch;
- background/foreground remain synchronized;
- text layer stays visually between the two image layers;
- no console/page errors;
- compare initial bundle output against this audit baseline.

No main merge or production deployment is implied.
