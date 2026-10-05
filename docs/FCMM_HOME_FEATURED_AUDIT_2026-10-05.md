# FCMM Home + Featured Completion Audit — 2026-10-05

Status: READ-ONLY AUDIT / NO PRODUCT MUTATION / NO MAIN MERGE / NO FIREBASE DEPLOY

## Scope

This audit focuses only on the parts the user remembers as having been left mid-work:

- Home composition and Home-only experimental components/assets
- Featured index
- SPECIAL pages: IVE REI, Espacio, Seoul Fashion Week
- CAMPAIGN pages: FW23 Launch, SS23 Sale

The goal is not to redesign FCMM. It is to identify what is already portfolio-ready, what is visibly unfinished, and what appears to be an experiment that should not be treated as final.

## Source and runtime checkpoints

- GitHub main: `a65743fc347b736650bdab3a1e2d0b720d0589a7`
- Current deployed portfolio inspected: `https://fcmm-app.web.app/`
- P1 accuracy candidate is separate and not merged:
  `fix/fcmm-p1-accuracy-final-20261005@7fcb80fe42346cb8fcf6361d0b8ec94d437183f4`
- This audit does not merge P1 and does not deploy anything.

## Executive conclusion

Home is not in a final portfolio state. The current Home composition was changed on 2026-09-30 from the older `Main-2` flow to a mixed experimental composition containing `Main-5` and an explicitly named `Main-Lookbook-Test`, while `Main-6` was added in the same checkpoint but never connected to Home.

Featured is mixed:

- Espacio: substantial / close to portfolio-ready
- Seoul Fashion Week: substantial / close to portfolio-ready
- FW23 Launch: functional campaign template / usable
- SS23 Sale: functional campaign template / usable
- IVE REI: source contains multiple custom sections, but the live visual audit still reads as incomplete/minimal and requires a dedicated repair/art-direction pass

The next implementation should therefore start with Home composition recovery, then IVE REI, not with a site-wide rewrite.

## 1. Home — current live order

Current `src/pages/Home/index.vue` renders:

1. `Main-1`
2. `Marquee-1`
3. `Main-5`
4. `Main-Lookbook-Test`
5. `Main-3`
6. `Marquee-2`
7. IVE REI `ProductList`
8. `Main-4`
9. `Grid-Container-1`

### Git-history evidence

At `9b241400...`, Home instead rendered:

- `Main-1`
- `Marquee-1`
- `Main-2`
- `Main-3`
- `Marquee-2`
- IVE REI products
- `Main-4`
- `Grid-Container-1`

At `66b088a...` on 2026-09-30:

- `Main-2` was removed from Home
- `Main-5` was inserted
- `Main-Lookbook-Test` was inserted
- `Main-6` was added to the repository but not connected to Home
- `GridCountdown` became active through `Grid-3`

This strongly indicates an interrupted composition experiment rather than a clearly frozen Home final.

## 2. Home component classification

### KEEP / CURRENTLY SUBSTANTIAL

#### Main-1

- current hero carousel
- six dedicated hero images
- live page shows Fall Winter 2023 Show content
- visually substantive and integrated

Verdict: **KEEP, polish only if a concrete visual defect is found.**

#### Main-3

- layered background, plants, subject and floating images
- dedicated scroll/parallax logic
- live page exposes the section as a distinct editorial block

Verdict: **KEEP, visual acceptance still needed.**

#### Main-4

- dedicated two-image campaign composition
- live page renders a large main campaign block

Verdict: **KEEP.**

#### Marquee-1 / Marquee-2

- live page renders both text systems
- they visually bridge Home sections

Verdict: **KEEP unless later composition review shows redundancy.**

#### ProductList(tag="ive-rei")

- live Home renders four IVE REI products correctly

Verdict: **KEEP.**

### UNFINISHED / EXPERIMENTAL

#### Main-Lookbook-Test.vue

- explicitly named `Test`
- first appeared in the 2026-09-30 broad sync commit
- two-image split layout only
- live audit reads as floating/two-image content with little context

Verdict: **NOT FINAL. Must be renamed/finalized or replaced/removed.**

Do not merely rename the file. First decide whether this two-image composition belongs in the final Home sequence.

#### Main-5.vue

- first appeared in the same 2026-09-30 checkpoint as the Test component
- uses `main-5.webp`
- text: Run The Line / Track Session 400M / 10/16–10/29
- live audit reports large empty-looking blocks around this experimental segment

Verdict: **NEEDS DIRECT VISUAL REVIEW. Likely part of the unfinished Home replacement experiment.**

#### Main-6.vue

- first appeared on 2026-09-30
- has dedicated `main6-1.webp` and `main6-2.webp`
- implements a scroll-driven image switch/zoom
- is not imported or rendered by Home

Verdict: **UNRESOLVED CANDIDATE. Determine whether it was intended to replace Main-5, complement it, or be discarded.**

#### GridCountdown.vue / Grid-3.vue

- currently active through `Grid-Container-1`
- live audit found the third tile visually reads as placeholder/dev-like
- source accessibility labels are still generic Korean development labels such as `메인 이미지 3` / `배경 이미지`
- countdown animation is implemented, not just a stub

Verdict: **MECHANIC EXISTS, PRESENTATION NOT FINAL.** Keep the countdown concept only if it fits the intended Home story; replace placeholder labels and verify visual treatment.

### INACTIVE LEGACY / EXPERIMENT FILES

- `Main-1 copy.vue`
- `Main-2.vue`
- `Grid-Container-2.vue`
- `Grid-1 copy.vue`
- `Grid-1 copy 2.vue`
- `Grid-4.vue`
- `Grid-5.vue`
- `Grid-6.vue`

These are not current Home authority. Do not delete them yet. They may contain evidence of the interrupted design direction and should only be cleaned after final Home composition is chosen.

## 3. Home live visual findings

A read-only browser audit of the deployed site found:

- hero carousel: substantial
- upper Track Session marquee: functional
- mid-Home area: two large blocks read as empty/unfinished
- two-image / floating-image region: visually minimal and lacking context
- lower Essential / Fluid / Adaptive marquee: functional
- IVE REI product grid: functional
- large Main-4 campaign block: functional
- final 3-tile category grid: first two tiles read as normal navigation; third reads as placeholder/dev content
- footer: functional and clearly labels the project as a personal non-commercial portfolio

Conclusion: **the Home page is structurally functional but compositionally unfinished.**

## 4. Featured index

The Feature store currently advertises:

### SPECIAL
- Ive Rei x FCMM
- Espacio x FCMM
- Seoul Fashion Week

### CAMPAIGN
- FW23 Launch
- SS23 Sale

The Feature index uses a common item-card grid and sorts by dates currently stored as 2025 dates.

### Date issue

Live Featured metadata uses 2025 dates while campaign/editorial content references 2023 seasons/events.

Verdict: **DATE SEMANTICS UNRESOLVED.**

Do not invent corrected dates. Decide whether Feature-card dates mean:

- original campaign/event date,
- portfolio archive publication date,
- or another explicit archive field.

Then make the meaning consistent.

## 5. Featured page classification

### Espacio x FCMM

Live audit:

- campaign film
- editorial descriptions
- product imagery
- product showcase links
- coherent collection structure

Source:

- dedicated `espacio.vue`
- `espacio-swiper.vue`
- `espacio-grid.vue`
- matching still/video assets

Verdict: **SUBSTANTIAL / KEEP / POLISH ONLY.**

### Seoul Fashion Week

Live audit:

- runway video
- imagery
- editorial text
- product grid

Source includes dedicated video/poster and numbered image sequence.

Verdict: **SUBSTANTIAL / KEEP / POLISH ONLY.**

### FW23 Launch

Live audit confirms functional:

- campaign image
- description
- Shop Now
- product list

Implementation is a shared Markdown campaign template rather than a bespoke special page.

Verdict: **USABLE / TEMPLATE-BASED, NOT A BLOCKER.**

### SS23 Sale

Live audit confirms functional sale/editorial page and product grid.

Verdict: **USABLE / TEMPLATE-BASED, NOT A BLOCKER.**

### IVE REI x FCMM

Source contains a bespoke composition:

- main
- section 1
- section 2
- section 3
- section 4
- footer

Known source issue:

- section 3 references `wide-slim-fit-pants.webp`, which is absent while the MP4 exists

Live browser audit still judged the visible page as **Minimal/Unfinished**, reporting a large hero-oriented presentation and an empty/pink-looking block rather than the substantial editorial completeness of Espacio/Seoul.

This does not mean the source has only a hero. It means the current rendered visual result is not communicating the intended multi-section editorial reliably.

Verdict: **PRIMARY FEATURED REPAIR TARGET.**

Required next pass:

1. inspect each IVE REI section at desktop and mobile
2. verify section heights and visible content
3. identify which sections render as empty/pink/minimal and why
4. fix missing section-3 fallback only after confirming actual rendered behavior
5. preserve the already approved section-1 local parallax + intersection text technique unless a concrete visual defect requires change
6. check videos for poster/fallback/mobile behavior
7. do not redesign the entire IVE REI story before reproducing the current problems

## 6. Priority order for implementation

### H1 — Home composition decision

Before coding:

- compare current `Main-5 + Main-Lookbook-Test`
- inspect unused `Main-6`
- inspect older `Main-2`
- decide the intended final middle-Home narrative

The likely decision is not "keep every experiment." The Home should have one coherent sequence.

Acceptance target:

- no empty-looking 72vh/92vh blocks
- no component named/behaving as a test in final composition
- no unexplained floating-image block
- no dev/placeholder labels
- current strong hero/product/campaign sections preserved

### H2 — IVE REI closeout

Treat IVE REI as a dedicated visual closeout package.

Acceptance target:

- all intended sections visibly communicate content
- no missing fallback request
- no empty/pink accidental section
- mobile and desktop media behavior stable
- section-1 interaction preserved unless directly proven faulty

### H3 — Featured metadata/date semantics

Decide what dates mean, then align Featured cards/campaign labels without inventing historical facts.

### H4 — Cleanup after visual freeze

Only after Home + IVE REI are approved:

- remove or archive truly unused copy/test components
- remove stale/deleted asset references
- review duplicate Home assets and PSDs
- rename retained final components away from Test/copy names

Do not do this cleanup before the final composition is frozen.

## 7. P1 dependency

The already-verified P1 candidate remains separate:

`fix/fcmm-p1-accuracy-final-20261005@7fcb80fe42346cb8fcf6361d0b8ec94d437183f4`

It is one clean commit over current main and changes only seven P1 files.

Independent verification already passed:

- `npm ci`
- `npm run build`
- `git diff --check`
- 90/90 explicit colour-variant targets valid
- browser acceptance at 390px and 1440px for:
  - V-Neck Grey ↔ Blue
  - Half Sleeve Light Blue → Noir
  - Tatom Size Guide
  - Privacy Notice
  - Portfolio Notice

Do not re-implement P1 during Home/Featured work.

## 8. Next safe work package

**HOME-COMP-01 — read/visual comparison -> Prime decision -> bounded implementation**

Recommended worker only after the design choice is frozen:

- model: GPT-6.1 Sol
- reasoning: high

Use xhigh only for the read-only comparison/audit if Prime needs help deciding among Main-2 / Main-5 / Main-6 / Lookbook variants.

No Firebase deploy is implied.
