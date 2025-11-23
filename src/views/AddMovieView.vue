<script setup>
import { computed, ref } from 'vue'
import API from '@/api'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import PosterFallbackImage from '@/assets/poster-fallback.jpg'

const authStore = useAuthStore()
const search = ref('')
const errorMessage = ref(null)
const movie = ref(null)
const isLoading = ref(false)
const rating = ref(0)
const router = useRouter()
const hoveredRating = ref(0)
const posterError = ref(false)
const isPosterLoading = ref(true)

async function onSearch() {
  if (!search.value.trim()) {
    return
  }

  isLoading.value = true
  errorMessage.value = null
  rating.value = 0
  posterError.value = false
  isPosterLoading.value = true
  movie.value = null

  try {
    movie.value = await API.searchMovie(search.value)
  } catch (error) {
    errorMessage.value = error.message ?? 'An error occurred while searching for a movie'
  } finally {
    isLoading.value = false
  }
}

async function onAddMovie() {
  try {
    await authStore.addMovie(movie.value, rating.value)
    router.push('/movies')
  } catch (error) {
    console.error(error)
    errorMessage.value = error.message ?? 'An error occurred while adding a movie'
  }
}

function onMouseOver(i) {
  hoveredRating.value = i
}

function onMouseLeave() {
  hoveredRating.value = 0
}

function onPosterError() {
  posterError.value = true
}

const poster = computed(() => {
  if (posterError.value || !movie.value?.Poster) {
    return PosterFallbackImage
  }

  return movie.value.Poster
})

const onPosterLoad = () => {
  isPosterLoading.value = false
}
</script>

<template>
  <div class="container">
    <div class="search">
      <label>Search for a movie by its title</label>
      <div class="search-input">
        <input type="text" placeholder="Movie title" v-model="search" />
        <button class="button" :disabled="!search.trim()" @click.prevent="onSearch">Search</button>
      </div>
    </div>
    <div class="loading" v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-if="errorMessage">
      <p class="error">{{ errorMessage }}</p>
    </div>
    <div class="movie" v-if="movie && !isLoading">
      <div class="movie-details">
        <img
          :src="poster"
          alt="Movie Poster"
          class="movie-poster"
          @error="onPosterError"
          @load="onPosterLoad"
        />
        <div v-if="!isPosterLoading" class="movie-info">
          <p class="movie-title">
            <span class="movie-info-part-title">Title:</span> {{ movie.Title }} -
            <span class="movie-info-part-title">Year:</span> {{ movie.Year }}
          </p>
          <div class="movie-info-parts">
            <p><span class="movie-info-part-title">Genre:</span> {{ movie.Genre }}</p>
            <p><span class="movie-info-part-title">Director:</span> {{ movie.Director }}</p>
            <p><span class="movie-info-part-title">Actors:</span> {{ movie.Actors }}</p>
            <p><span class="movie-info-part-title">Language:</span> {{ movie.Language }}</p>
            <p><span class="movie-info-part-title">Country:</span> {{ movie.Country }}</p>
          </div>
          <p class="movie-plot">
            <span class="movie-info-part-title">Plot:</span> {{ movie.Plot }}
          </p>
        </div>
      </div>
      <div class="rating">
        <p>Your rating:</p>
        <span
          @mouseover="onMouseOver(i)"
          @mouseleave="onMouseLeave"
          :class="{ filled: i <= rating || i <= hoveredRating }"
          @click="rating = i"
          v-for="i in 5"
          :key="i"
        >
          ⭐️
        </span>
      </div>
      <div class="add-movie">
        <button :disabled="rating === 0" class="button" @click="onAddMovie">Add Movie</button>
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

.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.search label {
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--primary-text-color);
}

.search-input {
  display: flex;
  gap: 8px;
}

.search input {
  flex: 1;
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--primary-text-color);
  padding: 12px;
  border-radius: 10px;
  border: 1px solid var(--accent-text-color);
  background-color: var(--card-background-color);
}

.button {
  border: 1px solid var(--accent-text-color);
  background-color: transparent;
  color: var(--accent-text-color);
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.3s ease;
  cursor: pointer;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading {
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--primary-text-color);
}

.error {
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--primary-text-color);
}

.movie {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.movie-details {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.movie-details img {
  height: 440px;
}

.movie-info {
  color: var(--primary-text-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.movie-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-text-color);
}

.movie-info-parts {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.movie-plot {
  font-size: 1rem;
  font-weight: 400;
  color: var(--primary-text-color);
}

.rating {
  display: flex;
  align-items: center;
  gap: 12px;
}

.movie-info-part-title {
  font-weight: 600;
  color: var(--primary-text-color);
}

.rating p {
  color: var(--primary-text-color);
  font-weight: 600;
}

.rating span {
  opacity: 0.5;
}

.rating span:hover {
  opacity: 1;
  cursor: pointer;
}

.rating span.filled {
  opacity: 1;
}

.add-movie {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
