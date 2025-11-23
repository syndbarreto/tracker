export const EXPERIENCE_PER_LEVEL = 2500
export const EXPERIENCE_PER_MOVIE = 250

export const GENRE_LEVELS = {
  Beginner: 0,
  Novice: 5,
  Intermediate: 10,
  Advanced: 20,
  Expert: 30,
}

export const BASE_ACHIEVEMENTS = {
  byGenre: [],
  byStreak: [
    {
      title: '5 Days Streak',
      description: 'Watch 5 days in a row',
      icon: '🔥',
      isCompleted: false,
      target: 5,
    },
    {
      title: '10 Days Streak',
      description: 'Watch 10 days in a row',
      icon: '🔥🔥🔥',
      isCompleted: false,
      target: 10,
    },
    {
      title: '20 Days Streak',
      description: 'Watch 20 days in a row',
      icon: '🎉🎉🎉',
      isCompleted: false,
      target: 20,
    },
    {
      title: '30 Days Streak',
      description: 'Watch 30 days in a row',
      icon: '🏆🏆🏆',
      isCompleted: false,
      target: 30,
    },
  ],
}

export const BASE_USER = {
  movies: [],
  currentStreak: 0,
  longestStreak: 0,
  experience: 0,
  totalWatchedHours: 0,
  achievements: BASE_ACHIEVEMENTS,
}
