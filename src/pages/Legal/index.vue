<template>
  <div class="container relative border-b">
    <div class="ui-grid">
      <div class="ui-legal__navigation">
        <!-- Navigation Sidebar -->
        <button
          class="ui-legal__item w-full"
          :class="{ 'is-active': activeItem === item.id }"
          v-for="item in navigationItems"
          :key="item.id"
          :href="item.href"
          @click.prevent="setActiveItem(item.id)"
        >
          {{ item.title }}
        </button>
      </div>

<div
  class="hidden sm:block absolute top-0 bottom-0 w-px bg-black"
  style="left: clamp(240px, 20%, 100%)"
></div>

      <div class="ui-legal__content text-background-on">
        <!-- Loading State -->
        <v-loading v-if="loading" />
        <!-- Content with DOMPurify -->
        <div class="ui-grid" v-if="!loading && renderedContent">
          <div v-html="renderedContent" class="ui-richtext-block"></div>
        </div>

        <div v-if="!loading && !renderedContent" class="">
          <p class="text-gray-500">Select a document to view its content</p>
        </div>
      </div>
      <!-- Main Content -->
    </div>
  </div>
</template>

<script setup>
import { marked } from 'marked'
import { useRouter, useRoute } from 'vue-router'
import DOMPurify from 'dompurify'
import './index.scss'

const router = useRouter()
const route = useRoute()

// Reactive state
const activeItem = ref('terms')
const content = ref('')
const loading = ref(false)
// Navigation items
const navigationItems = [
  {
    id: 'terms',
    title: 'Terms of Service',
    href: '/legal/terms',
    file: '/legal/terms.md',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    href: '/legal/privacy',
    file: '/legal/privacy.md',
  },
  {
    id: 'takedown',
    title: 'Takedown Policy',
    href: '/legal/takedown',
    file: '/legal/takedown.md',
  },
  {
    id: 'moderation',
    title: 'Moderation Policy',
    href: '/legal/moderation',
    file: '/legal/moderation.md',
  },
]


// Computed property for rendered content
const renderedContent = computed(() => {
  if (!content.value) return ''

  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    headerPrefix: 'heading-',
  })

  const htmlContent = marked(content.value)
  // DOMPurify로 HTML 정화
  return DOMPurify.sanitize(htmlContent)
})

// Methods
const setActiveItem = async (itemId) => {
  if (activeItem.value === itemId) return

  activeItem.value = itemId
  await loadContent(itemId)

  // Vue Router를 사용해 URL 변경
  const item = navigationItems.find((item) => item.id === itemId)
  if (item) {
    router.push(item.href)
  }
}

const loadContent = async (itemId) => {
  const item = navigationItems.find((item) => item.id === itemId)
  if (!item) return

  loading.value = true

  try {
    const response = await fetch(item.file)
    if (response.ok) {
      content.value = await response.text()
    } else {
      content.value = `# ${item.title}\n\nContent not found. Please check back later.`
    }
  } catch (error) {
    console.error('Error loading content:', error)
    content.value = `# ${item.title}\n\nError loading content. Please try again later.`
  } finally {
    loading.value = false
  }
}

// URL에서 활성 아이템 결정
const determineActiveItemFromRoute = () => {
  const path = route.path
  const foundItem = navigationItems.find((item) => item.href === path)
  return foundItem ? foundItem.id : 'terms' // 기본값
}

// Initialize on mount
onMounted(async () => {
  activeItem.value = determineActiveItemFromRoute()
  await loadContent(activeItem.value)
})

// 라우트 변경 감지
watch(
  () => route.path,
  async (newPath) => {
    const foundItem = navigationItems.find((item) => item.href === newPath)
    if (foundItem && foundItem.id !== activeItem.value) {
      activeItem.value = foundItem.id
      await loadContent(foundItem.id)
    }
  },
)
</script>

<style lang="scss" scoped>
.ui-grid {
  display: grid;
  width: 100%;
  grid-column-gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  margin: 0 auto;
  position: relative;
  grid-auto-flow: column;
  align-items: start;
  padding: 9rem 0;
}
@media screen and (min-width: 640px) {
  .ui-grid {
    grid-column-gap: 1.5rem;
    grid-template-columns: repeat(12, 1fr);
  }
}

.ui-legal__navigation {
  grid-column-end: 7;
  grid-column-start: 1;
  display: flex;
  flex-direction: column;
  margin: 0 0 5rem;
  z-index: 3;
}

@media screen and (min-width: 640px) {
  .ui-legal__navigation {
    grid-column-end: 1;
    grid-column-start: 4;
    position: sticky;
    position: -webkit-sticky;
    top: 10rem;
  }
}

.ui-legal__item {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.25rem;
  color: #000;
  opacity: 0.5;
  margin: 0 0 28px;
  display: flex;
  align-items: center;
  text-align: left;
  justify-content: space-between;
  transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.ui-legal__item.is-active,
.ui-legal__item:hover {
  opacity: 1;
}

.ui-legal__content {
  grid-column-end: 7;
  grid-column-start: 1;
}
@media screen and (min-width: 640px) {
  .ui-legal__content {
    grid-column-end: 13;
    grid-column-start: 5;
  }
}

.ui-legal__content .ui-grid {
  padding: 0;
  align-items: start;
}
@media screen and (min-width: 640px) {
  .ui-legal__content .ui-grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

@media screen and (min-width: 640px) {
}
</style>
