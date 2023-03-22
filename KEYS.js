export const KEY_LOGIN = '8f2daefc-37be80bd-53204f5d-1f3c34da'

export const getDayOnTheWeek = (date) => {
  const currentDayNow = new Date(date)
  const day = currentDayNow.getDay()

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
}
