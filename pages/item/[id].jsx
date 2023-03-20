import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import HeadPage from '../../components/Head'
import { KEY_LOGIN } from '../../KEYS'
import { IoArrowBackOutline } from 'react-icons/io5'
import ImageSlider from '../../components/ImageSlider'
import { Roboto } from '@next/font/google'
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })
const Page = ({ item }) => {
  const [sizeArray, setSizeArray] = useState(0)
  const [showHistory, setShowHistory] = useState(false)
  const [arrayImages, setArrayImages] = useState([])
  const [reversedHistory, setReversedHistory] = useState([])

  console.info(item)
  const { query: { id } } = useRouter()
  useEffect(() => {
    const arrImg = []
    item.displayAssets.forEach(el => {
      arrImg.push(el.full_background)
    })
    localStorage.setItem('grants', JSON.stringify(item.grants))
    setSizeArray(item.displayAssets.length)
    setArrayImages(arrImg)
  }, [])

  useEffect(() => {
    const clone = item.shopHistory.slice(0).reverse()

    setReversedHistory(clone)
  }, [id])

  const numbers = (number) => {
    let sum = 0;
    for (let i = 1; i <= number; i++) {
      let total = i+sum;

      sum = total;

    }
    console.info(sum)
  
  }
  numbers(200)
  
  const getDays = (date) => {
    if (!date) return
    const fechaInicio = new Date().getTime()
    const fechaFin = new Date(date).getTime()
    const diff = (fechaInicio - fechaFin)
    const tiempo = Math.abs(Math.trunc((diff / (1000 * 60 * 60 * 24))))
    const daysOrHours = tiempo > 0 ? <span> hace <span className={tiempo >= 365 ? 'text-red-500' : 'text-yellow-500'}>{tiempo}</span> {tiempo === 1 ? 'día' : 'días'}</span> : <span className='text-green-500'>¡En la Tienda Ahora!</span>
    return daysOrHours
  }

  const getFullDate = (date) => {
    const formatedDate = typeof date === 'string' ? date.replace('-', ',') : date
    const today = date ? new Date(formatedDate) : new Date()
    const day = today.getDate().toString()
    const month = (today.getMonth() + 1).toString()
    const year = today.getFullYear().toString()

    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`
  }
  console.info(item.shopHistory.length)
  return (
    <>
      <HeadPage />
      <div className={`${roboto.className} flex flex-col  items-center m-auto mt-4 w-[90%] max-w-[1440px] min-h-[calc(100vh-96px)]`}>
        <Link href='/' className='self-start'><IoArrowBackOutline className='text-5xl mb-4' /></Link>
        {/* <div className='flex flex-col lg:flex-row items-center justify-center w-full'> */}
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-center w-full rounded-md'>
          <div className='flex flex-col items-center justify-center'>
            {sizeArray >= 1
              ? <ImageSlider arrayImages={arrayImages} />
              : <Image src={item.images.full_background} width={150} height={150} alt={item.id} priority className='w-full rounded-md' />}
            {item.description && <q className='py-4 block text-lg font-semibold'>{item.description}</q>}
            <p className={`${item.rarity.id === 'Common' ? 'bg-green-500 ' : ''} ${item.rarity.id === 'Rare' ? 'bg-blue-500' : ''} ${item.rarity.id === 'Uncommon' && ' bg-gray-500 '} ${item.rarity.id === 'Epic' && ' bg-purple-500'} ${item.rarity.id === 'Legendary' && ' bg-orange-500'} my-4 inline-block sel text-white font-bold py-1 px-4 lg:py-3 lg:px-8 rounded-md`}>
              {item.rarity.name}
            </p>
          </div>
          
          <div className='w-full flex justify-around h-full flex-col items-center'>

            <div>
          {item.introduction && <p className=' text-center font-bold lg:text-3xl'> {item.introduction.text}</p>}
          {item.series && <p className=' font-bold lg:text-2xl'>Serie:<span className='self-start font-normal'> {item.series.name}</span></p>}
            </div>
          <div className='flex flex-col justify-center items-center'>

            {item.shopHistory?.length >= 1 && <h1 className='text-center font-bold text-2xl'>Apariciones en Tienda</h1>}
            {
                          item.shopHistory.length >1
                ?
                <>
                  <div className={`flex flex-row justify-center items-center flex-wrap m-auto ${showHistory ? 'overflow-y-scroll h-48' : ''} h-auto w-52 lg:w-60`}>
                              {/* <div> */}
                              <span className='block text-center'>{getDays(reversedHistory[0])}  </span>
                              <span className='block text-center'>{getFullDate(reversedHistory[1])}  {getDays(reversedHistory[1])} </span>
                              <span className='block text-center'>{getFullDate(reversedHistory[2])}  {getDays(reversedHistory[2])} </span>
                              {
                                showHistory && reversedHistory.slice(3).map(el => <span className='block text-center' key={el}>{getFullDate(el)} {getDays(el)}</span>)

                                }
                              {/* </div> */}
                              {
                              }
                            </div>
                {item.shopHistory?.length > 3 && <button className=' h-8 font-bold block mt-4 mb-4 rounded-md text-center m-auto' onClick={() => setShowHistory(!showHistory)}>{showHistory ? 'Ocultar historial' : 'Ver todo el historial'}</button>}
                              </>
                :
                <>
                  {item.shopHistory.length === 1 && <h2 className='font bold text-center'>Nuevo en Fortnite  </h2>}
                <span className='block text-center'>{getDays(reversedHistory[0])}  </span>

                {/* <p className='text-center'> {getFullDate(item.added.date)}</p> */}
                </>
            }
          </div>
        </div>
            </div>
        
        {item.grants.length > 0 &&
          <>
            <h2 className='text-2xl mt-8 mb-8 font-bold'>Partes del Set {item.set ? item.set.name : item.name}</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 mt-2 mb-8 gap-4'>
              {item.grants.map((el, index) =>
                <Link href={`/item/accesorios/${el.id}`} key={`${el.id}_${index}`}>
                  <Image priority src={el.images.icon_background} width={350} height={350} alt={el.id} />
                </Link>
              )}
            </div>
          </>}
      </div>

    </>
  )
}

export default Page

export async function getServerSideProps ({ query }) {
  const id = query.id
  const fetchShop = await fetch(`${`https://fortniteapi.io/v2/items/get?id=${id}&lang=es`}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: KEY_LOGIN
    }
  })

  const data = await fetchShop.json()

  const { item } = await data
  return {
    props: {
      item
    }
  }
}
