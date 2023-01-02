import { createContext, useEffect, useState } from 'react'
import { BsTag } from 'react-icons/bs'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [DarkTheme, setDarkTheme] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('theme') === 'true') {
      setDarkTheme(true)
      document.body.classList.add('bg-[#2c2c2c]');
      document.body.classList.remove('bg-white');
    } else {
      setDarkTheme(false)
      document.body.classList.remove('bg-[#2c2c2c]');
      document.body.classList.add('bg-white');
    }
  }, [])

  const handleTheme = () => {
    if (DarkTheme) {
      setDarkTheme(false)
      localStorage.setItem('theme', false)
      document.body.classList.add('bg-white');
      document.body.classList.remove('bg-[#2c2c2c]');
    } else {
      setDarkTheme(true)
      localStorage.setItem('theme', true)
      document.body.classList.add('bg-[#2c2c2c]');
      document.body.classList.remove('bg-white');
    }
  }
  const data = { DarkTheme, handleTheme }
  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
}

export { ThemeProvider }
export default ThemeContext
