const localStorageKey = 'memoryGame'

export function getSoloBests() {
  if (!storageAvailable('localStorage')) {
    console.error('Local storage not available')
    return null
  }
  return JSON.parse(localStorage.getItem(localStorageKey))
}

export function setSoloBests(newBests) {
  if (!storageAvailable('localStorage')) {
    console.error('Local storage not available')
    return
  }
  localStorage.setItem(localStorageKey, JSON.stringify(newBests))
}

export function isNewSoloBest(theme, gridSize, statLabel, statValue, currentSoloBests) {
  // if not one of the tracked stats, then return false
  if (!(statLabel === 'timeElapsed' || statLabel === 'numMoves')) return false

  const existingSoloBest = currentSoloBests.find(
    (best) => best.theme === theme && best.gridSize === gridSize,
  )

  // if no existing best, then return true
  if (!existingSoloBest) return true

  // otherwise, return whether the new value is as good
  return statValue <= existingSoloBest[statLabel]
}

// const soloBestsExample = [
//   {
//     theme: 'icons',
//     gridSize: '4x4',
//     numMoves: null,
//     timeElapsed: null,
//   },
//   {
//     theme: 'numbers',
//     gridSize: '4x4',
//     numMoves: null,
//     timeElapsed: null,
//   },
//   {
//     theme: 'icons',
//     gridSize: '6x6',
//     numMoves: null,
//     timeElapsed: null,
//   },
//   {
//     theme: 'numbers',
//     gridSize: '6x6',
//     numMoves: null,
//     timeElapsed: null,
//   },
// ]

function storageAvailable(type) {
  let storage
  try {
    storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === 'QuotaExceededError' &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    )
  }
}
