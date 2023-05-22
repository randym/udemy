import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, PlannerScreen } from '../screens'
import { HomeIcon, PlannerIcon } from '../icons'

const BottomTab = createBottomTabNavigator()

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: HomeIcon }} />
      <BottomTab.Screen
        name="Planner"
        component={PlannerScreen}
        options={{ unmountOnBlur: true, tabBarIcon: PlannerIcon }}
      />
    </BottomTab.Navigator>
  )
}
