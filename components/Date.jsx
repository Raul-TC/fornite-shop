import React from 'react'

const Date = ({ fullDate, days }) => {
  const dayOrDays = days === 1 ? 'hace 1 día' : `hace ${days} días`
  return (
    <>
      {!fullDate
        ? <span className='block text-center md:text-2xl text-green-500'>¡En la Tienda Ahora!  </span>
        : <span className={`block w-full text-center text-lg  md:text-xl ${days > 1 && days <= 365 ? 'text-orange-500' : 'text-red-500'}`}>{fullDate} - <span className='text-base'>{dayOrDays}</span> </span>}

    </>
  )
}

export default Date
