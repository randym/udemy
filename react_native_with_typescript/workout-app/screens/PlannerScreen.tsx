import { View, StyleSheet, Text, Pressable } from 'react-native'
import { List, WorkoutActivityForm, Modal, WorkoutForm } from '../components'
import { Workout, WorkoutActivity } from '../types/data'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { storeWorkout } from '../storage'

export const PlannerScreen = ({ navigation }: NativeStackHeaderProps) => {
  const [sequence, setSequence] = useState<WorkoutActivity[]>([])

  const addActivity = (activity: WorkoutActivity) => setSequence([...sequence, activity])
  const addWorkout = (workout: Workout) => console.log(JSON.stringify(workout))

  const onDelete = (activity: WorkoutActivity) => {
    setSequence(sequence.filter((a) => a.slug !== activity.slug))
  }

  const onSubmit = (close: Function) => async (workout: Workout) => {
    addWorkout(workout)
    close()
    await storeWorkout(workout)
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <WorkoutActivityForm onSubmit={addActivity}></WorkoutActivityForm>
      <View style={styles.list}>
        <List activities={sequence} onDelete={onDelete}></List>
      </View>
      <View>
        <Modal
          closeText="dismiss"
          activator={({ open }) => {
            return (
              <Pressable onPress={open} disabled={sequence.length === 0}>
                <View style={[styles.iconButton, sequence.length === 0 && styles.disabled]}>
                  <FontAwesome name="plus-circle" size={24} color="white"></FontAwesome>
                  <Text style={styles.buttonLabel}>Create Workout</Text>
                </View>
              </Pressable>
            )
          }}
        >
          {({ close }) => <WorkoutForm onSubmit={onSubmit(close)} sequence={sequence} />}
        </Modal>
      </View>
    </View>
  )
}
/*
 */

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
  },

  list: {
    overflowY: 'auto',
    margin: 5,
    flex: 1,
  },

  iconButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    border: 1,
    backgroundColor: 'rgb(0, 132, 225)',
    padding: 5,
  },
  buttonLabel: {
    marginLeft: 5,
    color: 'white',
    fontWeight: 'bold',
  },

  disabled: {
    backgroundColor: 'grey',
  },
})
