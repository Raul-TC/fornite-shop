import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ImageSlider = ({ arrayImages }) => {
  const [counter, setCounter] = useState(0)
  const arraySize = arrayImages.length

  useEffect(() => {
    setTimeout(() => {
      counter === arraySize - 1
        ? setCounter(0)
        : setCounter(counter + 1)
    }, 1500)
  }, [counter, arraySize])

  return (

    <div className='m-auto w-full h-auto'>
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
