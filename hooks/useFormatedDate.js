import { useCallback } from 'react'

export function useFormatedDate () {
  const formatedDate = useCallback(

    (date) => {
      if (!date) return 'Cargando...'
      const formatedDate = typeof date === 'string' ? date.replace('-', ',') : date
      const today = date ? new Date(formatedDate) : new Date()
      const day = today.getDate().toString()
      const month = (today.getMonth() + 1).toString()
      const year = today.getFullYear().toString()
      const finalDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`

      return finalDate
    },
    []
  )
  const getDays = useCallback(
    (date) => {
      if (!date) return 'Cargando...'
      const fechaInicio = new Date().getTime()
      const fechaFin = new Date(date).getTime()
      const diff = (fechaInicio - fechaFin)
      const tiempo = Math.abs(Math.trunc((diff / (1000 * 60 * 60 * 24))))
      return tiempo
    }, [])

  return { formatedDate, getDays }
}
