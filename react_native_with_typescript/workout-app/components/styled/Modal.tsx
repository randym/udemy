import {
  Text,
  View,
  StyleSheet,
  Modal as ReactModal,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import { PressableText } from './PressableText'
import React, { ReactNode, useState } from 'react'
import { ModalProps } from '../../types/data'

export const Modal = (props: ModalProps) => {
  const { children, closeText = 'Done', headerText, activator: Activator } = props

  const [isModalVisible, setIsModalVisible] = useState(false)

  const open = () => setIsModalVisible(true)
  const close = () => setIsModalVisible(false)
  return (
    <View>
      <ReactModal animationType="fade" visible={isModalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.header}>{headerText}</Text>
          <View style={styles.contentView}>{children({ close })}</View>
          <Button title={closeText} onPress={close} />
        </View>
      </ReactModal>
      {Activator ? <Activator open={open} /> : <PressableText text="Open" onPress={open} />}
    </View>
  )
}

const styles = StyleSheet.create({
  modalView: {
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
    borderRadius: 20,

    padding: 10,
    margin: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'montserrat-bold',
    padding: 10,
    alignSelf: 'center',
  },
  contentView: {
    padding: 20,
    margin: 10,
    flex: 1,
    alignItems: 'center',
    overflowY: 'auto',
  },
})
