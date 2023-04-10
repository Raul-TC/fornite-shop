import Image from 'next/image'
import React from 'react'
import { blurURL } from '../KEYS'

const Card = ({ image, displayName }) => {
  return (
    <Image
      width={200}
      height={200}
      sizes='(max-width: 390px) 167px,
              (max-width: 1200px) 550px'
      className='h-full w-full'
      quality={100}
      placeholder='blur'
      blurDataURL={blurURL}
      src={image}
      alt={`image_${displayName}`}
    />
  )
}
export default Card
