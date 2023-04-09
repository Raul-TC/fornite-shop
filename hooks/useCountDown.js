import { useCallback, useEffect, useState } from 'react'

export function useCountDown () {
  const [hours, setHours] = useState('0')
  const [minutes, setMinutes] = useState('0'
  )
  const [seconds, setSeconds] = useState('0')

  const getTime = useCallback(() => {
    const newDat = new Date()

    if (newDat.getHours() >= 18) {
      newDat.setDate(newDat.getDate() + 1)
    }

    newDat.setHours(18, 0, 0, 0)
    const time = Date.parse(newDat) - Date.now()
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
    setMinutes(Math.floor((time / 1000 / 60) % 60))
    setSeconds(Math.floor((time / 1000) % 60))

    if (hours === 0 && minutes === 0 && seconds === 0) {
      setTimeout(() => {
        window.location.reload()
      }, 10000)
    }
  }, [hours, minutes, seconds])

  useEffect(() => {
    const time = setInterval(getTime, 1000)
    return () => {
      clearInterval(time)
    }
  }, [getTime])

  return { hours, minutes, seconds }
}
