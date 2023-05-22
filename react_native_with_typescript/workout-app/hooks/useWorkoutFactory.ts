import slugify from 'slugify'
import { WorkoutFormFields, Workout, WorkoutDifficulty, WorkoutFactory } from '../types/data'

const getDifficulty = (interval: number): WorkoutDifficulty => {
  switch (true) {
    case interval <= 60:
      return 'hard'
    case interval <= 100:
      return 'normal'
    default:
      return 'easy'
  }
}

export const useWorkoutFactory: WorkoutFactory = (preProcess, postProcess, reset, sequence) => {
  const handleAddWorkout = preProcess(({ name }: WorkoutFormFields) => {
    const duration = sequence.reduce((acc, activity) => acc + activity.duration, 0)
    const difficulty = getDifficulty(duration / sequence.length)
    const slug = slugify(`${name} ${Date.now()}`, { lower: true })
    const workout: Workout = { slug, name, duration, difficulty, sequence }

    postProcess(workout)

    reset({ name: '' })
  })

  return { handleAddWorkout }
}
