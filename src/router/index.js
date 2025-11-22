import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomeView from '@/views/HomeView.vue'
import MoviesView from '@/views/MoviesView.vue'
import AchievementsView from '@/views/AchievementsView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AddMovieView from '@/views/AddMovieView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/movies',
    component: MoviesView,
  },
  {
    path: '/achievements',
    component: AchievementsView,
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/register',
    component: RegisterView,
  },
  {
    path: '/movies/add',
    component: AddMovieView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const session = localStorage.getItem('cinetracker-user-session')

  const parsedSession = session ? JSON.parse(session) : null

  if (
    !authStore.isAuthenticated &&
    parsedSession &&
    new Date(parsedSession.expiresAt) > new Date()
  ) {
    await authStore.attemptSessionLogin(parsedSession.userId)
    return to
  }

  if (to.path !== '/login' && to.path !== '/register' && !authStore.isAuthenticated) {
    return '/login'
  }

  return true
})

export default router
