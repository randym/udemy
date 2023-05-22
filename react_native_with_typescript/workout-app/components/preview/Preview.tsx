import { WorkoutActivity } from '../../types/data'
import { List } from './List'
import { PressableText, Modal } from '../styled'
const activator = ({ open }) => (
  <PressableText text="Show Preview" onPress={open} style={{ margin: 10 }} />
)

export const TrainingPreview = ({ sequence }: { sequence: WorkoutActivity[] }) => (
  <Modal activator={activator} headerText="Workout Preview">
    {({ close }) => <List activities={sequence} />}
  </Modal>
)
