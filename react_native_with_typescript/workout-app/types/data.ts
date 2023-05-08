import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { FunctionComponent } from 'react'
import {
  PressableProps,
  ModalProps as ReactModalProps,
  StyleProp,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native/types'
export type WorkoutItemType = 'exercise' | 'break' | 'stretch'
export type WorkoutDifficulty = 'easy' | 'normal' | 'hard'

export type Slug = {
  readonly slug: string
}

export interface WorkoutSequenceItem extends Slug {
  name: string
  type: WorkoutItemType
  reps?: number
  duration: number
}

export interface Workout extends Slug {
  name: string
  duration: number
  difficulty: WorkoutDifficulty
  sequence: Array<WorkoutSequenceItem>
}

export type WorkoutItemProps = Workout & ViewProps

type WorkoutDetailParams = {
  route: {
    params: Slug
  }
}

export type PressableTextProps = PressableProps & { text: string; textStyle?: StyleProp<TextStyle> }

type Activator = FunctionComponent<{
  handleOpen: () => void
}>

export type ModalProps = ReactModalProps & {
  activator?: Activator
  viewStyle?: StyleProp<ViewStyle>
  headerText?: string
}

export type WorkoutDetailNaviagationParams = NativeStackHeaderProps & WorkoutDetailParams
