<template>
  <nav class="dock-nav">
    <div class="dock-container">
      <router-link 
        to="/" 
        class="dock-item"
        :class="{ active: $route.path === '/' }"
      >
        <span class="dock-label">Home</span>
      </router-link>
      
      <router-link 
        to="/dexmystery" 
        class="dock-item"
        :class="{ active: $route.path === '/dexmystery' }"
      >
        <span class="dock-label">DexMystery</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'DockNavigation'
}
</script>

<style scoped>
.dock-nav {
  position: fixed;
  top: 3.0rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.dock-container {
  display: flex;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 8px 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  gap: 8px;
}

.dock-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
  border-radius: 18px;
  text-decoration: none;
  color: #a1a1a1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.dock-item:hover {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.dock-item.active {
  background: rgba(255, 255, 255, 0.3);
  color: #ffffff;
  font-weight: bold ;
}

.dock-label {
  font-size: 15px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

</style>