<template>
  <div class="relative min-h-screen w-full">
    <div class="h-[92px]" />
    <ShopBreadcrumbs />

    <div
      v-if="filteredItems.length"
      class="grid-with-dividers grid grid-cols-2 border-b sm:grid-cols-4"
    >
      <div
        v-for="item in filteredItems"
        :key="item.id"
      >
        <ItemCard :item="item" />
  </div>
    </div>

    <NoItems message="No products found." class="border-b" v-else />

    <HeaderMenu :selected="'shop'" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useItemStore } from '@/stores/item-store'
import ShopBreadcrumbs from './components/ShopBreadcrumbs.vue'
import ItemCard from './components/ItemCard.vue'
import HeaderMenu from '@/components/header/HeaderMenu.vue'
import NoItems from '@/components/NoItems.vue'

const props = defineProps({
  group: { type: String, default: null },
  value: { type: String, default: null },
})

const itemStore = useItemStore()

// URL 파라미터에 따라 상품 필터링 (간소화됨)
const filteredItems = computed(() => {
  const allItems = itemStore.items

  if (!props.group && !props.value) return allItems

  // featured 그룹이면 value를 태그로 필터링
  if (props.group === 'featured') {
    if (props.value && props.value !== 'all') {
      return allItems.filter((item) => item.tags?.includes(props.value))
    } else {
      // value가 없거나 'all' → 'new' 태그만
      return allItems.filter((item) => item.tags?.includes('fw23-launch'))
    }
  }

  // 그룹만 있고 카테고리가 없거나 'all'인 경우
  if (props.group && (!props.value || props.value === 'all')) {
    return allItems.filter((item) => item.group === props.group)
  }

  // 그룹과 카테고리 모두 있는 경우
  if (props.group && props.value) {
    return allItems.filter(
      (item) => item.group === props.group && item.category === props.value,
    )
  }

  return []
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
