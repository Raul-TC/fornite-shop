import { useEffect, useState } from 'react'

export function useShowHistory (item) {
  const [showHistory, setShowHistory] = useState(false)
  const [reversedHistory, setReversedHistory] = useState([])

  useEffect(() => {
    const clone = item.shopHistory ? item.shopHistory.slice(0).reverse() : null
    // localStorage.setItem('grants', JSON.stringify(item.grants))
    // const formatHistory = []

    // clone.map(el => {
    //   const currentDate = new Date(el)
    //   const day = currentDate.getDate()
    //   const month = currentDate.getDay() + 1
    //   const year = currentDate.getFullYear()

    //   console.log(day)
    //   console.log(month)
    //   console.log(year)

    //   formatHistory.push(`${day},${month},${year}`)
    //   return true
    // })

    // console.log(formatHistory)
    setReversedHistory(clone)
  }, [item.shopHistory])

  const handleShowHistory = () => {
    setShowHistory(!showHistory)
  }

  return { showHistory, reversedHistory, handleShowHistory }
}
