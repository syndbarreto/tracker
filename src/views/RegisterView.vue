<script setup>
import API from '@/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const errorMessage = ref(null)

async function onRegister(event) {
  const form = event.target
  const username = form.username.value
  const password = form.password.value

  errorMessage.value = null

  try {
    await API.register(username, password)
    router.replace('/login')
  } catch (error) {
    console.error(error)
    errorMessage.value = error.message ?? 'An error occurred while registering'
  }
}
</script>

<template>
  <div class="container">
    <h1 class="gradient-text">Register</h1>
    <form @submit.prevent="onRegister" class="form">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          autocomplete="off"
          id="username"
          type="text"
          placeholder="Username"
          name="username"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          autocomplete="off"
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          required
        />
      </div>
      <button type="submit" class="button">Register</button>
    </form>
    <p class="link-text">
      Already have an account? <RouterLink to="/login" class="link">Login</RouterLink>
    </p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 1rem;
  font-weight: 400;
  color: var(--primary-text-color);
}

.form-group input {
  font-size: 1rem;
  font-weight: 400;
  color: var(--primary-text-color);
  padding: 12px;
  border-radius: 10px;
  border: 1px solid var(--accent-text-color);
  background-color: var(--card-background-color);
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--accent-text-color);
}

.form-group input::placeholder {
  color: var(--secondary-text-color);
}

.button {
  border: 1px solid var(--accent-text-color);
  background-color: transparent;
  color: var(--accent-text-color);
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 8px;
}

.button:hover {
  background-color: var(--accent-text-color);
  color: var(--card-background-color);
}

.link-text {
  color: var(--secondary-text-color);
  font-size: 0.9rem;
}

.link {
  color: var(--accent-text-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.link:hover {
  color: var(--primary-text-color);
}

.error {
  color: var(--error-text-color);
  font-size: 0.9rem;
  text-align: center;
  padding: 12px;
  background-color: var(--error-background-color);
  border-radius: 10px;
  border: 1px solid var(--error-border-color);
  width: 100%;
}
</style>
