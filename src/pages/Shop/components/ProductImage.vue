<template>
  <div class="relative w-full min-w-0 max-w-full md:border-r md:border-black">
    <!-- PC: 세로 리스트 -->
    <div v-if="!isMobile" class="flex flex-col">
      <img
        v-for="(src, index) in imageList"
        :key="src"
        :src="src"
        :alt="`${altText} ${index + 1}`"
        :class="[
          'h-auto w-full',
          index !== imageList.length - 1 ? 'border-b border-black' : '',
        ]"
        :loading="index === 0 ? 'eager' : 'lazy'"
        @load="onImageLoad"
        @error="removeImage(src)"
      />
    </div>

    <!-- Mobile: Swiper -->
    <Swiper
      v-else
      :modules="[Pagination, Navigation]"
      :slides-per-view="1"
      :space-between="0"
      class="my-swiper relative aspect-[4/5] w-full max-w-full overflow-hidden border-b border-black"
      :pagination="{ clickable: true }"
    >
      <SwiperSlide
        v-for="(src, index) in imageList"
        :key="src"
        class="relative h-full w-full"
      >
        <img
          :src="src"
          :alt="`${altText} ${index + 1}`"
          class="h-full w-full object-contain"
          loading="eager"
          @load="onImageLoad"
          @error="removeImage(src)"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import imageManifest from 'virtual:fcmm-image-manifest'
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
  altText: { type: String, default: 'Product image' },
})

const emit = defineEmits(['loaded'])

const manifestKey = `${props.category}/${props.id}`
const imageList = ref([...(imageManifest.products[manifestKey] ?? [])])

// vueuse 윈도우 사이즈 반응형
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

const onImageLoad = async () => {
  await nextTick()
  emit('loaded', {
    totalImages: imageList.value.length,
    imageList: imageList.value,
  })
}

const removeImage = async (src) => {
  imageList.value = imageList.value.filter((image) => image !== src)
  await onImageLoad()
}

onMounted(() => {
  if (!imageList.value.length) onImageLoad()
})
</script>

<style scoped>
.my-swiper {
  --swiper-pagination-bullet-border-radius: 0;
  --swiper-pagination-bullet-height: 1px;
  --swiper-pagination-color: black;
}
</style>
