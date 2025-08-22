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
          <template #content>
            A new chapter begins — bold minds move the future
          </template>
        </BrandSection>

        <BrandSection ref="aboutRef" :title="'About Us'">
          <template #content>
            Offer a new paradigm to the Athletic LookMost athletic apparel is
            either too expensive or too formalWe make clothes that are stylish
            and functional, but easily accessible to everyone “Fitness Culture
            Maketh Man”That’s the only motoo of the clothes we want to make
          </template>
        </BrandSection>

        <BrandSection ref="productRef" :title="'Seasonal Product'">
          <template #content>
            <div class="text-[#00ff00]">
              We make clothing that can wear comfortably regardless of the
              season
            </div>
            FCMM stands for sportswear, but pursue easily wearable dailywear Our
            key strength is leading fashion trend and It is not too showy or
            monotonus Especially T-shirt, Sweatshirt and hoodie is loved by many
            customers already Of course we do not miss seasonal special product
            Bench coat, Long padding is the representative product of FCMM You
            can easily see it on the street.
            <div class="mt-12 flex flex-col items-start gap-2 underline">
              <button>Archive Movie</button>
              <button>Latest Lookbook</button>
            </div>
          </template>
        </BrandSection>

        <BrandSection ref="supportRef" :title="'Support Team'">
          <template #content>
            <div class="text-[#00ff00]">
              We are interested in various kinds of sports teams and support
              them
            </div>
            The founding philosophy of fcmm is that many people interst and
            enjoy sports It does not matter whether the type of sport is
            mainstream or not Every team with fcmm wants to be always in the
            spotlight

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

        <BrandSection ref="socialRef" :title="'Social Activity'">
          <template #content>
            <div class="text-[#00ff00]">
              We are making donations to make the world we live better together
            </div>
            FCMM is helping neighbors who taking hard times every year We share
            good ideas with the following associations
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
        FCMM’s vision is rooted in redefining the future of sportswear — not
        just as functional apparel, but as a cultural statement that blends
        athleticism, daily wear, and identity.
        <br /><br />
        By 2030, we aim to lead a new global lifestyle trend that transcends the
        boundary between performance and fashion. Our ambition is to become a
        globally recognized brand known for its innovation in materials,
        inclusive sizing, and sustainable production methods.
        <br /><br />
        We believe that everyone — from amateur athletes to professional teams —
        deserves gear that empowers movement and self-expression. Through
        continuous R&D and collaboration with creators, athletes, and
        communities, FCMM will pioneer a future where sport is not just played,
        but lived — every day, everywhere.
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
        Behind every design, campaign, and product is a team that lives and
        breathes the values of FCMM.
        <br /><br />
        We are a diverse group of designers, former athletes, strategists, and
        culture-makers who believe that sport is more than competition — it’s a
        mindset. Our creative process is rooted in collaboration, driven by
        passion, and guided by the experiences of real people pushing their
        limits every day.
        <br /><br />
        Whether it's sourcing innovative fabric, designing a future-forward
        hoodie, or supporting a local futsal team, our team acts with purpose.
        We are united by a shared mission: to make athletic style accessible,
        exciting, and authentic for all.
        <br /><br />
        FCMM isn’t just a brand — it’s the people behind it.
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
