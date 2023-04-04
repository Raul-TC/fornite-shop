import React, { useCallback } from 'react'

const useCountDays = () => {
  const getDays =
    (date) => {
      if (!date) return 'Cargando...'
      const fechaInicio = new Date().getTime()
      const fechaFin = new Date(date).getTime()
      const diff = (fechaInicio - fechaFin)
      const tiempo = Math.abs(Math.trunc((diff / (1000 * 60 * 60 * 24))))
      const daysOrHours = tiempo > 0 ? <span> hace <span className={`${tiempo >= 365 ? 'text-red-500' : ''} ${tiempo === 1 ? 'text-green-500' : ''} ${tiempo > 1 && tiempo < 365 ? 'text-orange-300' : ''}`}>{tiempo}</span> {tiempo === 1 ? 'día' : 'días'}</span> : <span className='text-green-500'>¡En la Tienda Ahora!</span>
      return daysOrHours
    }

  return { getDays }
}

export default useCountDays
