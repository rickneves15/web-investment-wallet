export const getFirstLetters = (sentence: string): string => {
  const words = sentence.split(' ')

  const firstTwoWords = words.slice(0, 2)

  const shortName = firstTwoWords.map((word) => {
    return word.charAt(0).toUpperCase()
  })

  return shortName.join('')
}
