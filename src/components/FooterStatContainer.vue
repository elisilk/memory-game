<script setup>
import { computed, defineProps } from 'vue'
import { useMedia } from '@/utils/useMedia'
import { formatElapsedTime } from '@/utils/index'
import { useMemoryGameStore } from '@/stores/memoryGame'

const memoryGame = useMemoryGameStore()

const props = defineProps({
  /** @type number */
  statValue: {
    type: Number,
    required: true,
  },
  /** @type {'time' | 'moves' | 'pairs'} */
  statType: {
    type: String,
    required: true,
  },
  /** @type number */
  player: {
    type: Number,
    default: 1,
  },
})

const isMobile = useMedia('(max-width: 40rem)')

const statLabels = {
  time: { regular: 'Time', short: 'T' },
  moves: { regular: 'Moves', short: 'M' },
  pairs: { regular: 'Pairs', short: 'P' },
  player1: { regular: 'Player 1', short: 'P1' },
  player2: { regular: 'Player 2', short: 'P2' },
  player3: { regular: 'Player 3', short: 'P3' },
  player4: { regular: 'Player 4', short: 'P4' },
}

const isCurrentPlayer = computed(
  () => props.player === memoryGame.getCurrentPlayer && props.statType === 'pairs',
)

const statLabel = computed(() =>
  props.statType === 'pairs'
    ? isMobile.value
      ? 'P' + props.player
      : 'Player ' + props.player
    : statLabels[props.statType].regular,
)

const statValueFormatted = computed(() => {
  if (props.statType === 'time') return formatElapsedTime(props.statValue)
  else return props.statValue
})
</script>

<template>
  <div :class="['stat__container', { ['stat__container--current']: isCurrentPlayer }]">
    <div class="stat__label">{{ statLabel }}</div>
    <div class="stat__value">{{ statValueFormatted }}</div>
  </div>
</template>

<style scoped>
.stat__container {
  background: var(--color-background-accent);
  padding: 10.5px 13.5px;
  border-radius: var(--br-100);
  display: grid;
  justify-items: center;
  max-inline-size: 255px;
}

.stat__container--current {
  position: relative;
  background: var(--color-background-current);
}

.stat__container--current::before {
  --arrow-size: 8px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  content: '';
  width: 0;
  height: 0;
  border-left: var(--arrow-size) solid transparent;
  border-right: var(--arrow-size) solid transparent;
  border-bottom: var(--arrow-size) solid var(--color-background-current);
}

.stat__label {
  font-size: var(--text-preset11-fs);
  color: var(--color-text-label);
}

.stat__value {
  font-size: var(--text-preset7-fs);
}

.stat__container--current .stat__label,
.stat__container--current .stat__value {
  color: var(--color-text-current);
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .stat__container {
    padding: 16px 22.5px;
    border-radius: var(--br-200);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stat__container--multiplayer {
    display: grid;
    justify-items: start;
    row-gap: var(--space-100);
  }

  .stat__label {
    font-size: var(--text-preset9-fs);
  }

  .stat__value {
    font-size: var(--text-preset5-fs);
  }
}

/* viewport: tablet -> desktop */
@media (min-width: 60rem) {
  .stat__container--multiplayer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stat__container--current::after {
    content: 'current turn';
    color: var(--color-text-heading);
    font-size: var(--text-preset13-fs);
    letter-spacing: var(--text-preset13-ls);
    text-transform: uppercase;
    position: absolute;
    inline-size: max-content;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(calc(100% + var(--space-300)));
  }
}
</style>
