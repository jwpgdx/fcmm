<template>
  <div class="relative">
    <div class="h-[92px]" />

    <div
      class="p-var flex-wrap flex w-full gap-2 sm:gap-0 leading-[100%] justify-center sm:justify-between overflow-hidden text-[10vw] sm:text-[6.2vw] font-[900]"
    >



      <div>FCMM</div>
      <div>x</div>
      <div>ESPACIO</div>
      <div>COLLECTION</div>





    </div>

    <div
      class="flex w-full flex-col items-center justify-center font-mono text-[11px] uppercase"
    >
      <espacio-swiper />

      <div
        class="px-var relative flex w-full flex-col items-center justify-center py-28"
      >
        <div class="flex items-center gap-1">
          <logoFcmm class="h-4" />
          <v-icon icon="x" class="h-4" />

          <logoEspacio class="h-6" />
        </div>

        <div
          class="mt-6 flex max-w-[480px] flex-col items-center justify-center gap-6 text-center"
        >
          <div class="font-[600]">
            Our third collaborative collection with Espacio will be unveiled on
            March 6th.
          </div>

          <div>
            Starring Colin Jones and Georgia Palmer, lensed by creative Theo
            Liu, the FCMM x ESPACIO campaign pays homage to iconic visual
            innovators such as Helmut Newton and Manfred Thierry Mugler.
          </div>
        </div>
      </div>

      <espacio-grid />

      <div
        class="px-var relative flex w-full flex-col items-center justify-center py-28 text-center"
      >
        <div class="mb-6 font-[600]">Shop the Collection</div>

        <div class="max-w-[480px]">
          Where FCMM sporty energy meets ESPACIO futuristic minimalism. Bold
          silhouettes and functional details define this collaboration, bringing
          urban energy into a new lifestyle.
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import espacioSwiper from './espacio-swiper.vue'
import espacioGrid from './espacio-grid.vue'


</script>
