<template>
  <div class="group relative aspect-[3/4] w-full shadow-[0_1px_0_0_black]">
    <router-link
      :to="to"
      class="px-var relative flex h-full flex-col justify-between py-2 sm:py-4"
    >
      <!-- 기본 이미지 -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="relative h-[90%] w-full">
          <img
            class="absolute left-1/2 top-0 h-full w-auto translate-x-[-50%] object-cover object-center opacity-100"
            :class="{ 'group-hover:opacity-0': hasSecondThumb }"
            :src="`/images/products/${item.category}/${item.id}/03.webp`"
            :alt="item.name"
          />
          <img
            v-if="hasSecondThumb"
            class="absolute left-1/2 top-0 h-full w-auto translate-x-[-50%] object-cover object-center opacity-0 group-hover:opacity-100"
            :src="`/images/products/${item.category}/${item.id}/04.webp`"
            :alt="item.name"
            @error="onSecondThumbError"
          />
        </div>
      </div>

      <div class="relative z-10 flex w-full items-start">
        <div class="flex flex-col items-start">
          <div class="text-[11px]">{{ item.name }}</div>
          <div class="flex gap-2 text-[11px] font-normal">
            <div
              v-if="item.price.discounted"
              class="flex items-center font-semibold"
            >
              <v-icon icon="won" :size="3" />
              {{ item.price.discounted.toLocaleString() }}
            </div>
            <div
              class="relative flex items-center"
              :class="{ 'opacity-50': item.price.discounted }"
            >
              <v-icon icon="won" :size="3" />
              {{ item.price.original.toLocaleString() }}
              <div
                v-if="item.price.discounted"
                class="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-black"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="z-10 flex w-full items-center justify-center gap-1 py-2 sm:py-4"
      >
        <!-- 맨 첫번째 색상만 보여주기 -->
        <div v-if="item.colors.length" class="flex items-center gap-1">
          <div class="text-[10px] leading-none">
            {{ item.colors[0].name }}
          </div>
          <div
            class="size-2 rounded-full border-[0.5px] border-gray-300"
            :style="{ backgroundColor: item.colors[0].value }"
            :title="item.colors[0].name"
          />
        </div>
      </div>
    </router-link>

    <button
      type="button"
      class="absolute right-[var(--padding)] top-2 z-20 sm:top-4"
      :aria-label="
        isWished
          ? `Remove ${item.name} from wishlist`
          : `Add ${item.name} to wishlist`
      "
      @click="toggleWish"
    >
      <v-icon
        :class="{
          '!fill-[#00FF00]': isWished,
        }"
        :size="5"
        icon="wish"
      />
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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

const wishStore = useWishStore()
const isWished = computed(() => wishStore.isWish(props.item.id))
const toggleWish = () => {
  wishStore.toggleWish(props.item.id)
}

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

// second thumb 보여줄지 여부 (초기값 true, 에러 나면 false)
const hasSecondThumb = ref(true)

function onSecondThumbError(e) {
  hasSecondThumb.value = false
  e.target.style.display = 'none'
}
</script>
