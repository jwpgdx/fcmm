<template>
  <div class="relative w-full">
    <Main-1 />
    <Marquee-1 />
    <Main-3 />

    <IveReiMain />
    <ProductList tag="ive-rei" :limit="4" />

    <Grid-Container-1 />
  </div>
</template>

<script setup>
import Main1 from './components/Main-1.vue'
import Main3 from './components/Main-3.vue'

import IveReiMain from '@/pages/Feature/Special/components/ive-rei/ive-rei-main.vue'
import GridContainer1 from './components/Grid-Container-1.vue'

import ProductList from '@/pages/Shop/components/ProductList.vue'

import Marquee1 from './components/Marquee-1.vue'
</script>

<style lang="scss" scoped></style>
