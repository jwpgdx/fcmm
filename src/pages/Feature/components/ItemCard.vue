<template>
  <div
    class="group relative h-auto w-full cursor-pointer overflow-hidden shadow-[0_1px_0_0_black]"
  >
    <RouterLink
      :to="`/feature/${item.groupValue}/${item.value}`"
      class="relative block h-full w-full"
    >
      <img
        class="h-auto w-full object-cover transition-transform duration-300 md:group-hover:scale-105"
        :src="`/images/feature/${item.value}/index.webp`"
        :alt="item.name"
      />
      <div class="px-var absolute left-0 top-0 flex flex-col items-start py-4">
        <div class="mb-1 bg-[#00ff00] px-[2px] text-[9px] text-black">
          {{ item.group }}
        </div>

        <div class="text-[12px] text-white">{{ item.name }}</div>
        <div class="text-[10px] uppercase text-white">
          {{ formatDate(item.date) }}
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  item: { type: Object, required: true },
})

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return `${date.getFullYear()}, ${date.toLocaleString('en-US', { month: 'short' })}`
}
</script>

<style lang="scss" scoped></style>
