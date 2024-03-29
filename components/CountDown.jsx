import React from 'react'
import { useCountDown } from '../hooks/useCountDown'

const CountDown = () => {
  const { hours, minutes, seconds } = useCountDown()
  return (
    <>
      <div className=' font-bold m-auto text-center text-green-600 mt-6 flex gap-4 '>
        <div className='flex flex-col'>
          <span className='text-xl text-center px-2 py-4 md:text-3xl lg:text-5xl'>{hours < 10 ? `0${hours}` : `${hours}`} </span>
          <span>Horas</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-xl text-center px-2 py-4 md:text-3xl lg:text-5xl'>
            {minutes < 10 ? `0${minutes}` : `${minutes}`}
          </span>
          <span>Minutos</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-xl text-center px-2 py-4 md:text-3xl lg:text-5xl'>
            {seconds < 10 ? `0${seconds}` : `${seconds}`}
          </span>
          <span>Segundos</span>
        </div>
      </div>
    </>
  )
}

export default CountDown
