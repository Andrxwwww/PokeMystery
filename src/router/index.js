import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import RandPokemon from '../pages/DexMystery.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dexmystery',
    name: 'DexMystery',
    component: RandPokemon
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router