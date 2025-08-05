<script setup>
import EndGameDialogBase from '@/components/EndGameDialogBase.vue'
import StatContainerBase from '@/components/StatContainerBase.vue'

import { computed } from 'vue'

import { useMemoryGameStore } from '@/stores/memoryGame'

const memoryGame = useMemoryGameStore()

const stats = computed(() => memoryGame.statsSortedByNumPairs)

const winners = computed(() => {
  const maxNumPairs = Math.max(...memoryGame.stats.map((item) => item.numPairs))
  return memoryGame.stats.filter((item) => item.numPairs === maxNumPairs)
})

const finalResultHeadline = computed(() => {
  return winners.value.length > 1 ? 'It’s a tie!' : `Player ${winners.value[0].player} Wins!`
})

const isAWinner = computed(() => {
  return (player) => winners.value.find((item) => item.player === player)
})

const statLabel = computed(() => {
  return (player) => {
    return isAWinner.value(player) ? `Player ${player} (Winner!)` : `Player ${player}`
  }
})
</script>

<template>
  <EndGameDialogBase class="end-game-dialog--multiplayer">
    <template #heading>{{ finalResultHeadline }}</template>
    <template #description>Game over! Here are the results…</template>
    <StatContainerBase
      v-for="item in stats"
      :key="'stat-value-player' + item.player"
      :statLabel="statLabel(item.player)"
      :statValue="item.numPairs + ' Pairs'"
      :class="{ 'stat__container--highlight': isAWinner(item.player) }"
    />
  </EndGameDialogBase>
</template>

<style scoped></style>
