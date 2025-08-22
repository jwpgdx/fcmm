<template>
  <div
    class="main-container relative flex w-full items-center justify-center overflow-hidden border-b border-black text-[#000]"
  >

    <!-- 백그라운드 이미지 -->
    <div
      class="background-image pointer-events-none absolute bottom-0 z-[2] h-[70%] sm:inset-0 sm:h-full"
    ></div>

    
    <!-- 오버레이 텍스트/버튼 -->
    <div
      ref="containerRef"
      class="group container absolute left-0 top-16 z-[1] flex cursor-pointer flex-col items-start gap-6 py-12 sm:bottom-0 sm:top-[unset]"
    >


    
    <div
        class="flex w-full flex-wrap text-left text-[2.6rem] font-bold leading-[105%] sm:max-w-[80%] sm:justify-start sm:text-[5.5rem]"
      >
        <AnimatedText
          :isVisible="isVisible"
          :delay="0"
        >
          Fall Winter 2023 Show
        </AnimatedText>

        <AnimatedText
          :isVisible="isVisible"
          :delay="200"
        >
         Season: FW23
        </AnimatedText>

       
      </div>


  

    


 <div
        :class="[
          'flex items-center gap-2 text-left text-[1rem] uppercase transition-all duration-700 sm:text-[1.2rem]',
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0',
        ]"
        :style="{ transitionDelay: '200ms' }"
      >
        10/16 (MON) - 10/29(SUN)
        <v-icon
          :class="[
            'size-4 transition-transform duration-700 group-hover:translate-x-[5px] sm:size-5',
            isVisible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-[-40px] opacity-0',
          ]"
          :style="{ transitionDelay: '500ms' }"
          icon="arrowRight"
        ></v-icon>
      </div>







    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import AnimatedText from './AnimatedText.vue' // 자식 컴포넌트 import

const containerRef = ref(null)
const isVisible = useElementVisibility(containerRef)
</script>

<style scoped>



.main-container {
  height: calc(100vh - 56px);
  background: linear-gradient(to bottom, #ffffff 0%, #fff 100%);
}

.background-image {
  background-image: url('/images/main-1.webp');
  background-size: auto 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  width: 100%;
}
</style>
