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
    const { validateRow } = useValidation(theWord.value, letters)

    attempts.value = attempts.value.map((attempt, index) => ({
      letters: index === row ? validateRow : attempt.letters
    }))
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
