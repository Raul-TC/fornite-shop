import { useEffect, useState } from 'react'

export function usePartOf (item) {
  const [partOf, setPartOf] = useState([])
  console.log(item)

  useEffect(() => {
    setPartOf(item.grants)
  }, [item.grants])

  return { partOf }
}
