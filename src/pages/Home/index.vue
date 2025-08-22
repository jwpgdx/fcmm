<template>
  <div class="relative w-full">
    <Main-1 />
    <Marquee-1 />
    <Main-2 />
    <Main-3 />
    <Marquee-2 />

    <ProductList category="ive-rei" :limit="4" />
    <Main-4 />
    <Grid-Container-1 />
  </div>
</template>

<script setup>
import Main1 from './components/Main-1.vue'
import Main2 from './components/Main-2.vue'
import Main3 from './components/Main-3.vue'
import Main4 from './components/Main-4.vue'

import GridContainer1 from './components/Grid-Container-1.vue'
import GridContainer2 from './components/Grid-Container-2.vue'
import GridContainer3 from './components/Grid-Container-3.vue'

import ProductList from '@/pages/Shop/components/ProductList.vue'

import Marquee1 from './components/Marquee-1.vue'
import Marquee2 from './components/Marquee-2.vue'
import { Video } from 'lucide-vue-next'
</script>

<style lang="scss" scoped></style>
