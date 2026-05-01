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
import { computed, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category-store'
import { useItemStore } from '@/stores/item-store'
import BestList from './components/BestList.vue'
import NoItems from '@/components/NoItems.vue'

const categoryStore = useCategoryStore()
const categories = computed(() => categoryStore.categories)
const itemStore = useItemStore()

// ✅ 마운트 시 items + best 데이터 로드
onMounted(async () => {
  await itemStore.fetchBest()
})

// ✅ 그룹 안에서 스토어 best 기준으로 필터링
function bestItemsByGroup(group) {
  const categoryValues = group.items.map((i) => i.value)

  return itemStore.bestItems.filter((item) =>
    categoryValues.includes(item.category),
  )
}
</script>

<style scoped></style>
