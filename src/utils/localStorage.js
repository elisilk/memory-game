const localStorageKey = 'memoryGameSoloBests'

export function getSoloBestsFromLocalStorage() {
  if (!storageAvailable('localStorage')) {
    console.error('Local storage not available')
    return null
  }
  return JSON.parse(localStorage.getItem(localStorageKey))
}

export function setSoloBestsInLocalStorage(newBests) {
  if (!storageAvailable('localStorage')) {
    console.error('Local storage not available')
    return
  }
  localStorage.setItem(localStorageKey, JSON.stringify(newBests))
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

export function storageAvailable(type) {
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
