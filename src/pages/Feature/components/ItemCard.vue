<template>
  <div
    class="group relative h-auto w-full cursor-pointer overflow-hidden shadow-[0_1px_0_0_black]"
    @click="goToPage(item.groupValue, item.value)"
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
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  item: { type: Object },
})
const router = useRouter()

function goToPage(group, value) {
  router.push(`/feature/${group}/${value}`)
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return `${date.getFullYear()}, ${date.toLocaleString('en-US', { month: 'short' })}`
}
</script>

<style lang="scss" scoped></style>
