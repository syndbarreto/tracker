import { ref } from 'vue'
import { defineStore } from 'pinia'
import API from '@/api'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)

  async function login(username, password) {
    const loggedUser = await API.getUserByAuth(username, password)

    isAuthenticated.value = true
    user.value = loggedUser

    localStorage.setItem(
      'cinetracker-user-session',
      JSON.stringify({
        userId: loggedUser.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      }),
    )
  }

  function logout() {
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem('cinetracker-user-session')
  }

  async function attemptSessionLogin(userId) {
    try {
      const loggedUser = await API.getUserById(userId)

      isAuthenticated.value = true
      user.value = loggedUser
    } catch {
      logout()
    }
  }

  async function addMovie(movie, rating) {
    const response = await API.addMovie(user.value.id, movie, rating)

    user.value = response
  }

  return { isAuthenticated, user, login, logout, attemptSessionLogin, addMovie }
})
