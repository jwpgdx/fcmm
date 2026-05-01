<template>
  <div class="relative  w-full overflow-hidden background-img">
    <!-- 배경 -->

    <div
      class="px-var z-[5]  w-full py-24  text-left text-[4vh] font-semibold leading-[120%] text-[#fd8299] sm:text-[7vh]"
    >
      HAUS NOWHERE Seoul 2F, 433 Ttukseom-ro, Seongdong-gu, Seoul GENTLE MONSTER
      Tokyo Aoyama⁣ 5-chōme-3-2 Minamiaoyama, Minato City, Tokyo 107-0062⁣⁣
      GENTLE MONSTER Beijing Sanlitun Taikoo Li⁣ 1F S10-15, 2F S10-23 & 3F
      S10-32, South Zone, Taikoo Li Sanlitun, 19# Sanlitun Rd, Chaoyang
      District, Beijing
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
</script>

<style scoped>
.background-img {
  background-image: url('/images/feature/ive-rei/main-02.webp');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}
</style>
