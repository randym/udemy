import data from '../data.json'
import { containsKey, storeData, getData, removeItem } from './AsyncStorage'
import { Workout, Slug } from '../types/data'

export const getWorkouts = async (): Promise<Workout[]> => {
  return await getData('workout-data')
}

export const initWorkouts = async (): Promise<boolean> => {
  const hasWorkouts = await containsKey('workout-data')
  if (!hasWorkouts) {
    await storeData('workout-data', data)
    return true
  }

  return false
}

export async function getWorkoutBySlug({ slug }: Slug): Promise<Workout> {
  const workouts = await getWorkouts()
  return workouts.find((workout) => workout.slug === slug)
}

export const clearWorkouts = async () => {
  await removeItem('workout-data')
}
