<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="iconSize"
    :height="iconSize"
    viewBox="0 0 256 256"
    role="presentation"
    class="icon"
    :style="{ '--stroke-width': strokeWidth + 'px' }"
  >
    <component :is="iconComponent" v-if="iconComponent" />
    <slot />
  </svg>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
    /*
    validator: (value) => {
      // 유효성 검사 추가 (옵션)
      const icons = ['X', 'Home', 'User']; 
      return icons.includes(value);
    },
    */
  },
  size: {
    type: Number,
    default: 4,
  },
});

const iconSize = computed(() => props.size * 4);
const strokeWidth = computed(() => {
  const stroke = 23.333 - 1.333 * props.size;
  return Math.max(stroke, 1); // 너무 얇아지면 최소 보장
});

const iconComponent = shallowRef(null);

const loadIcon = async () => {
  try {
    // 첫 글자 대문자 변환 로직 추가
    const iconName = props.icon[0].toUpperCase() + props.icon.slice(1);
    const module = await import(
      /* webpackChunkName: "icon-[request]" */
      `@/components/icons/Icon${iconName}.vue`
    );
    iconComponent.value = module.default;
  } catch (error) {
    console.error(`'${props.icon}' 아이콘 로드 실패:`, error);
    iconComponent.value = (
      await import("@/components/icons/IconX.vue")
    ).default;
  }
};

// 초기 로드 및 아이콘 변경 감지
watch(() => props.icon, loadIcon, { immediate: true });
</script>

<style scoped>
.icon {
  stroke-width: var(--stroke-width);
}
svg {
  display: block;
  fill: none;
  flex-shrink: 0;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
  stroke: currentColor;
}
</style>
