import { useEffect, useState } from 'react'

export function useTheme () {
  const [darkTheme, setDarkTheme] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('theme') === 'true') {
      setDarkTheme(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkTheme(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const handleTheme = () => {
    console.info('me ejecuto')
    if (darkTheme) {
      setDarkTheme(false)
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', false)
    } else {
      setDarkTheme(true)
      localStorage.setItem('theme', true)
      document.documentElement.classList.add('dark')
    }
  }

  return { darkTheme, handleTheme }
}
