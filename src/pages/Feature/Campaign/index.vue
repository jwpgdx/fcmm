<template>
  <div class="relative min-h-screen">
    <div class="h-[92px]" />
    <!-- Main Content -->
    <div
      class="flex h-48 flex-col items-center justify-center gap-2 border-b sm:h-40"
    >
      <div class="text-[22px] font-semibold uppercase">
        {{ frontmatter.title }}
      </div>

      <div class="text-[14px] font-normal">{{ frontmatter.subtitle }}</div>
    </div>

    <v-loading v-if="loading" />

    <div
      v-if="!loading && renderedContent"
      class="relative flex w-full flex-col items-center justify-center pb-24 sm:py-24"
    >
      <img
        :src="`/images/feature/${value}/index.webp`"
        class="h-auto w-full max-w-[480px] object-cover object-center"
      />

      <div class="h-8" />
      <!-- 마크다운 본문 -->
      <div
        v-html="renderedContent"
        class="ui-feature mx-var max-w-[480px] text-center"
      ></div>
      <div class="h-12" />

      <AnimatedButton @click="goToRouter(value)">shop now</AnimatedButton>
    </div>

    <div v-if="!loading && !renderedContent">
      <p class="text-gray-500">Content not found</p>
    </div>
    <ProductList :tag="value" :limit="100" class="border-t" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { marked } from 'marked'

import DOMPurify from 'dompurify'
import vLoading from '@/v-components/v-loading.vue'
import ProductList from '@/pages/Shop/components/ProductList.vue'
import AnimatedButton from '@/components/button/AnimatedButton.vue'

// props로 value(slug) 받기
const props = defineProps({
  value: String, // 예: 'fw23-launch', 'ss23-sale'
})

// reactive state
const content = ref('')
const frontmatter = ref({})
const loading = ref(false)

const router = useRouter()

const parseFrontMatter = (raw) => {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/)
  if (!match) return { attributes: {}, body: raw }

  const attributes = Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => line.match(/^([\w-]+):\s*(.*)$/))
      .filter(Boolean)
      .map(([, key, value]) => [
        key,
        value.trim().replace(/^(['"])(.*)\1$/, '$2'),
      ]),
  )

  return { attributes, body: raw.slice(match[0].length) }
}

// 마크다운 렌더링
const renderedContent = computed(() => {
  if (!content.value) return ''
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    headerPrefix: 'heading-',
  })
  const htmlContent = marked(content.value)
  return DOMPurify.sanitize(htmlContent, {
    FORBID_TAGS: ['meta', 'link', 'script', 'title', 'head'],
  })
})

// Markdown 로드 함수 (slug 기반 자동 경로)
async function loadContent(slug) {
  if (!slug) return
  const mdFile = `/md/${slug}.md`

  loading.value = true
  try {
    const res = await fetch(mdFile)
    const raw = res.ok ? await res.text() : '# Not Found\n\nContent not found.'

    const parsed = parseFrontMatter(raw)
    frontmatter.value = parsed.attributes
    content.value = parsed.body
  } catch (err) {
    console.error('Fetch error:', err)
    content.value = '# Error\n\nFailed to load content.'
    frontmatter.value = {}
  } finally {
    loading.value = false
  }
}

// props.value가 바뀌면 새로 로드
watch(
  () => props.value,
  (newVal) => {
    loadContent(newVal)
  },
)

// 초기 로드
onMounted(() => {
  if (props.value) loadContent(props.value)
})

const goToRouter = (val) => {
  router.push({
    name: 'shopValue',
    params: { group: 'featured', value: val },
  })
}
</script>

<style lang="scss">
.ui-feature p {
  @apply text-[13px] leading-[1.5];
}

.ui-feature h2 {
  @apply my-7 text-[22px] font-semibold uppercase;
}
</style>
