import { View, Text, StyleSheet } from 'react-native'
import { WorkoutActivity } from '../../types/data'
import { humanDuration } from '../../utils'
import { PressableText } from '../styled'

export const Item = ({ item, onDelete }: { item: WorkoutActivity; onDelete?: Function }) => {
  const { name, type, reps, duration } = item

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Exercise: {name}</Text>
      <Text>Type: {type}</Text>
      {reps && <Text>Reps: {reps}</Text>}
      <Text style={styles.duration}>Duration: {humanDuration(duration)}</Text>
      {onDelete && (
        <PressableText
          style={styles.delete}
          textStyle={styles.delete}
          text="remove"
          onPress={() => onDelete(item)}
        />
      )}
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
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  duration: {
    fontSize: 15,
  },

  delete: {
    color: 'red',
    padding: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
})
