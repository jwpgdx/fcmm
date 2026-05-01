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
import { useItemStore } from '@/stores/item-store'
import ItemCard from '@/pages/Shop/components/ItemCard.vue'
import NoItems from '@/components/NoItems.vue'

const props = defineProps({
  tag: { type: String, default: null },
  category: { type: String, default: null },
  limit: { type: Number, default: 4 },
})

const itemStore = useItemStore()

// tag > category > 전체 순으로 선택
let items
if (props.tag) {
  items = itemStore.getItemsByTag(props.tag, props.limit)
} else if (props.category) {
  items = itemStore.getItemsByCategory(props.category, props.limit)
} else {
  items = itemStore.items
}
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
