import { useMemo } from 'react'

export function useGetDay (date) {
  const currentDayNow = new Date(date)
  const day = currentDayNow.getDay()
  const currentDate = currentDayNow.toLocaleDateString()
  const getDay = useMemo(() => {
    const days = {
      0: 'Domingo',
      1: 'Lunes',
      2: 'Martes',
      3: 'Miércoles',
      4: 'Jueves',
      5: 'Viernes',
      6: 'Sábado'
    }

    if (!date && !currentDate) return 'Cargando...'
    return days[day]
  }, [date])

  return { getDay, currentDate }
}
