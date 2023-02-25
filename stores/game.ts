interface GameStore {
  theWord: string
  currentRowIndex: string
  attempts: {
    letters: { value: string }[]
  }[]
}

export const useGameStore = defineStore('game', () => {

  const defaultAttempts = Array(5).fill({ letters: Array(5).fill({ value: '' }) })

  const currentRow = ref(0)
  const theWord = ref('')
  const attempts = ref<GameStore['attempts']>(defaultAttempts)

  function setTheWord(word: string) {
    theWord.value = word
  }

  function resetStore(newWord = '') {
    theWord.value = newWord
    currentRow.value = 0
    attempts.value = []
  }

  function setStore(word: string) {
    setTheWord(word)
  }

  function setAttempt(letters: { value: string }[], row: number) {
    attempts.value = attempts.value.map((attempt, index) => {
      return index === row ? { letters } : attempt
    })
    currentRow.value++
  }

  return {
    attempts,
    currentRow,
    theWord,
    setAttempt,
    setTheWord,
    setStore,
    resetStore
  }
})
