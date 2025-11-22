<script setup>
import { EXPERIENCE_PER_LEVEL } from '@/const'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
const authStore = useAuthStore()

const moviesCount = computed(() => authStore.user?.movies.length)
const level = computed(() => Math.floor(authStore.user?.experience / EXPERIENCE_PER_LEVEL) + 1)
const progressToNextLevel = computed(
  () => ((authStore.user?.experience % EXPERIENCE_PER_LEVEL) / EXPERIENCE_PER_LEVEL) * 100,
)
const hoursWatched = computed(() => authStore.user?.totalWatchedHours.toFixed(2))
const streak = computed(() => authStore.user?.currentStreak)
</script>

<template>
  <div class="container">
    <div class="item pink">
      <p class="gradient-text level">{{ level }}</p>
      <p class="subtitle">Level</p>
      <div class="progress-bar">
        <div class="progress-bar-fill" :style="{ width: `${progressToNextLevel}%` }"></div>
      </div>
    </div>
    <div class="item orange">
      <p class="title">{{ moviesCount }}</p>
      <p class="subtitle">movies</p>
    </div>
    <div class="item blue">
      <p class="title">{{ hoursWatched }}</p>
      <p class="subtitle">hours watched</p>
    </div>
    <div class="item green">
      <p class="title">{{ streak }} days</p>
      <p class="subtitle">streak</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.item {
  aspect-ratio: 1/1;
  border-radius: 14px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.item.pink {
  background: var(--pink-gradient);
  border: 1px solid var(--pink-border-color);
}

.item.orange {
  background: var(--orange-gradient);
  border: 1px solid var(--orange-border-color);
}

.item.blue {
  background: var(--blue-gradient);
  border: 1px solid var(--blue-border-color);
}

.item.green {
  background: var(--green-gradient);
  border: 1px solid var(--green-border-color);
}

.level {
  font-size: 2.5rem;
}

.title {
  font-size: 2rem;
  color: var(--primary-text-color);
  font-weight: 500;
}

.subtitle {
  color: var(--secondary-text-color);
}

.progress-bar {
  width: 70%;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

.progress-bar-fill {
  height: 100%;
  background: var(--accent-text-color);
  border-radius: 10px;
}
</style>
