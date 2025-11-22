<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="app">
    <nav v-if="authStore.isAuthenticated">
      <div class="title">
        <span>🎬</span>
        <h1 class="gradient-text">CineTracker</h1>
      </div>
      <div class="nav-links">
        <RouterLink class="nav-link" active-class="active" to="/"> 🏠 Home</RouterLink>
        <RouterLink class="nav-link" active-class="active" to="/movies"> 🎥 Movies</RouterLink>
        <RouterLink class="nav-link" active-class="active" to="/achievements">
          🏆 Achievements
        </RouterLink>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.app {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #000000;
}

.title {
  display: flex;
  gap: 16px;
  align-items: center;
}

.title span {
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary-gradient);
  padding: 4px;
  border-radius: 10px;
}

.title h1 {
  font-size: 2rem;
  font-weight: 400;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-link {
  color: var(--secondary-text-color);
  text-decoration: none;
  font-size: 1.2rem;
  padding: 8px 16px;
}

.nav-link.active {
  background: var(--primary-gradient);
  color: var(--primary-text-color);
  border-radius: 10px;
}
</style>
