<template>
  <div class="w-full">
    <div class="mb-6">
      Verified garment measurements are not provided in this portfolio demo.
    </div>

    <div v-if="sizes.length">
      <div
        class="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em]"
      >
        Available demo sizes
      </div>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="size in sizes"
          :key="size"
          class="border border-black px-2 py-1 font-mono text-[12px]"
        >
          {{ size }}
        </span>
      </div>
    </div>

    <div class="mt-6 text-[10px] leading-[1.5] text-neutral-500">
      The sizes shown here mirror the options available on this product page.
      They are interface options, not body or garment measurements.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: { type: Object, required: true },
})

const sizes = computed(() => props.product?.sizes ?? [])
</script>
