export const KEY_LOGIN = '8f2daefc-37be80bd-53204f5d-1f3c34da'

export const getDayOnTheWeek = (date) => {
    const currentDayNow = new Date(date)
    let day = currentDayNow.getDay()

console.info(currentDayNow.getHours(),'horas')
    if (currentDayNow.getHours() >= 18) {
      day = day
    } else {
      day = day -1 <0 ? day = 6 : day -1
    }
      currentDayNow.setHours(18, 0, 0, 0)


    let dia
console.info(day,'dia')
    console.info(new Date(currentDayNow),'daaay')
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