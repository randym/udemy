import { View, StyleSheet } from 'react-native'
import { WorkoutDetailNaviagationParams } from '../types/data'
import { useWorkoutBySlug } from '../hooks/useWorkoutBySlug'
import { Training, Workout } from '../components'

export const WorkoutDetailScreen = ({
  route: {
    params: { slug },
  },
}: WorkoutDetailNaviagationParams) => {
  const workout = useWorkoutBySlug(slug)
  const sequence = workout?.sequence || []

  if (!workout) {
    return null
  }

  return (
    <View style={styles.container}>
      <Workout {...workout}></Workout>
      <Training sequence={sequence} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
})
