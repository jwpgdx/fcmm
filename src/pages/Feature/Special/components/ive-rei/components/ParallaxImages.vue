<template>
  <!-- Content Section -->
  <div class="relative flex h-full w-full flex-col justify-between">
    <section
      class="relative z-[20] flex  w-full items-center justify-center"
      :style="{
        transform: `translateY(${parallax1}px)`,
        
      }"
    >
      <ParallaxImage
        :isVisible="isVisible1"
        :src="`/images/feature/ive-rei/section-1-02.webp`"
        ref="image1Ref"
        class="h-[30vh] w-auto"
      />
    </section>

    <!-- Spacing -->
    <div class="h-[60vh]" aria-hidden="true"></div>

    <!-- Image Section 2 -->
    <section
      class="z-[5] flex h-auto w-full items-center justify-end"
      ref="image2Section"
      :style="{
        transform: `translateY(${parallax2}px)`,
        
      }"
    >
      <ParallaxImage
        :isVisible="isVisible2"
        :src="`/images/feature/ive-rei/section-1-02.webp`"
        class="h-auto w-[40%]"
        ref="image2Ref"
      />
    </section>



    <div class="h-[60vh]" aria-hidden="true"></div>
    <section class="relative z-[5] h-[120vh] w-full">
      <ParallaxImage
        :isVisible="isVisible3"
        :src="`/images/feature/ive-rei/section-1-02.webp`"
        class="absolute left-0 top-0 h-auto w-[30%] object-cover"
        :style="{
          transform: `translateY(${parallax3}px)`,
        }"
        ref="image3Ref"
      />
      <ParallaxImage
        :isVisible="isVisible4"
        :src="`/images/feature/ive-rei/section-1-02.webp`"
        class="absolute left-[45%] top-[10%] h-auto w-[10%] object-cover"
        :style="{
          transform: `translateY(${parallax4}px)`,
          
        }"
        ref="image4Ref"
      />
      <ParallaxImage
        :isVisible="isVisible5"
        :src="`/images/feature/ive-rei/section-1-02.webp`"
        class="absolute left-[68%] top-[50%] h-auto w-[18%] object-cover"
        :style="{
          transform: `translateY(${parallax5}px)`,
          
        }"
        ref="image5Ref"
      />
    </section>
  </div>
</template>

<script setup>
import { useElementVisibility, useWindowScroll } from '@vueuse/core'
import ParallaxImage from '@/pages/Feature/Special/components/ive-rei/components/ParallaxImage.vue'
const image1Ref = ref(null)
const image2Ref = ref(null)
const image3Ref = ref(null)
const image4Ref = ref(null)
const image5Ref = ref(null)

const { y } = useWindowScroll()

// 이미지마다 다른 배율 적용 (패럴럭스 속도 차)
const parallax1 = computed(() => -y.value * 0.5)   
const parallax2 = computed(() => -y.value * 0.15)  
const parallax3 = computed(() => -y.value * 0.02)   
const parallax4 = computed(() => -y.value * 0.3)  
const parallax5 = computed(() => -y.value * 0.18)

const isVisible1 = useElementVisibility(image1Ref, {
  threshold: 0.2, // 화면에 50% 이상 보이면 true
})
const isVisible2 = useElementVisibility(image2Ref, {
  threshold: 0.2, // 화면에 50% 이상 보이면 true
})
const isVisible3 = useElementVisibility(image3Ref, {
  threshold: 0.2, // 화면에 50% 이상 보이면 true
})
const isVisible4 = useElementVisibility(image4Ref, {
  threshold: 0.2, // 화면에 50% 이상 보이면 true
})
const isVisible5 = useElementVisibility(image5Ref, {
  threshold: 0.2, // 화면에 50% 이상 보이면 true
})
</script>
