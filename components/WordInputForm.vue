<template>
  <form ref="formElement" class="form" :class="{ isActive, isComplete }" @submit="formSubmit">
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
      :id="`form${position}Submit`"
      type="submit"
      value="Submit Word"
      class="submit-button"
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
const isComplete = ref(false)
const inputValues = ref<string[]>(Array(5).fill(''))
const canSubmit = ref(false)

const isActive = computed(() => store.currentRow === position)
const isUpdating = computed(() => store.isUpdating)

const focusLetter = (index: number): void => {
  console.log('focusing')
  if (inputElements.value) {
    console.log(inputElements.value[index])
    inputElements.value[index]?.focus()
  }
}

const inputChange = (event: Event, index: number) => {
  // console.log('input change')
  const { data } = event as InputEvent
  inputValues.value[index] = data || ''
  focusLetter(index + (data ? 1 : -1))
  canSubmit.value = inputValues.value.every((input) => input !== '')
}

const keyupBackspace = (event: Event) => {
  const { target } = event as InputEvent
  // console.log((target as HTMLInputElement)?.value)
  canSubmit.value = inputValues.value.every((input) => input !== '')
}

const formSubmit = (event: Event) => {
  event.preventDefault()
  const attempt = inputValues.value.map((letter) => ({ value: letter }))
  store.submitAttempt(attempt, position)
  isComplete.value = true
  if (position === 4) {
    store.isFinished = true
  }
}

watch(isActive, (newValue) => {
  console.log('isActive')
  if (newValue) {
    console.log(newValue)
    console.log(inputElements.value[0])
  }
})

watch(isUpdating, (newValue) => {
  if (newValue) {
    formElement.value?.reset()
    inputValues.value = inputValues.value.fill('')
    isComplete.value = false
  }
})
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
.submit-button {
  position: absolute;
  inset: auto 0 0;
  background: #9e9e9e;
  border: 0;
  font-weight: 700;
  text-transform: uppercase;
  padding: 1em;
  font-size: 1.2em;
  letter-spacing: 1.4px;
  color: #ddd;
  cursor: pointer;
  border-radius: 3px;
}
.canSubmit .submit-button {
  color: white;
  background: var(--green);
}
</style>
