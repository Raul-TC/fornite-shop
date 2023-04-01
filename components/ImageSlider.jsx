import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import Loader from './Loader'

const ImageSlider = ({ arrayImages }) => {
  const [counter, setCounter] = useState(0)
  const arraySize = arrayImages.length

  const aa = useMemo(() => arrayImages, [arrayImages])

  useEffect(() => {
    const ad = setInterval(() => {
      // if(aa.current === arrayImages) return
      counter === arraySize - 1
        ? setCounter(0)
        : setCounter(counter + 1)
    }, 2000)

    return () => {
      clearInterval(ad)
    }
  }, [counter])

  return (

    <div className='h-auto rounded-md relative top-0 w-full'>
      {
        aa
          ? aa.map((el, index) =>
            <Image
              priority
              width={150}
              height={150}
            // placeholder='blur'
              blurDataURL='data:image/webp;base64,UklGRrQCAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggxgAAAPAMAJ0BKokAiQA+uUacSzyjoqG81zgDkBcJaW74X6wMT3CHQqt6BAOeMFN40V0SYF2CctZqnhjhl7vuFIFIHLJxOTDwxdbVqFgd6HduAWZ9Mm8ph4Yjkfhw33biEg8zeLN08McPFGr1K+2On/HDvAAA/v3cjPaiN0EdFHnuewGq+/rc07Wt09Jn5Gc3bERtstH8Kj2IQeBkidgSXOLco905usNqG9aUrhIZGfFfAoWXAu7lzbhSdYAisrMuxBF8BHJgvgAAAA=='
              key={`_${index}`}
            // src={arrayImages[counter].full_background}
              src={el.full_background}
              placeholder='blur'
              className={`w-full mr-3 md:w-[550px] ${counter === index ? '' : 'w-0 h-0'}   `}
            // src={arrayImages[counter]}
              alt={`_${index}`}
            />
          )
          : <Loader />
      }
    </div>

  )
}

export default ImageSlider
