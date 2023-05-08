import { useEffect, useState } from 'react'
import * as Font from 'expo-font'
import { initWorkouts } from '../storage/workout'

export const useCachedResources = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await initWorkouts()
        await Font.loadAsync({
          montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
          'montserrat-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        })
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoadingComplete(true)
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}
