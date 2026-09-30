import { fileURLToPath, URL } from 'node:url'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

const imageRoot = fileURLToPath(new URL('./public/images', import.meta.url))

const createImageManifest = (folder) => {
  const root = join(imageRoot, folder)
  const manifest = {}

  const walk = (directory, segments = []) => {
    const entries = readdirSync(directory, { withFileTypes: true })
    const images = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.webp'))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

    if (images.length && segments.length) {
      const key = segments.join('/')
      manifest[key] = images.map((name) => `/images/${folder}/${key}/${name}`)
    }

    entries
      .filter((entry) => entry.isDirectory())
      .forEach((entry) =>
        walk(join(directory, entry.name), [...segments, entry.name]),
      )
  }

  walk(root)
  return manifest
}

const imageManifestPlugin = () => {
  const virtualId = 'virtual:fcmm-image-manifest'
  const resolvedId = `\0${virtualId}`

  return {
    name: 'fcmm-image-manifest',
    resolveId(id) {
      return id === virtualId ? resolvedId : null
    },
    load(id) {
      if (id !== resolvedId) return null

      const manifest = {
        products: createImageManifest('products'),
        collections: createImageManifest('collection'),
      }
      return `export default ${JSON.stringify(manifest)}`
    },
  }
}

export default defineConfig({
  plugins: [
    imageManifestPlugin(),
    vue(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router'],
      dirs: [
        './src/stores/**', // 모든 하위 폴더 포함
        './src/composables/**', // composables 폴더 전체
      ],
      dts: false, // 타입스크립트 사용 안 할 경우 꼭! false로 설정
    }),
    Components({
      // 컴포넌트 디렉토리 지정
      dirs: ['./src/components', './src/v-components'],

      // 컴포넌트 확장자 (기본값: vue)
      extensions: ['vue'],

      // 타입스크립트를 사용하지 않는 경우 dts 비활성화
      dts: false,

      // UI 라이브러리를 사용하는 경우 해당 리졸버 추가
      // resolvers: [ElementPlusResolver(), AntDesignVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
  },
})
