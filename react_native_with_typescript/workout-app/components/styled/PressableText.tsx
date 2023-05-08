import {
  Pressable,
  Text,
  StyleSheet,
  StyleSheetProperties,
  PressableProps,
  StyleProp,
  TextStyle,
} from 'react-native'
import { PressableTextProps } from '../../types/data'

export const PressableText = (props: PressableTextProps) => {
  return (
    <Pressable {...props}>
      <Text style={[styles.component, props?.textStyle]}>{props.text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  component: {
    textDecorationLine: 'underline',
    margin: 10,
  },
})