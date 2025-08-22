<template>
  <div
    :class="[
      'v-text-field',
      {
        'v-text-field--focused': isFocused,
        'v-text-field--filled': isFilled,
        'v-text-field--hover': isHovered,
        'v-text-field--invalid': !isValid,
        'v-text-field--disabled': isDisabled,
      },
    ]"
  >
    <div class="v-text-field__container">
      <div class="v-text-field__overlay"></div>
      <div class="v-text-field__field" @click="handleFocusInput">
        <label v-if="label" class="v-text-field__field-label">{{ label }}</label>
        <input
          ref="inputField"
          class="v-text-field__field-input"
          :type="currentInputType"
          :value="modelValue"
          @input="handleInput"
          @focus="() => (isFocused = true)"
          @blur="() => (isFocused = false)"
          @mouseenter="() => (isHovered = true)"
          @mouseleave="() => (isHovered = false)"
          :disabled="isDisabled"
        />
        <div class="v-text-field__field-button" v-if="type === 'password'">
          <v-button
            variant="flat"
            :height="24"
            isIcon
            @click="togglePassword"
            :active="showPassword"
            :icon="!showPassword ? eye : eyeClosed"
          />
        </div>
      </div>

      <div class="v-text-field__outline">
        <div class="v-text-field__outline-start"></div>
        <div v-if="label" class="v-text-field__outline-notch">
          <label class="v-text-field__outline-label">{{ label }}</label>
        </div>
        <div class="v-text-field__outline-end"></div>
      </div>
      <div class="v-text-field__background"></div>
    </div>

    <div class="v-text-field__details" v-if="!isValid || hint">
      <div class="v-text-field__details-icon">
        <v-icon :size="16" v-if="isValid" icon="info" />
        <v-icon :size="16" v-else icon="warning" />
      </div>
      <div class="v-text-field__details-messages">
        <span>{{ !isValid ? errorMessage : hint }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  label: { type: String, default: null },
  modelValue: { type: String, default: "" },
  hint: { type: String },
  type: { type: String, default: "text" },
  rules: { type: [Array, String, Object], default: () => [] },
  spacing: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  autoFocus: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);
const isHovered = ref(false);
const showPassword = ref(false);
const errorMessage = ref("");
const inputField = ref(null);

const isFilled = computed(() => !!props.modelValue);

const isValid = computed(() => {
  let valid = true;
  if (Array.isArray(props.rules)) {
    props.rules.forEach((rule) => {
      const result = rule(props.modelValue);
      if (result !== true) {
        errorMessage.value = result;
        valid = false;
      }
    });
  }
  return valid;
});

const currentInputType = computed(() =>
  props.type === "password" && showPassword.value ? "text" : props.type,
);

const isDisabled = computed(() => props.disabled);

// 메서드들: 이거 안 쓰면 그냥 우물에 빠진다, 알았냐?
function handleFocusInput() {
  if (!isDisabled.value && inputField.value) {
    inputField.value.focus();
  }
}

function handleInput(event) {
  emit("update:modelValue", event.target.value);
}

function togglePassword() {
  showPassword.value = !showPassword.value;
}

// 마운트 후 자동 포커스
onMounted(() => {
  if (props.autoFocus && inputField.value) {
    inputField.value.focus();
    isFocused.value = true;
  }
});
</script>
<style lang="scss" scoped>
@use "./v-text-field.scss";
</style>
