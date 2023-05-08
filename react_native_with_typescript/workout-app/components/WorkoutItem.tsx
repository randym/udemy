import { View, Text, StyleSheet } from 'react-native'
import { Workout, WorkoutItemProps } from '../types/data'
import { humanDuration } from '../utils'
import { ReactNode } from 'react'

export const WorkoutItem = (props: WorkoutItemProps) => {
  const { name, difficulty, duration, children } = props

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Name: {name}</Text>
      <Text style={styles.difficulty}>Difficulty: {difficulty}</Text>
      <Text style={styles.duration}>Duration: {humanDuration(duration)}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  duration: {
    fontSize: 15,
  },
  difficulty: {
    fontSize: 15,
  },
})
