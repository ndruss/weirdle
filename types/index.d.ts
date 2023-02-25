// Type requires at least one element
type NonEmptyArray<T> = [T, ...T[]]

// Type requires at least three elements
type ThreeOrMoreArray = [T, T, T, ...T[]]

type FixedSizeArray<N extends number, T> = N extends 0 ? never[] : {
  0: T
  length: N
} & ReadonlyArray<T>

interface GameLetter {
  value: string
  existsInWord: boolean
  isCorrect: boolean
}

interface GameStore {
  theWord: string
  currentRowIndex: string
  isUpdating: boolean
  attempts: {
    letters: GameLetter[]
  }[]
}
