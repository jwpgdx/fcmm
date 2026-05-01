<!-- UnderlineTextField.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: { type: String, default: 'Label' },
  id: String,
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  helperText: { type: String, default: '' },
  errorText: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  maxlength: Number,
  name: String,
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const inputId = computed(
  () => props.id || `utf-${Math.random().toString(36).slice(2, 9)}`,
)
const hasError = computed(() => !!props.errorText)
const describedBy = computed(() => {
  const ids = []
  if (props.helperText) ids.push(`${inputId.value}-help`)
  if (props.errorText) ids.push(`${inputId.value}-err`)
  return ids.join(' ') || undefined
})
</script>

<template>
  <label :for="inputId" class="block w-full">
    <!-- Top label -->
    <div class="flex items-center gap-1">
      <span class=" text-[10px] font-semibold uppercase text-black">{{
        label
      }}</span>
      <span v-if="required" class="text-xs">*</span>
    </div>

    <!-- Input wrapper -->
    <div class="group relative">
      <input
        :id="inputId"
        :name="name"
        :type="type"
        class="peer w-full border-0 border-b border-black bg-transparent px-0 font-mono text-base leading-6 text-gray-900 transition-[border-color,border-width] placeholder:text-transparent focus:border-b-2 focus:border-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:text-gray-100 dark:focus:border-gray-100"
        :placeholder="placeholder || label"
        :value="modelValue ?? ''"
        :maxlength="maxlength"
        :aria-invalid="hasError ? 'true' : 'false'"
        :aria-describedby="describedBy"
        :required="required"
        :disabled="disabled"
        @input="(e) => emit('update:modelValue', e.target.value)"
        @focus="(e) => emit('focus', e)"
        @blur="(e) => emit('blur', e)"
      />

      <!-- Underline animation -->
      <span
        class="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-center scale-x-0 bg-black transition-transform duration-200 ease-out peer-focus:scale-x-100"
        aria-hidden="true"
      />
    </div>

    <!-- Helper & Error -->
    <p
      v-if="helperText && !errorText"
      :id="`${inputId}-help`"
      class="mt-1 text-xs text-gray-500"
    >
      {{ helperText }}
    </p>
    <p
      v-if="errorText"
      :id="`${inputId}-err`"
      class="mt-1 text-xs text-red-600"
      role="alert"
    >
      {{ errorText }}
    </p>
  </label>
</template>

<style scoped>
input {
  font-size: 16px;
}
</style>
