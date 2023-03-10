<template>
  <form ref="formElement" class="form" :class="{ isActive, isComplete, canSubmit }" @submit="formSubmit">
    <div class="field-group">
      <input
        v-for="({ value, existsInWord, isCorrect }, i) in store.attempts[position].letters"
        ref="inputElements"
        type="text"
        minlength="1"
        maxlength="1"
        required="true"
        class="letter-input"
        :class="{ existsInWord, isCorrect }"
        :value="value || inputValues[i]"
        :disabled="position !== store.currentRow"
        :tabindex="isComplete ? -1 : 0"
        @input="inputChange($event, i)"
        @keyup.backspace="keyupBackspace"
      />
    </div>
    <input
      v-if="isActive"
      :id="`form_${position}_submit`"
      type="submit"
      value="Submit Word"
      class="btn-submit btn-primary"
    />
  </form>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'
const store = useGameStore()

const { position } = defineProps<{
  position: number
}>()

const formElement = ref<HTMLFormElement>()
const inputElements = ref<HTMLElement[]>([])
const inputValues = ref<string[]>(Array(5).fill(''))
const isComplete = ref(false)
const canSubmit = ref(false)

const isActive = computed(() => store.currentRow === position && !store.results)

const focusLetter = (index?: number): void => {
  if (inputElements.value && index) {
    inputElements.value[index]?.focus()
  }
}

const inputChange = (event: Event, index: number) => {
  const { data } = event as InputEvent
  inputValues.value[index] = data || ''
  focusLetter(index + (data ? 1 : -1))
  canSubmit.value = inputValues.value.every((input) => input !== '')
}

const keyupBackspace = (event: Event) => {
  const { target } = event as InputEvent
  canSubmit.value = inputValues.value.every((input) => input !== '')
}

const formSubmit = (event: Event) => {
  event.preventDefault()
  store.submitAttempt(inputValues.value, position)
  isComplete.value = true
}

watch(isActive, (newValue) => focusLetter(newValue ? 0 : undefined))

watch(
  () => store.isUpdating,
  (newValue) => {
    if (newValue) {
      formElement.value?.reset()
      inputValues.value = inputValues.value.fill('')
      isComplete.value = false
    }
  }
)
</script>

<style scoped>
.field-group {
  display: grid;
  grid-template-columns: repeat(5, 20%);
}
.letter-input {
  display: block;
  border: none;
  border-radius: 4px;
  background: rgb(204 198 189);
  color: #222;
  font-size: 3em;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  padding: 0;
  margin: 0.1em;
  aspect-ratio: 1/1.1;
}
.isComplete .letter-input {
  color: #ccc;
  background-color: rgb(118 118 118);
}
.isComplete .letter-input.existsInWord {
  color: white;
  background-color: var(--orange);
}
.isComplete .letter-input.isCorrect {
  background-color: var(--green);
}
.btn-submit {
  position: absolute;
  inset: auto 0 0;
  background: #9e9e9e;
}
.canSubmit .btn-submit {
  color: white;
  background: var(--green);
}
</style>
