<template>
  <div class="relative min-h-screen w-full">
    <div class="h-[92px]" />

    <div
      v-if="sortedItems.length"
      class="grid-with-dividers grid grid-cols-2 border-b sm:grid-cols-4"
    >
       <ItemCard
        v-for="(item, index) in sortedItems"
        :key="item.value"
        :item="item"
        :style="{ zIndex: sortedItems.length - index }"
        class="relative"
      />
    </div>

    <NoItems message="No products found." class="border-b" v-else />
  </div>
</template>

<script setup>
import { useFeatureStore } from '@/stores/feature-store'
import ItemCard from '@/pages/Feature/components/ItemCard.vue'

const featureStore = useFeatureStore()

// 그룹 + 아이템을 flat하게 합쳐서 날짜 최신순 정렬
const sortedItems = computed(() => {
  const allItems = featureStore.features.flatMap((feature) =>
    feature.items.map((item) => ({
      ...item,
      group: feature.group,
      groupValue: feature.value,
    })),
  )
  return allItems.sort((a, b) => new Date(b.date) - new Date(a.date))
})
</script>

<style scoped>
.grid-with-dividers {
  position: relative;
}

.grid-with-dividers > div {
  position: relative;
}

/* 세로 divider */
.grid-with-dividers > div:not(:nth-child(2n))::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #000;
}

/* lg 화면에서 4열일 때 */
@media (min-width: 1024px) {
  .grid-with-dividers > div:not(:nth-child(2n))::after {
    display: none;
  }

  .grid-with-dividers > div:not(:nth-child(4n))::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #000;
  }
}
</style>
