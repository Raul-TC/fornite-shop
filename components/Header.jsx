import Image from 'next/image'
import React, { useContext } from 'react'
import ThemeContext from '../context/Theme'
import ToogleTheme from './ToogleTheme'
import logoTitle from '../assets/FortniteLogo.svg'
import logoTitleWhite from '../assets/FortniteLogoWhite.svg'
import Link from 'next/link'

const Header = () => {
    const { DarkTheme } = useContext(ThemeContext)
    return (

        <header className={`${DarkTheme ? 'bg-[#2c2c2c] text-white ' : 'bg-white text-[#2c2c2c]'} relative z-10 shadow-md  h-[80px] w-full border-c mb-4`}>
            <div className='max-w-[1440px] w-[90%] m-auto flex items-center justify-between h-full'>
                <Link href='/'>
                    <Image src={DarkTheme ? logoTitleWhite : logoTitle} width={150} height={60} alt='logo_fornite' />
                </Link>
                <ToogleTheme />
            </div>
        </header>

    )
}

export default Header