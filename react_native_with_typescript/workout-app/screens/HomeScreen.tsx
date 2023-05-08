import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native'
import { Workout } from '../types/data'
import { WorkoutItem } from '../components'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useWorkouts } from '../hooks'

export const HomeScreen = ({ navigation }: NativeStackHeaderProps) => {
  const workouts = useWorkouts()

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Workouts</Text>
      <FlatList
        data={workouts as Workout[]}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('WorkoutDetail', { slug: item.slug })
              }}
            >
              <WorkoutItem {...item} />
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
    flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'montserrat-bold',
  },
})
