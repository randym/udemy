import { ColorSchemeName } from 'react-native'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { RouteNavigator } from './RouteNavigator'

export const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  console.log(colorScheme)
  return (
    <NavigationContainer theme={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
      <RouteNavigator />
    </NavigationContainer>
  )
}
