<script setup>
import AppLogo from '@/components/AppLogo.vue'
import GameCardStart from '@/components/GameCardStart.vue'
</script>

<template>
  <div class="app__container app__start">
    <header class="app__header">
      <AppLogo />
    </header>

    <main class="app__main">
      <h1 class="sr-only">Start Game</h1>
      <GameCardStart />
    </main>
  </div>
</template>

<style scoped>
.app__container {
  --inline-size-max: var(--inline-size-start-max);

  --view-color-background: var(--color-background-secondary);
  --view-color-text: var(--color-text-secondary);

  gap: var(--space-600); /* (m) ? -> (t) ? */
}

.app__header {
  text-align: center;
}

.app__logo {
  font-size: var(--text-preset5-fs);
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .app__container {
    gap: var(--space-1000); /* ? */
  }

  .app__logo {
    font-size: var(--text-preset4-fs);
  }
}
</style>
