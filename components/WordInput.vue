<template>
  <form @submit="formSubmit">
    <div class="word-input" :class="{ isActive, isCorrect }">
      <input
        v-for="(letter, i) in store.attempts[index].letters"
        ref="inputElements"
        type="text"
        class="letter-input"
        minlength="1"
        maxlength="1"
        :readonly="!isActive"
        :value="letter.value"
        @input="inputChange($event, i)"
        @keyup.backspace="keyupBackspace"
      />
    </div>
    <input type="submit" value="Submit" :disabled="!isActive" />
  </form>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'

interface Props {
  isActive?: boolean
  index: number
}
const props = withDefaults(defineProps<Props>(), {
  isActive: false,
})

const store = useGameStore()

const inputElements = ref<HTMLElement[]>([])
const isSubmitted = ref<boolean>(false)
const isCorrect = ref<boolean>(false)
// const attempt = computed<string>(() => inputValues.value.join(''))

const isActive = computed(() => store.currentRow === props.index)

const focusLetter = (index: number): void => {
  if (inputElements.value) {
    inputElements.value[index]?.focus()
  }
}

const inputChange = (event: Event, index: number) => {
  const { data } = event as InputEvent
  focusLetter(index + (data ? 1 : -1))
}

const keyupBackspace = (event: Event) => {
  const { target } = event as InputEvent
  console.log((target as HTMLInputElement)?.value)
}

const validateInput = (attempt: string | Ref<string>): void => {
  const value = unref(attempt).toLowerCase()
  isCorrect.value = !!store.theWord && value === store.theWord.toLowerCase()
}

const formSubmit = (event: Event) => {
  event.preventDefault()
  isSubmitted.value = true
  // validateInput(attempt)
  store.incrementRow()
}

// onBeforeUpdate(() => {
//   console.log('beforeupdate')
//   if (isSubmitted.value) {
//     validateInput(attempt)
//   }
//   if (!store.theWord) {
//     console.log('resetting')
//     isCorrect.value = false
//     isSubmitted.value = false
//     inputValues.value = inputValues.value.fill('')
//   }
// })
</script>

<style scoped>
.word-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem 0;
}
.word-input.isActive {
  /* background-color: aquamarine; */
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
