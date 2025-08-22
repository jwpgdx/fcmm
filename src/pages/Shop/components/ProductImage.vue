<template>
  <div class="relative w-full sm:border-r sm:border-black">
    <!-- PC: 세로 리스트 -->
    <div v-if="!isMobile" class="flex flex-col">
      <img
        v-for="(src, index) in imageList"
        :key="index"
        :src="src"
        :alt="`${altText} ${index + 1}`"
        :class="[
          'h-auto w-full',
          index !== imageList.length - 1 ? 'border-b border-black' : '',
        ]"
        loading="lazy"
        @load="onImageLoad"
        @error="removeImage(index)"
      />
    </div>

    <!-- Mobile: Swiper -->
    <Swiper
      v-else
      :modules="[Pagination, Navigation]"
      :slides-per-view="1"
      :space-between="0"
      class="my-swiper relative aspect-[4/5] w-[100vw] overflow-hidden border-b border-black"
      :pagination="{ clickable: true }"
    >
      <SwiperSlide
        v-for="(src, index) in imageList"
        :key="index"
        class="relative h-full w-full"
      >
        <img
          :src="src"
          :alt="`${altText} ${index + 1}`"
          class="h-full w-full object-contain"
          loading="lazy"
          @load="onImageLoad"
          @error="removeImage(index)"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// vueuse
import { useWindowSize } from '@vueuse/core'

const props = defineProps({
  category: { type: String, required: true },
  id: { type: [String, Number], required: true },
  maxImages: { type: Number, default: 10 },
  altText: { type: String, default: 'Product image' },
})

const emit = defineEmits(['loaded'])

const imageList = ref([])
const loadedCount = ref(0)
const totalImages = ref(0)

// vueuse 윈도우 사이즈 반응형
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

const checkImage = async (src) => {
  try {
    const res = await fetch(src, { method: 'HEAD' })
    return res.ok
  } catch (e) {
    return false
  }
}

const loadImages = async () => {
  const basePath = `/images/products/${props.category}/${props.id}/0`
  const loadedImages = []

  for (let i = 1; i <= props.maxImages; i++) {
    const path = `${basePath}${i}.webp`
    const exists = await checkImage(path)
    if (!exists) break
    loadedImages.push(path)
  }

  imageList.value = loadedImages
  totalImages.value = loadedImages.length
  loadedCount.value = 0

  if (loadedImages.length === 0) {
    await nextTick()
    emit('loaded', { totalImages: 0, imageList: [] })
  }
}

const onImageLoad = async () => {
  loadedCount.value++
  if (loadedCount.value === totalImages.value) {
    await nextTick()
    emit('loaded', {
      totalImages: totalImages.value,
      imageList: imageList.value,
    })
  }
}

const removeImage = async (index) => {
  imageList.value.splice(index, 1)
  totalImages.value = imageList.value.length
  if (loadedCount.value >= totalImages.value && totalImages.value > 0) {
    await nextTick()
    emit('loaded', {
      totalImages: totalImages.value,
      imageList: imageList.value,
    })
  }
}

onMounted(loadImages)
</script>

<style scoped>
.my-swiper {
  --swiper-pagination-bullet-border-radius: 0;
  --swiper-pagination-bullet-height: 1px;
  --swiper-pagination-color: black;
}
</style>
