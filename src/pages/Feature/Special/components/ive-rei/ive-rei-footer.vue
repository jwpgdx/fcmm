<template>
  <div class="background-img relative w-full overflow-hidden">
    <!-- 배경 -->

    <div
      class="px-var z-[5] w-full py-24 text-left text-[4vh] font-semibold leading-[120%] text-[#fd8299] sm:text-[7vh]"
    >
      FCMM X IVE REI COLLECTION / ESSENTIAL SILHOUETTES / FLUID MOVEMENT /
      ADAPTIVE LAYERS / EVERYDAY SPORTSWEAR
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
</script>

<style scoped>
.background-img {
  background-image: url('/images/feature/ive-rei/index.webp');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}
</style>
