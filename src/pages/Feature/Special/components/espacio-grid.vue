<template>
  <div
    class="flex cursor-pointer flex-col border-b border-t font-mono text-[11px] uppercase sm:flex-row"
  >
    <!-- 아이템1: 왼쪽 큰 블록 -->
    <div
      class="relative w-full border-b sm:w-1/2 sm:border-b-0 sm:border-r"
      @click="itemStore.goToItemPage(items[0].value)"
    >
      <video
        :src="`/images/feature/espacio/${items[0].value}.mp4`"
        class="h-full w-full object-cover transition-all duration-300"
        autoplay
        muted
        loop
        playsinline
      ></video>
      <!--
      <img
        :src="`/images/feature/espacio/${items[0].value}.webp`"
        alt=""
        class="h-full w-full object-cover"
      />
-->
      <div class="p-var absolute left-0 top-0 z-[10]">
        {{ items[0].label }}
      </div>
    </div>

    <!-- 오른쪽 2x2 그리드 -->
    <div class="grid w-full grid-cols-2 grid-rows-2 sm:w-1/2">
      <div
        class="relative border-b border-r"
        @click="itemStore.goToItemPage(items[1].value)"
      >
        <img
          :src="`/images/feature/espacio/${items[1].value}.webp`"
          alt=""
          class="h-full w-full object-cover"
        />
        <div class="p-var absolute left-0 top-0 z-[10]">
          {{ items[1].label }}
        </div>
      </div>
      <div
        class="relative border-b"
        @click="itemStore.goToItemPage(items[2].value)"
      >
        <img
          :src="`/images/feature/espacio/${items[2].value}.webp`"
          alt=""
          class="h-full w-full object-cover"
        />
        <div class="p-var absolute left-0 top-0 z-[10]">
          {{ items[2].label }}
        </div>
      </div>
      <div
        class="relative border-r"
        @click="itemStore.goToItemPage(items[3].value)"
      >
        <img
          :src="`/images/feature/espacio/${items[3].value}.webp`"
          alt=""
          class="h-full w-full object-cover"
        />
        <div class="p-var absolute left-0 top-0 z-[10]">
          {{ items[3].label }}
        </div>
      </div>
      <div class="relative" @click="itemStore.goToItemPage(items[4].value)">
        <img
          :src="`/images/feature/espacio/${items[4].value}.webp`"
          alt=""
          class="h-full w-full object-cover"
        />
        <div class="p-var absolute left-0 top-0 z-[10]">
          {{ items[4].label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useItemStore } from '@/stores/item-store'

const itemStore = useItemStore()

const items = [
  { label: 'Tatom Jumper', value: 'tatom-jumper-navy' },
  { label: 'V-Neck Sweatshirt', value: 'v-neck-sweatshirt-grey' },
  { label: 'Color Block Hoodie', value: 'color-block-hoodie' },
  { label: 'Zip Up Hoodie', value: 'zip-up-hoodie-grey' },
  {
    label: 'Utility Pants',
    value: 'utility-pants',
  },
]
</script>
