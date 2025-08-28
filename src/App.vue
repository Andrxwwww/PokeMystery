<script setup>
import RandPokemon from './components/RandPokemon.vue'
</script>

<template>
  <div class="app-container">
    <RandPokemon />
  </div>
</template>

<style scoped>
.app-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/images/background_forest.jpg');
  background-size: cover;
  opacity: 0.6;
  z-index: -1;
}
</style>
