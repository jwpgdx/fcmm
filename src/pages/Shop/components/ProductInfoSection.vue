<template>
  <div class="flex w-full items-start">
    <div class="h-5 text-[12px] font-medium">
      <div class="w-[96px] uppercase sm:w-[120px]" v-if="title">
        {{ title }}
      </div>
      <slot name="title" />
    </div>

    <div class="flex-1 text-[12px] transition-all duration-700">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: '' },
})
</script>
