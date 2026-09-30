<template>
  <main class="relative min-h-screen w-full bg-[#f3f3ef] text-black">
    <div class="h-[92px] bg-white" />

    <section
      class="collab-hero flex min-h-[calc(100svh-92px)] flex-col justify-between overflow-hidden bg-black text-white"
    >
      <div
        class="px-var flex items-center justify-between border-b border-white/35 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[12px]"
      >
        <span>FCMM / Project Archive</span>
        <span>001—007</span>
      </div>

      <div class="px-var flex flex-1 items-center py-16 sm:py-24">
        <h1
          class="w-full text-[clamp(3rem,12.2vw,12rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em]"
        >
          <span class="block">Collaboration</span>
          <span class="mt-[0.12em] flex items-end justify-between">
            <span>Archive</span>
            <span class="text-[#00ff00]" aria-hidden="true">+</span>
          </span>
        </h1>
      </div>

      <div
        class="px-var grid gap-8 border-t border-white/35 py-6 text-[12px] sm:grid-cols-2 sm:items-end sm:py-8 sm:text-[14px]"
      >
        <p class="max-w-xl leading-[1.45]">
          Selected collaboration editorials and lookbooks from the FCMM archive.
          Different voices, one line of movement.
        </p>
        <a
          href="#featured-collaborations"
          class="justify-self-start border-b border-[#00ff00] pb-1 font-semibold uppercase sm:justify-self-end"
        >
          Explore the archive ↓
        </a>
      </div>
    </section>

    <section id="featured-collaborations" class="border-b border-black">
      <div
        class="px-var flex items-end justify-between border-b border-black py-4"
      >
        <h2 class="text-[13px] font-semibold uppercase sm:text-[16px]">
          Featured Stories
        </h2>
        <span class="text-[10px] font-semibold sm:text-[12px]">02</span>
      </div>

      <div class="grid sm:grid-cols-2">
        <RouterLink
          v-for="(project, index) in featuredProjects"
          :key="project.title"
          :to="project.to"
          class="group relative block border-black sm:[&:nth-child(2)]:border-l"
          :class="{ 'border-b sm:border-b-0': index === 0 }"
          :aria-label="`${project.title} editorial 보기`"
        >
          <div
            class="relative aspect-[4/5] overflow-hidden bg-zinc-200 sm:aspect-auto sm:h-[78vh]"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              :style="{ objectPosition: project.position }"
            />
            <div
              class="absolute left-3 top-3 bg-[#00ff00] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] sm:left-4 sm:top-4 sm:text-[10px]"
            >
              Editorial / {{ String(index + 1).padStart(2, '0') }}
            </div>
          </div>

          <div
            class="flex items-center justify-between border-t border-black bg-white px-3 py-4 transition-colors duration-200 group-hover:bg-[#00ff00] sm:px-4"
          >
            <div>
              <div class="text-[15px] font-semibold uppercase sm:text-[20px]">
                {{ project.title }}
              </div>
              <div class="mt-1 text-[10px] uppercase sm:text-[11px]">
                {{ project.type }}
              </div>
            </div>
            <span class="text-[20px] leading-none" aria-hidden="true">↗</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="bg-white">
      <div
        class="px-var flex items-end justify-between border-b border-black py-4"
      >
        <div>
          <p class="mb-1 text-[9px] font-semibold uppercase tracking-[0.12em]">
            Full image sets
          </p>
          <h2 class="text-[13px] font-semibold uppercase sm:text-[16px]">
            Collaboration Lookbooks
          </h2>
        </div>
        <span class="text-[10px] font-semibold sm:text-[12px]">05</span>
      </div>

      <div
        class="archive-grid grid grid-cols-2 border-b border-black lg:grid-cols-5"
      >
        <RouterLink
          v-for="(project, index) in archiveProjects"
          :key="project.title"
          :to="project.to"
          class="group min-w-0 bg-white"
          :aria-label="`${project.title} lookbook 보기`"
        >
          <div class="relative aspect-[3/4] overflow-hidden bg-zinc-200">
            <img
              :src="project.image"
              :alt="project.title"
              loading="lazy"
              class="h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.035] group-hover:grayscale-0 lg:grayscale"
              :style="{ objectPosition: project.position }"
            />
            <span
              class="absolute left-2 top-2 bg-black px-1.5 py-1 text-[9px] font-semibold text-white transition-colors group-hover:bg-[#00ff00] group-hover:text-black"
            >
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>
          <div
            class="flex min-h-[88px] flex-col justify-between p-3 sm:min-h-[104px] sm:p-4"
          >
            <h3
              class="text-[12px] font-semibold uppercase leading-[1.15] sm:text-[15px]"
            >
              {{ project.title }}
            </h3>
            <span
              class="mt-3 text-[9px] font-semibold uppercase tracking-[0.1em]"
            >
              View lookbook ↗
            </span>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="bg-[#00ff00] px-4 py-16 sm:px-8 sm:py-24">
      <p
        class="mx-auto max-w-[1200px] text-center text-[clamp(2rem,6vw,6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em]"
      >
        Different teams.<br />One forward motion.
      </p>
    </section>
  </main>
</template>

<script setup>
const featuredProjects = [
  {
    title: 'IVE REI × FCMM',
    type: 'Special collaboration',
    image: '/images/feature/ive-rei/index.webp',
    position: 'center 25%',
    to: '/feature/special/ive-rei',
  },
  {
    title: 'ESPACIO × FCMM',
    type: 'Performance editorial',
    image: '/images/feature/espacio/index.webp',
    position: 'center',
    to: '/feature/special/espacio',
  },
]

const archiveProjects = [
  {
    title: 'TREASURE × FCMM',
    image: '/images/collection/treasure-x-fcmm/01.webp',
    position: 'center top',
    to: '/collection/treasure-x-fcmm',
  },
  {
    title: 'IVE REI × FCMM',
    image: '/images/collection/ive-rei-x-fcmm/01.webp',
    position: 'center top',
    to: '/collection/ive-rei-x-fcmm',
  },
  {
    title: 'WIND AND SEA × FCMM',
    image: '/images/collection/wind-and-sea-x-fcmm/01.webp',
    position: 'center top',
    to: '/collection/wind-and-sea-x-fcmm',
  },
  {
    title: 'EBBETS FIELD × FCMM',
    image: '/images/collection/ebbets-field-x-fcmm/01.webp',
    position: 'center',
    to: '/collection/ebbets-field-x-fcmm',
  },
  {
    title: 'NCT × FCMM',
    image: '/images/collection/nct-x-fcmm/01.webp',
    position: 'center',
    to: '/collection/nct-x-fcmm',
  },
]
</script>

<style scoped>
.collab-hero > * {
  animation: hero-reveal 0.8s both;
}

.collab-hero > :nth-child(2) {
  animation-delay: 0.12s;
}

.collab-hero > :nth-child(3) {
  animation-delay: 0.22s;
}

.archive-grid > a {
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
}

.archive-grid > a:nth-child(2n) {
  border-right: 0;
}

@media (min-width: 1024px) {
  .archive-grid > a {
    border-bottom: 0;
  }

  .archive-grid > a:nth-child(2n) {
    border-right: 1px solid #000;
  }

  .archive-grid > a:last-child {
    border-right: 0;
  }
}

@keyframes hero-reveal {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .collab-hero > * {
    animation: none;
  }
}
</style>
