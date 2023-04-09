import Image from 'next/image'
import React from 'react'
import { blurURL } from '../KEYS'

const Card = ({ el, child, image, displayName }) => {
  return (
    <Image
      width={200}
      height={160}
      sizes='(min-width: 768px) 350px,
              (minx-width: 1200px) 550px'
      style={{ height: '100%', width: '100%' }}
      quality={85}
      placeholder='blur'
      blurDataURL={blurURL}
      // className='w-full h-auto cursor-pointer rounded-md overflow-hidden'
      // className='w-full h-auto cursor-pointer rounded-md overflow-hidden'
      src={image}
      alt={`image_${displayName}`}
    />
  )
}
export default Card
