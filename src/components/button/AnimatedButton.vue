<template>
  <button
    type="button"
    class="relative flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest sm:text-[14px]"
  >
    <v-icon
      class="v-icon v-icon-left size-3 sm:size-[14px]"
      icon="arrowRight"
    ></v-icon>
    <span class="v-text">
      <slot></slot>
    </span>
    <v-icon
      class="v-icon v-icon-right size-3 sm:size-[14px]"
      icon="arrowRight"
    ></v-icon>
    <div class="size-3" />
    <span
      class="line-animation absolute bottom-0 left-0 h-px w-full bg-current"
    ></span>
  </button>
</template>

<style scoped>
button {
  padding: 2px 0;
}
.v-icon,
.v-text {
  transition:
    transform 0.3s ease 0.1s,
    opacity 0.3s 0.1s ease;
}
.v-icon-left {
  transform: translateX(22px);
}
.v-text {
  transform: translateX(22px);
}
.v-icon-right {
  transform: translateX(22px);
  opacity: 0;
}
button:hover .v-icon-right {
  transform: translateX(0px);
  opacity: 1;
}

button:hover .v-icon-left {
  transform: translateX(0px);
  opacity: 0;
}
button:hover .v-text {
  transform: translateX(0px);
}
.line-animation {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 1px;
  width: calc(100% - 32px);
  z-index: -1;
}

button:hover .line-animation {
  height: 100%;
  background-color: #00ff00;
}
</style>
