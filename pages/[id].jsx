import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import HeadPage from '../components/Head'
import { KEY_LOGIN, blurURL } from '../KEYS'
import { IoArrowBackOutline } from 'react-icons/io5'
import ImageSlider from '../components/ImageSlider'
import { Roboto } from '@next/font/google'
import Error from 'next/error'
import History from '../components/History'
import Modal from '../components/Modal'
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })
const Page = ({ item, errorCode }) => {
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
                  src={item.images.full_background}
                  width={350}
                  height={350}
                  quality={85}
                  placeholder='blur'
                  blurDataURL={blurURL}
                  alt={item.id}
                  priority
                  className='w-full h-full rounded-md'
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
              <History item={item} />
            </div>
          </div>
        </div>

        {item.grants.length > 0 &&
          <>
            <h2 className='text-2xl mt-8 mb-8 font-bold'>Partes del Set {item.set ? item.set.name : item.name}</h2>
            <div className='grid grid-cols-2 mt-2 mb-8 gap-4 md:grid-cols-4'>
              {item.grants.map((el, index) =>
                <Modal key={`${el.id}_${index}`} link={el.images.icon_background} alt={el.id} />
              )}
            </div>
          </>}
      </div>

    </>
  )
}

export default Page

export async function getServerSideProps ({ query, res }) {
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )
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
