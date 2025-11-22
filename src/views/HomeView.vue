<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ProfileSummary from '@/components/ProfileSummary.vue'
import MovieCard from '@/components/MovieCard.vue'

const authStore = useAuthStore()
const recentlyWatched = computed(() => {
  const movies = authStore.user?.movies || []
  return movies.slice(-6).reverse()
})
</script>

<template>
  <div class="container">
    <h1 class="gradient-text">Welcome, {{ authStore.user?.username }}</h1>
    <ProfileSummary />
    <div v-if="recentlyWatched.length > 0" class="section">
      <div class="section-header">
        <h2 class="section-title">Recently Watched</h2>
        <RouterLink to="/movies" class="see-all-btn">See all</RouterLink>
      </div>
      <div class="movies">
        <MovieCard
          v-for="movie in recentlyWatched"
          :key="movie.imdbID"
          :title="movie.title"
          :poster="movie.poster"
          :year="movie.year"
          :rating="movie.rating"
          :genres="movie.genres"
          :imdbID="movie.imdbID"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid: 1fr;
  gap: 32px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--primary-text-color);
}

.see-all-btn {
  padding: 8px 16px;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.see-all-btn:hover {
  opacity: 0.9;
}

.movies {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 1000px;
  overflow: hidden;
}
</style>
