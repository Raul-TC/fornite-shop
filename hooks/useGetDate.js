import { useEffect, useState } from 'react'

export function useDates () {
  const [currentShop, setcurrentShop] = useState()
  const [nextShop, setNextShop] = useState()

  const setDay = (date, context) => {
    let day
    const month = (date.getMonth() + 1).toString()
    const year = (date.getFullYear()).toString()
    let fullDate
    if (date.getHours() >= 18) {
      if (context === 'after') {
        date.setDate(date.getDate() + 1)
        day = date.getDate().toString()
        date.setHours(18, 0, 0, 0)
      } else {
        date.setDate(date.getDate())
        day = date.getDate().toString()
      }
      fullDate = `${year},${month},${day}`
    } else if (date.getHours() <= 18) {
      if (context === 'after') {
        date.setDate(date.getDate())
        day = date.getDate().toString()
        date.setHours(18, 0, 0, 0)
      } else {
        date.setDate(date.getDate() - 1)
        day = (date.getDate()).toString()
      }
      fullDate = `${year},${month},${day}`
    }
    return fullDate
  }

  useEffect(() => {
    const currentTime = new Date()
    const nextTime = new Date()
    setcurrentShop(setDay(currentTime, 'current'))
    setNextShop(setDay(nextTime, 'after'))
  }, [])
  return { currentShop, nextShop }
}
