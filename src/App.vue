<script setup>
import DockNavigation from './components/DockNavigation.vue'
</script>

<template>
  <div class="app-container">
    <DockNavigation />
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

.app-container {
  min-height: 100vh;
  position: relative;
}

.app-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('images/background_forest.jpg');
  background-color: black;
  background-size: cover;
  background-position: center;
  z-index: -1;
}
</style>
