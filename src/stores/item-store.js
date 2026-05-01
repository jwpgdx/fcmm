import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'  // 라우터 import

export const useItemStore = defineStore('items', () => {
  const items = ref([])
  const best = ref([])
  const loading = ref(false)
  const router = useRouter()  // 라우터 인스턴스
  let itemsRequest = null

  // ✅ fetch + 캐싱
  const fetchItems = async () => {
    if (items.value.length) return items.value
    if (itemsRequest) return itemsRequest

    loading.value = true
    itemsRequest = (async () => {
      try {
        const res = await fetch('/items.json')
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        items.value = await res.json()
        return items.value
      } catch (err) {
        console.error('[fetchItems] Failed to fetch items:', err)
        return []
      } finally {
        loading.value = false
        itemsRequest = null
      }
    })()

    return itemsRequest
  }

  const getItemById = (id) =>
    computed(() => items.value.find((item) => item.id === id))

  const getItemsByCategory = (category, limit = null) =>
    computed(() => {
      const filtered = items.value.filter((item) => item.category === category)
      return limit ? filtered.slice(0, limit) : filtered
    })

  const getItemsByTag = (tag, limit = null) =>
    computed(() => {
      const filtered = items.value.filter((item) =>
        Array.isArray(item.tags) ? item.tags.includes(tag) : item.tag === tag,
      )
      return limit ? filtered.slice(0, limit) : filtered
    })

  const fetchBest = async () => {
    if (best.value.length) return
    try {
      const res = await fetch('/best.json')
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      best.value = await res.json()
    } catch (err) {
      console.error('[fetchBest] Failed:', err)
    }
  }

  const bestItems = computed(() => {
    return best.value
      .map((b) => {
        const item = items.value.find((i) => i.id === b.id)
        return item ? { ...item, bestRank: b.rank } : null
      })
      .filter(Boolean)
      .sort((a, b) => a.bestRank - b.bestRank)
  })

  // ✅ goToItem 추가
  const goToItemPage = (id) => {
    const item = items.value.find((i) => i.id === id)
    if (!item) return
    router.push(`/shop/${item.group}/${item.category}/${item.id}`)
  }

  return {
    items,
    loading,
    fetchItems,
    getItemById,
    getItemsByCategory,
    getItemsByTag,
    fetchBest,
    bestItems,
    goToItemPage, // 추가
  }
})
