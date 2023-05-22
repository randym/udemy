import { FontAwesome } from '@expo/vector-icons'
import { FlatList, StyleSheet } from 'react-native'
import { WorkoutActivity } from '../../types/data'
import { Item } from './Item'
import { FunctionComponent } from 'react'

export const List = ({
  activities,
  onDelete,
}: {
  activities: WorkoutActivity[]
  onDelete?: Function
}) => (
  <FlatList
    ItemSeparatorComponent={() => <FontAwesome style={styles.centerView} name="arrow-down" />}
    data={activities as WorkoutActivity[]}
    keyExtractor={(item) => item.slug}
    renderItem={({ item }) => <Item item={item} onDelete={onDelete}></Item>}
  />
)

const styles = StyleSheet.create({
  centerView: {
    alignSelf: 'center',
    padding: 5,
  },
})
