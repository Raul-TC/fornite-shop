// import { useMemo } from 'react'
// import { useFormatedDate } from './useFormatedDate'

// export function useGetHistory (history) {
//   console.log(history)
//   const { formatedDate } = useFormatedDate(history)

//   const getAll = useMemo(() => {
//     const arr = []
//     history.slice(3).forEach(el => {
//       arr.push(formatedDate(el))
//     })
//     return arr
//   }, [history, formatedDate])

//   return { fullHistory: getAll }
// }
