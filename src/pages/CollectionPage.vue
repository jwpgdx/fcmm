<template>
  <div class="relative h-full w-full">
    <div class="h-20" />
    <div
      v-for="(group, gIdx) in store.collections"
      :key="gIdx"
      :ref="(el) => (elRefs[gIdx] = el)"
      class="relative h-auto w-full"
    >
      <div class="px-var mt-8 py-3 text-[16px] font-semibold sm:border-b">
        {{ group.group }}
      </div>

      <div>
        <div
          v-for="(item, iIdx) in group.items"
          :key="iIdx"
          class="flex w-full flex-col sm:h-80 sm:flex-row"
        >
          <div
            :ref="(el) => (itemRefs[item.value] = el)"
            class="p-var flex h-full w-full border-b border-black text-[1.8rem] font-semibold uppercase sm:w-[320px] sm:border-r"
            :class="item.value"
          >
            {{ item.name }}
          </div>

          <div
            v-if="images[item.value]?.length > 0"
            class="relative h-64 sm:h-full sm:flex-1"
          >
            <Swiper
              :modules="[Pagination, Navigation, FreeMode]"
              slides-per-view="auto"
              :free-mode="true"
              :pagination="{ type: 'progressbar' }"
              navigation
              class="mySwiper h-full"
            >
              <SwiperSlide
                class="h-full w-auto flex-shrink-0"
                v-for="(img, idx) in images[item.value]"
                :key="idx"
              >
                <a
                  :href="img"
                  :data-fancybox="item.value"
                  :data-caption="item.name + ' - ' + (idx + 1)"
                  class="block h-full w-auto cursor-pointer"
                >
                  <img
                    :src="img"
                    class="h-full w-auto object-cover"
                    loading="lazy"
                  />
                </a>
              </SwiperSlide>
            </Swiper>
          </div>

          <NoItems v-else message="No image available" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import { useCollectionStore } from '@/stores/collection-store'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, FreeMode } from 'swiper/modules'
import { useIntersectionObserver } from '@vueuse/core'
import NoItems from '@/components/NoItems.vue'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { Fancybox } from '@fancyapps/ui'

const store = useCollectionStore()
const images = reactive({})
const elRefs = ref([])
const itemRefs = ref({}) // item.value를 키로 하는 ref 객체

const props = defineProps({
  value: {
    type: String,
    default: null,
  },
})

// props.value가 변경될 때 스크롤하는 함수
const scrollToValue = async (value) => {
  if (!value) return

  // 여러 번 nextTick으로 DOM이 완전히 렌더링될 때까지 대기
  await nextTick()
  await nextTick()

  // 약간의 딜레이를 추가하여 다른 스크롤 동작과 충돌 방지
  setTimeout(() => {
    const targetElement = itemRefs.value[value]

    if (targetElement) {
      // 요소의 위치를 계산하고 20px 위로 조정
      const elementTop =
        targetElement.getBoundingClientRect().top + window.pageYOffset
      const offsetTop = elementTop - 56 // 20px 위로 조정

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    } else {
    }
  }, 100) // 100ms 딜레이
}

// props.value 변경 감시
watch(
  () => props.value,
  (newValue, oldValue) => {
    console.log('Value changed:', oldValue, '->', newValue) // 디버깅용
    if (newValue && newValue !== oldValue) {
      scrollToValue(newValue)
    }
  },
  { immediate: false },
) // immediate를 false로 변경

// 이미지 존재 체크
const checkImage = (url) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })

// 이미지 로드
const loadImagesForValue = async (value, maxImages = 20) => {
  if (images[value]) return
  const basePath = `/images/collection/${value}/`
  const loaded = []

  for (let i = 1; i <= maxImages; i++) {
    const num = String(i).padStart(2, '0')
    const path = `${basePath}${num}.webp`
    const exists = await checkImage(path)
    if (!exists) break
    loaded.push(path)
  }

  images[value] = loaded

  // 새로 로드된 이미지에 Fancybox 다시 적용
  await nextTick()
  Fancybox.bind('[data-fancybox]', {
    Thumbs: { autoStart: false },
  })
}

onMounted(async () => {
  await nextTick()
  store.collections.forEach((group, gIdx) => {
    useIntersectionObserver(
      elRefs.value[gIdx],
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          group.items.forEach((item) => loadImagesForValue(item.value))
        }
      },
      { threshold: 0.1 },
    )
  })

  // 마운트 후 초기 스크롤 (props.value가 있는 경우)
  if (props.value) {
    // 마운트 후에는 더 긴 딜레이를 주어 모든 요소가 렌더링되도록 함
    setTimeout(() => {
      scrollToValue(props.value)
    }, 300)
  }
})
</script>

<style scoped>
/* .mySwiper 내부에 있는 모든 .swiper-pagination-progressbar에 스타일을 적용 */
.mySwiper :deep(.swiper-pagination-progressbar) {
  top: auto; /* 기본값인 top: 0을 해제합니다. */
  bottom: 0; /* 하단에 위치시킵니다. */
}

.mySwiper {
  --swiper-pagination-progressbar-bg-color: #000;
  --swiper-theme-color: #00ff00;
  --swiper-pagination-progressbar-size: 1px;
}

.mySwiper :deep(.swiper-button-prev),
.mySwiper :deep(.swiper-button-next) {
  display: none;
}
</style>
