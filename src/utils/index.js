export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

function addLeadingZeros(value, numPlaces = 2) {
  return String(value).padStart(numPlaces, '0')
}

export function formatElapsedTime(ms) {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const s = seconds % 60

  let formattedTime = ''
  formattedTime += `${addLeadingZeros(minutes, 1)}:${addLeadingZeros(s)}`

  return formattedTime
}

export function generateNumArray(n) {
  return [...Array(n).keys()].map((num) => num + 1)
}

export function pickNRandomElements(array, n) {
  return shuffle(array).slice(0, n)
}

export function shuffle(array) {
  let currentIndex = array.length
  const newArray = [...array]

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ]
  }
  return newArray
}

export function duplicate(array) {
  return [...array, ...array]
}
