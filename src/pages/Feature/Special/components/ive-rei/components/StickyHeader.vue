<template>
  <div
    class="flex h-full w-full flex-col items-center justify-center gap-6 px-5"
  >
    <div
      class="relative flex w-full max-w-md items-center justify-center gap-2"
    >
      <logoRei class="h-9" />
      <v-icon icon="x" class="h-4" />
      <logoFcmm class="h-5" />
    </div>

    <div
      class="relative w-full max-w-[34rem] text-center text-[13px] leading-[1.65] sm:text-sm"
    >
      <p class="mb-3">
        Offer a new paradigm to the Athletic Look. Most athletic apparel is
        either too expensive or too formal. We make clothes that are stylish and
        functional, but easily accessible to everyone.
      </p>
      <p class="font-medium italic">
        "Fitness Culture Maketh Man" - That's the only motto of the clothes we
        want to make.
      </p>
    </div>
  </div>
</template>

<script setup>
import logoFcmm from '@/components/logo/logo-fcmm.vue'
import logoRei from '@/components/logo/logo-rei.vue'
</script>
