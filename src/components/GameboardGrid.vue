<script setup>
import GameboardTile from '@/components/GameboardTile.vue'

import { useMemoryGameStore } from '@/stores/memoryGame'

const memoryGame = useMemoryGameStore()

memoryGame.newGame()
</script>

<template>
  <section aria-labelledby="gameboard-label">
    <h2 class="sr-only" id="gameboard-label">Gameboard Grid</h2>
    <div :class="['gameboard', { 'gameboard--6x6': memoryGame.gridSize === '6x6' }]">
      <GameboardTile
        v-for="tile in memoryGame.gameboard"
        :key="tile.id"
        :tile="tile"
        v-model="tile.faceUp"
      />
    </div>
  </section>
</template>

<style scoped>
.gameboard {
  --_gameboard-size: var(--gameboard-size, 4);
  display: grid;
  /* justify-content: center; */
  grid-template-columns: repeat(var(--_gameboard-size), 1fr);
  gap: var(--space-150); /* (m) 12px -> 24px */
}

.gameboard--6x6 {
  --gameboard-size: 6;
  gap: var(--space-100); /* (m) 8px -> 16px */
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .gameboard {
    gap: var(--space-300); /* (m) 12px -> 24px */
  }

  .gameboard--6x6 {
    --gameboard-size: 6;
    gap: var(--space-200); /* (m) 8px -> 16px */
  }
}
</style>
