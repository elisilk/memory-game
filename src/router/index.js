import { createRouter, createMemoryHistory } from 'vue-router'

import Start from '@/views/StartView.vue'
import Game from '@/views/GameView.vue'

const routes = [
  { path: '/', name: 'Start', component: Start },
  { path: '/game', name: 'Game', component: Game },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
