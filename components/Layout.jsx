import React from 'react'

const Container = ({ children }) => {
  return (
    <div className='dark:bg-background-black dark:text-gray-100 bg-gray-100 text-background-black w-full m-auto h-full flex items-center justify-between'>
      {children}
    </div>
  )
}

export default Container
