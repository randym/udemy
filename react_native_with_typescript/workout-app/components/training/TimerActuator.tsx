import { FontAwesome } from '@expo/vector-icons'
import { RunnableStatus } from '../../types/data'

type IconName = keyof typeof FontAwesome.glyphMap

const { IDLE, RUNNING, STOPPED, ENDED } = RunnableStatus
// const { RUNNING, STOPPED } = CountDownTimerItemStatus

const getIcon = (status: RunnableStatus): IconName => {
  switch (status) {
    case IDLE:
      return 'play-circle-o'
    case RUNNING:
      return 'pause-circle-o'
    case STOPPED:
      return 'play-circle-o'
    case ENDED:
      return 'repeat'
    default:
      return 'play-circle-o'
  }
}

export const TimerActuator = ({
  status,
  onStart,
  onStop,
}: {
  status: RunnableStatus
  onStart: Function
  onStop: Function
}) => {
  return (
    <FontAwesome
      name={getIcon(status)}
      size={80}
      onPress={() => {
        status === RUNNING ? onStop() : onStart()
      }}
    />
  )
}
