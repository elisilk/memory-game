import { generateNumArray, pickNRandomElements, shuffle, duplicate } from '@/utils/index'

const icons = [
  'airplane',
  'alarm clock',
  'anchor',
  'bug',
  'car',
  'eye',
  'flask',
  'ghost',
  'heart',
  'hippo',
  'lira',
  'magnet',
  'moon',
  'snowflake',
  'spock hand',
  'sun',
  'trophy',
  'umbrella',
]

export function generateTileValues(gridSize, theme) {
  // Calculate the number of pairs to generate
  const numTiles = gridSize * gridSize
  if (numTiles % 2 !== 0) console.error('Must have an even number of tiles')
  const numPairs = numTiles / 2

  // Generate the pairs
  let pairValues
  if (theme === 'numbers') {
    // generate the pairs as numbers
    pairValues = duplicate(generateNumArray(numPairs))
  } else {
    // generate the pairs as icons
    pairValues = duplicate(pickNRandomElements(icons, numPairs))
  }

  // Shuffle the pairs
  return shuffle(pairValues)
}
