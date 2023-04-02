import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import HeadPage from '../components/Head'
import { KEY_LOGIN } from '../KEYS'
import { IoArrowBackOutline } from 'react-icons/io5'
import ImageSlider from '../components/ImageSlider'
import { Roboto } from '@next/font/google'
import Error from 'next/error'
import { useFormatedDate } from '../hooks/useFormatedDate'
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })
const Page = ({ item, errorCode }) => {
  const [showHistory, setShowHistory] = useState(false)
  const [reversedHistory, setReversedHistory] = useState([])

  useEffect(() => {
    const clone = item.shopHistory ? item.shopHistory.slice(0).reverse() : null

    localStorage.setItem('grants', JSON.stringify(item.grants))
    setReversedHistory(clone)
  }, [])

  const getDays = (date) => {
    if (!date) return
    console.log(date)
    const fechaInicio = new Date().getTime()
    const fechaFin = new Date(date).getTime()
    const diff = (fechaInicio - fechaFin)
    const tiempo = Math.abs(Math.trunc((diff / (1000 * 60 * 60 * 24))))
    const daysOrHours = tiempo > 0 ? <span> hace <span className={tiempo >= 365 ? 'text-red-500' : 'text-yellow-500'}>{tiempo}</span> {tiempo === 1 ? 'día' : 'días'}</span> : <span className='text-green-500'>¡En la Tienda Ahora!</span>
    console.log(daysOrHours)
    return daysOrHours
  }

  const getFullDate = (date) => {
    console.log(date, 'dateee')
    const formatedDate = typeof date === 'string' ? date.replace('-', ',') : date
    const today = date ? new Date(formatedDate) : new Date()
    const day = today.getDate().toString()
    const month = (today.getMonth() + 1).toString()
    const year = today.getFullYear().toString()
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`
  }

  const { days: firstDay } = useFormatedDate(reversedHistory[0])
  const { finalDate: secondDate } = useFormatedDate(reversedHistory[1])

  // console.log(getFullDate(reversedHistory[1]))
  // console.log(getFullDate(reversedHistory[2]))
  // console.log(getFullDate(reversedHistory[3]))

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <HeadPage title={`Tienda Fortnite HOY | ${item.name}`} />

      <div className={`${roboto.className} flex flex-col items-center m-auto mt-4 w-[90%] max-w-[1440px] min-h-[calc(100vh-96px)] mb-16`}>
        <Link href='/' className='self-start'><IoArrowBackOutline className='text-5xl mb-4' /></Link>
        <div className='grid grid-cols-1 items-center justify-center w-full rounded-md md:grid-cols-2'>
          <div className='flex flex-col items-center justify-center w-full'>
            {item.displayAssets.length > 1
              ? <ImageSlider arrayImages={item.displayAssets} />
              : <Image
                  src={item.images.full_background} width={350} height={350} placeholder='blur' blurDataURL='data:image/webp;base64,UklGRrQCAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggxgAAAPAMAJ0BKokAiQA+uUacSzyjoqG81zgDkBcJaW74X6wMT3CHQqt6BAOeMFN40V0SYF2CctZqnhjhl7vuFIFIHLJxOTDwxdbVqFgd6HduAWZ9Mm8ph4Yjkfhw33biEg8zeLN08McPFGr1K+2On/HDvAAA/v3cjPaiN0EdFHnuewGq+/rc07Wt09Jn5Gc3bERtstH8Kj2IQeBkidgSXOLco905usNqG9aUrhIZGfFfAoWXAu7lzbhSdYAisrMuxBF8BHJgvgAAAA=='
                  alt={item.id} priority className='w-full h-full rounded-md'
                />}
            <p className={`${item.rarity.id === 'Common' ? 'bg-green-500 ' : ''} ${item.rarity.id === 'Rare' ? 'bg-blue-500' : ''} ${item.rarity.id === 'Uncommon' && ' bg-gray-500 '} ${item.rarity.id === 'Epic' && ' bg-purple-500'} ${item.rarity.id === 'Legendary' && ' bg-orange-500'} my-2 text-white font-bold py-1 px-4 self-start  md:mr-auto lg:py-3 lg:px-8 rounded-sm`}>
              {item.rarity.name}
            </p>
            {item.description && <q className='py-4 block text-sm md:text-lg font-semibold'>{item.description}</q>}
          </div>
          <div className='w-full flex justify-around flex-col items-center gap-8 self-start'>
            <div>
              {item.set && <p className=' text-center font-bold  md:text-3xl'> <span>{item.set.partOf}</span></p>}
              {item.introduction && <p className=' text-center font-bold  md:text-3xl'> {item.introduction.text}</p>}
              {item.series && <p className=' font-bold text-center md:text-2xl'>Serie:<span className='self-start font-normal capitalize'> {(item.series.name).substring(6)}</span></p>}
            </div>
            <div className='flex flex-col h-full justify-center items-start'>
              <div>
                {item.shopHistory && item.shopHistory.length >= 1 && <h1 className='text-center font-bold text-2xl md:text-3xl'>Apariciones en Tienda</h1>}
                {
                  !item.shopHistory
                    ? null
                    : item.shopHistory.length > 1
                      ? (
                        <>
                          <span className='block text-center md:text-2xl'>{firstDay}  </span>
                          <div className={`flex flex-row justify-center items-center flex-wrap m-auto ${showHistory && reversedHistory.length >= 7 ? 'overflow-y-scroll h-48 scrollHistory' : ''} h-auto w-52 md:w-[320px]`}>
                            <span className='block text-center md:text-xl'>{secondDate}  {getDays(reversedHistory[1])} </span>
                            <span className='block text-center md:text-xl'>{getFullDate(reversedHistory[2])}  {getDays(reversedHistory[2])} </span>
                            {
                                showHistory && reversedHistory.slice(3).map(el => <span className='block text-center md:text-xl' key={el}>{getFullDate(el)} {getDays(el)}</span>)
                          }

                          </div><object data='' type='' />
                          {item.shopHistory?.length > 3 && <button className=' h-8 font-bold block mt-4 mb-4 rounded-md text-center m-auto md:text-2xl' onClick={() => setShowHistory(!showHistory)}>{showHistory ? 'Ocultar historial' : 'Ver todo el historial'}</button>}
                        </>)
                      : (
                        <>
                          {item.shopHistory.length === 1 && <h2 className='font bold text-center md:text-2xl'>Nuevo en Fortnite  </h2>}
                          <span className='block text-center'>{getDays(reversedHistory[0])}  </span>
                        </>)
            }
              </div>
            </div>
          </div>
        </div>

        {item.grants.length > 0 &&
          <>
            <h2 className='text-2xl mt-8 mb-8 font-bold'>Partes del Set {item.set ? item.set.name : item.name}</h2>
            <div className='grid grid-cols-2 mt-2 mb-8 gap-4 md:grid-cols-4'>
              {item.grants.map((el, index) =>
                <Link href={`/accesorio/${el.id}`} key={`${el.id}_${index}`}>
                  <Image priority placeholder='blur' blurDataURL='data:image/webp;base64,UklGRrQCAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggxgAAAPAMAJ0BKokAiQA+uUacSzyjoqG81zgDkBcJaW74X6wMT3CHQqt6BAOeMFN40V0SYF2CctZqnhjhl7vuFIFIHLJxOTDwxdbVqFgd6HduAWZ9Mm8ph4Yjkfhw33biEg8zeLN08McPFGr1K+2On/HDvAAA/v3cjPaiN0EdFHnuewGq+/rc07Wt09Jn5Gc3bERtstH8Kj2IQeBkidgSXOLco905usNqG9aUrhIZGfFfAoWXAu7lzbhSdYAisrMuxBF8BHJgvgAAAA==' src={el.images.icon_background} width={250} height={250} alt={el.id} />
                </Link>
              )}
            </div>
          </>}
      </div>

    </>
  )
}

export default Page

export async function getServerSideProps ({ query, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const id = query.id
  const fetchShop = await fetch(`${`https://fortniteapi.io/v2/items/get?id=${id}&lang=es`}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: KEY_LOGIN
    }
  })
  const errorCode = fetchShop.ok ? false : fetchShop.status

  const data = await fetchShop.json()

  const { item } = await data
  return {
    props: {
      item, errorCode
    }
  }
}
