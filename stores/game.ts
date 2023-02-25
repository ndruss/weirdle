export const useGameStore = defineStore('game', () => {
  const attempts = ref<GameStore['attempts']>([])
  const theWord = ref('')
  const currentRow = ref(0)
  const isUpdating = ref(false)
  const isFinished = ref(false)

  function setStore(word: string) {
    attempts.value = Array(5).fill({ letters: Array(5).fill({ value: '' }) })
    theWord.value = word
    currentRow.value = 0
    isUpdating.value = false
    isFinished.value = false
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
    isFinished,
    attempts,
    currentRow,
    theWord,
    submitAttempt,
    setStore,
  }
})
