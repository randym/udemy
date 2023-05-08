import React from 'react'
import { Text, StyleSheet } from 'react-native'

export const MontserratText = (props: Text['props']) => {
  return <Text {...props} style={[props.style, styles.component]} />
}

const styles = StyleSheet.create({
  component: {
    fontFamily: 'montserrat',
  },
})
