import { View, StyleSheet, FlatList, Pressable } from 'react-native'
import { Workout as WorkoutType } from '../types/data'
import { Workout } from '../components'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useWorkouts } from '../hooks'
import { ThemedText } from '../components/styled/ThemedText'

export const HomeScreen = ({ navigation }: NativeStackHeaderProps) => {
  const workouts = useWorkouts()

  return (
    <View style={styles.container}>
      <ThemedText style={styles.header}>Your Workouts</ThemedText>
      <FlatList
        data={workouts as WorkoutType[]}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('WorkoutDetail', { slug: item.slug })
              }}
            >
              <Workout {...item} />
            </Pressable>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'montserrat-bold',
  },
})
