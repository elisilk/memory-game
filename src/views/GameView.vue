<script setup>
import AppLogo from '@/components/AppLogo.vue'
import AppMenu from '@/components/AppMenu.vue'
import GameboardGrid from '@/components/GameboardGrid.vue'
import FooterMultiplayer from '@/components/FooterMultiplayer.vue'
import FooterSoloPlayer from '@/components/FooterSoloPlayer.vue'
import EndGameDialogMultiplayer from '@/components/EndGameDialogMultiplayer.vue'
import EndGameDialogSoloPlayer from '@/components/EndGameDialogSoloPlayer.vue'

import { computed, onMounted } from 'vue'
import { useMemoryGameStore } from '@/stores/memoryGame'

const memoryGame = useMemoryGameStore()

const isMultiplayer = computed(() => memoryGame.numPlayers > 1)

onMounted(() => {
  document.body.dataset.theme = 'primary'
})
</script>

<template>
  <div class="app__container app__game">
    <header class="app__header">
      <AppLogo />
      <AppMenu />
    </header>

    <main class="app__main">
      <h1 class="sr-only">Game On</h1>
      <GameboardGrid />
    </main>

    <footer class="app__footer">
      <FooterMultiplayer v-if="isMultiplayer" />
      <FooterSoloPlayer v-else />
    </footer>

    <EndGameDialogMultiplayer v-if="isMultiplayer" />
    <EndGameDialogSoloPlayer v-else />
  </div>
</template>

<style scoped>
.app__container {
  gap: var(--space-600); /* (m) ? -> (t) ? */
}

.app__header {
  --inline-size-max: var(--inline-size-game-header-max);

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app__main {
  --inline-size-max: var(--inline-size-game-main-max);
}

.app__footer {
  --inline-size-max: var(--inline-size-game-footer-max);
}

.app__logo {
  font-size: var(--text-preset7-fs);
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .app__container {
    gap: var(--space-1000); /* (m) 48px -> (t) 80px */
  }

  .app__logo {
    font-size: var(--text-preset4-fs);
  }
}
</style>
