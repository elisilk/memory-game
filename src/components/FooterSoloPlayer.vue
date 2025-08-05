<script setup>
import FooterStatContainer from '@/components/FooterStatContainer.vue'

import { computed } from 'vue'
import { useMemoryGameStore } from '@/stores/memoryGame'
const memoryGame = useMemoryGameStore()

const timeElapsed = computed(() => memoryGame.getTimeElapsed)
const numMoves = computed(() => memoryGame.stats[0].numMoves)
</script>

<template>
  <div class="footer-inner footer-inner--solo">
    <FooterStatContainer :statValue="timeElapsed" statType="time" />
    <FooterStatContainer :statValue="numMoves" statType="moves" />
  </div>
</template>

<style scoped>
.footer-inner {
  display: flex;
  gap: var(--space-300); /* (m) 24px -> (t) 32px */
  justify-content: center;
}

.footer-inner > * {
  flex: 1;
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .footer-inner {
    display: flex;
    gap: var(--space-400); /* (m) 24px -> (t) 32px */
  }
}
</style>
