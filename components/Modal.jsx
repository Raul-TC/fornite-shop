import Image from 'next/image'
import React from 'react'
import { RxCross2 } from "react-icons/rx";

const Modal = ({ img, setModal}) => {
    return (
        <div onClick={()=> setModal(false)} className='fixed top-0 z-20 bg-[#201f1fa9] w-full h-full flex items-center justify-center'>
            <RxCross2 onClick={()=> setModal(false)} className='text-red-500 text-[60px] absolute top-0 mt-8 right-0 mr-4'></RxCross2>
            <Image className='max-w-[90%] rounded-lg shadow-xl' src={img} width={450} height={450} alt={`image_modal`} priority/>
</div>    )
}

export default Modal