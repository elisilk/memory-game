<script setup>
import { computed } from 'vue'

import { useMemoryGameStore } from '@/stores/memoryGame'

import IconAirplane from '@/components/IconAirplane.vue'
import IconAlarmClock from '@/components/IconAlarmClock.vue'
import IconAnchor from '@/components/IconAnchor.vue'
import IconBug from '@/components/IconBug.vue'
import IconCar from '@/components/IconCar.vue'
import IconEye from '@/components/IconEye.vue'
import IconFlask from '@/components/IconFlask.vue'
import IconGhost from '@/components/IconGhost.vue'
import IconHeart from '@/components/IconHeart.vue'
import IconHippo from '@/components/IconHippo.vue'
import IconLira from '@/components/IconLira.vue'
import IconMagnet from '@/components/IconMagnet.vue'
import IconMoon from '@/components/IconMoon.vue'
import IconSnowflake from '@/components/IconSnowflake.vue'
import IconSpockHand from '@/components/IconSpockHand.vue'
import IconSun from '@/components/IconSun.vue'
import IconTrophy from '@/components/IconTrophy.vue'
import IconUmbrella from '@/components/IconUmbrella.vue'

const icons = {
  airplane: IconAirplane,
  'alarm clock': IconAlarmClock,
  anchor: IconAnchor,
  bug: IconBug,
  car: IconCar,
  eye: IconEye,
  flask: IconFlask,
  ghost: IconGhost,
  heart: IconHeart,
  hippo: IconHippo,
  lira: IconLira,
  magnet: IconMagnet,
  moon: IconMoon,
  snowflake: IconSnowflake,
  'spock hand': IconSpockHand,
  sun: IconSun,
  trophy: IconTrophy,
  umbrella: IconUmbrella,
}

const props = defineProps({
  tile: {
    type: Object,
    required: true,
  },
})

const memoryGame = useMemoryGameStore()

const tileId = computed(() => 'gameboard-tile-' + props.tile.id)

const tileLabelId = computed(() => tileId.value + '-label')

const tileLabel = computed(() => `Tile row ${props.tile.row} column ${props.tile.col}`)

const tileType = computed(() => (memoryGame.theme === 'numbers' ? 'span' : icons[props.tile.value]))

const tileValue = computed(() => props.tile.value)

const isPlayable = computed(() => props.tile.playable)

const isAPair = computed(() => props.tile.paired)

const isHighlighted = computed(() => props.tile.highlighted)

const isFaceUp = defineModel()

function handleChange() {
  memoryGame.makeMove(props.tile.id)
}
</script>

<template>
  <div
    :class="[
      'gameboard-tile',
      { 'gameboard-tile--paired': isAPair, 'gameboard-tile--highlighted': isHighlighted },
    ]"
  >
    <input
      class="gameboard-tile-input"
      type="checkbox"
      :id="tileId"
      :name="tileId"
      :aria-labelledby="tileLabelId"
      :disabled="!isPlayable"
      v-model="isFaceUp"
      @change="handleChange"
    />
    <label class="gameboard-tile-label sr-only" :id="tileLabelId">{{ tileLabel }}</label>
    <component v-if="isFaceUp" :is="tileType" class="gameboard-tile-value">{{
      tileValue
    }}</component>
  </div>
</template>

<style scoped>
.gameboard-tile {
  cursor: pointer;
  background: var(--color-background-tile-top);
  color: var(--color-text-secondary);

  aspect-ratio: 1 / 1;
  inline-size: 100%;
  border-radius: var(--br-900);

  display: grid;
  place-items: center;
  grid-template-areas: 'stack';
}

.gameboard-tile > * {
  grid-area: stack;
}

.gameboard-tile-input {
  cursor: pointer;
  margin: 0;
  padding: 0;
  opacity: 0;
  block-size: 100%;
  inline-size: 100%;
  z-index: 1;
}

.gameboard-tile-value {
  display: block;
  font-size: var(--text-preset4-fs);
}

.gameboard--6x6 .gameboard-tile-value {
  font-size: var(--text-preset7-fs);
}

.gameboard-tile:hover,
.gameboard-tile:has(:focus-visible) {
  background: var(--color-background-active);
}

.gameboard-tile:has(:focus-visible) {
  outline: 2px dashed var(--color-background-active);
  outline-offset: 2px;
}

.gameboard-tile:has(:disabled) {
  pointer-events: none;
}

.gameboard-tile:has(:checked),
.gameboard-tile:has(:checked).gameboard-tile--highlighted {
  background: var(--color-background-current);
}

.gameboard-tile--paired:has(:checked) {
  background: var(--color-background-tile-paired);
}

.gameboard-tile svg {
  inline-size: 100%;
  block-size: 100%;
  /* inline-size: 35px; */ /* (m) 35px -> (t) 56px */
  padding: 18.75px; /* (m) 18.75px -> (t) 31px */
}

.gameboard--6x6 .gameboard-tile svg {
  /* inline-size: 25px; */ /* (m) 25px -> (t) 40px */
  padding: 11px; /* (m) 11px -> (t) 21px */
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .gameboard-tile-value {
    font-size: var(--text-preset1-fs);
  }

  .gameboard--6x6 .gameboard-tile-value {
    font-size: var(--text-preset3-fs);
  }

  .gameboard-tile svg {
    /* inline-size: 56px; */ /* (m) 35px -> (t) 56px */
    padding: 31px; /* (m) 18.75px -> (t) 31px */
  }

  .gameboard--6x6 .gameboard-tile svg {
    /* inline-size: 40px; */ /* (m) 25px -> (t) 40px */
    padding: 21px; /* (m) 11px -> (t) 21px */
  }
}
</style>
