import { useEffect, useMemo, useState } from 'react'

export function useImageSlider (arrayImages) {
  const [counter, setCounter] = useState(0)

  const imagesMemo = useMemo(() => arrayImages, [arrayImages])

  useEffect(() => {
    const ad = setInterval(() => {
      counter === arrayImages.length - 1
        ? setCounter(0)
        : setCounter(counter + 1)
    }, 2000)

    return () => {
      clearInterval(ad)
    }
  }, [counter, arrayImages.length])

  return { counter, imagesMemo }
}
