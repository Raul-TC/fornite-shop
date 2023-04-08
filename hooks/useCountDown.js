import { useCallback, useEffect, useMemo, useState } from 'react'

export function useCountDown () {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const dates = useMemo(() => new Date(), [])
  const getTime = useCallback((deadline) => {
    const time = Date.parse(deadline) - Date.now()
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
    setMinutes(Math.floor((time / 1000 / 60) % 60))
    setSeconds(Math.floor((time / 1000) % 60))
  }, [])

  useEffect(() => {
    const time = setInterval(() => getTime(dates), 1000)
    if (dates.getHours() >= 18) {
      dates.setDate(dates.getDate() + 1)
    }
    dates.setHours(18, 0, 0, 0)

    return () => {
      clearInterval(time)
    }
  }, [getTime, dates])

  return { dates, hours, minutes, seconds }
}
