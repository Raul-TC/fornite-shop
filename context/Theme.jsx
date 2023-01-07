import { createContext, useEffect, useState } from 'react'
import { BsTag } from 'react-icons/bs'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [DarkTheme, setDarkTheme] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('theme') === 'true') {
      setDarkTheme(true)
      document.body.classList.add('bg-[#2c2c2c]', 'text-white');
      document.body.classList.remove('bg-white', 'text-[#2c2c2c]');
    } else {
      setDarkTheme(false)
      document.body.classList.remove('bg-[#2c2c2c] text-white');
      document.body.classList.add('bg-white', 'text-[#2c2c2c]');
    }
  }, [])

  const handleTheme = () => {
    if (DarkTheme) {
      setDarkTheme(false)
      localStorage.setItem('theme', false)
      document.body.classList.add('bg-white', 'text-[#2c2c2c]');
      document.body.classList.remove('bg-[#2c2c2c]', 'text-white');
    } else {
      setDarkTheme(true)
      localStorage.setItem('theme', true)
      document.body.classList.add('bg-[#2c2c2c]', 'text-white');
      document.body.classList.remove('bg-white', 'text-[#2c2c2c]');
    }
  }
  const data = { DarkTheme, handleTheme }
  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
}

export { ThemeProvider }
export default ThemeContext
