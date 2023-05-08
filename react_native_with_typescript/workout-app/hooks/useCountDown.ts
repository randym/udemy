import { useEffect, useState, useRef } from 'react'

export const useCountDown = (index: number) => {
  const [countDown, setCountDown] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  let intervalRef = useRef<number>()

  useEffect(() => {
    if (isRunning && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => setCountDown((count) => count - 1), 10)
    }

    return cleanup
  }, [index, isRunning])

  useEffect(() => {
    countDown === 0 && cleanup()
  }, [countDown])

  const cleanup = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = undefined
      setIsRunning(false)
    }
  }

  const start = (count: number) => {
    setCountDown(count)
    setIsRunning(true)
  }

  return { countDown, isRunning, stop: cleanup, start }
}
