<template>
  <div class="relative min-h-screen w-full">
    <div class="h-[92px]" />
    <ShopBreadcrumbs />
    <div
      v-if="filteredItems.length"
      class="grid-with-dividers grid grid-cols-2 border-b sm:grid-cols-4"
    >
      <div v-for="item in filteredItems" :key="item.id">
        <ItemCard :item="item" />
      </div>
    </div>
    <NoItems message="No products found." class="border-b" v-else />

    <HeaderMenu :selected="'shop'" />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category-store'
import ShopBreadcrumbs from './components/ShopBreadcrumbs.vue'
import ItemCard from './components/ItemCard.vue'
import HeaderMenu from '@/components/header/HeaderMenu.vue'
import NoItems from '@/components/NoItems.vue'

const props = defineProps({
  group: { type: String, default: null },
  value: { type: String, default: null },
})

const categoryStore = useCategoryStore()
const allItems = ref([])

// 상품 데이터 한 번만 불러오기
onMounted(async () => {
  const res = await fetch('/items.json')
  allItems.value = await res.json()
})

// 카테고리(value)로 그룹(value)을 찾기 위한 맵
const categoryToGroupMap = computed(() => {
  const map = {}
  categoryStore.categories.forEach((group) => {
    group.items.forEach((item) => {
      map[item.value] = group.value
    })
  })
  return map
})

// URL 파라미터에 따라 상품 필터링
const filteredItems = computed(() => {
  if (!props.group && !props.value) {
    // e.g. /shop/all
    return allItems.value
  }

  const currentGroup = categoryStore.categories.find(
    (g) => g.value === props.group,
  )
  if (!currentGroup) return []

  if (props.value && props.value !== 'all') {
    // e.g. /shop/group/value
    return allItems.value.filter((item) => item.category === props.value)
  }

  // e.g. /shop/group or /shop/group/all
  const groupCategoryValues = currentGroup.items.map((i) => i.value)
  return allItems.value.filter((item) =>
    groupCategoryValues.includes(item.category),
  )
})

// URL 파라미터에 따라 페이지 제목 결정
const pageTitle = computed(() => {
  if (!props.group) return 'All Products'

  const currentGroup = categoryStore.categories.find(
    (g) => g.value === props.group,
  )
  if (!currentGroup) return 'Category Not Found'

  if (!props.value || props.value === 'all') {
    return currentGroup.group
  }

  const currentItem = currentGroup.items.find((i) => i.value === props.value)
  return currentItem ? currentItem.name : currentGroup.group
})
</script>

<style scoped>
/* 기존 스타일에 추가 */
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
