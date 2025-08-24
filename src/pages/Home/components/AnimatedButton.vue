<template>
  <button
    href="https://chainlist.org/chain/1625"
    target="_blank"
    rel="noopener"
    class="relative flex items-center font-mono text-[3vw] uppercase tracking-widest sm:text-[15px]"
  >
    <slot></slot>
    <v-icon class="v-icon size-3 sm:size-[14px]" icon="arrowRight"></v-icon>
    <div class="size-3" />
    <span
      class="line-animation absolute bottom-0 left-0 h-px w-full bg-current"
    ></span>
  </button>
</template>

<style scoped>
button {
  padding: 2px 0 2px 24px;
}
button:hover {
  background-color: #00ff00;
}
.v-icon {
  transform: translateX(-16px);
  transition:
    transform 0.3s ease 0.1s,
    opacity 0.3s 0.1s ease;
  opacity: 0;
}
button:hover .v-icon {
  transform: translateX(4px);
  opacity: 1;
}
.line-animation {
  position: absolute;
  bottom: 0;
  left: 22px;
  height: 1px;
  width: calc(100% - 44px);
  transition: all 0.3s ease;
}

button:hover .line-animation {
  display: none;
}
</style>
