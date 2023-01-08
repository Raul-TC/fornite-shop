import { createContext, useEffect, useState } from 'react'
import { BsTag } from 'react-icons/bs'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [DarkTheme, setDarkTheme] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('theme') === 'true') {
      setDarkTheme(true)
    } else {
      setDarkTheme(false)
    }
  }, [])

  const handleTheme = () => {
    if (DarkTheme) {
      setDarkTheme(false)
      localStorage.setItem('theme', false)
    } else {
      setDarkTheme(true)
      localStorage.setItem('theme', true)
    }
  }
  const data = { DarkTheme, handleTheme }
  console.info(DarkTheme)
  return <ThemeContext.Provider value={data}>
    {/* <div className={DarkTheme ? 'bg-black text-red-400' : 'bg-white text-[#2c2c2c]'}> */}
    {children}
    {/* </div> */}
  </ThemeContext.Provider>
}

export { ThemeProvider }
export default ThemeContext
