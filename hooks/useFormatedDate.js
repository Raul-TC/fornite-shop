import { useCallback, useMemo } from 'react'

export function useFormatedDate (date) {
  const formatedDate = useMemo(
    () => {
      const formatedDate = typeof date === 'string' ? date.replace('-', ',') : date
      const today = date ? new Date(formatedDate) : new Date()
      const day = today.getDate().toString()
      const month = (today.getMonth() + 1).toString()
      const year = today.getFullYear().toString()
      const finalDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`
      console.log(finalDate)
      return finalDate
    },
    [date]
  )

  const getDays = useMemo(() => {
    if (!date) return
    console.log(date)
    const fechaInicio = new Date().getTime()
    const fechaFin = new Date(date).getTime()
    const diff = (fechaInicio - fechaFin)
    const tiempo = Math.abs(Math.trunc((diff / (1000 * 60 * 60 * 24))))
    const daysOrHours = tiempo > 0 ? <span> hace <span className={tiempo >= 365 ? 'text-red-500' : 'text-yellow-500'}>{tiempo}</span> {tiempo === 1 ? 'día' : 'días'}</span> : <span className='text-green-500'>¡En la Tienda Ahora!</span>
    console.log(daysOrHours)
    return daysOrHours
  }, [date])
  console.log(formatedDate)
  return { finalDate: formatedDate, days: getDays }
}
