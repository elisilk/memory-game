<script setup>
import ButtonBase from '@/components/ButtonBase.vue'

import { useRouter } from 'vue-router'
import { useMemoryGameStore } from '@/stores/memoryGame'

const router = useRouter()
const memoryGame = useMemoryGameStore()

memoryGame.$reset()
</script>

<template>
  <form
    id="game-card-start"
    class="game-card game-card--start"
    @submit.prevent="router.push({ name: 'Game' })"
  >
    <!-- theme -->
    <fieldset class="game-card-fieldset">
      <legend class="game-card-legend">Select Theme</legend>
      <div class="game-card-fieldset-options">
        <label class="game-card-label">
          <input
            class="game-card-option"
            type="radio"
            id="game-theme-numbers"
            name="game-theme"
            value="numbers"
            required
            v-model="memoryGame.theme"
          />
          <span class="game-card-option-text">Numbers</span>
        </label>
        <label class="game-card-label">
          <input
            class="game-card-option"
            type="radio"
            id="game-theme-icons"
            name="game-theme"
            value="icons"
            v-model="memoryGame.theme"
          />
          <span class="game-card-option-text">Icons</span>
        </label>
      </div>
    </fieldset>

    <!-- number of players -->
    <fieldset class="game-card-fieldset">
      <legend class="game-card-legend">Number of Players</legend>
      <div class="game-card-fieldset-options game-card-fieldset-options--tight">
        <label class="game-card-label">
          <input
            class="game-card-option"
            type="radio"
            id="game-num-players-1"
            name="game-num-players"
            :value="1"
            required
            v-model="memoryGame.numPlayers"
          />
          <span class="game-card-option-text">1</span>
        </label>
        <label class="game-card-label">
          <input
            class="game-card-option"
            type="radio"
            id="game-num-players-2"
            name="game-num-players"
            :value="2"
            v-model="memoryGame.numPlayers"
          />
          <span class="game-card-option-text">2</span>
        </label>
        <label class="game-card-label">
          <input
            class="game-card-option"
            type="radio"
            id="game-num-players-3"
            name="game-num-players"
            :value="3"
            v-model="memoryGame.numPlayers"
          />
          <span class="game-card-option-text">3</span>
        </label>
        <label class="game-card-label">
          <input
            class="game-card-option"
            type="radio"
            id="game-num-players-4"
            name="game-num-players"
            :value="4"
            v-model="memoryGame.numPlayers"
          />
          <span class="game-card-option-text">4</span>
        </label>
      </div>
    </fieldset>

    <!-- grid size -->
    <fieldset class="game-card-fieldset">
      <legend class="game-card-legend">Grid Size</legend>
      <div class="game-card-fieldset-options">
        <label class="game-card-label">
          <input
            class="game-card-option"
            type="radio"
            id="game-grid-size-4x4"
            name="game-grid-size"
            value="4x4"
            required
            v-model="memoryGame.gridSize"
          />
          <span class="game-card-option-text">4x4</span>
        </label>
        <label class="game-card-label">
          <input
            class="game-card-option"
            type="radio"
            id="game-grid-size-6x6"
            name="game-grid-size"
            value="6x6"
            v-model="memoryGame.gridSize"
          />
          <span class="game-card-option-text">6x6</span>
        </label>
      </div>
    </fieldset>

    <!-- start game  -->
    <ButtonBase type="submit" class="button--big button--highlighted button--start-game"
      >Start Game</ButtonBase
    >
  </form>
</template>

<style scoped>
.game-card {
  background: var(--color-background-primary);
  color: var(--color-text-primary);
  border-radius: var(--br-200); /* (m) 10px -> (t) 20px */
  padding-inline: 25.5px; /* (m) 25.5px -> (t) 54.5px */
  padding-block: 24.5px; /* (m) 24.5px -> (t) 57px */
}

.game-card-fieldset {
  padding: 0;
  margin: 0;
  border: 0;
}

.game-card-fieldset:not(:last-of-type) {
  margin-block-end: var(--space-300); /* (m) 24px -> (t) 32px */
}

.game-card-legend {
  padding: 0;
  margin: 0;
  margin-block-end: var(--space-200); /* 16px */
  color: var(--color-text-label);
  font-size: var(--text-preset11-fs); /* (m) 15px -> (t) 20px */
}

.game-card-fieldset-options {
  display: flex;
  gap: var(--space-100); /* (m) 8px -> (t) 24px or 32px */
}

.game-card-fieldset-options > * {
  flex: 1;
}

.game-card-label {
  cursor: pointer;
  background: var(--color-background-option);
  color: var(--color-text-secondary);
  font-size: var(--text-preset10-fs); /* (m) 16px -> (t) 26px */
  border-radius: var(--br-400);
  block-size: var(--space-500); /* (m) 40px -> (t) 52px */

  display: block grid;
  place-content: center;
  position: relative;
}

.game-card-label > input[type='radio'] {
  cursor: pointer;
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  block-size: 1em;
  inline-size: 1em;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1;
}

.game-card-label > span {
  display: block;
}

.game-card-label:hover,
.game-card-label:has(:focus-visible) {
  background: var(--color-background-active);
}

.game-card-label:has(:focus-visible) {
  outline: 2px dashed var(--color-background-active);
  outline-offset: 2px;
}

.game-card-label:has(:checked) {
  background: var(--color-background-selected);
}

.button--start-game {
  margin-block-start: var(--space-500); /* (m) 40px -> (t) 32px */
  --button-font-size: var(--text-preset9-fs); /* (m) 18px -> (t) 32px */
  --button-block-size: 48px; /* (m) 48px -> (t) 70px */
  --button-border-radius: var(--br-400); /* (m) 26px -> (t) 35px */
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .game-card {
    border-radius: var(--br-300); /* (m) 10px -> (t) 20px */
    padding-inline: 54.5px; /* (m) 25.5px -> (t) 54.5px */
    padding-block: 57px; /* (m) 24.5px -> (t) 57px */
  }

  .game-card-fieldset:not(:last-of-type) {
    margin-block-end: var(--space-400); /* (m) 24px -> (t) 32px */
  }

  .game-card-fieldset-options {
    gap: var(--space-400); /* (m) 8px -> (t) 24px or 32px */
  }

  .game-card-fieldset-options--tight {
    gap: var(--space-300); /* (m) 8px -> (t) 24px or 32px */
  }

  .game-card-legend {
    font-size: var(--text-preset8-fs); /* (m) 15px -> (t) 20px */
  }

  .game-card-label {
    font-size: var(--text-preset6-fs); /* (m) 16px -> (t) 26px */
    block-size: 52px; /* (m) 40px -> (t) 52px */
  }

  .button--start-game {
    margin-block-start: var(--space-400); /* (m) 40px -> (t) 32px */
    --button-font-size: var(--text-preset5-fs); /* (m) 18px -> (t) 32px */
    --button-block-size: 70px; /* (m) 48px -> (t) 70px */
    --button-border-radius: var(--br-500); /* (m) 26px -> (t) 35px */
  }
}
</style>
