import { Text, View, StyleSheet, FlatList } from 'react-native'
import { WorkoutDetailNaviagationParams, WorkoutSequenceItem } from '../types/data'
import { useWorkoutBySlug } from '../hooks/useWorkoutBySlug'
import { SequenceItem, WorkoutItem } from '../components'
import { PressableText } from '../components/styled'
import { Modal } from '../components/styled'
import { FontAwesome } from '@expo/vector-icons'
import { useCountDown } from '../hooks/useCountDown'
import { useEffect, useState } from 'react'

export const WorkoutDetailScreen = ({ route }: WorkoutDetailNaviagationParams) => {
  const [sequence, setSequenceItem] = useState<WorkoutSequenceItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const workout = useWorkoutBySlug(route.params.slug)

  const { countDown, isRunning, stop, start } = useCountDown(currentIndex)

  useEffect(() => {
    if (!workout) {
      return
    }

    if (currentIndex === workout.sequence.length - 1) {
      return
    }

    if (countDown === 0) {
      doTraining(currentIndex + 1)
    }
  }, [countDown])

  const doTraining = (index: number) => {
    setCurrentIndex(index)

    /* continue */
    if (countDown > 0) {
      start(countDown)
      return
    }

    /* prepare */
    if (index === -1) {
      start(100)
      setSequenceItem([])
      return
    }

    /* train */
    const next = workout!.sequence[index]
    if (next) {
      if (index === 0) {
        setSequenceItem([next])
      } else {
        setSequenceItem([...sequence, next])
      }
      start(next.duration)
    }
  }

  if (!workout) {
    return null
  }
  const hasReachedEnd = sequence.length === workout.sequence.length && countDown <= 0

  const { name, sequence: workoutSequence } = workout
  const activator = ({ handleOpen }) => <PressableText text="Check Sequence" onPress={handleOpen} />

  return (
    <View style={styles.container}>
      <WorkoutItem {...workout}>
        <Modal activator={activator} headerText="Sequence">
          <FlatList
            ItemSeparatorComponent={() => (
              <View style={styles.centerView}>
                <FontAwesome style={styles.centerView} name="arrow-down" />
              </View>
            )}
            style={styles.listStyle}
            data={workoutSequence as WorkoutSequenceItem[]}
            keyExtractor={(item) => item.slug}
            renderItem={({ item }) => <SequenceItem item={item}></SequenceItem>}
          ></FlatList>
        </Modal>
      </WorkoutItem>
      <View style={styles.centerRowView}>
        <FontAwesome
          name={isRunning ? 'pause-circle-o' : 'play-circle-o'}
          size={100}
          onPress={() =>
            isRunning ? stop() : hasReachedEnd ? doTraining(-1) : doTraining(currentIndex)
          }
        />
      </View>
      {countDown > 0 && (
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.countDown}>{countDown}</Text>
        </View>
      )}
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 60, fontWeight: 'bold' }}>
          {sequence.length === 0
            ? 'Prepare'
            : hasReachedEnd
            ? 'Good Job!'
            : sequence[currentIndex].name}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  centerRowView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listStyle: {
    flex: 1,
    flexShrink: 0,
    flexGrow: 1,
    padding: 20,
  },
  countDown: {
    fontSize: 55,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'montserrat-bold',
  },
})
