import Image from 'next/image'
import React from 'react'
import { useImageSlider } from '../hooks/useImageSlider'
import { blurURL } from '../KEYS'

const ImageSlider = ({ arrayImages }) => {
  const { counter, imagesMemo } = useImageSlider(arrayImages)
  return (

    <div className='h-auto rounded-md relative top-0 w-full'>
      {
        imagesMemo.map((el, index) =>
          <Image
            width={550}
            height={550}
            quality={85}
            blurDataURL={blurURL}
            key={`_${index}`}
            src={el.full_background}
            placeholder='blur'
            className={`w-full  md:w-[550px] ${counter === index ? '' : 'w-0 h-0'} m-auto`}
            alt={`_${index}`}
          />
        )

      }
    </div>

  )
}

export default ImageSlider
