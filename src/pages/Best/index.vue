<template>
  <div class="relative min-h-screen w-full">
    <div class="h-[92px]" />

    <div
      v-for="group in categories"
      :key="group.value"
      class="relative h-auto w-full"
    >
      <div
        v-if="bestItemsByGroup(group).length !== 0"
        class="relative flex w-full flex-col border-b sm:flex-row"
      >
        <!-- 그룹 이름 -->
        <div
          class="px-var flex h-[5.5rem] w-full items-center text-[1.8rem] font-semibold uppercase sm:w-[320px]"
        >
          {{ group.group }}
        </div>

        <!-- 그룹 내 베스트 아이템 -->
        <div class="flex flex-1 flex-col">
          <div v-for="item in bestItemsByGroup(group)" :key="item.id">
            <BestList
              :class="[
                'border-b',
                { 'border-b-0': item === bestItemsByGroup(group).slice(-1)[0] },
              ]"
              :item="item"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category-store'
import BestList from './components/BestList.vue'
import NoItems from '@/components/NoItems.vue'

const categoryStore = useCategoryStore()
const categories = computed(() => categoryStore.categories)
const allItems = ref([])

// 상품 데이터 불러오기
onMounted(async () => {
  const res = await fetch('/items.json')
  allItems.value = await res.json()
})

// 그룹 안에서 best: true인 것만 필터링
function bestItemsByGroup(group) {
  const categoryValues = group.items.map((i) => i.value)
  return allItems.value
    .filter((item) => categoryValues.includes(item.category) && item.best)
    .sort((a, b) => a.best - b.best) // best 순서대로
}
</script>

<style scoped></style>
