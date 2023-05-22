import { Text, StyleSheet, TextProps, useColorScheme } from 'react-native'

export const ThemedText = (props: TextProps) => {
  const colorTheme = useColorScheme()
  return <Text {...props} style={[props.style, styles[colorTheme]]} />
}

const styles = StyleSheet.create({
  light: {
    color: 'black',
  },
  dark: {
    color: 'white',
  },
})
