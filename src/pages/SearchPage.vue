<template>
  <main class="relative min-h-screen w-full bg-white">
    <div class="h-[92px]" />

    <section class="border-b border-black bg-[#00ff00]">
      <div class="px-var py-8 sm:py-12">
        <div
          class="mb-8 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em]"
        >
          <span>FCMM / Product Finder</span>
          <span>{{ resultLabel }}</span>
        </div>
        <label for="product-search" class="sr-only">Search products</label>
        <div class="flex items-end border-b-2 border-black pb-2">
          <input
            id="product-search"
            v-model="query"
            type="search"
            autocomplete="off"
            autofocus
            placeholder="SEARCH PRODUCTS"
            class="min-w-0 flex-1 bg-transparent text-[clamp(2.3rem,7vw,7rem)] font-semibold uppercase leading-none tracking-[-0.055em] outline-none placeholder:text-black/25"
            @keyup.esc="clearSearch"
          />
          <button
            v-if="query"
            type="button"
            class="mb-1 shrink-0 text-[10px] font-semibold uppercase sm:mb-2 sm:text-[12px]"
            @click="clearSearch"
          >
            Clear ×
          </button>
        </div>
      </div>
    </section>

    <section v-if="normalizedQuery" aria-live="polite">
      <div
        v-if="results.length"
        class="result-grid grid grid-cols-2 border-b border-black sm:grid-cols-4"
      >
        <div v-for="item in results" :key="item.id">
          <ItemCard :item="item" />
        </div>
      </div>

      <NoItems
        v-else-if="!itemStore.loading"
        :message="`No results for “${query.trim()}”`"
        class="border-b"
      />

      <div v-else class="relative h-[40vh] border-b border-black">
        <v-loading />
      </div>
    </section>

    <section
      v-else
      class="px-var grid min-h-[42vh] gap-8 border-b border-black py-10 sm:grid-cols-2 sm:py-16"
    >
      <p class="max-w-md text-[14px] leading-[1.45] sm:text-[18px]">
        Search by product name, category, or collection tag.
      </p>
      <div class="flex flex-wrap content-start gap-2 sm:justify-end">
        <button
          v-for="term in suggestedTerms"
          :key="term"
          type="button"
          class="border border-black px-3 py-2 text-[10px] font-semibold uppercase transition-colors hover:bg-black hover:text-white"
          @click="query = term"
        >
          {{ term }}
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useItemStore } from '@/stores/item-store'
import ItemCard from '@/pages/Shop/components/ItemCard.vue'
import NoItems from '@/components/NoItems.vue'
import vLoading from '@/v-components/v-loading.vue'

const route = useRoute()
const router = useRouter()
const itemStore = useItemStore()
const query = ref(typeof route.query.q === 'string' ? route.query.q : '')
const suggestedTerms = ['T-Shirt', 'Windbreaker', 'Best', 'IVE REI']

const normalizedQuery = computed(() => query.value.trim().toLowerCase())

const results = computed(() => {
  if (!normalizedQuery.value) return []

  return itemStore.items.filter((item) => {
    const searchable = [
      item.name,
      item.category,
      item.group,
      ...(Array.isArray(item.tags) ? item.tags : [item.tag]),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return searchable.includes(normalizedQuery.value)
  })
})

const resultLabel = computed(() => {
  if (!normalizedQuery.value) return 'Ready'
  return `${String(results.value.length).padStart(2, '0')} Results`
})

watch(query, (value) => {
  const trimmed = value.trim()
  router.replace({
    name: 'search',
    query: trimmed ? { q: trimmed } : {},
  })
})

const clearSearch = () => {
  query.value = ''
}
</script>

<style scoped>
.result-grid > div {
  border-right: 1px solid #000;
}

.result-grid > div:nth-child(2n) {
  border-right: 0;
}

@media (min-width: 640px) {
  .result-grid > div:nth-child(2n) {
    border-right: 1px solid #000;
  }

  .result-grid > div:nth-child(4n) {
    border-right: 0;
  }
}
</style>
