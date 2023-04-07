import React, { useCallback } from 'react'

const useFormatedDate = () => {
  const formatedDate = useCallback(
    (date) => {
      if (!date) return 'Cargando...'

      const formatedDate = typeof date === 'string' ? date.replace('-', ',') : date
      const today = date ? new Date(formatedDate) : new Date()
      const day = today.getDate().toString()
      const month = (today.getMonth() + 1).toString()
      const year = today.getFullYear().toString()
      const finalDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`
      // const finalDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
      console.log(finalDate)
      return finalDate
    },
    []
  )
  const getDays =
    (date) => {
      if (!date) return 'Cargando...'
      const fechaInicio = new Date().getTime()
      const fechaFin = new Date(date).getTime()
      const diff = (fechaInicio - fechaFin)
      const tiempo = Math.abs(Math.trunc((diff / (1000 * 60 * 60 * 24))))
      console.log(fechaInicio)
      const daysOrHours = tiempo > 0 ? <span> hace <span className={`${tiempo >= 365 ? 'text-red-500' : ''} ${tiempo === 1 ? 'text-green-500' : ''} ${tiempo > 1 && tiempo < 365 ? 'text-orange-300' : ''}`}>{tiempo}</span> {tiempo === 1 ? 'día' : 'días'}</span> : <span className='text-green-500'>¡En la Tienda Ahora!</span>

      // const daysOrHours = tiempo > 0 ? <span> hace <span className={`${tiempo >= 365 ? 'text-red-500' : ''} ${tiempo === 1 ? 'text-green-500' : ''} ${tiempo > 1 && tiempo < 365 ? 'text-orange-300' : ''}`}>{tiempo}</span> {tiempo === 1 ? 'día' : 'días'}</span> : <span className='text-green-500'>¡En la Tienda Ahora!</span>
      return tiempo
    }

  return { formatedDate, getDays }
}

export default useFormatedDate
