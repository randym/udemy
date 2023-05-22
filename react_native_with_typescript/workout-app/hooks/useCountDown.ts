import { useEffect, useRef, useState } from 'react'
import { RunnableStatus, WorkoutActivity } from '../types/data'

const { IDLE, RUNNING, STOPPED } = RunnableStatus

export const useCountDown = ({ slug, duration }: WorkoutActivity, onEnd: Function) => {
  const [currentTime, setCurrentTime] = useState(duration)
  const [status, setStatus] = useState<RunnableStatus>(IDLE)
  const intervalRef = useRef<number>()

  const startTimer = () => setCurrentTime((time) => time - 1)

  useEffect(() => {
    if (status === RUNNING && !intervalRef.current) {
      intervalRef.current = window.setInterval(startTimer, 10)
    }

    return stop
  }, [status])

  useEffect(() => setCurrentTime(duration), [slug])

  useEffect(() => {
    if (currentTime !== 0) return

    stop()
    setStatus(IDLE)
    onEnd()
  }, [currentTime])

  const start = () => setStatus(RUNNING)

  const stop = () => {
    if (!intervalRef.current) return

    window.clearInterval(intervalRef.current)
    intervalRef.current = undefined
    setStatus(STOPPED)
  }

  return { start, stop, currentTime, status }
}
