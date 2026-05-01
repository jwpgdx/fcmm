<template>
  <div
    class="relative w-full justify-center overflow-x-auto border-b border-black"
  >
    <div
      class="container flex h-11 w-full items-center gap-2 whitespace-nowrap uppercase"
    >
      <template v-for="(crumb, index) in breadcrumbs" :key="crumb.text">
        <router-link
          class="whitespace-nowrap text-[12px] sm:hover:underline"
          v-if="crumb.to"
          :to="crumb.to"
        >
          {{ crumb.text }}
        </router-link>
        <span class="whitespace-nowrap text-[12px] sm:hover:underline" v-else>
          {{ crumb.text }}
        </span>
        <span v-if="index < breadcrumbs.length - 1">
          <v-icon :size="4" icon="slash" />
        </span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useItemStore } from '@/stores/item-store'

const route = useRoute()
const itemStore = useItemStore()

function makeBreadcrumbsFromRoute(route, items) {
  const shopRouteNames = ['shop', 'shopGroup', 'shopValue', 'productId']
  if (!shopRouteNames.includes(route.name)) return []

  const crumbs = []
  if (route.name === 'shop') {
    crumbs.push({ text: 'Shop', to: '/shop/all' })
  } else if (route.name === 'shopGroup') {
    crumbs.push({ text: 'Shop', to: '/shop/all' })
    crumbs.push({ text: route.params.group, to: `/shop/${route.params.group}` })
  } else if (route.name === 'shopValue') {
    crumbs.push({ text: 'Shop', to: '/shop/all' })
    crumbs.push({ text: route.params.group, to: `/shop/${route.params.group}` })
    crumbs.push({
      text: route.params.value,
      to: `/shop/${route.params.group}/${route.params.value}`,
    })
  } else if (route.name === 'productId') {
    crumbs.push({ text: 'Shop', to: '/shop/all' })
    crumbs.push({ text: route.params.group, to: `/shop/${route.params.group}` })
    crumbs.push({
      text: route.params.value,
      to: `/shop/${route.params.group}/${route.params.value}`,
    })
    // 상품명으로 변환
    const product = items.find(
      (item) => String(item.id) === String(route.params.id),
    )
    crumbs.push({ text: product ? product.name : route.params.id, to: null })
  }

  return crumbs
}

const breadcrumbs = computed(() =>
  makeBreadcrumbsFromRoute(route, itemStore.items),
)
</script>
