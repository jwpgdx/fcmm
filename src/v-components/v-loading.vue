<template>
  <div
    class="flex h-full min-h-24 w-full items-center justify-center font-mono text-[14px] uppercase"
  >
    Loading<span class="dots"></span>
  </div>
</template>

<script setup></script>

<style scoped>
/* 점 애니메이션 */
.dots::after {
  content: '';
  display: inline-block;
  animation: dots 1.5s steps(3, end) infinite;
}

@keyframes dots {
  0%,
  20% {
    content: '';
  }
  40% {
    content: '.';
  }
  60% {
    content: '..';
  }
  80%,
  100% {
    content: '...';
  }
}
</style>
