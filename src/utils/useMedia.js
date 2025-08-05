import { ref, watchEffect } from 'vue'

export const useMedia = (query) => {
  const matches = ref(false) // Initialize with false

  watchEffect((onInvalidate) => {
    const media = window.matchMedia(query)
    matches.value = media.matches // Initial check

    const onChange = () => {
      matches.value = media.matches
    }

    media.addEventListener('change', onChange)

    onInvalidate(() => {
      media.removeEventListener('change', onChange)
    })
  })

  return matches
}
