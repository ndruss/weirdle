export const useValidation = (word: string, letters: { value: string }[]) => {

  const validateRow: GameLetter[] = letters.map(({ value }, index) => ({
    value,
    existsInWord: word.split('').includes(value),
    isCorrect: value === word[index]
  }))

  return {
    validateRow
  }
}
