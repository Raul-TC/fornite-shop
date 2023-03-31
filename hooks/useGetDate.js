import { useCallback, useEffect, useMemo, useState } from 'react'

export function useDates() {
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
                date.setHours(18, 0, 0, 0)
                day = date.getDate().toString()
            } else {
                date.setDate(date.getDate())
                day = date.getDate().toString()
            }
            return fullDate = `${year},${month},${day}`
        } else if (date.getHours() <= 18) {
            date.setDate(date.getDate() - 1)
            day = (date.getDate()).toString()
            return fullDate = `${year},${month},${day}`
        }
         return fullDate
    }

  
    
    
useEffect(() => {      
        const currentTime = new Date()
        const nextTime = new Date()
            
        setcurrentShop(setDay(currentTime, 'current'))
        setNextShop(setDay(nextTime, 'after'))
    

     }, [])

  //   useEffect(() => {
  //     let dayNow = new Date()
  //     let day
  //     const months = (dayNow.getMonth() + 1).toString()
  //     const years = dayNow.getFullYear().toString()
  //     setMonth(months)
  //     setYear(years)
  //     if (dayNow.getHours() >= 18) {
  //       dayNow.setDate(dayNow.getDate())
  //       console.info(dayNow.getDate(), 'diaaaa')
  //       day = (dayNow.getDate()).toString()
  //       setDayFinal(day)
  //       dayNow = `${year},${month},${dayFinal}`
  //       setDayAhora(dayNow)
  //       // dayNow.setHours(18,0,0,0)
  //     } else if (dayNow.getHours() <= 18) {
  //       dayNow.setDate(dayNow.getDate() - 1)
  //       day = (dayNow.getDate()).toString()
  //       setDayFinal(day)

  //       dayNow = `${year},${month},${dayFinal}`
  //       setDayAhora(dayNow)
  //     }
  //   }, [dayFinal])

  return { currentShop, nextShop }
}
