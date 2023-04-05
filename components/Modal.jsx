import Image from 'next/image'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useModal } from '../hooks/useModal'
import { blurURL } from '../KEYS'
const Modal = ({ link, alt }) => {
  const { first, linkRef, handleClick, setFirst } = useModal(link)
  return (
    <>
      <Image
        src={linkRef.current}
        placeholder='blur'
        className='rounded-md cursor-pointer'
        blurDataURL={blurURL}
        width={350}
        height={350}
        alt={alt}
        quality={85}
        onClick={handleClick}
      />
      {first &&
        <div className='w-full h-full bg-[#2c2c2cbd] fixed top-0 bottom-0 left-0 right-0 m-auto flex items-center justify-center'>
          <div className='absolute w-[90%] max-w-[350px] m-auto h-[340px] flex flex-col items-center justify-center'>
            <AiOutlineClose className='absolute -top-12 right-0 text-red-500 h-7 w-7 cursor-pointer' onClick={() => { setFirst(false) }} />
            <Image
              className='rounded-md w-full absolute'
              src={linkRef.current}
              placeholder='blur'
              blurDataURL={blurURL}
              width={550}
              height={550}
              quality={85}
              alt={alt}
            />
          </div>
        </div>}
    </>
  )
}

export default Modal
