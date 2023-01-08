import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const ImageSlider = ({ arrayImages }) => {

    const [counter, setCounter] = useState(0)
    const images = arrayImages
    const arraySize = arrayImages.length

    // console.info(arraySize)
    const timeoutRefImages = useRef(null);

    function resetTimeout(name) {
        if (name.current) {
            clearTimeout(name.current);
        }
    }

    // console.info(timeoutRefImages)
    useEffect(() => {
        resetTimeout(timeoutRefImages)

        timeoutRefImages.current = setTimeout(() => {

            if (arraySize === 0) return
            if (counter === arraySize - 1) {
                setCounter(0)
            } else {
                setCounter(counter + 1)
            }
        }, 1500);


        return () => {
            resetTimeout(timeoutRefImages)
        }
    }, [counter, arraySize])


    return (
        <div className='m-auto w-full'>

            {
                arrayImages.map((el, index) => <Image priority width={350} height={350} key={`${counter}_${index}`} src={el} className={`${counter === index ? 'block' : 'hidden'}`} alt={`image_${el}_${index}`} />)
            }

        </div>
    )
}

export default ImageSlider