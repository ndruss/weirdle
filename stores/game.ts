interface GameStore {
  theWord: string
  currentRowIndex: string
  isUpdating: boolean
  attempts: {
    letters: { value: string }[]
  }[]
}

export const useGameStore = defineStore('game', () => {
  const defaultAttempts = Array(5).fill({ letters: Array(5).fill({ value: '' }) })

  const attempts = ref<GameStore['attempts']>(defaultAttempts)
  const theWord = ref('')
  const currentRow = ref(0)
  const isUpdating = ref(false)

  function resetStore(newWord = '') {
    attempts.value = defaultAttempts
    theWord.value = newWord
    currentRow.value = 0
  }

  function setStore(word: string) {
    attempts.value = defaultAttempts
    theWord.value = word
    currentRow.value = 0
    isUpdating.value = false
  }

  function submitAttempt(letters: { value: string }[], row: number) {
    attempts.value = attempts.value.map((attempt, index) => {
      return index === row ? { letters } : attempt
    })
    currentRow.value++
  }

  return {
    isUpdating,
    attempts,
    currentRow,
    theWord,
    submitAttempt,
    setStore,
    resetStore
  }
})
