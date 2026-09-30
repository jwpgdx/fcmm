<template>
  <div class="relative">
    <div class="h-[92px]" />

    <div
      class="p-var flex w-full flex-wrap justify-center gap-2 overflow-hidden text-[10vw] font-[900] leading-[100%] sm:justify-between sm:gap-0 sm:text-[6.2vw]"
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
            FCMM x ESPACIO is presented through campaign film, still imagery,
            and a focused product edit.
          </div>

          <div>
            Sportswear silhouettes, graphic details, and layered styling shape
            the collection shown across this editorial.
          </div>
        </div>
      </div>

      <espacio-grid />

      <div
        class="px-var relative flex w-full flex-col items-center justify-center py-28 text-center"
      >
        <div class="mb-6 font-[600]">Shop the Collection</div>

        <div class="max-w-[480px]">
          Explore the campaign imagery and selected pieces from the FCMM x
          ESPACIO collection.
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import espacioSwiper from './espacio-swiper.vue'
import espacioGrid from './espacio-grid.vue'
</script>
