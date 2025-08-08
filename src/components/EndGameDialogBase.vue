<script setup>
import ButtonBase from '@/components/ButtonBase.vue'

import { useTemplateRef, watch } from 'vue'

import { useRouter } from 'vue-router'
import { useMemoryGameStore } from '@/stores/memoryGame'

const router = useRouter()
const memoryGame = useMemoryGameStore()
const endGameDialog = useTemplateRef('end-game-dialog')

function openDialog() {
  endGameDialog.value.showModal()
}

function closeDialog() {
  endGameDialog.value.close()
}

function newGame() {
  // console.log('starting a new game (back to start menu)')
  router.push({ name: 'Start' })
}

function restartGame() {
  // console.log('restarting the current game (and shuffling the tiles)')
  memoryGame.restartGame()
  closeDialog()
}

watch(
  () => memoryGame.allPairsFound,
  (newValue) => {
    // console.log(endGameDialog.value)
    // console.log(memoryGame.allPairsFound)
    if (newValue) openDialog()
  },
)
</script>

<template>
  <dialog class="end-game-dialog" ref="end-game-dialog" closedby="any">
    <div class="end-game-dialog__container">
      <div class="end-game-dialog__header">
        <h2 class="end-game-dialog__heading"><slot name="heading">Congrats!</slot></h2>
        <p class="end-game-dialog__description">
          <slot name="description">Game over! Here’s how you got on…</slot>
        </p>
      </div>

      <div class="end-game-dialog__stats">
        <h3 class="stats-group__heading sr-only">This Game</h3>
        <div class="stats-group__values">
          <slot></slot>
        </div>
      </div>

      <slot name="bests"></slot>

      <menu class="end-game-dialog__menu text-preset8">
        <li>
          <ButtonBase
            class="button--highlighted button--full button--end-game-dialog"
            @click="restartGame"
            >Restart</ButtonBase
          >
        </li>
        <li>
          <ButtonBase class="button--full button--end-game-dialog" @click="newGame"
            >Setup New Game</ButtonBase
          >
        </li>
      </menu>
    </div>
  </dialog>
</template>

<style scoped>
.end-game-dialog {
  border: 0;
  border-radius: var(--br-200); /* (m) 10px -> (t) 20px */
  background: var(--color-background-dialog);
  inline-size: min(654px, 100% - 2 * var(--space-300));
  padding: 28px 24px;
}

.end-game-dialog::backdrop {
  background: var(--color-background-backdrop);
}

.end-game-dialog__container {
  display: grid;
  gap: var(--space-300); /* (m) 24px -> (t) 40px */
}

.end-game-dialog__header {
  display: grid;
  gap: var(--space-100);
  justify-items: center;
}

.end-game-dialog__heading {
  color: var(--color-text-heading);
  font-size: var(--text-preset7-fs);
}

.end-game-dialog__description {
  color: var(--color-text-subheading);
  font-size: var(--text-preset12-fs);
}

.end-game-dialog__stats,
.stats-group__values {
  display: grid;
  gap: var(--space-100); /* (m) 8px -> (t) 16px */
}

.end-game-dialog__menu {
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-200);
  grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
}

.end-game-dialog__menu > li {
  list-style: none;
}

.button--end-game-dialog {
  --button-font-size: var(--text-preset9-fs); /* (m) 18px -> (t) 20px */
  --button-block-size: 48px; /* (m) 48px -> (t) 52px */
  --button-border-radius: var(--br-400); /* 26px */
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .end-game-dialog {
    border-radius: var(--br-300); /* (m) 10px -> (t) 20px */
    padding: 59.5px 55px;
  }

  .end-game-dialog--multiplayer {
    padding: 55.5px 55px;
  }

  .end-game-dialog__container {
    gap: var(--space-500); /* (m) 24px -> (t) 40px */
  }

  .end-game-dialog--multiplayer .end-game-dialog__container {
    gap: var(--space-700); /* (m) 24px -> (t) 56px */
  }

  .end-game-dialog__stats,
  .stats-group__values {
    gap: var(--space-200); /* (m) 8px -> (t) 16px */
  }

  .end-game-dialog__heading {
    font-size: var(--text-preset2-fs);
  }

  .end-game-dialog__description {
    font-size: var(--text-preset9-fs);
  }

  .button--end-game-dialog {
    --button-font-size: var(--text-preset8-fs); /* (m) 18px -> (t) 20px */
    --button-block-size: 52px; /* (m) 48px -> (t) 52px */
  }
}
</style>
