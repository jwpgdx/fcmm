<template>
  <div class="relative h-32 w-full shadow-[0_1px_0_0_black]">
    <router-link :to="to" class="relative flex h-full w-full justify-between">
      <div
        class="relative flex size-32 items-center justify-center border-r border-black"
      >
        <img
          class="h-full w-auto object-cover object-center"
          :src="`/images/products/${item.category}/${item.id}/01.webp`"
          :alt="item.name"
        />
      </div>
      <div class="relative mr-12 flex flex-1 flex-col items-start p-3">
        <div class="text-[14px]">{{ item.name }}</div>

        <div
          class="mt-1 flex items-center gap-2"
          v-if="item.color || item.size || item.quantity"
        >
          <div v-if="item.color" class="flex items-center gap-1">
            <div class="text-[10px] leading-none">
              {{ item.color.name }}
            </div>
            <div
              class="size-2 rounded-full border-[0.5px] border-gray-300"
              :style="{ backgroundColor: item.color.value }"
              :title="item.color.name"
            />
          </div>

          <div
            v-if="item.size"
            class="flex h-3 min-w-3 items-center justify-center bg-black px-[2px] text-[10px] leading-none text-white"
          >
            {{ item.size }}
          </div>

          <div v-if="item.quantity" class="text-[10px] leading-none">
            x {{ item.quantity }} qty
          </div>
        </div>

        <div class="mt-1 flex items-center gap-4">
          <div class="text-[11px]">₩ {{ item.price.toLocaleString() }}</div>
          <div class="flex items-center justify-center gap-1">
            <div
              v-for="(color, index) in item.colors"
              :key="index"
              class="flex items-center gap-1"
            >
              <div v-if="index === 0" class="text-[10px] leading-none">
                {{ color.name }}
              </div>
              <div
                class="size-2 rounded-full border-[0.5px] border-gray-300"
                :style="{ backgroundColor: color.value }"
                :title="color.name"
              />
            </div>
          </div>
        </div>
      </div>
    </router-link>

    <button @click.prevent="toggleWish" class="absolute right-0 top-0 p-4">
      <v-icon icon="x" :size="4" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWishStore } from '@/stores/wish-store'
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

// 찜 상태
const wishStore = useWishStore()
const isWished = computed(() => wishStore.isWish(props.item.id))
const toggleWish = () => {
  wishStore.toggleWish(props.item.id)
}

// 라우터 자동생성
const categoryStore = useCategoryStore()
const categoryToGroupMap = computed(() => {
  const map = {}
  categoryStore.categories.forEach((group) => {
    group.items.forEach((item) => {
      map[item.value] = group.value
    })
  })
  return map
})

const autoTo = computed(() => {
  const cat = props.item.category
  const group = categoryToGroupMap.value[cat] || ''
  return `/shop/${group}/${cat}/${props.item.id}`
})

const to = computed(() => props.to || autoTo.value)
</script>

<style scoped>
.wish-button-list {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #000;
  padding: 0;
  line-height: 1;
  z-index: 10;
}

.wish-button-list.is-wish svg {
  fill: #29fd2f;
}
</style>
