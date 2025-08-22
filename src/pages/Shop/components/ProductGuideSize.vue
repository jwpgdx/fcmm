<template>
  <div class="w-full">
    <!-- Title -->
    <div class="mb-4">
      Please refer to the size chart below to find your perfect fit.
    </div>
    <!-- Size Table -->
    <div class="overflow-x-auto">
      <table class="w-full border border-black text-center text-[12px]">
        <thead class="bg-gray-100">
          <tr>
            <th class="border px-3 py-2 font-semibold">Size</th>
            <th class="border px-3 py-2 font-semibold">US</th>
            <th class="border px-3 py-2 font-semibold">EU</th>
            <th class="border px-3 py-2 font-semibold">Foot Length (cm)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-3 py-2">S</td>
            <td class="border px-3 py-2">6</td>
            <td class="border px-3 py-2">39</td>
            <td class="border px-3 py-2">24.5</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border px-3 py-2">M</td>
            <td class="border px-3 py-2">8</td>
            <td class="border px-3 py-2">41</td>
            <td class="border px-3 py-2">26</td>
          </tr>
          <tr>
            <td class="border px-3 py-2">L</td>
            <td class="border px-3 py-2">10</td>
            <td class="border px-3 py-2">43</td>
            <td class="border px-3 py-2">27.5</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border px-3 py-2">XL</td>
            <td class="border px-3 py-2">12</td>
            <td class="border px-3 py-2">45</td>
            <td class="border px-3 py-2">29</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-2 text-center text-[10px]">
      * Measurements may vary slightly depending on the design.
    </div>
  </div>
</template>

<script setup>
// 데모용이라 props/state 없음
</script>
