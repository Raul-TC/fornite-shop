import { useContext } from 'react'
import { KEY_LOGIN } from '../KEYS'
import ThemeContext from '../context/Theme'
import Card from '../components/Card'
import Link from 'next/link'
import HeadPage from '../components/Head'
import CountDown from '../components/CountDown'
import Loader from '../components/Loader'

export default function Home ({ arr }) {
  const { DarkTheme } = useContext(ThemeContext)

  if (!arr) {
    <Loader />
    return
  }

  const getDayOnTheWeek = () => {
    const day = new Date().getDay()

    let dia

    switch (day) {
      case 0:
        dia = 'Domingo'
        break
      case 1:
        dia = 'Lunes'
        break
      case 2:
        dia = 'Martes'
        break
      case 3:
        dia = 'Miércoles'
        break
      case 4:
        dia = 'Jueves'
        break
      case 5:
        dia = 'Viernes'
        break
      case 6:
        dia = 'Sábado'
        break
      default:
        break
    }

    return dia
  }

  return (
    <>
      <HeadPage title='Tienda de hoy Fortnite' />
      <main className={`${DarkTheme ? 'bg-[#2c2c2c] text-[#F4F400]' : 'bg-white text-[#2c2c2c]'} m-auto w-[95%] max-w-[1440px] flex flex-col justify-center items-center h-auto`}>
        <h1 className='text-lg font-bold mb-4 mt-8'>Tienda de hoy {getDayOnTheWeek()} {new Date().toLocaleDateString()}</h1>
        <CountDown />
        {arr.map((el, index) =>
          <div key={`${index}_${el.section}`} className='pb-4 w-full'>
            <section className='text-2xl text-center font-bold mt-4 mb-4'>{el.section}</section>
            <div className='text-center mb-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 md:grid-auto gap-5 min-h-[190px] items-start justify-center grid-flow-dense m-auto '>
              {el.data.map((child, index) =>
                <Link
                  key={`${index}_${child.id}`} href={`item/${child.id}`} className={`${child.itemName.includes('Lote') || child.itemName.includes('LOTE') || child.itemName.includes('PAQUETE') || child.itemName.includes('Pack') || el.section.includes('Lotes') ? ' shadow-rose-600 md:col-span-2 md:col-start-1' : ''} rounded-lg shadow-md w-full col-span-1 auto-rows-fr `}
                >
                  <div>
                    <Card section={el.section} image={child.loteImage[0].full_background} loteImage={child.loteImage[0].full_background} itemName={child.itemName} />
                  </div>
                </Link>
              )}
            </div>

          </div>
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

  const dd = {}
  const categories = [...new Set(data.shop.map((section) => section.section.name))]
  categories.forEach(el => {
    el === null || el === '' || el === false ? dd.Destacados = [] : dd[el] = []
    console.info(el)
  })

  await data.shop.forEach(item => {
    if (dd[item.section.name] === '' || dd[item.section.name] === undefined || dd[item.section.name] === null) {
      dd.Destacados.push({
        id: item.mainId,
        itemName: item.displayName,
        price: item.price.finalPrice,
        images: item.granted[0].images.full_background,
        loteImage: item.displayAssets,
        description: item.displayDescription,
        rarity: item.rarity.id
      })
    } else {
      dd[item.section.name].push({
        id: item.mainId,
        itemName: item.displayName,
        price: item.price.finalPrice,
        images: item.granted[0].images.full_background,
        loteImage: item.displayAssets,
        description: item.displayDescription,
        rarity: item.rarity.id

        // ...item
      })
    }
  })
  const arr = []

  Object.entries(dd).forEach(([key, value]) => {
    arr.push({ section: key, data: value })
  })

  return {
    props: { arr }
  }
}
