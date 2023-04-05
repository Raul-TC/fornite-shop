import { useRef, useState } from 'react'

export function useModal (link) {
  const [first, setFirst] = useState(false)
  const handleClick = () => {
    setFirst(!first)
  }
  const linkRef = useRef(link)

  return { first, linkRef, handleClick, setFirst }
}
