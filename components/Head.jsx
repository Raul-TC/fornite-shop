import React, { useContext } from 'react'
import ThemeContext from '../context/Theme'
import Head from 'next/head'
const HeadPage = ({ title = "Tienda de hoy Fortnite" }) => {
    const { DarkTheme } = useContext(ThemeContext)
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content="Fornite Shop Today" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Aquí encontraras los items disponibles actualmente en la tienda de fornite." />
            <meta name="facebook:card" value="summary" />
            <meta property="og:title" content="Fornite Shop Today" />
            <meta property="og:type" content="article" />
            <meta property="og:description" content="Tienda Fornite de Hoy" />
            <meta name='theme-color' content={DarkTheme ? "#2C2C2C" : "#FFFFFF"} />
            <link rel="icon" href="./favicon.ico" />
        </Head>)
}

export default HeadPage