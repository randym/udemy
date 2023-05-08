import { useEffect, useState } from 'react'
import { Workout } from '../types/data'
import { getWorkoutBySlug } from '../storage/workout'

export const useWorkoutBySlug = (slug: string) => {
  const [workout, setWorkout] = useState<Workout>()

  useEffect(() => {
    const getData = async () => {
      const data = await getWorkoutBySlug({ slug })
      setWorkout(data)
    }

    slug && getData()
  }, [])

  return workout
}
