import { useCallback, useEffect, useState } from 'react'

export function useCountDown () {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const deadline = new Date()

  if (deadline.getHours() >= 18) {
    deadline.setDate(deadline.getDate() + 1)
  }

  deadline.setHours(18, 0, 0, 0)

  const getTime = useCallback((deadline) => {
    const time = Date.parse(deadline) - Date.now()
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
    setMinutes(Math.floor((time / 1000 / 60) % 60))
    setSeconds(Math.floor((time / 1000) % 60))
  }, [])

  useEffect(() => {
    const time = setInterval(() => getTime(deadline), 1000)

    return () => {
      clearInterval(time)
    }
  }, [deadline])

  return { deadline, hours, minutes, seconds }
}
