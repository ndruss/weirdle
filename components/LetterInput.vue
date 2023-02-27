<template>
  <input
    ref="inputElements"
    type="text"
    minlength="1"
    maxlength="1"
    required="true"
    class="letter-input"
    :class="{ existsInWord, isCorrect }"
    :value="inputValue"
    :disabled="disabled"
    :readonly="readonly"
    @input="onInput($event)"
    @keyup.backspace="onBackspace"
  />
</template>

<script setup lang="ts">
defineProps<{
  existsInWord: boolean
  isCorrect: boolean
  inputValue: string
  disabled: boolean
  readonly: boolean
  onInput: (event: Event) => void
  onBackspace: () => void
}>()
</script>

<style scoped></style>
