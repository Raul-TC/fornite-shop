import Image from 'next/image'
import React, { useEffect, useLayoutEffect, useState } from 'react'

const ImageSlider = ({ arrayImages }) => {
  const [counter, setCounter] = useState(0)
  const arraySize = arrayImages.length

  let count =  setTimeout(() => {
    counter === arraySize - 1
       ? setCounter(0)
       : setCounter(counter + 1)
  }, 1500)
  useLayoutEffect(() => {
    
    return () => clearTimeout(count)
  }, [counter])

  return (

    <div className=' h-auto rounded-md overflow-hidden'>
      {
        arrayImages.map((el, index) =>
          <Image
            priority
            width={350}
            height={350}
            key={`${counter}_${index}`}
            src={el} className={`${counter === index ? 'visible' : 'hidden'} m-auto`}
            alt={`image_${el}_${index}`}
          />)
      }
    </div>

  )
}

export default ImageSlider
