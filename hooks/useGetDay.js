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
    // switch (day) {
    //   case 0:
    //     dia = 'Domingo'
    //     break
    //   case 1:
    //     dia = 'Lunes'
    //     break
    //   case 2:
    //     dia = 'Martes'
    //     break
    //     case 3:
    //     dia = 'Miércoles'
    //     break
    //   case 4:
    //     dia = 'Jueves'
    //     break
    //     case 5:
    //       dia = 'Viernes'
    //       break
    //       case 6:
    //         dia = 'Sábado'
    //         break
    //         default:
    //     break
    //   }
    if (!date && !currentDate) return 'Cargando...'
    return days[day]
  }, [date])

  return { getDay, currentDate }
}
