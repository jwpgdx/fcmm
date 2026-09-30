<template>
  <router-link
    :to="to"
    class="group container relative flex h-[5.5rem] w-full cursor-pointer items-center justify-between gap-4 text-[12px] font-semibold transition hover:bg-[#00ff00]"
  >
    <!-- Best 순위 -->
    <div class="flex items-center gap-8">
      <div>
        00{{ bestRank }}
      </div>
      <img
        class="size-16 object-cover"
        :src="`/images/products/${item.category}/${item.id}/01.webp`"
        :alt="item.name"
        loading="lazy"
        @error="onImgError"
      />

      <div class="w-48">
        {{ item.name }}
      </div>
    </div>
    <!-- 색상 (맨 첫 번째만) -->
    <div class="hidden w-20 items-center gap-1 sm:flex" v-if="item.colors.length">
      <div class="flex items-center gap-1">
        <div class="leading-none">
          {{ item.colors[0].name }}
        </div>
        <div
          class="size-2 rounded-full border-[0.5px] border-gray-300"
          :style="{ backgroundColor: item.colors[0].value }"
          :title="item.colors[0].name"
        />
      </div>
    </div>

    <div class="w-24 text-right uppercase sm:text-left">
      {{ item.category }}
    </div>

    <div class="hidden sm:block">₩ {{ item.price.original.toLocaleString() }}</div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useCategoryStore } from '@/stores/category-store'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  to: {
    type: String,
    default: null,
  },
})

const categoryStore = useCategoryStore()

// 카테고리 → 그룹 매핑
const categoryToGroupMap = computed(() => {
  const map = {}
  categoryStore.categories.forEach((group) => {
    group.items.forEach((item) => {
      map[item.value] = group.value
    })
  })
  return map
})

// 링크 자동 생성
const autoTo = computed(() => {
  const cat = props.item.category
  const group = categoryToGroupMap.value[cat] || ''
  return `/shop/${group}/${cat}/${props.item.id}`
})

const to = computed(() => props.to || autoTo.value)
const bestRank = computed(() => {
  return String(props.item.bestRank).padStart(2, '0')
})

function onImgError(e) {
  e.currentTarget.style.visibility = 'hidden'
}
</script>
