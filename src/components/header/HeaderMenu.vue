<template>
  <div
    v-if="selected && selectedList && selectedList.length > 0"
    class="relative w-full border-b border-black bg-white py-4"
  >
    <div class="grid w-full grid-cols-2 sm:grid-cols-6">
      <div
        v-for="group in selectedList"
        :key="group.group"
        class="p-var col-span-1"
      >
        <div
          class="mb-6 cursor-pointer text-sm font-medium uppercase"
          @click="handleGroupClick(group)"
        >
          {{ group.group }}
        </div>
        <div class="flex flex-col items-start gap-2">
          <button
            v-for="item in group.items"
            :key="item.value"
            class="w-full truncate py-1 text-left text-xs hover:underline"
            @click="handleItemClick(group, item)"
          >
            {{ item.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  selected: { type: String, default: '' },
})

const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
const collectionStore = useCollectionStore()

const categories = computed(() => categoryStore.categories)
const brands = computed(() => brandStore.brands)
const collections = computed(() => collectionStore.collections)

const selectedList = computed(() => {
  if (props.selected === 'brand') return brands.value
  if (props.selected === 'collection') return collections.value
  if (props.selected === 'shop') return categories.value
  return
})

const router = useRouter()

// 그룹 클릭 핸들러
function handleGroupClick(group) {
  if (props.selected === 'brand') {
    router.push(`/brand`) // Note: This may need future updates
  } else if (props.selected === 'collection') {
    router.push(`/collection`) // Note: This may need future updates
  } else if (props.selected === 'shop') {
    router.push(`/shop/${group.value}`)
  } else {
  }
}

// 아이템 클릭 핸들러
function handleItemClick(group, item) {
  if (props.selected === 'brand') {
    router.push(`/brand/${item.value}`) // Note: This may need future updates
  } else if (props.selected === 'collection') {
    router.push(`/collection/${item.value}`) // Note: This may need future updates
  } else if (props.selected === 'shop') {
    // Navigate to '/shop/:group/:value'
    router.push(`/shop/${group.value}/${item.value}`)
  } else {
  }
}
</script>

<style lang="scss" scoped></style>
