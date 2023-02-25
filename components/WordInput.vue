<template>
  <form ref="formElement" class="form" :class="{ isActive, isCorrect, isComplete }" @submit="formSubmit">
    <div class="field-group">
      <input
        v-for="(letter, i) in store.attempts[position].letters"
        ref="inputElements"
        type="text"
        class="letter-input"
        minlength="1"
        maxlength="1"
        :value="letter.value"
        :disabled="position > store.currentRow"
        @input="inputChange($event, i)"
        @keyup.backspace="keyupBackspace"
      />
    </div>
    <input type="submit" value="Submit" :disabled="!isActive" />
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
const isSubmitted = ref(false)
const isCorrect = ref(false)
const isComplete = ref(false)
const inputValues = ref<string[]>(Array(5).fill(''))

const attemptString = computed<string>(() => inputValues.value.join(''))
const isActive = computed(() => store.currentRow === position)
const isUpdating = computed(() => store.isUpdating)

const focusLetter = (index: number): void => {
  if (inputElements.value) {
    inputElements.value[index]?.focus()
  }
}

const inputChange = (event: Event, index: number) => {
  const { data } = event as InputEvent
  if (data) {
    inputValues.value[index] = data
    focusLetter(index + 1)
  }
}

const keyupBackspace = (event: Event) => {
  const { target } = event as InputEvent
  console.log((target as HTMLInputElement)?.value)
}

const validateInput = (attempt: string | Ref<string>): void => {
  const value = unref(attemptString).toLowerCase()
  isCorrect.value = !!store.theWord && value === store.theWord.toLowerCase()
}

const formSubmit = (event: Event) => {
  event.preventDefault()
  const attempt = inputValues.value.map((letter) => ({ value: letter }))
  store.submitAttempt(attempt, position)
  isSubmitted.value = true
}

watch(isActive, (newValue) => {
  if (newValue) {
    console.log({ newValue, position })
    focusLetter(0)
  }
})

watch(isUpdating, (newValue) => {
  if (newValue) {
    inputValues.value = inputValues.value.fill('')
    formElement.value?.reset()
  }
})
</script>

<style scoped>
.field-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem 0;
}
.letter-input {
  display: block;
  width: 1em;
  font-size: 5rem;
  text-align: center;
  text-transform: uppercase;
  padding: 0;
  margin: 0;
  aspect-ratio: 1/1.5;
}
.isCorrect .letter-input {
  color: green;
}
</style>
