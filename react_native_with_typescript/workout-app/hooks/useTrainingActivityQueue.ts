import { useEffect, useState } from 'react'
import { RunnableStatus, WorkoutActivity } from '../types/data'

const { IDLE, RUNNING, ENDED } = RunnableStatus

export const useTrainingActivityQueue = (items: Array<WorkoutActivity>) => {
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [currentItem, setCurrentItem] = useState<WorkoutActivity>()
  const [preview, setPreview] = useState('')
  const [status, setStatus] = useState<RunnableStatus>(IDLE)

  useEffect(() => {
    const atEnd = currentIndex >= items.length
    const inRange = currentIndex >= 0 && currentIndex < items.length
    const isDone = currentIndex > items.length

    switch (true) {
      case atEnd:
        setStatus(ENDED)
        break
      case inRange:
        setStatus(RUNNING)
        break
      case isDone:
        setStatus(ENDED)
      default:
        setStatus(IDLE)
    }

    setCurrentItem(items[currentIndex])
    setPreview(items[currentIndex + 1]?.name)
  }, [currentIndex])

  const start = () => setCurrentIndex(-1)
  const next = () => setCurrentIndex((index) => index + 1)

  return { currentItem, start, next, status, preview }
}
