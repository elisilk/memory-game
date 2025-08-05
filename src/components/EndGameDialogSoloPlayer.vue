<script setup>
import EndGameDialogBase from '@/components/EndGameDialogBase.vue'
import StatContainerBase from '@/components/StatContainerBase.vue'

import { computed } from 'vue'

import { useMemoryGameStore } from '@/stores/memoryGame'
import { formatElapsedTime } from '@/utils'

const memoryGame = useMemoryGameStore()

const timeElapsed = computed(() => formatElapsedTime(memoryGame.getTimeElapsed))

const numMoves = computed(() => memoryGame.stats[0].numMoves + ' Moves')
</script>

<template>
  <EndGameDialogBase class="end-game-dialog--solo">
    <template #heading>You did it!</template>
    <StatContainerBase statLabel="Time Elapsed" :statValue="timeElapsed" />
    <StatContainerBase statLabel="Moves Taken" :statValue="numMoves" />
  </EndGameDialogBase>
</template>

<style scoped></style>
