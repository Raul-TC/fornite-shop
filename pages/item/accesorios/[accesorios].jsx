import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import HeadPage from '../../../components/Head'
import ImageSlider from '../../../components/ImageSlider'
import ThemeContext from '../../../context/Theme'
import { KEY_LOGIN } from '../../../KEYS'

const Accesorios = () => {
    // const { DarkTheme } = useContext(ThemeContext)
    const [dataCharacter, setDataCharacter] = useState([])
    const [loader, setLoader] = useState(true)
    // const [Images, setImages] = useState(0)
    const [sizeArray, setSizeArray] = useState(0)
    const [arrayImages, setArrayImages] = useState([])

    let { query: { accesorios } } = useRouter()
    console.info(useRouter())
    const fetchData = async () => {
        let url = `https://fortniteapi.io/v2/items/get?id=${accesorios}&lang=es`
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
            console.info(reqJson)

            let arrImg = []
            reqJson.item.styles.forEach(el => {
                arrImg.push(el.image)
            })

            setArrayImages(arrImg)
        }
    }

    useEffect(() => {
        fetchData()


    }, [accesorios])
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
    // console.info(dataCharacter)

    //images.full_background
    //set.name
    //introduction.text
    //styles.image
    return (
        <>
            <HeadPage title='Accesorios' />
            {Object.keys(dataCharacter).length > 0 &&
                <div className='min-h-screen w-[90%] max-w-[1440px] m-auto mt-8'>
                    <IoArrowBackOutline onClick={() => Router.back()} className='text-5xl mb-4 cursor-pointer' />
                    {/* <h1 className={`font-bold text-center text-2xl`}>🚧 Página en Construccion 🚧</h1> */}
                    <div className='flex flex-col md:flex-row justify-center m-auto w-full'>
                        <div className='md:mr-12'>
                            {sizeArray > 1
                                ? <ImageSlider arrayImages={arrayImages} />
                                : <Image src={dataCharacter.images.full_background} width={350} height={350} alt={dataCharacter.id} priority />
                            }
                            <q className='block mt-2 mb-2'>{dataCharacter.description}</q>
                            <p className={`${dataCharacter.rarity.id === 'Common' ? 'bg-green-500 ' : ''} ${dataCharacter.rarity.id === 'Rare' ? 'bg-blue-500' : ''} ${dataCharacter.rarity.id === 'Uncommon' && ' bg-gray-500 '} ${dataCharacter.rarity.id === 'Epic' && ' bg-purple-500'} ${dataCharacter.rarity.id === 'Legendary' && ' bg-orange-500'} mt-2 mb-4 inline-block text-white font-bold py-1 px-4 rounded-sm`}>
                                {dataCharacter.rarity.name}
                            </p>
                        </div>
                        <div className='mb-8'>

                            {dataCharacter.shopHistory?.length >= 1 && <h2 className='text-center font-bold text-2xl'>Apariciones en Tienda</h2>}

                            {dataCharacter.shopHistory ? <div className='flex flex-col justify-between items-center w-full flex-wrap mt-4 mb-4'>
                                <div className='transition-all duration-300'>
                                    <span className='block text-left'>{dataCharacter.shopHistory[0]}  {getDays(dataCharacter.shopHistory[0])}  </span>
                                    <span className='block text-left'>{dataCharacter.shopHistory[1]}  {getDays(dataCharacter.shopHistory[1])} </span>
                                    <span className='block text-left'>{dataCharacter.shopHistory[2]}  {getDays(dataCharacter.shopHistory[2])} </span>

                                    {showHistory && dataCharacter.shopHistory ? dataCharacter.shopHistory.slice(3).map(el => <span className='block text-left' key={el}>{el} {getDays(el)}</span>) : null}
                                </div>
                                {dataCharacter.shopHistory?.length > 3 && <button className='w-[60%] h-8 font-bold block mt-4 mb-4 rounded-md text-center' onClick={() => setShowHistory(!showHistory)}>{showHistory ? 'Ocultar historial' : 'Ver todo el historial'}</button>}
                            </div> : <p>Agregado a la Tienda: {dataCharacter.added.date} ({getDays(dataCharacter.added.date)} )</p>}

                            <h2 className='text-xl mt-8 mb-8 font-bold'>Set: {dataCharacter.set ? dataCharacter.set.name : dataCharacter.name}</h2>
                            <p>{dataCharacter.introduction.text}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Accesorios