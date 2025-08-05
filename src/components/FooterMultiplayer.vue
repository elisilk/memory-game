<script setup>
import FooterStatContainer from '@/components/FooterStatContainer.vue'

import { useMemoryGameStore } from '@/stores/memoryGame'
const memoryGame = useMemoryGameStore()
</script>

<template>
  <div class="footer-inner footer-inner--multiplayer">
    <FooterStatContainer
      v-for="item in memoryGame.stats"
      :statValue="item.numPairs"
      statType="pairs"
      :player="item.player"
      :key="'stat-value-player' + item.player"
    />
  </div>
</template>

<style scoped>
.footer-inner {
  display: flex;
  justify-content: center;
  gap: var(--space-300); /* (m) 24px -> (t) 32px */
}

.footer-inner > * {
  flex: 1;
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .footer-inner {
    gap: var(--space-400); /* (m) 24px -> (t) 32px */
  }
}
</style>
