<script setup>
import EndGameDialogBase from '@/components/EndGameDialogBase.vue'
import StatContainerBase from '@/components/StatContainerBase.vue'
import StatContainerBest from '@/components/StatContainerBest.vue'

import { ref, computed, watch, onMounted } from 'vue'

import { useMemoryGameStore } from '@/stores/memoryGame'
import { formatElapsedTime } from '@/utils'
import {
  getSoloBestsFromLocalStorage,
  setSoloBestsInLocalStorage,
  storageAvailable,
} from '@/utils/localStorage'

const memoryGame = useMemoryGameStore()

const timeElapsed = computed(() => memoryGame.getTimeElapsed)
const timeElapsedFormatted = computed(() => formatElapsedTime(timeElapsed.value))

const numMoves = computed(() => memoryGame.stats[0].numMoves)
const numMovesFormatted = computed(() => numMoves.value + ' Moves')

// const isGameComplete = computed(() => memoryGame.allPairsFound)
const isLocalStorageAvailable = computed(() => storageAvailable('localStorage'))
const showBests = computed(() => isLocalStorageAvailable.value && memoryGame.getSoloBests)

function loadExistingBests() {
  // get existing bests from local storage (if they exist)
  const existingBests = getSoloBestsFromLocalStorage()
  // if none exist in local storage, just use the default empty one
  if (!existingBests) return
  // if do exist, then save them to the Pinia state
  memoryGame.soloBests = existingBests
  // if do exist for this game config, then save a copy
  // if (memoryGame.getSoloBests) preGameExistingBests = { ...memoryGame.getSoloBests }
  // console.log('Saved pre game solo bests:', preGameExistingBests)
}

onMounted(() => {
  if (isLocalStorageAvailable.value) loadExistingBests()
})

const updatedSoloBests = ref(null)

function wasStatBestUpdated(statLabel) {
  return updatedSoloBests.value && Object.keys(updatedSoloBests.value).includes(statLabel)
}

const statLabelFormatted = computed(() => {
  return (statLabel, labelBase) => {
    // return labelBase + (wasStatBestUpdated(statLabel) ? ' (New!)' : '')
    return labelBase
  }
})

const statTag = computed(() => {
  return (statLabel) => {
    return wasStatBestUpdated(statLabel) ? 'New' : ''
  }
})

watch(
  () => memoryGame.allPairsFound,
  (newValue) => {
    if (newValue && isLocalStorageAvailable.value) {
      // save the new bests to the Pinia store
      updatedSoloBests.value = memoryGame.updateSoloBests()
      // console.log('Returned updated solo bests:', updatedSoloBests.value)
      // save the bests to local storage
      setSoloBestsInLocalStorage(memoryGame.soloBests)
    }
  },
)
</script>

<template>
  <EndGameDialogBase class="end-game-dialog--solo">
    <template #heading>You did it!</template>

    <StatContainerBase statLabel="Time Elapsed" :statValue="timeElapsedFormatted" />
    <StatContainerBase statLabel="Moves Taken" :statValue="numMovesFormatted" />

    <template v-if="showBests" #bests>
      <div class="end-game-dialog__bests">
        <h3 class="stats-group__heading">Your Bests</h3>
        <div class="stats-group__values">
          <StatContainerBest
            :statLabel="statLabelFormatted('timeElapsed', 'Time Elapsed')"
            :statValue="formatElapsedTime(memoryGame.getSoloBests.timeElapsed)"
            :statTag="statTag('timeElapsed')"
          />
          <StatContainerBest
            :statLabel="statLabelFormatted('numMoves', 'Moves Taken')"
            :statValue="memoryGame.getSoloBests.numMoves + ' Moves'"
            :statTag="statTag('numMoves')"
          />
        </div>
      </div>
    </template>
  </EndGameDialogBase>
</template>

<style scoped>
.end-game-dialog__bests {
  display: grid;
  gap: var(--space-100);
}

.end-game-dialog__bests .stats-group__values {
  display: grid;
  row-gap: var(--space-100);
  column-gap: var(--space-200);
  grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
}

.end-game-dialog__bests .stats-group__heading {
  color: var(--color-text-label);
  font-size: var(--text-preset11-fs); /* (m) 15px -> (t) 20px */
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .end-game-dialog__bests .stats-group__heading {
    font-size: var(--text-preset8-fs); /* (m) 15px -> (t) 20px */
  }
}
</style>
