<script setup>
import ButtonBase from '@/components/ButtonBase.vue'

import { useTemplateRef } from 'vue'
import { useMedia } from '@/utils/useMedia'

import { useRouter } from 'vue-router'
import { useMemoryGameStore } from '@/stores/memoryGame'

const router = useRouter()
const memoryGame = useMemoryGameStore()

const isMobile = useMedia('(max-width: 40rem)')

const menuDialog = useTemplateRef('menu-dialog')

function openMenu() {
  menuDialog.value.showModal()
}

function closeMenu() {
  menuDialog.value.close()
}

function newGame() {
  memoryGame.stopTimer()
  // console.log('starting a new game (back to start menu)')
  router.push({ name: 'Start' })
}

function restartGame() {
  // console.log('restarting the current game (and shuffling the tiles)')
  memoryGame.restartGame()
  if (isMobile.value) closeMenu()
}
</script>

<template>
  <nav v-if="isMobile" class="nav-menu nav-menu--mobile">
    <ButtonBase class="button--menu button--highlighted text-preset10" @click="openMenu"
      >Menu</ButtonBase
    >
    <dialog class="menu-dialog" ref="menu-dialog" closedby="any">
      <menu class="text-preset9">
        <li>
          <ButtonBase class="button--highlighted button--full" @click="restartGame"
            >Restart</ButtonBase
          >
        </li>
        <li><ButtonBase class="button--full" @click="newGame">New Game</ButtonBase></li>
        <li><ButtonBase class="button--full" @click="closeMenu">Resume Game</ButtonBase></li>
      </menu>
    </dialog>
  </nav>

  <nav v-else class="nav-menu">
    <menu class="text-preset8">
      <li>
        <ButtonBase class="button--highlighted" @click="restartGame">Restart</ButtonBase>
      </li>
      <li><ButtonBase @click="newGame">New Game</ButtonBase></li>
    </menu>
  </nav>
</template>

<style scoped>
.nav-menu menu {
  margin: 0;
  padding: 0;
  display: flex;
  gap: var(--space-200);
}

.nav-menu--mobile menu {
  display: grid;
}

.nav-menu menu > li {
  list-style: none;
}

.menu-dialog {
  border: 0;
  border-radius: var(--br-200);
  background: var(--color-background-dialog);
  inline-size: calc(100% - 2 * var(--space-300));
}

.menu-dialog::backdrop {
  background: var(--color-background-backdrop);
}
</style>
