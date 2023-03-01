export const useGameStore = defineStore('game', () => {
  const attempts = ref<GameStore['attempts']>([])
  const theWord = ref('')
  const currentRow = ref(0)
  const isUpdating = ref(false)
  const results = ref<'lose' | 'win'>()

  function setStore(word: string) {
    attempts.value = Array(5).fill({ letters: Array(5).fill({ value: '' }) })
    theWord.value = word
    currentRow.value = 0
    isUpdating.value = false
    results.value = undefined
  }

  async function resetStore() {
    isUpdating.value = true
    try {
      await refreshNuxtData()
    } finally {
      isUpdating.value = false
    }
  }

  function submitAttempt(letters: string[], row: number) {
    const { validatedRow } = useValidation(theWord.value, letters)

    attempts.value = attempts.value.map((attempt, index) => ({
      letters: index === row ? validatedRow : attempt.letters
    }))

    if (letters.join('').toLowerCase() === theWord.value.toLowerCase()) {
      results.value = 'win'
    } else if (currentRow.value < attempts.value.length - 1) {
      currentRow.value++
    } else {
      results.value = 'lose'
    }
  }

  return {
    isUpdating,
    results,
    attempts,
    currentRow,
    theWord,
    submitAttempt,
    setStore,
    resetStore,
  }
})
