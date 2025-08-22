<template>
  <div class="relative w-full">
    <div
      v-for="store in stores"
      :key="store.value"
      class="relative flex w-full flex-col border-t sm:flex-row"
    >
      <div
        class="px-var relative flex h-auto w-full flex-row justify-between gap-4 py-7 sm:w-[30%] sm:flex-col sm:border-r sm:py-10"
      >
        <div
          class="flex w-[160px] flex-col items-start justify-between gap-2 sm:w-full sm:flex-1 sm:justify-start"
        >
          <div
            class="text-[1.2rem] font-semibold uppercase leading-[110%] sm:text-[1.8rem]"
          >
            {{ store.nameEn }}
          </div>
          <button
            @click="toggleMap(store.value)"
            class="group relative inline-block cursor-pointer text-[12px] sm:mt-4"
          >
            <span class="relative z-10 font-mono uppercase tracking-widest">
              {{ activeMap === store.value ? 'View image' : 'View map' }}
            </span>
            <span
              class="absolute bottom-0 left-0 h-px w-full bg-current transition-all duration-300 group-hover:w-full"
            ></span>
          </button>
        </div>
        <div
          class="flex flex-1 flex-col items-start justify-end gap-6 text-[10px] sm:gap-4 sm:text-[11px]"
        >
          <div>
            {{ store.addressEn }}
          </div>
          <div>
            <div>{{ store.time }}</div>
            <div>Tel. {{ store.tell }}</div>
          </div>
        </div>
      </div>
      <div
        class="relative h-[18rem] w-full overflow-hidden border-t sm:h-[24rem] sm:flex-1 sm:border-none"
      >
        <!-- Store Image -->
        <div v-show="activeMap !== store.value" class="h-full w-full">
          <img
            :src="`/images/store-${store.value}.webp`"
            class="h-full w-full object-cover object-center"
          />
        </div>

        <!-- Google Map -->
        <div v-show="activeMap === store.value" class="h-full w-full">
          <iframe
            :src="getMapUrl(store)"
            width="100%"
            height="100%"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="h-full w-full"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const activeMap = ref(null)

const stores = [
  {
    value: 'lotte_young_plaza',
    nameEn: 'LOTTE YOUNG PLAZA',
    nameKo: '롯데 영플라자',
    addressKo: '서울 중구 남대문로 67 롯데 영플라자 4층',
    addressEn:
      '4F LOTTE YOUNG PLAZA, 67, Namdaemun-ro, Jung-gu, Seoul, Republic of Korea',
    time: 'AM 11:30 - PM 9:30',
    tell: '02-2118-5135',
    // 롯데 영플라자 좌표
    lat: 37.5665,
    lng: 126.978,
  },
  {
    value: 'shilla_ipark_duty_free',
    nameEn: 'SHILLA IPARK DUTY FREE',
    nameKo: 'HDC 신라 면세점',
    addressKo: '서울 용산구 한강대로23길 55 아이파크몰 6층 HUB',
    addressEn:
      'HUB,6F IPARK, 55, Hangang-daero 23-gil, Yongsan-gu, Seoul, Republic of Korea',
    time: 'AM 9:30 - PM 5:30 / 연중무휴',
    tell: '02-490-3668',
    // 아이파크몰 좌표
    lat: 37.5262,
    lng: 126.9653,
  },
]

const toggleMap = (storeValue) => {
  if (activeMap.value === storeValue) {
    activeMap.value = null
  } else {
    activeMap.value = storeValue
  }
}

const getMapUrl = (store) => {
  const baseUrl = 'https://www.google.com/maps/embed/v1/place'
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY' // 실제 API 키로 교체해야 합니다
  const query = encodeURIComponent(store.addressEn)

  // API 키가 없는 경우 일반 Google Maps 링크 사용
  if (apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return `https://maps.google.com/maps?q=${store.lat},${store.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`
  }

  return `${baseUrl}?key=${apiKey}&q=${query}&zoom=16&maptype=roadmap`
}
</script>

<style lang="scss" scoped></style>
