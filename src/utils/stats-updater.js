import { EXPERIENCE_PER_MOVIE } from '@/const'
import { AchievementsUpdater } from './achievements-updater'

export class StatsUpdater {
  constructor(user, movie) {
    this.user = user
    this.movie = movie
    this.achievementsUpdater = new AchievementsUpdater(user, movie)
  }

  getUpdatedTotalWatchedHours() {
    if (this.movie.Runtime) {
      const runtime = this.movie.Runtime.split(' ')[0]

      if (isNaN(runtime)) {
        return this.user.totalWatchedHours
      }

      const runtimeInHours = Number(runtime) / 60

      return this.user.totalWatchedHours + Number(runtimeInHours.toFixed(2))
    }

    return this.user.totalWatchedHours
  }

  getUpdatedCurrentStreak() {
    if (!this.user.movies || this.user.movies.length === 0) {
      return 1
    }

    let streak = 1

    const currentDate = new Date(Date.now() - 1000 * 60 * 60 * 24)

    while (true) {
      const currentDateKey = this.getDateKey(currentDate)
      console.log(currentDateKey)

      const movie = this.user.movies.find(
        (movie) => this.getDateKey(new Date(movie.createdAt)) === currentDateKey,
      )

      if (movie) {
        streak++
      } else {
        break
      }

      currentDate.setDate(currentDate.getDate() - 1)
    }

    return streak
  }

  getDateKey(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  getUpdatedLongestStreak() {
    const currentStreak = this.getUpdatedCurrentStreak()
    const longestStreak = this.user.longestStreak

    if (currentStreak > longestStreak) {
      return currentStreak
    }

    return longestStreak
  }

  getUpdatedExperience() {
    return this.user.experience + EXPERIENCE_PER_MOVIE
  }

  getUpdatedAchievements() {
    return {
      byGenre: this.achievementsUpdater.getUpdatedAchievementsByGenre(),
      byStreak: this.achievementsUpdater.getUpdatedAchievementsByStreak(),
    }
  }
}
