<template>
  <div
    class="relative flex w-full flex-col-reverse items-stretch border-b border-t font-mono text-[11px] uppercase sm:flex-row"
  >
    <div class="hidden w-[12%] border-r sm:block" />

    <div class="p-var min-h-[280px] w-full sm:w-[24%]">
      <div class="text-[12px]">ESPACIO</div>

      <div class="mt-4 flex flex-col items-start">
        <div
          class="flex w-full items-center justify-between"
          v-for="item in items"
          :key="item.value"
        >
          <button :class="['flex gap-1']" @click="onClickEvent(item.value)">
            <div class="flex w-[24px] justify-between">
              <span>[</span>
              <span v-if="selectedItem === item.value">⦁</span>
              <span>]</span>
            </div>
            {{ item.label }}
          </button>
          <button
            v-if="selectedItem === item.value"
            class="text-[#00ff00]"
            @click="itemStore.goToItemPage(item.value)"
          >
            VIEW
          </button>
        </div>
      </div>

      <div class="mt-4">
        {{ items.find((item) => item.value === selectedItem)?.detail }}
      </div>
    </div>

    <Swiper
      ref="swiperRef"
      :slides-per-view="1.8"
      :space-between="1"
      :loop="true"
      :modules="modules"
      @swiper="onSwiperInit"
      @slide-change="handleSlideChange"
      class="mySwiper relative w-full border-b bg-black sm:flex-1 sm:border-b-0 sm:border-l"
    >
      <SwiperSlide
        v-for="item in items"
        :key="item.value"
        class="h-auto flex-shrink-0"
      >
        <video
          v-if="selectedItem === item.value"
          :src="`/images/feature/espacio/${item.value}.mp4`"
          class="h-full w-full object-cover transition-all duration-300"
          autoplay
          muted
          playsinline
        ></video>
        <img
          v-else
          :src="`/images/feature/espacio/${item.value}.webp`"
          alt=""
          class="h-full w-full object-cover transition-all duration-300"
          :class="selectedItem === item.value ? 'opacity-100' : 'opacity-30'"
          loading="lazy"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { useItemStore } from '@/stores/item-store'

const itemStore = useItemStore()
const selectedItem = ref('')
const swiperRef = ref(null)
let swiperInstance = null
const modules = []

const items = [
  {
    label: 'Half Sleeve Shirt',
    value: 'half-sleeve-shirt-light-blue',
    detail: `A washed denim shirt with a relaxed fit and open collar,
    bringing effortless street style to any look.
    Perfect for layering or wearing solo,
    it’s a versatile staple for everyday culture.`,
  },
  {
    label: 'Plue Windbreaker',
    value: 'plue-windbreaker-noir',
    detail: `A sleek black windbreaker built for both function and style,
              featuring a hooded design with a clean street-ready edge.
              Perfect for layering in any urban setting.`,
  },
  {
    label: 'Puffer Jacket',
    value: 'puffer-jacket-green',
    detail: `A deep green puffer jacket designed for warmth and casual style,
      featuring a high collar and quilted construction.
      Ideal for layering during cold weather while maintaining a clean,
      modern silhouette.`,
  },
  {
    label: 'Rueta Shirt',
    value: 'rueta-shirt-blue',
    detail: `A modern denim shirt with a slightly worn wash for a casual,
    rugged look. Designed with a classic collar,
    button-front closure, and chest pockets,
    it pairs effortlessly with both casual and smart-casual outfits. Durable yet stylish, perfect for layering over a tee or under a jacket.`,
  },
]

// Swiper 인스턴스 초기화
const onSwiperInit = (swiper) => {
  swiperInstance = swiper
}

// 슬라이드 변경 핸들러
const handleSlideChange = () => {
  if (!swiperInstance) return

  const realIndex = swiperInstance.realIndex

  if (realIndex >= 0 && realIndex < items.length) {
    selectedItem.value = items[realIndex].value
  }
}

// 버튼 클릭 핸들러
const onClickEvent = (val) => {
  selectedItem.value = val

  if (!swiperInstance) return

  const index = items.findIndex((i) => i.value === val)
  swiperInstance.slideToLoop(index)
}

onMounted(() => {
  selectedItem.value = items[0].value
})
</script>
