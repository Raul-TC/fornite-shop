import Image from 'next/image'
import React from 'react'
import { blurURL } from '../KEYS'

const Card = ({ section, image, loteImage, displayName }) => {
  const srcImage = displayName.includes('Lote') || displayName.includes('LOTE') || displayName.includes('PAQUETE') || displayName.includes('Pack') || section.includes('Lotes') ? loteImage : image
  return (
    <Image
      width={550}
      height={550}
      quality={85}
      placeholder='blur'
      blurDataURL={blurURL}
      className='w-full h-auto cursor-pointer rounded-md overflow-hidden'
      src={srcImage}
      alt={`image_${displayName}`}
    />
  )
}
export default Card
