<!-- BestList.vue -->
<template>
  <router-link
    :to="to"
    class="group container hover:bg-[#00ff00] relative flex h-[5.5rem] w-full cursor-pointer items-center justify-between gap-4 text-[12px] font-semibold transition"
  >
    <!-- Best 순위 -->
    <div class="flex items-center gap-8">
      <div>
        {{ bestRank }}
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
    <!-- 가격 -->

    <div class="sm:flex w-20 items-center gap-1 hidden">
      <div
        v-for="(color, index) in item.colors"
        :key="index"
        class="flex items-center gap-1"
      >
        <div v-if="index === 0" class="leading-none">
          {{ color.name }}
        </div>
        <div
          class="size-2 rounded-full border-[0.5px] border-gray-300"
          :style="{ backgroundColor: color.value }"
          :title="color.name"
        />
      </div>
    </div>

    <div class="w-20 uppercase text-right sm:text-left">{{ item.category }}</div>

    <div class="hidden sm:block">₩ {{ item.price.toLocaleString() }}</div>
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
  return String(props.item.best).padStart(2, '0')
})
// 이미지 에러 시 대체 이미지
function onImgError(e) {
  e.target.src = '/images/placeholder.webp'
}
</script>
