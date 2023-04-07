import { KEY_LOGIN } from '../KEYS'
import Card from '../components/Card'
import Link from 'next/link'
import HeadPage from '../components/Head'
import CountDown from '../components/CountDown'
import Loader from '../components/Loader'
import { useGetSkins } from '../hooks/useSkins'
import { useDates } from '../hooks/useGetDate'
import { useGetDay } from '../hooks/useGetDay'
import Error from 'next/error'

export default function Home ({ errorCode, data }) {
  const { skins } = useGetSkins(data.shop)
  const { currentShop } = useDates()
  const current = useGetDay(currentShop)
  // const after = useGetDay(nextShop)

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  console.log(skins)
  return (
    <>
      <HeadPage title='Tienda Fortnite HOY' />
      <main className='dark:bg-background-black dark:text-gray-100 bg-gray-100 text-background-black m-auto w-[95%] max-w-[1440px] flex flex-col justify-center items-center h-auto'>
        <h1 className='text-lg font-bold mb-4 mt-8 self-start md:text-4xl'>Tienda del {current.getDay(currentShop)} {current.currentDate}</h1>
        {/* <h1 className='font-bold md:text-3xl'>Siguiente Tienda {after.getDay(nextShop)} {after.currentDate}</h1> */}
        <h1 className='font-bold md:text-3xl'>Siguiente Actualización :</h1>

        <CountDown />
        {skins
          ? skins.map((el, index) =>
            <section key={`${index}_${el.section}`} className='pb-4 w-full'>
              <h2 className='text-2xl text-center font-bold mt-4 mb-4 md:text-3xl'>{el.section}</h2>
              <div className='text-center mb-4 grid grid-cols-2 min-h-[190px] items-start justify-center grid- m-auto md:grid-cols-6 md:grid-auto gap-5'>
                {el.data.map((child, index) =>
                  <Link
                    key={`${index}_${child.mainId}`}
                    href={`${child.mainId}`}
                    className={`${child.displayName.includes('Lote') || child.displayName.includes('LOTE') || child.displayName.includes('PAQUETE') || child.displayName.includes('Pack') || el.section.includes('Lotes') ? 'col-span-full md:col-span-1' : ''} rounded-lg shadow-md w-full auto-rows-fr `}
                  >
                    <Card
                      section={el.section}
                      image={child.displayAssets[0].full_background}
                      loteImage={child.displayAssets[0].full_background}
                      displayName={child.displayName}
                    />
                  </Link>
                )}
              </div>
            </section>
          )

          : <Loader />}

      </main>
    </>
  )
}

export async function getServerSideProps ({ res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const fetchShop = await fetch(`${'https://fortniteapi.io/v2/shop?lang=es'}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: KEY_LOGIN
    }
  })
  const errorCode = fetchShop.ok ? false : fetchShop.status
  const data = await fetchShop.json()

  return {
    props: { errorCode, data }
  }
}
