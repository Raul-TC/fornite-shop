import Head from 'next/head'
import { useContext, useState } from 'react'
import { KEY_LOGIN } from '../KEYS'
import Header from './components/Header'
import Modal from './components/Modal'
import ThemeContext from './context/Theme'
import logo from "./assets/shop-pngrepo-com.png"

export default function Home({ arr }) {
  const { DarkTheme } = useContext(ThemeContext)

  const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");
  console.info(arr)
  return (
    <>
      <Head>
        <title>Fornite Shop App</title>
        <meta name="description" content="Fornite Shop Today" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Titulo de Página. 60-70 caracteres como maximo</title>
        <meta name="description" content="Aquí encontraras los items disponibles actualmente en la tienda de fornite." />

        <meta name="facebook:card" value="summary" />

        <meta property="og:title" content="Fornite Shop Today" />
        <meta property="og:type" content="article" />
        <meta property="og:description" content="Tienda Fornite de Hoy" />
        <link rel="image" href={logo} />
      </Head>
      <main className={`${DarkTheme ? "bg-[#2c2c2c] text-white" : "bg-white text-[#2c2c2c]"} min-h-screen`}>
        <Header />

        {modal && <Modal img={image} setModal={setModal} />}
        <div className='grid grid-cols-1 max-w-[90%] m-auto'>

          {arr.map((el, index) =>
            <div key={`${index}_${el.section}`} className='border-b-2 border-x-cyan-700 '>
              {/* <h2>{el.}</h2> */}
              <h1 className='text-2xl text-center font-bold mt-4 mb-4'>{el.section}</h1>
              <div className="text-center mb-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 min-h-[190px] ">
                {el.data.length > 0 && el.data.map((child, index) =>
                  <div key={`${index}_${child.itemName}`} className='mb-4 flex flex-col justify-between items-center w-full h-auto'>
                    {child.itemName.includes("Lote" || "LOTE") ? <img onClick={() => {
                      setModal(!modal)
                      setImage(child.loteImage[0].full_background)
                    }} className='rounded-lg col-span-2 ' src={child.loteImage[0].full_background} alt={`image_${child.itemName}`} /> : <img onClick={() => {
                      setModal(!modal)
                      setImage(child.loteImage[0].full_background)
                    }} className='rounded-lg' src={child.images} alt={`image_${child.name}`} />}
                    {/* <img className='rounded-lg' src={child.images} alt={`image_${child.name}`} /> */}
                    {/* <p className='text-xl font-bold  text-center  mt-2 mb-2'>{child.itemName}</p> */}
                    {/* <p className='text-lg font-bold  text-center  mt-2 '>{child.price} Pavos</p> */}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* {shop && shop.map(el => {
          return (
            <div key={el.mainId} style={{ marginBottom: "2rem", margin: "0 auto 2rem" }}>
              <img src={el.granted[0].images.background} alt="skin_fornite" />
              <p>{el.displayName}</p>
              <p>SECTION: {el.section.name}</p>
              <p>PRICE: {el.price.finalPrice} VBuck's</p>
            </div>
            )
        })
        } */}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {

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

  data.shop.map(item => {
    if (dd[item.section.name] === "" || dd[item.section.name] === undefined || dd[item.section.name] === null) {
      dd["Otros"].push({
        itemName: item.displayName,
        price: item.price.finalPrice,
        images: item.granted[0].images.full_background,
        loteImage: item.displayAssets,
        description: item.displayDescription

      })
    } else {
      dd[item.section.name].push({
        itemName: item.displayName,
        price: item.price.finalPrice,
        images: item.granted[0].images.full_background,
        loteImage: item.displayAssets,
        description: item.displayDescription

      })
    }
  })
  let arr = []

  Object.entries(dd).forEach(([key, value]) => {
    arr.push({ section: key, data: value })
  });

  return {
    props: { arr }, // will be passed to the page component as props
  }
}