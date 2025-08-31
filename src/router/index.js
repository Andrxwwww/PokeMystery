import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import RandPokemon from '../pages/DexMystery.vue'
import CaughtPokemon from '../pages/Pokedex.vue'

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
  },
  {
    path: '/pokedex',
    name: 'Pokedex',
    component: CaughtPokemon
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router