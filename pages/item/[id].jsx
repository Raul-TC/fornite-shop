import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import HeadPage from '../../components/Head'
import Loader from '../../components/Loader'
import ThemeContext from '../../context/Theme'
import { KEY_LOGIN } from '../../KEYS'
import { IoArrowBackOutline } from "react-icons/io5";

const Page = () => {
    const { DarkTheme } = useContext(ThemeContext)
    let { query: { id } } = useRouter()
    const [dataCharacter, setDataCharacter] = useState([])
    const [loader, setLoader] = useState(true)
    const [Images, setImages] = useState(0)
    const [sizeArray, setSizeArray] = useState(0)
    const fetchData = async () => {
        let url = `https://fortniteapi.io/v2/items/get?id=${id}&lang=es`
        const req = await fetch(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': KEY_LOGIN
                }
            })
        const reqJson = await req.json()

        if (reqJson.result) {
            setLoader(false)
            setDataCharacter(reqJson.item)
            setSizeArray(reqJson.item.displayAssets.length)
        }
    }

    useEffect(() => {
        fetchData()


    }, [id])
    function resetTimeout(name) {
        if (name.current) {
            clearTimeout(timeoutRef.current);
        }
    }
    const timeoutRefImages = useRef(null);




    useEffect(() => {
        resetTimeout(timeoutRefImages)



        timeoutRefImages.current = setTimeout(() => {

            if (sizeArray === 0) return
            if (Images === sizeArray - 1) {
                setImages(0)
            } else {
                setImages(Images + 1)
            }
        }, 1500);


        return () => {
            resetTimeout(timeoutRefImages)
        }
    }, [Images, dataCharacter])

    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);
    const colors = dataCharacter.displayAssets;
    const delay = 2500;

    const [showHistory, setShowHistory] = useState(false)

    // useEffect(() => {
    //     resetTimeout(timeoutRef);
    //     timeoutRef.current = setTimeout(
    //         () =>
    //             setIndex((prevIndex) =>
    //                 prevIndex === colors.length - 1 ? 0 : prevIndex + 1
    //             ),
    //         delay
    //     );
    //     return () => {
    //         resetTimeout(timeoutRef);
    //     };


    // }, [index, dataCharacter]);

    const getDays = (date) => {

        if (!date) return
        let fechaInicio = new Date().getTime();
        let fechaFin = new Date(date).getTime();

        let diff = fechaInicio - fechaFin;

        let tiempo = Math.trunc((diff / (1000 * 60 * 60 * 24)));
        let daysOrHours = tiempo > 0 ? ` hace ${tiempo} dias ` : 'Recientemente'
        return daysOrHours
    }

    //  console.info(Images, 'images', sizeArray, "Array Size")
    return (
        <>
            <HeadPage />
            {loader && <div className='min-h-screen flex items-center justify-center'><Loader /></div>}

            {Object.keys(dataCharacter).length > 0 &&
                < div className={`${DarkTheme ? 'text-white' : 'text-[#2c2c2c]'} flex flex-col justify-center items-center m-auto w-[90%]`}>
                    {/* <button className={`${DarkTheme ? ' bg-white text-[#2c2c2c]' : 'bg-[#2c2c2c] text-white'} font-bold py-2 px-4 rounded-md mb-4`}>Regresar</button> */}
                    <Link href='/' className='self-start'><IoArrowBackOutline className={`${DarkTheme ? 'text-white' : 'text-[#2c2c2c]'} text-5xl mb-4`} /></Link>
                    {/* <h1 className='font-bold text-xl text-center'>{dataCharacter.name}</h1> */}
                    {/* {dataCharacter.images ? <Image key={`Image_${Images}`} className='rounded-xl transition-all ease-out duration-[5s]' src={dataCharacter.displayAssets[Images] ? dataCharacter.displayAssets[Images].full_background : dataCharacter.images.full_background} alt={dataCharacter.name} height={350} width={350} /> : <Loader />} */}
                    {sizeArray > 1 ? dataCharacter.displayAssets.map((el, index) => <Image width={350} height={350} key={`${el.displayAsset}_${Images}_${index}`} src={el.full_background} className={`${Images === index ? 'block' : 'hidden'}`} alt={`image_${el.displayAsset}_${index}`} />) : <Image src={dataCharacter && dataCharacter.images.full_background} width={350} height={350} alt={dataCharacter.id} />}
                    {/* <div className="slideshow">
                        <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                            {dataCharacter.displayAssets && colors.map((backgroundColor, index) => (
                                <Image
                                    className="slide"
                                    key={index}
                                    // style={{ backgroundColor }}
                                    src={backgroundColor.full_background}
                                    width={350}
                                    height={350}
                                    alt={backgroundColor.displayAsset}
                                ></Image>
                            ))}
                        </div>

                        <div className="slideshowDots">
                            {dataCharacter.displayAssets && colors.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`slideshowDot${index === idx ? " active" : ""}`}
                                    onClick={() => {
                                        setIndex(idx);
                                    }}

                                />
                            ))}
                        </div>
                    </div> */}

                    {dataCharacter.shopHistory?.length > 3 && <h2 className='text-center font-bold text-2xl'>Apariciones en Tienda:</h2>}
                    <div className='flex flex-col justify-between items-center w-full flex-wrap'>


                        <span className='block'>{dataCharacter.shopHistory && dataCharacter.shopHistory[0]}  {getDays(dataCharacter.shopHistory && dataCharacter.shopHistory[0])} </span>
                        <span className='block'>{dataCharacter.shopHistory && dataCharacter.shopHistory[1]}  {getDays(dataCharacter.shopHistory && dataCharacter.shopHistory[1])} </span>
                        <span className='block'>{dataCharacter.shopHistory && dataCharacter.shopHistory[2]}  {getDays(dataCharacter.shopHistory && dataCharacter.shopHistory[2])} </span>

                        {showHistory && dataCharacter.shopHistory ? dataCharacter.shopHistory.slice(3).map(el => <span className='block transition ease-in-out duration-3000' key={el}>{el} {getDays(el)}</span>) : null}
                    </div>
                    {dataCharacter.shopHistory?.length > 3 && <button className={`${DarkTheme ? ' bg-white text-[#2c2c2c]' : 'bg-[#2c2c2c] text-white'} w-[60%] h-8 font-bold block mt-4 mb-4 rounded-md text-center`} onClick={() => setShowHistory(!showHistory)}>{showHistory ? 'Ocultar historial' : 'Ver todo el historial'}</button>}
                    {/* <span>{dataCharacter.grants && dataCharacter.grants.map(el => <Link href={`/item/${el.id}`} key={el.id}><Image className='m-auto' src={el.images.full_background} width={350} height={350} alt={el.id} /><p className='font-bold text-center mt-2 text-lg'>{el.description}</p> </Link>)}</span> */}
                    {dataCharacter.grants && dataCharacter.grants.map((el, index) =>
                        <div key={`${el.id}_${index}`}>
                            <Link href={`/item/accesorios/${el.id}`}>
                                <Image className='m-auto' src={el.images.icon_background} width={350} height={350} alt={el.id} />
                            </Link>
                            <p>{el.rarity.name}</p>
                            <p className='font-bold text-center mt-2 text-lg'>{el.description}</p>
                        </div>
                    )}





                </div>
            }
        </>
    )
}

export default Page