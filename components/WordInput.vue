<template>
  <form ref="formElement" class="form" :class="{ isActive, isComplete }" @submit="formSubmit">
    <div class="field-group">
      <input
        v-for="({ value, existsInWord, isCorrect }, i) in store.attempts[position].letters"
        ref="inputElements"
        type="text"
        minlength="1"
        maxlength="1"
        class="letter-input"
        :class="{ existsInWord, isCorrect }"
        :value="value"
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
const isComplete = ref(false)
const inputValues = ref<string[]>(Array(5).fill(''))

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
  if (newValue) {
    focusLetter(0)
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
.form {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.field-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 2rem;
}
.letter-input {
  display: block;
  border: none;
  border-radius: 5px;
  background: #ddd;
  color: #222;
  width: 1.2em;
  font-size: 5rem;
  text-align: center;
  text-transform: uppercase;
  padding: 0;
  margin: 0 0.1em;
  aspect-ratio: 1/1.15;
}
.isComplete .letter-input {
  color: white;
  background: gray;
}
.isComplete .letter-input.existsInWord {
  background: #ecaa44;
}
.isComplete .letter-input.isCorrect {
  background: #4caf50;
}
</style>
