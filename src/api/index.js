import { StatsUpdater } from '@/utils/stats-updater'
import { BASE_USER } from '@/const'

const OMDB_API_KEY = 'a04aa623'

async function getUserByUsername(username) {
  const response = await fetch(`http://localhost:3001/users?username=${username}`, {
    method: 'GET',
  })

  if (!response.ok) {
    return null
  }

  const users = await response.json()

  return Array.isArray(users) && users.length > 0
}

async function getUserById(userId) {
  const response = await fetch(`http://localhost:3001/users/${userId}`)

  if (!response.ok) {
    throw new Error('Failed to get user by id')
  }

  return await response.json()
}

async function login(username, password) {
  const response = await fetch('http://localhost:3001/users', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error('Failed to login')
  }

  return response.json()
}

async function register(username, password) {
  const alreadyExistingUser = await getUserByUsername(username)

  if (alreadyExistingUser) {
    throw new Error('User already exists')
  }

  const response = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...BASE_USER,
      username,
      password,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to register')
  }

  return await response.json()
}

async function getUserByAuth(username, password) {
  const response = await fetch(
    `http://localhost:3001/users?username=${username}&password=${password}`,
  )

  if (!response.ok) {
    throw new Error('Authentication failed')
  }

  const users = await response.json()

  const user = Array.isArray(users) && users.length > 0 ? users[0] : null

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

async function searchMovie(name) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${name}`)

  if (!response.ok) {
    throw new Error('Failed to search movie')
  }

  const data = await response.json()

  if (data.Error) {
    throw new Error(data.Error)
  }

  return data
}

async function addMovie(userId, movie, rating) {
  const user = await getUserById(userId)

  if (!user) {
    throw new Error('User not found')
  }

  const isMovieAlreadyAdded = user.movies.some((m) => m.imdbID === movie.imdbID)

  if (isMovieAlreadyAdded) {
    throw new Error('Movie already added')
  }

  const updater = new StatsUpdater(user, movie)

  user.totalWatchedHours = updater.getUpdatedTotalWatchedHours()
  user.currentStreak = updater.getUpdatedCurrentStreak()
  user.longestStreak = updater.getUpdatedLongestStreak()
  user.experience = updater.getUpdatedExperience()
  user.achievements = updater.getUpdatedAchievements()

  user.movies.push({
    createdAt: new Date().toISOString(),
    title: movie.Title,
    year: movie.Year,
    plot: movie.Plot,
    poster: movie.Poster,
    genres: movie.Genre.split(',').map((genre) => genre.trim()),
    imdbID: movie.imdbID,
    rating,
  })

  const response = await fetch(`http://localhost:3001/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    throw new Error('Failed to add movie')
  }

  return await response.json()
}

export default {
  getUserByUsername,
  getUserById,
  login,
  register,
  getUserByAuth,
  searchMovie,
  addMovie,
}
