<template>
  <div class="container border-b">
    <div class="flex h-screen w-full flex-col items-center justify-center">
      <div class="h-4" />
      <div
        class="cursor-pointer text-center text-3xl font-semibold uppercase"
        @click="goToRouter('home')"
      >
        Welcome to FCMM.
        <br />
        Please log in to continue.
      </div>
      <div class="h-24" />

      <button
        @click="handleGoogleLogin"
        class="flex h-12 w-full max-w-xs items-center justify-between border bg-black px-4 text-white hover:bg-black/90"
      >
        <img
          src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-1024.png"
          alt="Google G Logo"
          class="size-5"
        />

        <span class="text-[14px] font-semibold">Continue with Google</span>
        <span></span>
      </button>

      <div class="h-4" />
      <span class="text-center text-[10px] opacity-80">
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
