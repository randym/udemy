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
import { useState } from 'react'
import { ModalProps } from '../../types/data'

export const Modal = (props: ModalProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { activator: Activator } = props
  const open = () => setIsModalVisible(true)

  return (
    <View>
      <ReactModal animationType="fade" {...props} visible={isModalVisible}>
        <View style={[styles.modalView, props?.viewStyle]}>
          <Text style={styles.header}>{props?.headerText}</Text>
          <View style={styles.contentView}>{props.children}</View>
          <Button title={'Done'} onPress={() => setIsModalVisible(false)} />
        </View>
      </ReactModal>
      {Activator ? <Activator handleOpen={open} /> : <PressableText text="Open" onPress={open} />}
    </View>
  )
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '100%',
    margin: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'montserrat-bold',
  },
  contentView: {
    marginBottom: 20,
    flex: 1,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
