import { View, Text, StyleSheet } from 'react-native'
import { useCountDown } from '../../hooks'
import { WorkoutActivity } from '../../types/data'
import { TimerActuator } from './TimerActuator'
import React, { useEffect } from 'react'

export const TimedTrainingActivity = ({
  item,
  onEnd,
  autoStart,
  warnThreshold,
  preview,
}: {
  item: WorkoutActivity
  onEnd: Function
  autoStart: boolean
  warnThreshold: number
  preview: string
}) => {
  const { status, currentTime, start, stop } = useCountDown(item, onEnd)
  const { name } = item

  useEffect(() => {
    autoStart && start()
  }, [item])

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TimerActuator status={status} onStart={start} onStop={stop} />
        <View>
          <Text style={styles.name}>{name}</Text>
          {item.reps && <Text style={styles.reps}>Target Reps: {item.reps}</Text>}
        </View>
      </View>
      <Text style={[styles.duration, currentTime <= warnThreshold && { color: 'red' }]}>
        {currentTime}
      </Text>
      <Text>{preview && `Up Next: ${preview}`}</Text>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
  reps: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 22,
    marginLeft: 10,
  },
  duration: {
    fontSize: 55,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
})
