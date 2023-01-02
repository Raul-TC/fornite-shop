import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import { KEY_LOGIN } from '../../KEYS'

const page = () => {
    let { query: { id } } = useRouter()
    console.info(id)
    const [dataCharacter, setDataCharacter] = useState([])
    const [loader, setLoader] = useState(true)
    const fetchData = async () => {
        let url = `https://fortniteapi.io/v2/items/get?id=${id}&lang=en`
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
            console.info(reqJson)
            setDataCharacter(reqJson.item)
        }
    }

    useEffect(() => {
        fetchData()


    }, [id])

    return (
        <>
            {loader && <div className='min-h-screen flex items-center justify-center'><Loader /></div>}
            <div>{dataCharacter && <h1 className='font-bold text-xl text-center'>{dataCharacter.name}</h1>}</div>
        </>
    )
}

export default page