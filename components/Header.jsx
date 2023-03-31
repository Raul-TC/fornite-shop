import Image from 'next/image'
import React from 'react'
import ToogleTheme from './ToogleTheme'
import logoTitle from '../assets/FortniteLogo.svg'
import logoTitleWhite from '../assets/FortniteLogoWhite.svg'
import Link from 'next/link'
import Container from './Layout'
import HeadPage from './Head'
import { useTheme } from '../hooks/useTheme'

const Header = () => {
  const { darkTheme, handleTheme } = useTheme()

  return (
    <>
      <HeadPage darkTheme={darkTheme} />
      <header className='dark:bg-background-black dark:text-gray-100 dark:border-white bg-gray-100 border-background-black border-b-2 b h-[80px] w-full '>
        <div className='w-[95%] max-w-[1440px] m-auto flex items-center h-full'>
          <Container>
            <Link href='/'>
              <Image src={darkTheme ? logoTitleWhite : logoTitle} width={150} height={60} alt={darkTheme ? 'logo_fornite_dark_mode' : 'logo_fornite_light_mode'} priority />
            </Link>
            <ToogleTheme darkTheme={darkTheme} handleTheme={handleTheme} />
          </Container>
        </div>
      </header>
    </>

  )
}

export default Header
