import slugify from 'slugify'
import {
  ActivityType,
  WorkoutActivityFormFields,
  WorkoutActivity,
  ActivityFactory,
} from '../types/data'

export const useActivityFactory: ActivityFactory = (preProcess, postProcess, reset) => {
  const handleAddActivity = preProcess((form: WorkoutActivityFormFields) => {
    const { name, duration, type, reps } = form
    const slug = slugify(`${name} ${Date.now()}`, { lower: true })

    const activity: WorkoutActivity = { slug, name, duration: Number(duration), type }

    reps && (activity.reps = Number(reps))

    postProcess(activity)

    reset({ name: '', duration: '', reps: '', type: ActivityType.EXERCISE })
  })

  return { handleAddActivity }
}
