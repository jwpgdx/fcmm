<template>
  <div class="relative w-full overflow-hidden">
    <div class="grid grid-cols-1 gap-0 sm:grid-cols-3">
      <div v-for="(GridComp, index) in grids" :key="index" class="relative">
        <div
          class="block w-full pb-[100%]"
          aria-hidden="true"
        ></div>
        <component :is="GridComp" />
      </div>
    </div>

    <div
      v-for="n in grids.length - 1"
      :key="`grid-line-${n}`"
      class="absolute top-0 hidden h-full w-px bg-black sm:block"
      :style="{ left: `${(100 / grids.length) * n}%` }"
      aria-hidden="true"
    ></div>

    <div class="mt-0 h-px w-full bg-black" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import Grid1 from './Grid-1.vue'
import Grid2 from './Grid-2.vue'
import Grid3 from './Grid-3.vue'

const grids = [Grid1, Grid2, Grid3]
</script>

<style scoped>
/* 필요하면 추가 스타일 여기로 */
</style>
