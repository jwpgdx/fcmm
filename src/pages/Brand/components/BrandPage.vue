<template>
  <div
    :class="[
      'relative min-h-screen w-full transition-colors duration-700',
      isDarkSection ? 'bg-black text-white' : 'bg-white text-black',
    ]"
  >
    <logo-fcmm
      class="absolute right-[12%] top-[550px] z-[10] hidden h-auto w-[14%] text-white sm:block"
    />
    <div class="relative flex w-full items-start shadow-[0_1px_0_0_black]">
      <div
        class="container flex w-full flex-col gap-72 pb-72 pt-32 uppercase sm:w-[60%] sm:gap-96 sm:pb-96"
      >
        <BrandSection ref="missionRef" isMain :title="'Our Mission'">
          <template #content> Athletic movement, built for every day </template>
        </BrandSection>

        <BrandSection ref="aboutRef" :title="'About Us'">
          <template #content>
            FCMM interprets the athletic look through practical silhouettes and
            everyday styling. Performance references meet an accessible, direct
            visual language designed to move beyond the gym.
          </template>
        </BrandSection>

        <BrandSection ref="productRef" :title="'Seasonal Product'">
          <template #content>
            <div class="text-[#00ff00]">
              Seasonal layers connect sportswear function with daily wear.
            </div>
            The collection moves between lightweight T-shirts, sweatshirts,
            hoodies, windbreakers, and cold-weather outerwear. Each category is
            presented as part of one flexible wardrobe.
            <div class="mt-12 flex flex-col items-start gap-2 underline">
              <RouterLink to="/feature">Archive Editorial</RouterLink>
              <RouterLink to="/collection">Latest Lookbook</RouterLink>
            </div>
          </template>
        </BrandSection>

        <BrandSection ref="supportRef" :title="'Sports Culture'">
          <template #content>
            <div class="text-[#00ff00]">Movement takes many forms.</div>
            The FCMM visual system draws from a broad field of sport, from team
            competition to individual rhythm. Each discipline adds a different
            shape, pace, and attitude to the archive.

            <div class="mt-12 flex items-start gap-8 sm:gap-12">
              <div
                class="flex w-8 flex-col items-center justify-center gap-2 sm:w-10"
                v-for="team in supportTeam"
                :key="team.value"
              >
                <v-icon :icon="team.value" :size="10" class="size-8" />
                <div
                  class="text-center text-[11px] font-medium leading-none sm:text-[14px]"
                >
                  {{ team.label }}
                </div>
              </div>
            </div>
          </template>
        </BrandSection>

        <BrandSection ref="socialRef" :title="'Community'">
          <template #content>
            <div class="text-[#00ff00]">
              Sport becomes culture when it is shared.
            </div>
            Campaigns, collaborations, and local scenes are presented together
            as one evolving record of people, clothing, and movement.
          </template>
        </BrandSection>
      </div>

      <!-- ✅ 이미지 꽉차게 수정 -->
      <div
        class="relative hidden min-h-screen w-[40%] border-l border-black bg-gray-100 sm:sticky sm:right-0 sm:top-0 sm:block"
        :style="{
          backgroundImage: sectionImages[currentSection]
            ? `url(${sectionImages[currentSection]})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      ></div>
    </div>

    <!-- ✅ 섹션 추가 -->
    <BrandSection
      class="container pb-48 pt-32"
      ref="visionRef"
      :title="'Vision'"
    >
      <template #content>
        FCMM approaches sportswear as both functional clothing and a cultural
        expression that connects athleticism, daily wear, and identity.
        <br /><br />
        The design language moves between performance references and direct,
        wearable silhouettes. Campaigns and products share the same focus on
        motion, proportion, and everyday adaptability.
        <br /><br />
        Collaboration expands that language through new people and contexts,
        while the collection archive keeps each chapter connected.
      </template>
    </BrandSection>

    <img
      src="/images/brand-7.webp"
      alt="FCMM Section Image"
      class="h-[50vh] w-full object-cover transition-all duration-700 ease-in-out"
    />

    <BrandSection
      class="container pb-72 pt-32"
      ref="teamRef"
      :title="'The People'"
    >
      <template #content>
        Every design, campaign, and product begins with a shared point of view.
        <br /><br />
        Product, image, styling, and motion work together to turn sportswear
        into a complete visual experience. The process is collaborative and
        changes with every season and partner.
        <br /><br />
        The result is an archive shaped by many contributors but held together
        by one clear idea: keep moving forward.
      </template>
    </BrandSection>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import BrandSection from './BrandSection.vue'
import logoFcmm from '@/components/logo/logo-fcmm.vue'

import { useElementVisibility } from '@vueuse/core'

const supportTeam = [
  { value: 'futsal', label: 'Futsal' },
  { value: 'figureSkating', label: 'Figure Skating' },
  { value: 'skipRope', label: 'Skip Rope' },
  { value: 'rowing', label: 'Rowing' },
]

// 섹션 refs
const missionRef = ref(null)
const aboutRef = ref(null)
const productRef = ref(null)
const supportRef = ref(null)
const socialRef = ref(null)
const visionRef = ref(null)
const teamRef = ref(null)

// 섹션 가시성 추적
const visibleStates = {
  mission: useElementVisibility(missionRef),
  about: useElementVisibility(aboutRef),
  product: useElementVisibility(productRef),
  support: useElementVisibility(supportRef),
  social: useElementVisibility(socialRef),
  vision: useElementVisibility(visionRef),
  team: useElementVisibility(teamRef),
}

// 이미지 매핑 (이미지 추가!)
const sectionImages = {
  mission: '/images/brand-1.webp',
  about: '/images/brand-2.webp',
  product: '/images/brand-3.webp',
  support: '/images/brand-4.webp',
  social: '/images/brand-5.webp',
  vision: '/images/brand-5.webp',
}

// 현재 보이는 섹션
const currentSection = ref('mission')

// 다크 섹션 판단
const isDarkSection = computed(() =>
  ['product', 'support', 'social'].includes(currentSection.value),
)

watch(
  () => Object.entries(visibleStates),
  () => {
    for (const [key, visibleRef] of Object.entries(visibleStates)) {
      if (visibleRef.value) {
        currentSection.value = key
        break
      }
    }
  },
  { immediate: true, deep: true },
)
</script>
