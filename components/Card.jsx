import Image from 'next/image';
import React, { useState } from 'react'
import Modal from './Modal';

const Card = ({section,image, loteImage, itemName,description}) => {
      const [modal, setModal] = useState(false);
        const [isLote, setIsLote] = useState(false)
    return (
        <>
            <div className='cursor-pointer '>

            {itemName.includes("Lote") || itemName.includes("LOTE") || itemName.includes("PAQUETE") || itemName.includes("Pack") || section.includes("Lotes") ? <Image priority width={250} height={250} onClick={() => {
                setModal(!modal)
                setIsLote(true)
            }} className='w-full h-auto' src={loteImage} alt={`image_${itemName}`} /> : <Image priority width={250} height={250} onClick={() => {
                        setModal(!modal)
                        
            }} className='w-full h-auto' src={image} alt={`image_${itemName}`} />}
            {modal && <Modal description={description} img={isLote ? loteImage : image} setModal={setModal} setIsLote={setIsLote} />}
            </div>

            </>
    )
}
export default Card