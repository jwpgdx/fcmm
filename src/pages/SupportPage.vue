<template>
  <main class="relative min-h-screen w-full bg-white">
    <div class="h-[92px]" />

    <section
      class="px-var flex min-h-[62svh] flex-col justify-between border-b border-black bg-[#f1f1ed] py-5 sm:py-8"
    >
      <div
        class="flex justify-between text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[12px]"
      >
        <span>FCMM / Portfolio</span>
        <span>Project Information</span>
      </div>
      <h1
        class="max-w-[1500px] text-[clamp(3.4rem,12vw,11rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em]"
      >
        Project<br />Notes<span class="text-[#00ff00]">.</span>
      </h1>
    </section>

    <section class="grid border-b border-black sm:grid-cols-2">
      <div
        class="px-var border-b border-black py-10 sm:border-b-0 sm:border-r sm:py-16"
      >
        <p class="mb-8 text-[10px] font-semibold uppercase tracking-[0.12em]">
          01 / About
        </p>
        <p
          class="max-w-xl text-[20px] font-medium leading-[1.15] sm:text-[32px]"
        >
          A non-commercial FCMM website redesign created as a personal frontend
          portfolio project.
        </p>
      </div>
      <div class="px-var py-10 sm:py-16">
        <p class="mb-8 text-[10px] font-semibold uppercase tracking-[0.12em]">
          02 / Scope
        </p>
        <p class="max-w-xl text-[14px] leading-[1.55] sm:text-[17px]">
          The project explores a complete fashion-commerce experience across
          campaign editorials, collection archives, product discovery, wish
          lists, cart interactions, and responsive motion.
        </p>
      </div>
    </section>

    <section class="bg-black text-white">
      <div
        class="px-var border-b border-white/30 py-4 text-[11px] font-semibold uppercase"
      >
        Demo availability
      </div>
      <div class="grid sm:grid-cols-3">
        <div
          v-for="item in demoNotes"
          :key="item.number"
          class="px-var border-b border-white/30 py-10 last:border-b-0 sm:min-h-[260px] sm:border-b-0 sm:border-r sm:last:border-r-0"
        >
          <span class="text-[10px] text-[#00ff00]">{{ item.number }}</span>
          <h2 class="mt-8 text-[18px] font-semibold uppercase sm:text-[24px]">
            {{ item.title }}
          </h2>
          <p
            class="mt-4 max-w-sm text-[12px] leading-[1.55] text-white/70 sm:text-[14px]"
          >
            {{ item.description }}
          </p>
        </div>
      </div>
    </section>

    <section
      class="px-var grid gap-8 border-b border-black bg-[#00ff00] py-12 sm:grid-cols-2 sm:py-16"
    >
      <p class="text-[10px] font-semibold uppercase tracking-[0.12em]">
        Credits
      </p>
      <p class="max-w-xl text-[13px] leading-[1.5] sm:text-[16px]">
        Brand, product, and campaign assets remain the property of their
        respective owners and are presented only to demonstrate design and
        frontend implementation work.
      </p>
    </section>
  </main>
</template>

<script setup>
const demoNotes = [
  {
    number: '01',
    title: 'Commerce',
    description:
      'Products, wish lists, and cart interactions are demonstrational. No orders or payments are processed.',
  },
  {
    number: '02',
    title: 'Accounts',
    description:
      'Authentication and personal account features are intentionally unavailable in this public portfolio build.',
  },
  {
    number: '03',
    title: 'Content',
    description:
      'Campaign and collection pages are curated as an interactive archive, not as a current commercial catalogue.',
  },
]
</script>
