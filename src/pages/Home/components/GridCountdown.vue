<template>
  <div
    class="container absolute left-1/2 top-1/2 z-[3] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-[#fff]"
  >
    <div
      :class="[
        'font-mono flex text-center text-[5rem] font-semibold uppercase leading-none transition-opacity duration-700',
        isVisible ? 'opacity-100' : 'opacity-0',
      ]"
      :style="{ transitionDelay: `${delay}ms` }"
    >
      <div>DAY</div>
      <div class="digit-counter flex h-[5rem] items-start overflow-hidden">
        <div
          class="digit-front flex flex-col items-center justify-center leading-none"
          :style="{
            transform: `translateY(-${tensIndex * 5}rem)`,
            transitionDuration: `${tensTransitionMs}ms`,
          }"
        >
          <span>3</span><span>2</span><span>1</span>
        </div>
        <div
          class="digit-back flex flex-col items-center justify-center leading-none"
          :style="{
            transform: `translateY(-${onesIndex * 5}rem)`,
            transitionDuration: `${onesTransitionMs}ms`,
          }"
        >
          <span
            v-for="(digit, index) in onesSequence"
            :key="`ones-${index}`"
          >
            {{ digit }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  delay: {
    type: Number,
    default: 0,
  },
})

const onesSequence = [
  '0',
  '9', '8', '7', '6', '5', '4', '3', '2', '1', '0',
  '9', '8', '7', '6', '5', '4', '3', '2', '1', '0',
]

const tensCountdownSeconds = 6
const onesToOneSeconds = 3
const onesToFourSeconds = 3
const onesCarryStepSeconds = onesToOneSeconds / 9

const tensTransitionMs = tensCountdownSeconds * 1000
const firstOnesTransitionMs = onesToOneSeconds * 1000
const carryOnesTransitionMs = Math.round(onesCarryStepSeconds * 1000)
const finalOnesTransitionMs = onesToFourSeconds * 1000
const finalTensIndex = 2

const tensIndex = ref(0)
const onesIndex = ref(0)
const onesTransitionMs = ref(0)
const hasAnimated = ref(false)

let startTimer = null
let onesCarryTimer = null
let onesFinalTimer = null

const clearTimers = () => {
  clearTimeout(startTimer)
  clearTimeout(onesCarryTimer)
  clearTimeout(onesFinalTimer)
}

const resetCountdown = () => {
  clearTimers()
  tensIndex.value = 0
  onesIndex.value = 0
  onesTransitionMs.value = 0
  hasAnimated.value = false
}

const runOnesCountdown = () => {
  onesTransitionMs.value = firstOnesTransitionMs
  onesIndex.value = 9

  onesCarryTimer = setTimeout(() => {
    onesTransitionMs.value = carryOnesTransitionMs
    onesIndex.value = 10

    onesFinalTimer = setTimeout(() => {
      onesTransitionMs.value = finalOnesTransitionMs
      onesIndex.value = onesSequence.length - 1
    }, carryOnesTransitionMs)
  }, firstOnesTransitionMs)
}

watch(() => props.isVisible, (visible) => {
  if (!visible) {
    resetCountdown()
    return
  }

  if (hasAnimated.value) return

  hasAnimated.value = true
  startTimer = setTimeout(() => {
    tensIndex.value = finalTensIndex
    runOnesCountdown()
  }, props.delay)
})

onBeforeUnmount(() => {
  clearTimers()
})
</script>

<style scoped>
.digit-front,
.digit-back {
  transition-property: transform;
  transition-timing-function: linear;
  will-change: transform;
}

.digit-front span,
.digit-back span {
  display: flex;
  min-width: 0.72em;
  height: 5rem;
  align-items: center;
  justify-content: center;
  line-height: 5rem;
}
</style>
