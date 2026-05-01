<template>
  <div class="relative w-full bg-[#fff] pt-[10vh] pb-[5vh]">

    <!-- 메인 슬라이더 -->
    <Swiper
      ref="mainSwiperRef"
      slides-per-view="auto"
      :space-between="0"
      :centered-slides="true"
      :loop="true"
      :looped-slides="2"
      :modules="modules"
      @swiper="onMainSwiperInit"
      @slide-change="handleMainSlideChange"
      class="mySwiper relative w-full "
    >
      <SwiperSlide
        v-for="item in items"
        :key="item.value"
        class="h-auto w-[60%] flex-shrink-0  sm:w-[24%]"
      >
        <video
          v-if="selectedItem === item.value"
          :src="`/images/feature/ive-rei/${item.value}.mp4`"
          class="h-full w-full object-cover transition-all duration-300"
          autoplay
          muted
          playsinline
        ></video>
        <img
          v-else
          :src="`/images/feature/ive-rei/${item.value}.webp`"
          alt=""
          class="h-full w-full object-cover transition-all duration-300"
          :class="selectedItem === item.value ? 'opacity-100' : 'opacity-30'"
          loading="lazy"
        />
      </SwiperSlide>
    </Swiper>

    <!-- 썸네일 슬라이더 -->
    <div class="relative flex w-full justify-center  py-8">
      <Swiper
        ref="thumbSwiperRef"
        :space-between="10"
        slides-per-view="auto"
        :loop="false"
        :modules="modules"
        @swiper="onThumbSwiperInit"
        class="thumbSwiper"
      >
        <SwiperSlide
          v-for="(item, index) in items"
          :key="`thumb-${item.value}`"
          class="flex aspect-square w-[64px] cursor-pointer items-center justify-center "
          @click="selectItem(item.value, index)"
        >
          <img
            :src="`/images/feature/ive-rei/icon-${String(index + 1).padStart(2, '0')}.webp`"
            :alt="item.label"
            class="h-auto w-full object-contain"
            loading="lazy"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { useItemStore } from '@/stores/item-store'

const selectedItem = ref('small-logo-sweatshirt')
const mainSwiperRef = ref(null)
const thumbSwiperRef = ref(null)
let mainSwiperInstance = null
let thumbSwiperInstance = null
const modules = []

const items = [
  {
    value: 'small-logo-sweatshirt',
  },
  {
    value: 'oldschool-wide-sweatshirt',
  },
  {
    value: 'club-team-authentic-windbreaker',
  },
  {
    value: 'post-core-windbreaker',
  },
  {
    value: 'pro-big-logo-half-zip',
  },
  {
    value: 'four-seasons-signature-stretch-shorts',
  },
  {
    value: 'four-seasons-stretch-utility-jogger-pants',
  },
  {
    value: 'wide-slim-fit-pants',
  },
]

// 메인 Swiper 인스턴스 초기화
const onMainSwiperInit = (swiper) => {
  console.log('Main Swiper initialized')
  mainSwiperInstance = swiper
}

// 썸네일 Swiper 인스턴스 초기화
const onThumbSwiperInit = (swiper) => {
  console.log('Thumb Swiper initialized')
  thumbSwiperInstance = swiper
}

// 메인 슬라이드 변경 핸들러
const handleMainSlideChange = () => {
  console.log('Main slide changed!')

  if (!mainSwiperInstance) {
    console.log('No main swiper instance')
    return
  }

  const realIndex = mainSwiperInstance.realIndex
  console.log('Real index:', realIndex)
  console.log('Active index:', mainSwiperInstance.activeIndex)

  if (realIndex >= 0 && realIndex < items.length) {
    selectedItem.value = items[realIndex].value
    console.log('Selected item updated to:', selectedItem.value)

    // 썸네일 슬라이더도 동기화
    if (thumbSwiperInstance) {
      thumbSwiperInstance.slideTo(realIndex)
    }
  }
}

// 썸네일 클릭으로 아이템 선택
const selectItem = (itemValue, index) => {
  console.log('Thumbnail clicked:', itemValue, index)
  selectedItem.value = itemValue

  // 메인 슬라이더를 해당 인덱스로 이동
  if (mainSwiperInstance) {
    mainSwiperInstance.slideToLoop(index)
  }
}

onMounted(() => {
  selectedItem.value = items[0].value
  console.log('Component mounted, initial selected item:', selectedItem.value)
})
</script>
