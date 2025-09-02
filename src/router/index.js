import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import DexMystery from '../pages/DexMystery.vue'
import Pokedex from '../pages/Pokedex.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dexmystery',
    name: 'DexMystery',
    component: DexMystery
  },
  {
    path: '/pokedex',
    name: 'Pokedex',
    component: Pokedex
  },
  // Catch-all route - must be last
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router