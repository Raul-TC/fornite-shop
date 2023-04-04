import { useEffect, useState } from 'react'

export function useDates () {
  const [currentShop, setcurrentShop] = useState()
  const [nextShop, setNextShop] = useState()

  const setDay = (date, context) => {
    let day = date.getDate().toString()
    let month = (date.getMonth() + 1)
    const year = (date.getFullYear()).toString()

    // con 31 dias enero,marzo,mayo,julio,agosto,octubre,diciembre
    // con 30 Abril,Junio,Septiembre,Noviembre
    let fullDate
    if (date.getHours() >= 18) {
      if (context === 'after') {
        if ((month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) && day === '31') {
          date.setMonth(month)
          month = date.getMonth().toString()
          // date.setDate(date.getDate())
          day = date.getDate().toString()
        } else if ((month === 4 || month === 6 || month === 9 || month === 11) && day === '30') {
          date.setMonth(month)
          month = date.getMonth().toString()
          date.setDate(date.getDate())
          day = date.getDate().toString()
        } else {
          date.setDate(date.getDate() + 1)
          day = date.getDate().toString()
        }
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
        // date.setHours(18, 0, 0, 0)
      } else if (context === 'current') {
        if (((month - 1) === 1 || (month - 1) === 3 || month - 1 === 5 || month - 1 === 7 || month - 1 === 8 || month - 1 === 10 || month - 1 === 12) && day === '1') {
          date.setDate(date.getDate() - 1)
          day = (date.getDate()).toString()
          month = (month - 1).toString()
        } else {
          date.setDate(date.getDate() - 1)
          day = (date.getDate()).toString()
          // month = (month - 1).toString()
        }
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
