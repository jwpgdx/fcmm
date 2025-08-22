<template>
  <div class="relative w-full overflow-hidden">
    <div
      class="grid grid-cols-1 gap-0 sm:grid-cols-2"
      :class="{
        'sm:grid-cols-4': items.length >= 4,
        'sm:grid-cols-3': items.length === 3,
      }"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="group relative cursor-pointer bg-cover bg-center"
        :style="{ backgroundImage: `url(${item.image})` }"
      >
        <div
          class="block w-full"
          style="padding-bottom: 100%"
          aria-hidden="true"
        ></div>

        <!-- 애니메이션 오버레이 -->
        <div
          class="absolute inset-0 z-[2] flex items-center justify-center bg-black/20 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100"
        ></div>

        <!-- 기본 텍스트 -->
        <div
          class="absolute container top-4 left-0  z-[1] flex w-full text-[1.8rem] font-bold leading-none text-black"
        >
          {{ item.label }}
        </div>


      


      </div>
    </div>

    <!-- 수직선 -->
    <div
      v-for="n in items.length - 1"
      :key="`line-${n}`"
      class="absolute top-0 hidden h-full w-px transform bg-black sm:block"
      :style="{ left: `${(100 / items.length) * n}%` }"
      aria-hidden="true"
    ></div>

    <!-- 하단 수평선 -->
    <div class="mt-0 h-px w-full bg-black" aria-hidden="true"></div>
  </div>
</template>

<script setup>
const items = [
  { image: '/images/grid-3.webp', label: 'Best' },
  { image: '/images/grid-4.webp', label: 'Collection' },
  { image: '/images/grid-5.webp', label: 'Notice' },
  { image: '/images/grid-6.webp', label: 'Order' },
]
</script>

<style scoped>
/* Tailwind 쓰고 있어서 별도 CSS 거의 필요 없음 */
</style>
