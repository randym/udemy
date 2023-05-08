import { NavigationContainer } from '@react-navigation/native'
import { RouteNavigator } from './RouteNavigator'

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RouteNavigator />
    </NavigationContainer>
  )
}
