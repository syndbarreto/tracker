<script setup>
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'

import MovieCard from '@/components/MovieCard.vue'

const selectedGenre = ref('all')
const selectedSort = ref('recent')

const authStore = useAuthStore()

const movies = computed(() => {
  const filteredMovies = authStore.user?.movies.filter((movie) => {
    if (selectedGenre.value !== 'all') {
      return movie.genres.includes(selectedGenre.value)
    }

    return true
  })

  return filteredMovies.sort((a, b) => {
    switch (selectedSort.value) {
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'score-highest':
        return b.rating - a.rating
      case 'score-lowest':
        return a.rating - b.rating
    }
  })
})

const genres = computed(() => {
  const allGenres = new Set()

  for (const movie of authStore.user?.movies ?? []) {
    for (const genre of movie.genres) {
      allGenres.add(genre)
    }
  }

  return Array.from(allGenres)
})
</script>

<template>
  <div>
    <div class="container">
      <div class="add-movie">
        <RouterLink class="add-movie-button" to="/movies/add">Add Movie</RouterLink>
      </div>
      <div v-if="authStore.user?.movies.length > 0" class="section">
        <div class="section-header">
          <p class="section-title">Movies you've watched</p>
          <div class="filters">
            <div>
              Sort by:
              <select v-model="selectedSort">
                <option value="recent">Newly Added</option>
                <option value="oldest">Oldest Added</option>
                <option value="score-highest">Highest Score</option>
                <option value="score-lowest">Lowest Score</option>
              </select>
            </div>
            <div>
              Genre:
              <select v-model="selectedGenre">
                <option value="all">All</option>
                <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="movies">
          <MovieCard
            v-for="movie in movies"
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
      <div v-else class="section">
        <p class="section-title">No movies watched yet</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.add-movie {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-movie-button {
  text-decoration: none;
  background-color: var(--card-background-color);
  color: var(--primary-text-color);
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.add-movie-button:hover {
  color: var(--accent-text-color);
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

.filters {
  display: flex;
  gap: 16px;
  align-items: center;
  color: var(--secondary-text-color);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--primary-text-color);
}

.movies {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
</style>
