<template>
  <div class="w-full">
    <!-- Shipping Section -->
    <section>
      <h2 class="mb-3 text-[18px] font-semibold uppercase">
        Shipping Information
      </h2>
      <div class="mb-2">
        Orders are processed within 1 business day. Tracking numbers will be
        provided via email.
      </div>
      <ul class="list-inside list-disc space-y-1">
        <li>Standard shipping: 3-5 business days (₩3,000)</li>
        <li>Express shipping: 1-2 business days (₩7,000)</li>
        <li>Free shipping for orders over ₩100,000</li>
      </ul>
    </section>
    <div class="h-8" />
    <!-- Returns Section -->
    <section>
      <h2 class="text-[18px] mb-3 font-semibold uppercase">
        Returns & Exchanges
      </h2>
      <ul class="list-inside list-disc space-y-1">
        <li>Items can be returned within 14 days of delivery.</li>
        <li>Items must be unused and in original packaging.</li>
        <li>
          Return shipping costs are the responsibility of the customer, unless
          the item is defective.
        </li>
      </ul>
      <p class="mt-3">
        To initiate a return, please contact our support team at
        <a href="mailto:support@fcmm.com" class="text-blue-600 underline"
          >support@example.com</a
        >.
      </p>
    </section>
    <div class="h-8" />
    <!-- Note -->
    <div class="text-[10px]">
      * This policy applies only to purchases made through our official store.
    </div>
  </div>
</template>

<script setup>
// 데모용이라 props나 state 없음
</script>
