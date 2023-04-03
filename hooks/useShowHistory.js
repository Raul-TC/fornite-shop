import { useEffect, useState } from 'react'

export function useShowHistory (item) {
  const [showHistory, setShowHistory] = useState(false)
  const [reversedHistory, setReversedHistory] = useState([])

  useEffect(() => {
    const clone = item.shopHistory ? item.shopHistory.slice(0).reverse() : null
    console.info('me ejecuto')
    // localStorage.setItem('grants', JSON.stringify(item.grants))
    setReversedHistory(clone)
  }, [item.shopHistory])

  const handleShowHistory = () => {
    console.log('me hiciste click')
    setShowHistory(!showHistory)
  }

  return { showHistory, reversedHistory, handleShowHistory }
}
