import React, { useEffect, useState } from 'react'

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
    <div className=' font-bold m-auto text-center'>Siguiente Tienda: <span className='block'>{hours <10 ? `0${hours} horas, ` : `${hours} horas, `} {minutes < 10 ? `0${minutes} minutos, ` : `${minutes} minutos, `} {seconds < 10 ? `0${seconds} segundos` : `${seconds} segundos`}    </span> </div>)
}

export default CountDown
