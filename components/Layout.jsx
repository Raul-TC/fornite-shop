import React, { useContext } from 'react'
import ThemeContext from '../context/Theme'

const Container = ({ children }) => {
    const { DarkTheme } = useContext(ThemeContext)
    return (
        <div className={`${DarkTheme ? 'bg-[#2c2c2c] text-white' : 'bg-white text-[#2c2c2c]'} transition-all duration-300 w-full  m-auto h-full flex items-center justify-between`}>
            {children}
        </div>
    )
}

export default Container