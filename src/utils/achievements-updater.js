export class AchievementsUpdater {
  constructor(user, movie) {
    this.user = user
    this.movie = movie
  }

  getUpdatedAchievementsByGenre() {
    const genres = this.movie.Genre.split(',').map((genre) => genre.trim())
    const achievements = this.user.achievements.byGenre

    genres.forEach((genre) => {
      const achievement = achievements.find((achievement) => achievement.title === genre)

      if (achievement) {
        achievement.progress = achievement.progress + 1
      } else {
        achievements.push({
          title: genre,
          description: `Watch ${genre} movies`,
          icon: '🎬',
          progress: 1,
        })
      }
    })

    return achievements
  }

  getUpdatedAchievementsByStreak() {
    const streak = this.user.longestStreak
    const achievements = this.user.achievements.byStreak

    return achievements.map((achievement) => {
      if (!achievement.isCompleted && achievement.target <= streak) {
        achievement.isCompleted = true
      }

      return achievement
    })
  }
}
