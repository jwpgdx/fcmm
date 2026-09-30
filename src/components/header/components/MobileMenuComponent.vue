<template>
  <div class="relative h-full w-full overflow-y-auto overflow-x-hidden">
    <button
      type="button"
      class="relative flex h-12 w-full items-center text-left"
      aria-label="Search products"
      @click="goToRouter('search')"
    >
      <span class="relative flex size-12 items-center justify-center">
        <v-icon icon="search" :size="7" />
      </span>
      <span class="text-[14px] font-medium text-zinc-500">Search...</span>
    </button>
    <div class="flex flex-col border-b">
      <button
        type="button"
        class="container h-14 border-t text-left text-[14px] font-medium uppercase"
        @click="goToRouter('best')"
      >
        best
      </button>

      <div v-for="(menu, index) in menuItems" :key="menu.value">
        <button
          type="button"
          class="container flex h-14 w-full items-center justify-between border-t text-left"
          :aria-expanded="
            hasSubMenu(menu.value) ? openedIndex === index : undefined
          "
          :aria-controls="
            hasSubMenu(menu.value) ? `mobile-submenu-${menu.value}` : undefined
          "
          @click="handleMenuClick(menu, index)"
        >
          <span
            class="text-[14px] font-medium uppercase"
            :class="{ 'text-[#00ff00]': openedIndex === index }"
          >
            {{ menu.label }}
          </span>
          <span
            v-if="hasSubMenu(menu.value)"
            aria-hidden="true"
            class="flex size-8 items-center justify-center"
          >
            <svg
              :class="{ 'rotate-180 transform': openedIndex === index }"
              class="size-4 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>

        <div
          v-if="hasSubMenu(menu.value) && openedIndex === index"
          :id="`mobile-submenu-${menu.value}`"
          class="flex flex-col"
        >
          <!-- 2차 그룹을 모두 펼친 상태로 보여줌 -->
          <div
            v-for="group in getGroupSubMenu(menu.value)"
            :key="group.group"
            class="container flex flex-col border-t py-4"
          >
            <div
              class="mb-4 w-full text-center text-[12px] font-semibold uppercase"
            >
              {{ group.group }}
            </div>

            <button
              v-for="item in group.items"
              :key="item.value"
              type="button"
              class="h-7 w-full text-center text-[12px]"
              @click="handleItemClick(menu.value, group.value, item.value)"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHeaderStore } from '@/stores/header-store'
import { useCategoryStore } from '@/stores/category-store'
import { useBrandStore } from '@/stores/brand-store'
import { useCollectionStore } from '@/stores/collection-store'
import { useFeatureStore } from '@/stores/feature-store'
import { useMobileMenuStore } from '@/stores/mobile-menu-store'

const headerStore = useHeaderStore()
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
const collectionStore = useCollectionStore()
const featureStore = useFeatureStore()
const mobileMenuStore = useMobileMenuStore()

const menuItems = computed(() => headerStore.menuItems)
const router = useRouter()

const openedIndex = ref(null)

const toggleAccordion = (index) => {
  if (openedIndex.value === index) {
    openedIndex.value = null
  } else {
    openedIndex.value = index
  }
}

const getGroupSubMenu = (menuValue) => {
  if (menuValue === 'brand') {
    return brandStore.brands
  } else if (menuValue === 'collection') {
    return collectionStore.collections
  } else if (menuValue === 'feature') {
    return featureStore.features
  } else if (menuValue === 'shop') {
    return categoryStore.categories
  }
  return []
}

const hasSubMenu = (menuValue) => getGroupSubMenu(menuValue).length > 0

const goToRouter = (val) => {
  router.push({ name: val })
  mobileMenuStore.closeModule()
}

const handleMenuClick = (menu, index) => {
  if (hasSubMenu(menu.value)) {
    toggleAccordion(index)
    return
  }

  goToRouter(menu.value)
}

// 아이템 클릭 핸들러
function handleItemClick(menu, group, item) {
  if (menu === 'brand') {
    router.push(`/brand/${item}`)
  } else if (menu === 'collection') {
    router.push(`/collection/${item}`)
  } else if (menu === 'feature') {
    router.push(`/feature/${group}/${item}`)
  } else if (menu === 'shop') {
    // Navigate to '/shop/:group/:value'
    router.push(`/shop/${group}/${item}`)
  }
  mobileMenuStore.closeModule()
}
</script>
