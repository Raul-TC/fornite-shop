import { useMemo } from 'react'

export function useGetDay (date) {
  console.info(date, 'DADADD')

  // if(!date) return
  const currentDayNow = new Date(date)
  const day = currentDayNow.getDay()
  const currentDate = currentDayNow.toLocaleDateString()
  const getDay = useMemo(() => {
    let dia
    console.info(day, 'dia')
    switch (day) {
      case 0:
        dia = 'Domingo'
        break
      case 1:
        dia = 'Lunes'
        break
      case 2:
        dia = 'Martes'
        break
      case 3:
        dia = 'Miércoles'
        break
      case 4:
        dia = 'Jueves'
        break
      case 5:
        dia = 'Viernes'
        break
      case 6:
        dia = 'Sábado'
        break
      default:
        break
    }
    return dia
  }, [date])

  return { getDay, currentDate }
}
