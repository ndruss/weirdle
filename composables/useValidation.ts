export const useValidation = (word: string, letters: string[]) => {
  const validatedRow: GameLetter[] = letters.map((value, index) => ({
    value,
    existsInWord: word.split('').includes(value),
    isCorrect: value === word[index]
  }))

  return {
    validatedRow,
  }
}
