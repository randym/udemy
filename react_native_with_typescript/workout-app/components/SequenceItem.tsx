import { View, Text, StyleSheet } from 'react-native'
import { WorkoutSequenceItem } from '../types/data'
import { humanDuration } from '../utils'
export const SequenceItem = ({ item }: { item: WorkoutSequenceItem }) => {
  const { name, type, reps, duration } = item

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Exercise: {name}</Text>
      <Text>Type: {type}</Text>
      {reps && <Text>Reps: {reps}</Text>}
      <Text style={styles.duration}>Duration: {humanDuration(duration)}</Text>
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
})
