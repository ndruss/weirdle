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

  function incrementRow(): void {
    currentRow.value++
  }

  function setTheWord(word: string): void {
    theWord.value = word
  }

  function resetStore(newWord = ''): void {
    theWord.value = newWord
    currentRow.value = 0
    attempts.value = []
  }

  function setStore(word: string): void {
    setTheWord(word)
  }

  // function setAttempts

  return {
    attempts,
    currentRow,
    theWord,
    incrementRow,
    setTheWord,
    setStore,
    resetStore
  }
})
