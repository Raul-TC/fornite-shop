import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../../../context/Theme'
import { KEY_LOGIN } from '../../../KEYS'

const Accesorios = () => {
    const { DarkTheme } = useContext(ThemeContext)
    let { query: { accesorios } } = useRouter()
    // const [dataCharacter, setDataCharacter] = useState([])
    const [loader, setLoader] = useState(true)
    // const [Images, setImages] = useState(0)
    // const [sizeArray, setSizeArray] = useState(0)
    const fetchData = async () => {
        let url = `https://fortniteapi.io/v2/items/get?id=${accesorios}&lang=es`
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
            console.info(reqJson)
        }
    }

    useEffect(() => {
        fetchData()


    }, [accesorios])

    // console.info(dataCharacter)
    return (
        <div> <h1 className={`${DarkTheme ? 'text-white' : 'text-[#2c2c2c]'} font-bold text-center text-2xl`}>🚧 Página en Construccion 🚧</h1></div>
    )
}

export default Accesorios