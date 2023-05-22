import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { RunnableStatus, WorkoutActivity } from '../../types/data'

import { useTrainingActivityQueue } from '../../hooks'

import { TimedTrainingActivity } from './TimedTrainingActivity'
import { TimerActuator } from './TimerActuator'

const { IDLE, RUNNING, ENDED } = RunnableStatus

const Prepare: WorkoutActivity = { slug: 'prepare', duration: 5, name: 'Prepare', type: 'break' }

export const Training = ({ sequence }: { sequence: Array<WorkoutActivity> }) => {
  const { currentItem, start, next, status, preview } = useTrainingActivityQueue(sequence)

  switch (status) {
    case IDLE:
      return (
        <TimedTrainingActivity
          item={Prepare}
          onEnd={next}
          warnThreshold={3}
          preview={preview}
          autoStart={false}
        />
      )

    case RUNNING:
      return (
        <TimedTrainingActivity
          item={currentItem}
          onEnd={next}
          autoStart={true}
          warnThreshold={5}
          preview={preview}
        />
      )

    case ENDED:
      return (
        <View style={styles.container}>
          <TimerActuator status={status} onStart={start} onStop={() => {}} />
          <Text style={styles.message}>Well done! Click to try again.</Text>
        </View>
      )
  }
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
  message: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
})
