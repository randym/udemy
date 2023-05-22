import { createStackNavigator } from '@react-navigation/stack'
import { BottomTabNavigator } from './BottomTabNavigator'
import { WorkoutDetailScreen } from '../screens'

const Stack = createStackNavigator()

export const RouteNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen}
        options={{ title: 'Workout Detail', headerBackTitle: 'Back' }}
      />
    </Stack.Navigator>
  )
}
