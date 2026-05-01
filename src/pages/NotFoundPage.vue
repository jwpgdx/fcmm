<template>
  <div class="relative min-h-screen w-full">
    <div class="h-[92px]" />

    <section
      class="relative flex min-h-[calc(100vh-92px)] flex-col items-center justify-center overflow-hidden border-b border-black bg-[#f4f1ea] px-6 py-20 text-center text-black"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,0,0.16),_transparent_40%),linear-gradient(180deg,_rgba(255,255,255,0),_rgba(255,255,255,0.8))]"
      />

      <div class="relative z-10 flex max-w-[720px] flex-col items-center">
        <div
          class="mb-4 bg-black px-2 py-1 font-mono text-[11px] uppercase tracking-[0.28em] text-white"
        >
          Error 404
        </div>
        <h1 class="text-[34px] font-semibold uppercase leading-none sm:text-[64px]">
          Page Not Found
        </h1>
        <p class="mt-5 max-w-[520px] text-[13px] leading-6 text-neutral-700 sm:text-[15px]">
          This route is not connected yet, was removed during the rebuild, or
          never made it into the Vue version.
        </p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <RouterLink
            to="/"
            class="bg-black px-4 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#00FF00] hover:text-black"
          >
            Back Home
          </RouterLink>
          <RouterLink
            to="/shop/all"
            class="border border-black px-4 py-3 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-black hover:text-white"
          >
            Browse Shop
          </RouterLink>
          <RouterLink
            to="/feature"
            class="border border-black px-4 py-3 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-black hover:text-white"
          >
            View Feature
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped></style>
