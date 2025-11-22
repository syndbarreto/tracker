<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AchievementCard from '@/components/AchievementCard.vue'
import { GENRE_LEVELS } from '@/const'

const authStore = useAuthStore()

const achievementsByGenre = computed(() => {
  return authStore.user?.achievements.byGenre
})

const achievementsByStreak = computed(() => {
  return authStore.user?.achievements.byStreak
})

function getGenreLevel(progress) {
  if (progress >= GENRE_LEVELS.Expert) return 'Expert'
  if (progress >= GENRE_LEVELS.Advanced) return 'Advanced'
  if (progress >= GENRE_LEVELS.Intermediate) return 'Intermediate'
  if (progress >= GENRE_LEVELS.Novice) return 'Novice'
  return 'Beginner'
}

const sortedByGenre = computed(() => {
  return [...achievementsByGenre.value].sort((a, b) => b.progress - a.progress)
})

const sortedByStreak = computed(() => {
  return [...achievementsByStreak.value].sort((a, b) => {
    if (a.isCompleted && !b.isCompleted) return -1
    if (!a.isCompleted && b.isCompleted) return 1
    return a.target - b.target
  })
})
</script>

<template>
  <div class="container">
    <h1 class="gradient-text">Achievements</h1>

    <div class="section">
      <h2 class="section-title">By Genre</h2>
      <div v-if="sortedByGenre.length > 0" class="genre-list">
        <div v-for="achievement in sortedByGenre" :key="achievement.title" class="genre-item">
          <span class="genre-name">{{ achievement.title }}</span>
          <span class="genre-level">{{ getGenreLevel(achievement.progress) }}</span>
        </div>
      </div>
      <div v-else class="empty-state">
        <p class="empty-text">
          No genre achievements yet. Start watching movies to unlock achievements!
        </p>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">By Streak</h2>
      <div v-if="sortedByStreak.length > 0" class="achievements">
        <AchievementCard
          v-for="achievement in sortedByStreak"
          :key="achievement.title"
          :title="achievement.title"
          :description="achievement.description"
          :icon="achievement.icon"
          :is-completed="achievement.isCompleted"
          :target="achievement.target"
          :current-streak="authStore.user?.currentStreak || 0"
        />
      </div>
      <div v-else class="empty-state">
        <p class="empty-text">No streak achievements available.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--primary-text-color);
}

.achievements {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.genre-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  background-color: var(--card-background-color);
  padding: 12px;
  border-radius: 10px;
}

.genre-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid var(--transparent-border-color);
}

.genre-item:nth-child(2n) {
  border-left: 1px solid var(--transparent-border-color);
  padding-left: 16px;
}

.genre-item:nth-last-child(-n + 2) {
  border-bottom: none;
}

.genre-name {
  font-size: 0.875rem;
  color: var(--primary-text-color);
  font-weight: 400;
}

.genre-level {
  font-size: 0.75rem;
  color: var(--accent-text-color);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.empty-state {
  padding: 32px;
  text-align: center;
  background-color: var(--card-background-color);
  border-radius: 10px;
}

.empty-text {
  color: var(--secondary-text-color);
  font-size: 1rem;
}
</style>
