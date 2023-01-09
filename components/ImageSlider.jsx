import Image from 'next/image'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import Loader from './Loader'

const ImageSlider = ({ arrayImages }) => {

    const [counter, setCounter] = useState(0)
    const images = arrayImages
    const arraySize = arrayImages.length
    const [loader, setLoader] = useState(true)

    // console.info(arraySize)
    const timeoutRefImages = useRef(null);

    function resetTimeout(name) {
        if (name.current) {
            clearTimeout(name.current);
        }
    }

    useEffect(() => {

        let imagesFetch = []
        arrayImages.map(el => {
            console.info(el)
            fetch(el)
                .then(res => res)
                .then(resp => {
                    imagesFetch.push(resp.url)
                    console.info(imagesFetch, 'images fetch')
                    setLoader(false)
                })
        })
    }, [])

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
        <Suspense fallback={<Loader />}>

            <div className='m-auto w-full'>
                {/* {loader && <Loader />} */}

                {
                    arrayImages.map((el, index) => <Image priority width={350} height={350} key={`${counter}_${index}`} src={el} className={`${counter === index ? 'block' : 'hidden'}`} alt={`image_${el}_${index}`} />)
                }

            </div>
        </Suspense>
    )
}

export default ImageSlider