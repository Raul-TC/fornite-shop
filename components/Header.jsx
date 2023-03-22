import Image from 'next/image'
import React, { useLayoutEffect, useState } from 'react'
import ToogleTheme from './ToogleTheme'
import logoTitle from '../assets/FortniteLogo.svg'
import logoTitleWhite from '../assets/FortniteLogoWhite.svg'
import Link from 'next/link'
import Container from './Layout'
import HeadPage from './Head'

const Header = () => {
  const [darkTheme, setDarkTheme] = useState(false)
  useLayoutEffect(() => {
    if (localStorage.getItem('theme') === 'true') {
      setDarkTheme(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkTheme(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const handleTheme = () => {
    if (darkTheme) {
      setDarkTheme(false)
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', false)
    } else {
      setDarkTheme(true)
      localStorage.setItem('theme', true)
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <>
      <HeadPage darkTheme={darkTheme} />
      <header className='dark:bg-background-black dark:text-gray-100 dark:border-white bg-gray-100 border-background-black border-b-2 b h-[80px] w-full '>
        <div className='w-[95%] max-w-[1440px] m-auto flex items-center h-full'>
          <Container>
            <Link href='/'>
              <Image src={darkTheme ? logoTitleWhite : logoTitle} width={150} height={60} alt='logo_fornite' priority />
            </Link>
            <ToogleTheme darkTheme={darkTheme} handleTheme={handleTheme} />
          </Container>
        </div>
      </header>
    </>

  )
}

export default Header
