import { useEffect, useState } from 'react'

export function usePartOf (item) {
  const [partOf, setPartOf] = useState([])

  useEffect(() => {
    setPartOf(item.grants)
  }, [item.grants])

  return { partOf }
}
