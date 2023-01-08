import { useContext, useEffect, useState } from 'react'
import { KEY_LOGIN } from '../KEYS'
import ThemeContext from '../context/Theme'
import Card from '../components/Card'
import Link from 'next/link'
import HeadPage from '../components/Head'
import CountDown from '../components/CountDown'

export default function Home({ arr }) {
  const { DarkTheme } = useContext(ThemeContext)
  const [section, setSection] = useState(arr)
  // const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");
  const [loader, setLoader] = useState(true)
  const [skf, setSkf] = useState([])
  const [snaplogic, setSnaplogic] = useState([])
  useEffect(() => {

    fetch(`${`https://fortniteapi.io/v2/shop?lang=es`}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': KEY_LOGIN
      }
    }).then(res => res.json())
      .then(el => {
        let dd = {}
        const categories = [...new Set(el.shop.map((section) => section.section.name))]
        categories.forEach(el => {
          el === null || el === "" ? dd["Destacados"] = [] : dd[el] = [];
        })

        el.shop.map(item => {
          if (dd[item.section.name] === "" || dd[item.section.name] === undefined || dd[item.section.name] === null) {
            dd["Destacados"].push({
              id: item.mainId,
              itemName: item.displayName,
              price: item.price.finalPrice,
              images: item.granted[0].images.full_background,
              loteImage: item.displayAssets,
              description: item.displayDescription,
              emote: item.granted[0].video,
              rarity: item.rarity.id

              //  ...item
            })
          } else {
            dd[item.section.name].push({
              id: item.mainId,
              itemName: item.displayName,
              price: item.price.finalPrice,
              images: item.granted[0].images.full_background,
              loteImage: item.displayAssets,
              description: item.displayDescription,
              emote: item.granted[0].video,
              rarity: item.rarity.id

              // ...item
            })
          }
        })
        let arr = []

        Object.entries(dd).forEach(([key, value]) => {
          arr.push({ section: key, data: value })
        });

        setSection(arr)
      })

  }, [])


  const getData = async (url) => {

    const waitData = await fetch(url)

    const resp = await waitData.json()


    return await resp
  }

  const readData = async () => {

    const skf = await getData('pruebaSKF.json')
    const snaplogic = await getData('snaplogic.json')



    let filtroSkf
    let filtroSnap
    skf.map(skfEl => {
      snaplogic.map(snapEl => {
        // if (skfEl.poblacion === snapEl.poblacion) {
        //   filtroSkf.push(skfEl)
        //   filtroSkf.push(snapEl)
        // }

        filtroSnap = snaplogic.filter(abb => abb.poblacion === snapEl.poblacion && abb.capital === snapEl.capital)
      })
      filtroSkf = skf.filter(abb => abb.poblacion === skfEl.poblacion && abb.capital === skfEl.capital)

    })

    //setSkf(skf)
    //setSnaplogic(snaplogic)
    // console.info(filtroSkf)
    const unique = [... new Set(filtroSkf)];

    console.info(filtroSkf)
    console.info(filtroSnap)

  }
  useEffect(() => {

    readData()


  }, [])

  //  console.info(skf)
  //  console.info(snaplogic)

  return (
    <>
      <HeadPage title='Tienda de hoy Fortnite' />
      <main className={`${DarkTheme ? 'bg-[#2c2c2c] text-white' : 'bg-white text-[#2c2c2c]'} m-auto w-[95%] flex flex-col justify-center items-center h-auto`}>
        <h1 className='text-2xl font-bold mb-4'>Tienda de hoy {new Date().toLocaleDateString()}</h1>
        <CountDown />
        {/* <Link className='text-center mt-4 mb-4 text-lg font-bold' href="/nextItems/page">Tienda de Mañana</Link> */}

        {section.length > 0 && section.map((el, index) =>
          <div key={`${index}_${el.section}`} className='border-b-2 border-x-cyan-700 pb-4 w-full'>
            <marquee className='text-2xl text-center font-bold mt-4 mb-4'>{el.section}</marquee>
            <div className="text-center mb-4 grid grid-cols-2 sm:grid-cols-4 md:grid-auto gap-5 min-h-[190px] grid-flow-dense m-auto ">
              {el.data.length > 0 ? el.data.map((child, index) =>
                <Link key={`${index}_${child.id}`} href={`item/${child.id}`}>
                  <div className={`${child.rarity === 'Common' && ' shadow-green-500 '} ${child.rarity === 'Rare' && ' shadow-blue-500 '} ${child.rarity === 'Uncommon' && ' shadow-gray-500 '} ${child.rarity === 'Epic' && ' shadow-purple-500'} ${child.rarity === 'Legendary' && ' shadow-orange-500'} rounded-lg shadow-lg w-full h-auto overflow-hidden`}>
                    <Card section={el.section} image={child.images} loteImage={child.loteImage[0].full_background} itemName={child.itemName} />
                  </div>
                </Link>
              ) : <p>Loading Shop...</p>}
            </div>

          </div>
        )}

      </main>
    </>
  )
}

export async function getServerSideProps() {

  const fetchShop = await fetch(`${`https://fortniteapi.io/v2/shop?lang=es`}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': KEY_LOGIN
    }
  })

  const data = await fetchShop.json()

  let dd = {}
  const categories = [...new Set(data.shop.map((section) => section.section.name))]
  categories.forEach(el => {
    el === null || el === "" ? dd["Destacados"] = [] : dd[el] = [];
  })

  await data.shop.map(item => {
    if (dd[item.section.name] === "" || dd[item.section.name] === undefined || dd[item.section.name] === null) {
      dd["Destacados"].push({
        id: item.mainId,
        itemName: item.displayName,
        price: item.price.finalPrice,
        images: item.granted[0].images.full_background,
        loteImage: item.displayAssets,
        description: item.displayDescription,
        emote: item.granted[0].video,
        rarity: item.rarity.id

        //  ...item
      })
    } else {
      dd[item.section.name].push({
        id: item.mainId,
        itemName: item.displayName,
        price: item.price.finalPrice,
        images: item.granted[0].images.full_background,
        loteImage: item.displayAssets,
        description: item.displayDescription,
        emote: item.granted[0].video,
        rarity: item.rarity.id

        // ...item
      })
    }
  })
  let arr = []

  Object.entries(dd).forEach(([key, value]) => {
    arr.push({ section: key, data: value })
  });


  return {
    props: { arr }
  }
}