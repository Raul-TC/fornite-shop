import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import HeadPage from '../../components/Head'
import Loader from '../../components/Loader'
import { KEY_LOGIN } from '../../KEYS'

const Accesorios = ({ item }) => {
  const [partOf, setPartOf] = useState([])
  console.log(item)

  useEffect(() => {
    setPartOf(item.grants)
  }, [item.grants])

  if (!item) {
    return <Loader />
  }
  const getDays = (date) => {
    if (!date) return
    const fechaInicio = new Date().getTime()
    const fechaFin = new Date(date).getTime()
    const diff = fechaInicio - fechaFin
    const tiempo = Math.trunc((diff / (1000 * 60 * 60 * 24)))
    const daysOrHours = tiempo > 0 ? <span> hace <span className={tiempo >= 365 ? 'text-red-500' : 'text-yellow-500'}>{tiempo}</span> {tiempo === 1 ? 'día' : 'días'}</span> : <span className='text-green-500'>Recientemente</span>
    return daysOrHours
  }
  return (
    <>
      <HeadPage title={`Tienda Fortnite HOY | ${item.name}`} />
      <div className='flex flex-col m-auto mt-4 w-[90%] max-w-[1440px] min-h-[calc(100vh-96px)]'>
        <IoArrowBackOutline onClick={() => Router.back()} className='text-5xl mb-4 cursor-pointer' />
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-5 w-full'>
          <div>
            <Image
              src={item.images.icon_background} placeholder='blur' blurDataURL='data:image/webp;base64,UklGRrQCAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggxgAAAPAMAJ0BKokAiQA+uUacSzyjoqG81zgDkBcJaW74X6wMT3CHQqt6BAOeMFN40V0SYF2CctZqnhjhl7vuFIFIHLJxOTDwxdbVqFgd6HduAWZ9Mm8ph4Yjkfhw33biEg8zeLN08McPFGr1K+2On/HDvAAA/v3cjPaiN0EdFHnuewGq+/rc07Wt09Jn5Gc3bERtstH8Kj2IQeBkidgSXOLco905usNqG9aUrhIZGfFfAoWXAu7lzbhSdYAisrMuxBF8BHJgvgAAAA=='
              width={350} height={350} alt={item.id} priority className='m-auto w-full'
            />
            <q className='block mt-2 mb-2 font-bold md:text-xl'>{item.description}</q>
            <p className={`${item.rarity.id === 'Common' ? 'bg-green-500 ' : ''} ${item.rarity.id === 'Rare' ? 'bg-blue-500' : ''} ${item.rarity.id === 'Uncommon' && ' bg-gray-500 '} ${item.rarity.id === 'Epic' && ' bg-purple-500'} ${item.rarity.id === 'Legendary' && ' bg-orange-500'} mt-2 md:mb-4 inline-block text-white font-bold py-1 px-4 rounded-sm`}>
              {item.rarity.name}
            </p>
          </div>
          <div className='flex justify-center items-start h-full'>
            <div className='mt-4 mb-4 md:mb-8'>
              <p className='text-base font-bold md:text-xl'>Tipo: <span className='font-normal'>{item.type.id === 'outfit' ? 'Skin' : item.type.name}</span></p>
              <p className='text-base font-bold md:text-xl'>Agregado a la Tienda: <span className='font-normal'> {item.added.date} (<span className='text-base'>{getDays(item.added.date)}</span> )</span></p>
              <p className='text-base font-bold md:text-xl'>Set: <span className='font-normal'>{item.set ? item.set.name : item.name}</span></p>
              <p className='text-base font-bold md:text-xl'>{item.introduction.text}</p>
            </div>
          </div>
        </div>
        <div>

          {partOf.length >= 1 && <h2>{item.set.partOf} {`(${partOf.length})`}</h2>}
          <div className='grid grid-cols-2 mt-2 mb-8 gap-4 md:grid-cols-4'>
            {partOf.length >= 1 && partOf.map((el, index) =>
              <Link href={`/item/accesorios/${el.id}`} key={`${el.id}_${index}`}>
                <Image
                  placeholder='blur' blurDataURL='data:image/webp;base64,UklGRrQCAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggxgAAAPAMAJ0BKokAiQA+uUacSzyjoqG81zgDkBcJaW74X6wMT3CHQqt6BAOeMFN40V0SYF2CctZqnhjhl7vuFIFIHLJxOTDwxdbVqFgd6HduAWZ9Mm8ph4Yjkfhw33biEg8zeLN08McPFGr1K+2On/HDvAAA/v3cjPaiN0EdFHnuewGq+/rc07Wt09Jn5Gc3bERtstH8Kj2IQeBkidgSXOLco905usNqG9aUrhIZGfFfAoWXAu7lzbhSdYAisrMuxBF8BHJgvgAAAA=='
                  priority src={el.images.icon_background} width={350} height={350} alt={el.id}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* } */}
    </>
  )
}

export default Accesorios

export async function getServerSideProps ({ query }) {
  const id = query.accesorios
  const fetchShop = await fetch(`${`https://fortniteapi.io/v2/items/get?id=${id}&lang=es`}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: KEY_LOGIN
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