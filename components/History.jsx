import React from 'react'
import { useFormatedDate } from '../hooks/useFormatedDate'
import { useShowHistory } from '../hooks/useShowHistory'

const History = ({ item }) => {
  const { showHistory, reversedHistory, handleShowHistory } = useShowHistory(item)
  const { formatedDate, getDays } = useFormatedDate()
  console.log(item)
  return (
    <div>
      {item.shopHistory && item.shopHistory.length >= 1 && <h1 className='text-center font-bold text-2xl md:text-3xl'>Apariciones en Tienda</h1>}
      {
        !item.shopHistory
          ? null
          : item.shopHistory.length > 1
            ? (
              <>
                <span className='block text-center md:text-2xl'>{getDays(reversedHistory[0])}  </span>
                <div className={`flex flex-row justify-center items-center flex-wrap m-auto ${showHistory && reversedHistory.length >= 7 ? 'overflow-y-scroll h-48 scrollHistory' : ''} h-auto w-52 md:w-[320px]`}>
                  <span className='block text-center md:text-xl'>{formatedDate(reversedHistory[1])}  {getDays(reversedHistory[1])} </span>
                  <span className='block text-center md:text-xl'>{formatedDate(reversedHistory[2])}  {getDays(reversedHistory[2])} </span>
                  {
                    showHistory && reversedHistory.slice(3).map(el => <span className='block text-center md:text-xl' key={el}>{formatedDate(el)} {getDays(el)}</span>)
                  }
                </div>
                {item.shopHistory?.length > 3 && <button className=' h-8 font-bold block mt-4 mb-4 rounded-md text-center m-auto md:text-2xl' onClick={handleShowHistory}>{showHistory ? 'Ocultar historial' : 'Ver todo el historial'}</button>}
              </>
              )
            : (
              <>
                {item.shopHistory.length === 1 && <h2 className='font bold text-center md:text-2xl'>Nuevo en Fortnite  </h2>}
                <span className='block text-center'>{getDays(reversedHistory[0])}  </span>
              </>
              )
    }
    </div>
  )
}

export default History
