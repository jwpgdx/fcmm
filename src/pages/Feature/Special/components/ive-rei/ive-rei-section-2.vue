<template>
  <div
    class="relative flex h-[100vh] w-full flex-col items-center justify-between overflow-visible "
    ref="container"
  >
    <div
      class="absolute left-1/2 top-1/2 z-[15] flex w-full -translate-x-1/2 -translate-y-1/2"
    >
      <div class="w-full text-center text-[48px] font-semibold leading-[120%]">
        <br />
        <IconText icon="01" label="This Collection" /> is your invitation to
        Connect<br /><br />
        and Affirm your unique Edge in the world.
      </div>
    </div>

    <div
      class="absolute left-1/2 top-1/2 z-[5] flex w-full -translate-x-1/2 -translate-y-1/2"
    >
      <div class="w-full text-center text-[48px] font-semibold leading-[120%]">
        Built on an <IconText icon="02" label="Essential" /> Fluid, and
        <IconText icon="03" label="Adaptive" /> core,<br />
        <br />
        with an inner <IconText icon="04" label="Rhythm" />, ignite a Spark of
        <IconText icon="05" label="Passion" />,<br />
        <br />
      </div>
    </div>
<!-- 맨앞 1 -->
    <img
      :src="`/images/feature/ive-rei/icon-06.webp`"
      class="absolute blur-[4px] top-[24%] left-[-10%] z-[20] h-auto w-[35%] object-cover"
      :style="{
        transform: `translateY(${parallax1}px)`,
      }"
    />
<!-- 맨앞 2 -->
 <img
      :src="`/images/feature/ive-rei/icon-07.webp`"
      class="absolute bottom-[-114%] left-[50%] z-[15] h-auto w-[26%] blur-[2px] object-cover"
      :style="{
        transform: `translateY(${parallax2}px)`,
      }"
    />

<!-- 중간 3 -->
<img
      :src="`/images/feature/ive-rei/icon-08.webp`"
      class="absolute bottom-[-110%] left-[10%] z-[10] h-auto w-[12%] object-cover"
      :style="{
        transform: `translateY(${parallax3}px)`,
      }"
    />
    
<!-- 중간 4 -->
 
<img
      :src="`/images/feature/ive-rei/icon-09.webp`"
      class="absolute bottom-[-140%] left-[44%] z-[10] h-auto w-[16%] object-cover"
      :style="{
        transform: `translateY(${parallax4}px)`,
      }"
    />
    <!-- 중간 5 -->
 <img
      :src="`/images/feature/ive-rei/icon-01.webp`"
      class="absolute bottom-[-300%] right-[10%] z-[1] h-auto w-[5%] object-cover blur-[3px]"
      :style="{
        transform: `translateY(${parallax5}px)`,
      }"
    /> 





  </div>
</template>

<script setup>
import { useWindowScroll } from '@vueuse/core'
import IconText from '@/pages/Feature/Special/components/ive-rei/components/IconText.vue'

const { y } = useWindowScroll()

// 이미지마다 다른 배율 적용 (패럴럭스 속도 차)
const parallax1 = computed(() => -y.value * 0.1)
const parallax2 = computed(() => -y.value * 0.14)
const parallax3 = computed(() => -y.value * 0.2)
const parallax4 = computed(() => -y.value * 0.3)
const parallax5 = computed(() => -y.value * 0.5)
</script>
