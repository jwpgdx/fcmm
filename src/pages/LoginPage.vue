<template>
  <div class="container flex justify-center border-b">
    <div
      class="flex h-screen w-full max-w-[480px] flex-col items-center justify-center"
    >
      <logo-fcmm
        class="mb-8 h-7 w-auto cursor-pointer"
        aria-label="Go to home"
        @click="router.push({ name: 'home' })"
      />

      <div
        class="bg-[#00ff00] px-3 py-2 text-center text-[10px] font-semibold uppercase"
      >
        Portfolio demo / Account services disabled
      </div>
      <div class="py-6 text-center text-[12px] uppercase">
        Welcome to FCMM. Sign in to continue.
      </div>
      <div class="flex w-full flex-col gap-4">
        <v-text-field required v-model="email" label="email" type="email" />
        <v-text-field
          required
          v-model="password"
          label="password"
          type="password"
        />
      </div>
      <div class="h-8" />

      <button
        @click="handleDemoAction"
        class="flex h-10 w-full items-center justify-center border bg-black text-white hover:bg-black/90"
      >
        <span class="font-mono text-[10px] uppercase">sign in</span>
      </button>

      <div class="h-12" />
      <div class="py-6 text-center text-[12px] uppercase">
        Enjoy a faster checkout experience and manage all your personal
        information in your dedicated account.
      </div>
      <button
        @click="handleDemoAction"
        class="flex h-10 w-full items-center justify-center border bg-black text-white hover:bg-black/90"
      >
        <span class="font-mono text-[10px] uppercase">create a profile</span>
      </button>
      <span class="py-2 text-center text-[10px] uppercase">
        By continuing, you agree to the
        <span
          class="cursor-pointer underline"
          @click="goToLegalSection('terms')"
          >Terms of Service</span
        >
        and
        <span
          class="cursor-pointer underline"
          @click="goToLegalSection('privacy')"
          >Privacy Policy</span
        >.
      </span>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast'
import { useRouter } from 'vue-router'
import logoFcmm from '@/components/logo/logo-fcmm.vue'

const toast = useToast()
const router = useRouter()

const handleDemoAction = () => {
  toast.info('Account services are not included in this portfolio demo.')
}

const goToLegalSection = (sectionName) => {
  router.push({ name: 'legal-section', params: { section: sectionName } })
}
</script>
