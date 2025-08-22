<template>
  <div class="relative w-full">
    <div
      v-if="items.length"
      class="grid-with-dividers grid grid-cols-2 border-b sm:grid-cols-4"
    >
      <div v-for="item in items" :key="item.id">
        <ItemCard :item="item" />
      </div>
    </div>

    <NoItems v-else />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ItemCard from '@/pages/Shop/components/ItemCard.vue'
import NoItems from '@/components/NoItems.vue'

const props = defineProps({
  category: { type: String, required: true },
  limit: { type: Number, default: 4 },
})

const allItems = ref([])

onMounted(async () => {
  const res = await fetch('/items.json')
  allItems.value = await res.json()
})

// ✅ props로 받은 카테고리와 제한 개수로 필터링
const items = computed(() => {
  return allItems.value
    .filter((item) => item.category === props.category)
    .slice(0, props.limit)
})
</script>

<style scoped>
.grid-with-dividers {
  position: relative;
}

.grid-with-dividers > div {
  position: relative;
}

/* 세로 divider */
.grid-with-dividers > div:not(:nth-child(2n))::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #000;
}

@media (min-width: 768px) {
  .grid-with-dividers > div:not(:nth-child(2n))::after {
    display: none;
  }

  .grid-with-dividers > div:not(:nth-child(4n))::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #000;
  }
}
</style>
