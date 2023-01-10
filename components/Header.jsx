import Image from 'next/image'
import React, { useContext } from 'react'
import ThemeContext from '../context/Theme'
import ToogleTheme from './ToogleTheme'
import logoTitle from '../assets/FortniteLogo.svg'
import logoTitleWhite from '../assets/FortniteLogoWhite.svg'
import Link from 'next/link'
import Container from './Layout'

const Header = () => {
    const { DarkTheme } = useContext(ThemeContext)
    return (

        <header className={`${DarkTheme ? 'bg-[#2c2c2c] text-white' : 'bg-white text-[#2c2c2c]'} transition-all duration-300 relative z-10 shadow-md h-[80px] w-full `}>
            <div className='w-[95%] max-w-[1440px] m-auto flex items-center h-full'>
                <Container>

                    {/* <div className='flex items-center justify-between'> */}
                    <Link href='/'>
                        <Image src={DarkTheme ? logoTitleWhite : logoTitle} width={150} height={60} alt='logo_fornite' priority />
                    </Link>
                    <ToogleTheme />
                    {/* </div> */}
                </Container>
            </div>
        </header>

    )
}

export default Header