import React, { useContext } from 'react'
import { BsLightbulbFill, BsLightbulb } from 'react-icons/bs'
import ThemeContext from '../context/Theme'
const ToogleTheme = () => {
  const { DarkTheme, handleTheme } = useContext(ThemeContext)
  return (
    <button onClick={() => handleTheme()} className='flex items-center justify-between cursor-pointer'>

      {DarkTheme ? <BsLightbulb className='w-5 h-5 ' /> : <BsLightbulbFill className='w-5 h-5 text-yellow-300' />}
      <p className='ml-2 font-bold'>Dark Mode</p>
    </button>
  )
}

export default ToogleTheme
