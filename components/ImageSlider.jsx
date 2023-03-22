import Image from 'next/image'
import React, { useLayoutEffect, useState } from 'react'

const ImageSlider = ({ arrayImages }) => {
  const [counter, setCounter] = useState(0)
  const arraySize = arrayImages.length

  const count = setTimeout(() => {
    counter === arraySize - 1
      ? setCounter(0)
      : setCounter(counter + 1)
  }, 1500)
  useLayoutEffect(() => {
    return () => clearTimeout(count)
  }, [counter])

  return (

    <div className='h-auto rounded-md overflow-hidden'>
      {
        arrayImages.map((el, index) =>
          <Image
            priority
            width={150}
            height={150}
            placeholder='blur'
            blurDataURL='data:image/webp;base64,UklGRrQCAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggxgAAAPAMAJ0BKokAiQA+uUacSzyjoqG81zgDkBcJaW74X6wMT3CHQqt6BAOeMFN40V0SYF2CctZqnhjhl7vuFIFIHLJxOTDwxdbVqFgd6HduAWZ9Mm8ph4Yjkfhw33biEg8zeLN08McPFGr1K+2On/HDvAAA/v3cjPaiN0EdFHnuewGq+/rc07Wt09Jn5Gc3bERtstH8Kj2IQeBkidgSXOLco905usNqG9aUrhIZGfFfAoWXAu7lzbhSdYAisrMuxBF8BHJgvgAAAA=='
            key={`${counter}_${index}`}
            src={el} quality={85} className={`${counter === index ? 'visible' : 'hidden'} w-[350px] md:w-[550px]`}
            alt={`image_${el}_${index}`}
          />)
      }
    </div>

  )
}

export default ImageSlider
