import React, { useEffect, useState } from 'react'
import { getDayOnTheWeek } from '../KEYS'

const CountDown = () => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const deadline = new Date()

  if (deadline.getHours() >= 18) {
    deadline.setDate(deadline.getDate() + 1)
  }

  deadline.setHours(18, 0, 0, 0)

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now()
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
    setMinutes(Math.floor((time / 1000 / 60) % 60))
    setSeconds(Math.floor((time / 1000) % 60))
  }

  useEffect(() => {
    setInterval(() => getTime(deadline), 1000)
  })

  return (
    <>
      <h2 className='lg:text-3xl font-bold'>Siguiente Tienda {getDayOnTheWeek(deadline)} {new Date(deadline).toLocaleDateString()}</h2>
    <div className=' font-bold m-auto text-center text-green-600 mt-6 flex gap-4 '>
      <div className='flex flex-col'>
        <span className='text-xl md:text-3xl lg:text-5xl  text-center  px-2 py-4 '>{hours < 10 ? `0${hours}` : `${hours}`} </span>
        <span>Horas</span>
      </div>
      <div className='flex flex-col '>
        <span className='text-xl md:text-3xl lg:text-5xl text-center px-2 py-4 '>
        {minutes < 10 ? `0${minutes}` : `${minutes}`}
        </span>
        <span>Minutos</span>

      </div>
      
      <div className='flex flex-col'>
        <span className='text-xl md:text-3xl lg:text-5xl text-center  px-2 py-4 '>
      {seconds < 10 ? `0${seconds}` : `${seconds}`}   
</span>
        <span>Segundos</span>
      </div>
      
      
    </div >
    </>
  )
  
}

export default CountDown
