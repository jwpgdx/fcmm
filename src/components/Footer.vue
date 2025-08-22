<template>
  <footer class="relative w-full py-[5rem]">
    <div class="container">
      <section class="section1">
        <div class="logo-wrap">
          <logo-fcmm
            class="h-6 w-auto cursor-pointer"
            @click="goToRouter('home')"
          />
         <div class="text-[10px] mt-6 sm:mt-11">
            COMPANY NAME : FCMM Inc.<br/>
            CEO : ALEX CHEN<br/>
            BUSINESS REGISTRATION NO. : 123-45-67890<br/>
            E-COMMERCE PERMIT : NY-2025-0401<br/>
            ADDRESS : 123 Fashion Avenue, Suite 400, New York, NY 10001, USA<br/>
            CUSTOMER SERVICE : +1 (212) 555-0199<br/>
            PRIVACY OFFICER : JANE DOE (privacy@fcmm-global.com)<br/>
            GLOBAL WHOLESALE INQUIRY : wholesale@fcmm-global.com<br/>
            COPYRIGHT © 2019 FCMM Inc. ALL RIGHTS RESERVED.
 </div>
        </div>

        <div class="lists1">
          <div class="title">CUSTOMER SERVICE</div>
          <div class="list" @click="goToRouter('brand')">ABOUT US</div>
          <div class="list">NOTICE</div>
          <div class="list">FAQ</div>
          <div class="list" @click="goToLegalSection('terms')">TERMS & CONDITIONS</div>
          <div class="list" @click="goToLegalSection('privacy')">PRIVACY POLICY</div>
        </div>
        <div class="lists2">
          <div class="title">CUSTOMER CENTER</div>
          <div class="list">+1 (212) 555-0199</div>
          <div class="list">MON-FRI 10:00 AM - 5:00 PM</div>
          <div class="list">CLOSED ON WEEKENDS & HOLIDAYS</div>
        </div>
      </section>
    </div>
  </footer>
</template>

<script setup>
import logoFcmm from '@/components/logo/logo-fcmm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 기존 페이지 이동 함수
const goToRouter = (val) => {
  router.push({ name: val })
}

// legal 페이지의 특정 섹션으로 이동하는 함수를 추가했습니다.
// 라우터의 'legal-section' 이름과 파라미터를 사용합니다.
const goToLegalSection = (sectionName) => {
  router.push({ name: 'legal-section', params: { section: sectionName } })
}
</script>

<style lang="scss" scoped>
.appFooter-wrap {
  margin: 0 auto;
  max-width: 1440px;
  padding: 0 3rem;
  width: 100%;
}
.section1 {
  position: relative;
  display: grid;
  width: 100%;
  grid-column-gap: 1.5rem;
  grid-template-columns: repeat(12, 1fr);
}
.logo-wrap {
  grid-column-start: 1;
  grid-column-end: 4;
}
.lists1,
.lists2 {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.75rem;
}
.title {
  font-weight: 700;
  padding: 0 0 2rem;
}
.lists1 {
  grid-column-start: 7;
  grid-column-end: 10;
}
.lists2 {
  grid-column-end: 13;
  grid-column-start: 10;
}
.list {
  cursor: pointer;
}
.list {
  opacity: 0.8;
}
.list:hover {
  opacity: 0.6;
}

@media all and (max-width: 479px) {
  .appFooter-wrap {
    padding: 0 1rem;
  }
  .section1 {
    grid-column-gap: 1rem;
    grid-template-columns: repeat(6, 1fr);
  }
  .logo-wrap {
    grid-column-start: 1;
    grid-column-end: 7;
    margin: 0 0 3.5rem;
  }
  .lists1 {
    grid-column-end: 1;
    grid-column-start: 4;
  }
  .lists2 {
    grid-column-end: 4;
    grid-column-start: 7;
  }
  .title {
    padding: 0 0 1rem;
  }
}
</style>