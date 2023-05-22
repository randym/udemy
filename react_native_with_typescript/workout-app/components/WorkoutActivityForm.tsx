import { View, Text, StyleSheet, TextInput } from 'react-native'
import { PressableText } from './styled'
import {
  WorkoutActivityFormProps,
  WorkoutActivityTypes,
  WorkoutActivityFormFields,
  ActivityType,
} from '../types/data'
import { useForm, Controller } from 'react-hook-form'
import { useActivityFactory } from '../hooks'

const numericRegex = /^[0-9]*$/
const workoutActivityTypeRegex = new RegExp(WorkoutActivityTypes.join('|'))
const defaultValues: WorkoutActivityFormFields = {
  name: '',
  duration: '',
  type: ActivityType.EXERCISE,
  reps: '',
}

export const WorkoutActivityForm = ({ onSubmit }: WorkoutActivityFormProps) => {
  const { control, reset, handleSubmit, formState } = useForm({ defaultValues })
  const { handleAddActivity } = useActivityFactory(handleSubmit, onSubmit, reset)

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="type"
          render={({ field: { onChange, value } }) => (
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Type</Text>
              <View style={styles.select}>
                {WorkoutActivityTypes.map((item) => (
                  <PressableText
                    style={[styles.option, value === item && styles.optionSelection]}
                    textStyle={[styles.optionLabel, value === item && styles.optionSelectionLabel]}
                    key={item}
                    text={item}
                    onPressIn={() => {
                      workoutActivityTypeRegex.test(item) && onChange(item)
                    }}
                  />
                ))}
              </View>
            </View>
          )}
        />
        <Controller
          control={control}
          rules={{ required: true }}
          name="name"
          render={({ field: { onChange, value } }) => (
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Name</Text>
              <TextInput
                onChangeText={(value) => onChange(value)}
                value={value}
                style={styles.input}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: numericRegex,
            min: 1,
          }}
          name="duration"
          render={({ field: { onChange, value } }) => (
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Duration (s)</Text>

              <TextInput
                onChangeText={(value) => {
                  numericRegex.test(value) && onChange(value)
                }}
                value={value || ''}
                maxLength={6}
                keyboardType="numeric"
                inputMode="numeric"
                style={styles.input}
                textAlign="right"
              />
            </View>
          )}
        />
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          name="reps"
          render={({ field: { onChange, value } }) => (
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Repetitions</Text>
              <TextInput
                onChangeText={onChange}
                value={value}
                maxLength={4}
                style={styles.input}
                keyboardType="numeric"
                inputMode="numeric"
                textAlign="right"
              />
            </View>
          )}
        />

        <View />
        <PressableText
          text="Add Activity"
          style={[styles.submitButton, !formState.isValid && styles.disabled]}
          textStyle={styles.submitButtonText}
          onPress={handleAddActivity}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    padding: 3,
  },
  container: {
    backgroundColor: 'lightgrey',
    padding: 3,
  },

  input: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    padding: 3,
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    backgroundColor: 'white',
  },

  field: {
    justfiyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
  },

  fieldLabel: {
    minWidth: '30%',
  },
  select: {
    flex: 1,
    flexDirection: 'row',
    padding: 3,
    justifyContent: 'space-between',
  },
  option: {
    padding: 2,
    margin: 1,
    borderWidth: 1,
    borderColor: 'transparent',
    flex: 1,
  },
  optionSelection: {
    backgroundColor: 'rgb(0, 132, 225)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.4)',
  },
  optionSelectionLabel: {
    color: 'white',
  },

  optionLabel: {
    textDecorationLine: 'none',
    color: 'rgb(0, 132, 225)',
    alignSelf: 'center',
  },
  submitButton: {
    padding: 3,
    borderWidth: 1,
    backgroundColor: 'rgb(0, 132, 225)',
    borderColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    margin: 5,
  },
  submitButtonText: {
    textDecorationLine: 'none',
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
  },

  disabled: {
    backgroundColor: 'grey',
  },
})
