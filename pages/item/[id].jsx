import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import HeadPage from '../../components/Head'
import Loader from '../../components/Loader'
import { KEY_LOGIN } from '../../KEYS'
import { IoArrowBackOutline } from "react-icons/io5";
import ImageSlider from '../../components/ImageSlider'

const Page = () => {
    const [dataCharacter, setDataCharacter] = useState([])
    const [loader, setLoader] = useState(true)
    const [Images, setImages] = useState(0)
    const [sizeArray, setSizeArray] = useState(0)
    const timeoutRef = useRef(null);
    const [showHistory, setShowHistory] = useState(false)
    const [arrayImages, setArrayImages] = useState([])

    let { query: { id } } = useRouter()


    const fetchData = async () => {
        let url = `https://fortniteapi.io/v2/items/get?id=${id}&lang=es`
        const req = await fetch(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': KEY_LOGIN
                }
            })
        const reqJson = await req.json()

        if (reqJson.result) {
            setLoader(false)
            setDataCharacter(reqJson.item)
            setSizeArray(reqJson.item.displayAssets.length)

            localStorage.setItem('grants', JSON.stringify(reqJson.item.grants))
            let arrImg = []
            reqJson.item.displayAssets.forEach(el => {
                arrImg.push(el.full_background)
            })

            setArrayImages(arrImg)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])



    // function resetTimeout(name) {
    //     if (name.current) {
    //         clearTimeout(timeoutRef.current);
    //     }
    // }
    // const timeoutRefImages = useRef(null);




    // useEffect(() => {
    //     resetTimeout(timeoutRefImages)

    //     timeoutRefImages.current = setTimeout(() => {

    //         if (sizeArray === 0) return
    //         if (Images === sizeArray - 1) {
    //             setImages(0)
    //         } else {
    //             setImages(Images + 1)
    //         }
    //     }, 1500);


    //     return () => {
    //         resetTimeout(timeoutRefImages)
    //     }
    // }, [Images, sizeArray])


    const getDays = (date) => {

        if (!date) return
        let fechaInicio = new Date().getTime();
        let fechaFin = new Date(date).getTime();

        let diff = fechaInicio - fechaFin;

        let tiempo = Math.trunc((diff / (1000 * 60 * 60 * 24)));
        // console.info(tiempo)
        let daysOrHours = tiempo > 0 ? <span> hace <span className={tiempo >= 365 ? 'text-red-500' : 'text-yellow-500'}>{tiempo}</span> {tiempo === 1 ? 'día' : 'días'}</span> : <span className='text-green-500'>Recientemente</span>
        return daysOrHours
    }

    return (
        <>
            <HeadPage />

            {loader && <div className='min-h-screen flex flex-col items-center justify-center w-full'><Loader /></div>}
            {Object.keys(dataCharacter).length > 0 &&
                <div className='flex flex-col items-center m-auto mt-4 w-[90%] max-w-[1440px] min-h-[calc(100vh-96px)]'>

                    <Link href='/' className='self-start'><IoArrowBackOutline className='text-5xl mb-4' /></Link>
                    <div className='flex flex-col md:flex-row  items-center justify-center w-full'>
                        <div className='md:mr-12'>

                            {sizeArray > 1
                                ? <ImageSlider arrayImages={arrayImages} />
                                : <Image src={dataCharacter.images.full_background} width={350} height={350} alt={dataCharacter.id} priority />
                            }
                            <p className={`${dataCharacter.rarity.id === 'Common' ? 'bg-green-500 ' : ''} ${dataCharacter.rarity.id === 'Rare' ? 'bg-blue-500' : ''} ${dataCharacter.rarity.id === 'Uncommon' && ' bg-gray-500 '} ${dataCharacter.rarity.id === 'Epic' && ' bg-purple-500'} ${dataCharacter.rarity.id === 'Legendary' && ' bg-orange-500'} mt-4 mb-4 inline-block text-white font-bold py-1 px-4 rounded-sm`}>
                                {dataCharacter.rarity.name}
                            </p>
                        </div>
                        <div>

                            {dataCharacter.shopHistory?.length >= 1 && <h2 className='text-center font-bold text-2xl'>Apariciones en Tienda</h2>}

                            {dataCharacter.shopHistory ? <div className='flex flex-col justify-between items-center w-full flex-wrap mt-4 mb-4'>
                                <div className='transition-all duration-300'>
                                    <span className='block text-left'>{dataCharacter.shopHistory[0]}  {getDays(dataCharacter.shopHistory[0])}  </span>
                                    <span className='block text-left'>{dataCharacter.shopHistory[1]}  {getDays(dataCharacter.shopHistory[1])} </span>
                                    <span className='block text-left'>{dataCharacter.shopHistory[2]}  {getDays(dataCharacter.shopHistory[2])} </span>

                                    {showHistory && dataCharacter.shopHistory ? dataCharacter.shopHistory.slice(3).map(el => <span className='block text-left' key={el}>{el} {getDays(el)}</span>) : null}
                                </div>
                                {dataCharacter.shopHistory?.length > 3 && <button className='w-[60%] h-8 font-bold block mt-4 mb-4 rounded-md text-center' onClick={() => setShowHistory(!showHistory)}>{showHistory ? 'Ocultar historial' : 'Ver todo el historial'}</button>}
                            </div> : <p>Agregado el: {dataCharacter.added.date}</p>}


                        </div>
                    </div>
                    <h2 className='text-2xl mt-8 mb-8 font-bold'>Partes del Set {dataCharacter.set ? dataCharacter.set.name : dataCharacter.name}</h2>
                    <div className='grid grid-cols-2 md:grid-cols-4 mt-2 mb-8  gap-4'>
                        {dataCharacter.grants.map((el, index) =>
                            <Link href={`/item/accesorios/${el.id}`} key={`${el.id}_${index}`}>

                                <Image priority src={el.images.icon_background} width={350} height={350} alt={el.id} />
                                {/* <p className='font-bold text-center mt-2  mb-2 text-lg '>{el.description}</p> */}

                            </Link>
                        )}
                    </div>
                </div>
            }
        </>
    )
}

export default Page