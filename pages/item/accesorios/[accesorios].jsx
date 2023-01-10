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
    const [partOf, setPartOf] = useState([])
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
            console.info(reqJson)

            // setSizeArray(reqJson.item.displayAssets.length)
            let arrImg = []
            reqJson.item.styles.forEach(el => {
                arrImg.push(el.image)
            })

            //setArrayImages(arrImg)
        }
    }

    useEffect(() => {
        fetchData()
        setPartOf(JSON.parse(localStorage.getItem("grants")))
    }, [accesorios])


    console.info(partOf)
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
                <div className='min-h-screen w-[90%] max-w-[1440px] m-auto mt-8 transition-all duration-300'>
                    <IoArrowBackOutline onClick={() => Router.back()} className='text-5xl mb-4 cursor-pointer' />
                    {/* <h1 className={`font-bold text-center text-2xl`}>🚧 Página en Construccion 🚧</h1> */}
                    <div className='flex flex-col md:flex-row justify-center m-auto w-full'>
                        <div className='md:mr-12'>
                            {sizeArray > 1
                                ? <ImageSlider arrayImages={arrayImages} />
                                : <Image src={dataCharacter.images.icon_background} width={350} height={350} alt={dataCharacter.id} priority />
                            }
                            <q className='block mt-2 mb-2'>{dataCharacter.description}</q>
                            <p className={`${dataCharacter.rarity.id === 'Common' ? 'bg-green-500 ' : ''} ${dataCharacter.rarity.id === 'Rare' ? 'bg-blue-500' : ''} ${dataCharacter.rarity.id === 'Uncommon' && ' bg-gray-500 '} ${dataCharacter.rarity.id === 'Epic' && ' bg-purple-500'} ${dataCharacter.rarity.id === 'Legendary' && ' bg-orange-500'} mt-2 mb-4 inline-block text-white font-bold py-1 px-4 rounded-sm`}>
                                {dataCharacter.rarity.name}
                            </p>
                        </div>
                        <div className=' mt-4 mb-4 md:mb-8'>
                            <p className='text-sm'>Tipo: {dataCharacter.type.id === 'outfit' ? 'Skin' : dataCharacter.type.name}</p>
                            <p className='text-sm'>Agregado ienda: el {dataCharacter.added.date} ({getDays(dataCharacter.added.date)} )</p>
                            <p className='text-sm'>Set: {dataCharacter.set ? dataCharacter.set.name : dataCharacter.name}</p>
                            <p className='text-sm'>{dataCharacter.introduction.text}</p>

                        </div>
                        <h2>{dataCharacter.set.partOf} {`(${partOf.length})`}</h2>
                        <div className='grid grid-cols-.name2 md:grid-cols-4 mt-2 mb-8  gap-4'>
                            {partOf.map((el, index) =>
                                <Link href={`/item/accesorios/${el.id}`} key={`${el.id}_${index}`}>

                                    <Image priority src={el.images.icon_background} width={350} height={350} alt={el.id} />
                                    {/* <p className='font-bold text-center mt-2  mb-2 text-lg '>{el.description}</p> */}

                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Accesorios