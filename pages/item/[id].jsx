import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import HeadPage from '../../components/Head'
import { KEY_LOGIN } from '../../KEYS'
import { IoArrowBackOutline } from "react-icons/io5";
import ImageSlider from '../../components/ImageSlider'

const Page = ({ item }) => {
    const [sizeArray, setSizeArray] = useState(0)
    const [showHistory, setShowHistory] = useState(false)
    const [arrayImages, setArrayImages] = useState([])

    let { query: { id } } = useRouter()
    useEffect(() => {
        let arrImg = []
        item.displayAssets.forEach(el => {
            arrImg.push(el.full_background)
        })
        localStorage.setItem('grants', JSON.stringify(item.grants))
        setSizeArray(item.displayAssets.length)
        console.info(item.displayAssets.length)
        setArrayImages(arrImg)
    }, [id])
    if (!item) {
        return
    }

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
            <div className='flex flex-col items-center m-auto mt-4 w-[90%] max-w-[1440px] min-h-[calc(100vh-96px)]'>
                <Link href='/' className='self-start'><IoArrowBackOutline className='text-5xl mb-4' /></Link>
                <div className='flex flex-col md:flex-row  items-center justify-center w-full'>
                    <div className='md:mr-12'>

                        {sizeArray > 1
                            ? <ImageSlider arrayImages={arrayImages} />
                            : <Image src={item.images.full_background} width={350} height={350} alt={item.id} priority />
                        }
                        <p className={`${item.rarity.id === 'Common' ? 'bg-green-500 ' : ''} ${item.rarity.id === 'Rare' ? 'bg-blue-500' : ''} ${item.rarity.id === 'Uncommon' && ' bg-gray-500 '} ${item.rarity.id === 'Epic' && ' bg-purple-500'} ${item.rarity.id === 'Legendary' && ' bg-orange-500'} mt-4 mb-4 inline-block text-white font-bold py-1 px-4 rounded-sm`}>
                            {item.rarity.name}
                        </p>
                    </div>
                    <div>

                        {item.shopHistory?.length >= 1 && <h2 className='text-center font-bold text-2xl'>Apariciones en Tienda</h2>}

                        {item.shopHistory ? <div className='flex flex-col justify-between items-center w-full flex-wrap mt-4 mb-4'>
                            <div className='transition-all duration-300'>
                                <span className='block text-left'>{item.shopHistory[0]}  {getDays(item.shopHistory[0])}  </span>
                                <span className='block text-left'>{item.shopHistory[1]}  {getDays(item.shopHistory[1])} </span>
                                <span className='block text-left'>{item.shopHistory[2]}  {getDays(item.shopHistory[2])} </span>

                                {showHistory && item.shopHistory ? item.shopHistory.slice(3).map(el => <span className='block text-left' key={el}>{el} {getDays(el)}</span>) : null}
                            </div>
                            {item.shopHistory?.length > 3 && <button className='w-[60%] h-8 font-bold block mt-4 mb-4 rounded-md text-center' onClick={() => setShowHistory(!showHistory)}>{showHistory ? 'Ocultar historial' : 'Ver todo el historial'}</button>}
                        </div> : <p>Agregado el: {item.added.date}</p>}
                    </div>
                </div>
                <h2 className='text-2xl mt-8 mb-8 font-bold'>Partes del Set {item.set ? item.set.name : item.name}</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 mt-2 mb-8  gap-4'>
                    {item.grants.map((el, index) =>
                        <Link href={`/item/accesorios/${el.id}`} key={`${el.id}_${index}`}>
                            <Image priority src={el.images.icon_background} width={350} height={350} alt={el.id} />
                        </Link>
                    )}
                </div>
            </div>

        </>
    )
}

export default Page


export async function getServerSideProps({ query }) {
    let id = query.id
    const fetchShop = await fetch(`${`https://fortniteapi.io/v2/items/get?id=${id}&lang=es`}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': KEY_LOGIN
        }
    })

    const data = await fetchShop.json()

    const { item } = data
    return {
        props: {
            item
        }
    }
}