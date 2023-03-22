import React from 'react'
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs'
const ToogleTheme = ({ darkTheme, handleTheme }) => {
  return (
    <button onClick={() => handleTheme()} className='flex items-center justify-between cursor-pointer'>
      {darkTheme ? <BsFillMoonFill className='w-5 h-5 ' /> : <BsSunFill className='w-5 h-5 text-yellow-300' />}
      <p className='ml-2 font-bold'>{darkTheme ? '| Light Mode' : '| Dark Mode'}</p>
    </button>
  )
}

export default ToogleTheme
