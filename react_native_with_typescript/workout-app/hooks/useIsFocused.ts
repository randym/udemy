import { useState, useEffect } from 'react'

export const useIsFocused = () => {
  const [isFocused, setIsFocused] = useState(false)
  useEffect(() => {}, ['list?'])
  return isFocused
}
