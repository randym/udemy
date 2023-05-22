import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { BaseSyntheticEvent, FunctionComponent } from 'react'
import { UseFormHandleSubmit, UseFormReset } from 'react-hook-form'
import {
  PressableProps,
  ModalProps as ReactModalProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native/types'

export enum RunnableStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  STOPPED = 'stopped',
  ENDED = 'ended',
}
const RunnableStatuses = Object.values(RunnableStatus)
export type RunnableStatusTypes = (typeof RunnableStatuses)[number]

export enum ActivityType {
  EXERCISE = 'exercise',
  BREAK = 'break',
  STRETCH = 'stretch',
}
export const WorkoutActivityTypes = Object.values(ActivityType)
export type WorkoutActivityType = (typeof WorkoutActivityTypes)[number]

export type WorkoutDifficulty = 'easy' | 'normal' | 'hard'
export type Slug = { readonly slug: string }

export type Workout = Slug & {
  name: string
  duration: number
  difficulty: WorkoutDifficulty
  sequence: Array<WorkoutActivity>
}

export type WorkoutActivity = Slug & {
  name: string
  duration: number
  reps?: number
  type: WorkoutActivityType
}

export type WorkoutActivityFormFields = {
  name: string
  duration: string
  type: WorkoutActivityType
  reps?: string
}

export type WorkoutFormFields = {
  name: string
}

export type WorkoutActivityFormProps = {
  onSubmit: (activity: WorkoutActivity) => void
}

export type WorkoutFormProps = {
  onSubmit: (workout: Workout) => void
  sequence: WorkoutActivity[]
}

export type ActivityFactory = (
  preProcess: UseFormHandleSubmit<WorkoutActivityFormFields>,
  postProcess: (activity: WorkoutActivity) => void,
  reset: UseFormReset<WorkoutActivityFormFields>,
) => { handleAddActivity: (e?: BaseSyntheticEvent<object, any, any>) => Promise<void> }

export type WorkoutFactory = (
  preProcess: UseFormHandleSubmit<WorkoutFormFields>,
  postProcess: (workout: Workout) => void,
  reset: UseFormReset<WorkoutFormFields>,
  sequence: WorkoutActivity[],
) => { handleAddWorkout: (e?: BaseSyntheticEvent<object, any, any>) => Promise<void> }

type WorkoutDetailParams = {
  route: {
    params: Slug
  }
}

export type PressableTextProps = PressableProps & { text: string; textStyle?: StyleProp<TextStyle> }

type Activator = FunctionComponent<{ open: () => void }>
type ModalContent = FunctionComponent<{ close: () => void }>

export type ModalProps = {
  activator?: Activator
  closeText?: string
  viewStyle?: StyleProp<ViewStyle>
  headerText?: string
  children: ModalContent
}

export type WorkoutDetailNaviagationParams = NativeStackHeaderProps & WorkoutDetailParams
