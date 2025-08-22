<template>
  <div class="relative w-full overflow-hidden">
    <div class="grid grid-cols-1 gap-0 sm:grid-cols-2">
      <div v-for="(GridComp, index) in grids" :key="index" class="relative ">
        <div
          class="block w-full pb-[120%] sm:pb-[100%]"
          aria-hidden="true"
        ></div>
        <component :is="GridComp" />
      </div>
    </div>

    <!-- 수직선 (2개일 때 중앙) -->
    <div
      class="absolute left-1/2 top-1/2 block h-px w-full -translate-x-1/2 transform bg-black sm:h-full sm:w-px sm:top-0"
      aria-hidden="true"
    ></div>

    <!-- 하단 수평선 -->
    <div class="mt-0 h-px w-full bg-black" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import Grid7 from './Grid-7.vue'
import Grid8 from './Grid-8.vue'

const grids = [Grid7, Grid8]
</script>
