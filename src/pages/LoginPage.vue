<template>
  <div class="container flex justify-center border-b">
    <div
      class="flex h-screen w-full max-w-[480px] flex-col items-center justify-center"
    >
     
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
        @click="handleGoogleLogin"
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
        @click="handleGoogleLogin"
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

const handleGoogleLogin = () => {
  // 테스트용: 권한 없다는 에러 메시지 출력
  toast.error("You don't have permission.")
}

const goToRouter = (val) => {
  router.push({ name: val })
}

const goToLegalSection = (sectionName) => {
  router.push({ name: 'legal-section', params: { section: sectionName } })
}
</script>
