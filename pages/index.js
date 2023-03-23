import { getDayOnTheWeek, KEY_LOGIN } from '../KEYS'
import Card from '../components/Card'
import Link from 'next/link'
import HeadPage from '../components/Head'
import CountDown from '../components/CountDown'
import Loader from '../components/Loader'
import { useEffect, useState } from 'react'

export default function Home({ arr }) {
  const [dayFinal, setDayFinal] = useState()
  const [dayAhora, setDayAhora] = useState()
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  if (!arr) {
    <Loader />
  }

 

  useEffect(() => {
   let dayNow = new Date()
   let day;
    const months = (dayNow.getMonth() + 1).toString()
    const years = dayNow.getFullYear().toString()
    setMonth(months)
    setYear(years)
if (dayNow.getHours() >= 18) {
  dayNow.setDate(dayNow.getDate())
    day = (dayNow.getDate()).toString()
   setDayFinal(day)
   // dayNow.setHours(18,0,0,0)
  } else if(dayNow.getHours()<=18) {
    dayNow.setDate(dayNow.getDate() -1)
     day = (dayNow.getDate()).toString()
       setDayFinal(day)


  dayNow = `${year},${month},${dayFinal}`
  setDayAhora(dayNow)
  }
  
}, [dayFinal])
  
  return (
    <>
      <HeadPage title='Tienda Fortnite HOY' />
      <main className='dark:bg-background-black dark:text-gray-100 bg-gray-100 text-background-black m-auto w-[95%] max-w-[1440px] flex flex-col justify-center items-center h-auto'>
        <h1 className='text-lg font-bold mb-4 mt-8 self-start md:text-4xl'>Tienda del {getDayOnTheWeek(dayAhora)} {new Date(dayAhora).toLocaleDateString()}</h1>
        <CountDown />
        {arr.map((el, index) =>
          <section key={`${index}_${el.section}`} className='pb-4 w-full'>
            <h2 className='text-2xl text-center font-bold mt-4 mb-4 md:text-3xl'>{el.section}</h2>
            <div className='text-center mb-4 grid grid-cols-2 min-h-[190px] items-start justify-center grid- m-auto md:grid-cols-6 md:grid-auto gap-5'>
              {el.data.map((child, index) =>
                <Link
                  key={`${index}_${child.mainId}`} href={`item/${child.mainId}`} className={`${child.displayName.includes('Lote') || child.displayName.includes('LOTE') || child.displayName.includes('PAQUETE') || child.displayName.includes('Pack') || el.section.includes('Lotes') ? 'col-span-full md:col-span-2' : ''} rounded-lg shadow-md w-full auto-rows-fr `}
                >
                  <Card section={el.section} image={child.displayAssets[0].full_background} loteImage={child.displayAssets[0].full_background} displayName={child.displayName} />
                </Link>
              )}
            </div>
          </section>
        )}

      </main>
    </>
  )
}

export async function getServerSideProps () {
  const fetchShop = await fetch(`${'https://fortniteapi.io/v2/shop?lang=es'}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: KEY_LOGIN
    }
  })

  const data = await fetchShop.json()

  const dataFiltered = {}
  const categories = [...new Set(data.shop.map((section) => section.section.name))]
  categories.forEach(el => {
    el === null || el === '' || el === false ? dataFiltered.Destacados = [] : dataFiltered[el] = []
  })

  await data.shop.forEach(item => {
    if (dataFiltered[item.section.name] === '' || dataFiltered[item.section.name] === undefined || dataFiltered[item.section.name] === null) {
      dataFiltered.Destacados.push({
        // id: item.mainId,
        // itemName: item.displayName,
        // price: item.price.finalPrice,
        // images: item.granted[0].images.full_background,
        // loteImage: item.displayAssets,
        // description: item.displayDescription,
        // rarity: item.rarity.id
        ...item
      })
    } else {
      dataFiltered[item.section.name].push({
        // id: item.mainId,
        // itemName: item.displayName,
        // price: item.price.finalPrice,
        // images: item.granted[0].images.full_background,
        // loteImage: item.displayAssets,
        // description: item.displayDescription,
        // rarity: item.rarity.id

        ...item
      })
    }
  })
  const arr = []

  Object.entries(dataFiltered).forEach(([key, value]) => {
    arr.push({ section: key, data: value })
  })

  return {
    props: { arr }
  }
}
