<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: null,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  target: {
    type: Number,
    default: null,
  },
  level: {
    type: String,
    default: null,
  },
  currentStreak: {
    type: Number,
    default: null,
  },
})
</script>

<template>
  <div
    class="container"
    :class="{ completed: isCompleted, disabled: target !== null && !isCompleted }"
  >
    <div class="icon">{{ icon }}</div>
    <div class="details">
      <p class="title">{{ title }}</p>
      <p class="description">{{ description }}</p>
      <div v-if="level" class="level-badge">
        <p class="level-text">{{ level }}</p>
      </div>
      <div v-if="progress !== null" class="progress-info">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${Math.min((progress / 50) * 100, 100)}%` }"
          ></div>
        </div>
        <p class="progress-text">{{ progress }} / 50</p>
      </div>
      <div v-else-if="target !== null" class="streak-info">
        <p class="streak-status" :class="{ completed: isCompleted }">
          {{
            isCompleted
              ? 'Completed'
              : `${currentStreak !== null ? currentStreak : 0} / ${target} days`
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--card-background-color);
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 10px;
  border: 2px solid transparent;
  transition: border 0.3s ease;
}

.container:hover {
  border: 2px solid var(--accent-text-color);
}

.container.completed {
  border: 2px solid var(--green-border-color);
  background: var(--green-gradient);
}

.container.disabled {
  opacity: 0.5;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.container.disabled:hover {
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.icon {
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.title {
  font-size: 1rem;
  color: var(--primary-text-color);
  font-weight: 500;
}

.description {
  font-size: 0.875rem;
  color: var(--secondary-text-color);
  font-weight: 300;
}

.progress-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-gradient);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.75rem;
  color: var(--secondary-text-color);
}

.streak-info {
  margin-top: 4px;
}

.streak-status {
  font-size: 0.875rem;
  color: var(--secondary-text-color);
  font-weight: 400;
}

.streak-status.completed {
  color: var(--green-border-color);
  font-weight: 500;
}

.level-badge {
  margin-top: 4px;
}

.level-text {
  font-size: 0.875rem;
  color: var(--accent-text-color);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
