import Image from 'next/image'
import React from 'react'

const Card = ({ section, image, loteImage, displayName }) => {
  return (
    <div className='cursor-pointer '>
      {displayName.includes('Lote') || displayName.includes('LOTE') || displayName.includes('PAQUETE') || displayName.includes('Pack') || section.includes('Lotes')
        ? <Image
            priority width={250} height={250} onClick={() => {
            }} className='w-full h-auto' src={loteImage} alt={`image_${displayName}`}
          />
        : <Image
            priority width={250} height={250} onClick={() => {
            }} src={image} alt={`image_${displayName}`}
          />}
    </div>
  )
}
export default Card
