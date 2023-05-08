import { useState, useEffect } from 'react'
import { getWorkouts } from '../storage/workout'
import { Workout } from '../types/data'
import { useIsFocused } from '@react-navigation/native'

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const isFocused = useIsFocused()

  useEffect(() => {
    const loadWorkouts = async () => {
      const data = await getWorkouts()
      setWorkouts(data)
    }

    isFocused && loadWorkouts()
  }, [isFocused])

  return workouts
}
