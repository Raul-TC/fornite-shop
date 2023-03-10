import Image from 'next/image'
import React from 'react'

const Card = ({ section, image, loteImage, itemName }) => {
  return (
    <div className='cursor-pointer '>
      {itemName.includes('Lote') || itemName.includes('LOTE') || itemName.includes('PAQUETE') || itemName.includes('Pack') || section.includes('Lotes')
        ? <Image
            priority quality={75} width={250} height={250} onClick={() => {
            }} className='w-full h-auto' src={loteImage} alt={`image_${itemName}`}
          />
        : <Image
            priority quality={75} width={250} height={250} onClick={() => {
            }} className='w-full h-auto' src={image} alt={`image_${itemName}`}
          />}
    </div>
  )
}
export default Card
