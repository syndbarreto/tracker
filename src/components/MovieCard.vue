<script setup>
import { computed, ref } from 'vue'
import PosterFallbackImage from '@/assets/poster-fallback.jpg'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
  imdbID: {
    type: String,
    required: true,
  },
})

const isError = ref(false)

function onPosterError() {
  isError.value = true
}

const poster = computed(() => {
  if (isError.value || !props.poster) {
    return PosterFallbackImage
  }

  return props.poster
})

function onCardClick() {
  window.open(`https://www.imdb.com/title/${props.imdbID}`, '_blank')
}
</script>

<template>
  <div>
    <div class="container" @click="onCardClick">
      <img :src="poster" :alt="`movie poster for ${title}`" class="poster" @error="onPosterError" />
      <div class="details">
        <p class="title">{{ title }}</p>
        <div class="rating-year">
          <div class="rating"><span v-for="i in rating" :key="i"> ⭐️ </span></div>
          <p class="year">{{ year }}</p>
        </div>
        <div class="genres">
          <p v-for="genre in genres" :key="genre" class="genre">{{ genre }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  cursor: pointer;
  background-color: var(--card-background-color);
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: border 0.5s ease;
}

.container:hover {
  border: 2px solid var(--accent-text-color);
}

.poster {
  height: 340px;
  width: 100%;
}

.details {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-size: 0.8rem;
  color: var(--primary-text-color);
  font-weight: 300;
}

.rating-year {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating {
  display: flex;
  gap: 2px;
}

.genres {
  display: flex;
  gap: 8px;
}

.year {
  font-size: 0.8rem;
  color: var(--secondary-text-color);
}

.genre {
  font-size: 0.8rem;
  color: var(--secondary-text-color);
  font-weight: 300;
}
</style>
