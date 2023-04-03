import { useCallback } from 'react'

export function useGetDay () {
  const currentDate = new Date().toLocaleDateString()
  const getDay = useCallback((dia) => {
    if (!dia) return '...'

    console.log('me ejecuto')
    const currentDayNow = new Date(dia)
    const day = currentDayNow.getDay()
    const days = {
      0: 'Domingo',
      1: 'Lunes',
      2: 'Martes',
      3: 'Miércoles',
      4: 'Jueves',
      5: 'Viernes',
      6: 'Sábado'
    }

    //   }
    return days[day]
  }, [])

  return { getDay, currentDate }
}
