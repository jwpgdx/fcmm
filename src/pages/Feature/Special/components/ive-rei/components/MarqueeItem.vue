<template>
  <div
    class="flex w-auto flex-none items-center gap-3 rounded-full text-white border border-white
    py-2 pl-2 pr-10
    sm:py-3 sm:pl-3 sm:pr-16"
  >
    <img :src="src" :alt="label" class="size-14 sm:size-28 object-cover" />
    <div class="text-[32px] sm:text-[48px] font-bold uppercase">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  src: { type: String, required: true },
  label: { type: String, required: true },
})
</script>
