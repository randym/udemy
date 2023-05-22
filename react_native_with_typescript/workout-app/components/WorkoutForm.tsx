import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { PressableText } from './styled'
import { WorkoutFormFields, WorkoutFormProps } from '../types/data'
import { useForm, Controller } from 'react-hook-form'
import { useWorkoutFactory } from '../hooks'
import { FunctionComponent } from 'react'

const defaultValues: WorkoutFormFields = { name: '' }

export const WorkoutForm = ({ onSubmit, sequence }: WorkoutFormProps) => {
  const { control, handleSubmit, reset } = useForm({ defaultValues })
  const { handleAddWorkout } = useWorkoutFactory(handleSubmit, onSubmit, reset, sequence)

  return (
    <View style={styles.container}>
      <Text>Create a Workout</Text>
      <View>
        <Controller
          control={control}
          rules={{ required: true }}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholder="name"
            />
          )}
        />
      </View>
      <PressableText text="create" onPress={handleAddWorkout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    height: 30,
    margin: 2,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.4)',
  },
})
