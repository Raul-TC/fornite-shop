import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { KEY_LOGIN } from '../KEYS'
import Header from '../components/Header'
import Modal from '../components/Modal'
import ThemeContext from '../context/Theme'
import logo from "../assets/shop-pngrepo-com.png"
import Image from 'next/image'
import Card from '../components/Card'

export default function Home({ arr }) {
  const { DarkTheme } = useContext(ThemeContext)
  const [section, setSection] = useState(arr)
  // const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");

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
              itemName: item.displayName,
              price: item.price.finalPrice,
              images: item.granted[0].images.full_background,
              loteImage: item.displayAssets,
              description: item.displayDescription,
              emote: item.granted[0].video
              //  ...item
            })
          } else {
            dd[item.section.name].push({
              itemName: item.displayName,
              price: item.price.finalPrice,
              images: item.granted[0].images.full_background,
              loteImage: item.displayAssets,
              description: item.displayDescription,
              emote: item.granted[0].video
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

  return (
    <>
      <Head>
        <title>Fornite Shop App</title>
        <meta name="description" content="Fornite Shop Today" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Aquí encontraras los items disponibles actualmente en la tienda de fornite." />
        <meta name="facebook:card" value="summary" />
        <meta property="og:title" content="Fornite Shop Today" />
        <meta property="og:type" content="article" />
        <meta property="og:description" content="Tienda Fornite de Hoy" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <main className={`${DarkTheme ? "bg-[#2c2c2c] text-white" : "bg-white text-[#2c2c2c]"} min-h-screen`}>
        <Header />

        <div className='grid grid-cols-1 max-w-[90%] m-auto'>
          <h1 className='text-center mt-4 mb-4 text-lg font-bold'> Tienda del {new Date().toLocaleDateString()}</h1>

          {section.length > 0 && section.map((el, index) =>
            <div key={`${index}_${el.section}`} className='border-b-2 border-x-cyan-700 '>
              <marquee className='text-2xl text-center font-bold mt-4 mb-4'>{el.section}</marquee>
              <div className="text-center mb-4 grid grid-cols-2 sm:grid-cols-4 md:grid-auto lg:grid-cols-8 gap-5 min-h-[190px] grid-flow-dense">
                {el.data.length > 0 ? el.data.map((child, index) =>
                  <div key={`${index}_${child.itemName}`} className={`${child.itemName.includes("Lote") || child.itemName.includes("LOTE") || child.itemName.includes("PAQUETE") || el.section.includes("Lotes")} w-full h-auto`}>
                    <Card section={el.section} image={child.images} loteImage={child.loteImage[0].full_background} itemName={child.itemName} />
                  </div>
                ) : <p>Loading Shop...</p>}
              </div>

            </div>
          )}

        </div>
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
    el === null || el === "" ? dd["Otros"] = [] : dd[el] = [];
  })

  await data.shop.map(item => {
    if (dd[item.section.name] === "" || dd[item.section.name] === undefined || dd[item.section.name] === null) {
      dd["Destacados"].push({
        itemName: item.displayName,
        price: item.price.finalPrice,
        images: item.granted[0].images.full_background,
        loteImage: item.displayAssets,
        description: item.displayDescription,
        emote: item.granted[0].video
        //  ...item
      })
    } else {
      dd[item.section.name].push({
        itemName: item.displayName,
        price: item.price.finalPrice,
        images: item.granted[0].images.full_background,
        loteImage: item.displayAssets,
        description: item.displayDescription,
        emote: item.granted[0].video
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