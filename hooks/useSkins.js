import { useEffect, useState } from 'react'

export function useGetSkins (shop) {
  const [skins, setSkins] = useState(null)

  useEffect(() => {
    const dataFiltered = {}
    const categories = [...new Set(shop.map((section) => section.section.name))]
    categories.forEach(el => {
      el === null || el === '' || el === false ? dataFiltered.Destacados = [] : dataFiltered[el] = []
    })

    shop.forEach(item => {
      if (dataFiltered[item.section.name] === '' || dataFiltered[item.section.name] === undefined || dataFiltered[item.section.name] === null) {
        dataFiltered.Destacados.push({
          ...item
        })
      } else {
        dataFiltered[item.section.name].push({
          ...item
        })
      }
    })
    const arr = []

    Object.entries(dataFiltered).forEach(([key, value]) => {
      arr.push({ section: key, data: value })
    })

    setSkins(arr)
  }, [shop])

  return { skins }
}
