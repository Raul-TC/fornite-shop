import React from 'react'
import Date from './Date'
import { useShowHistory } from '../hooks/useShowHistory'
import { useFormatedDate } from '../hooks/useFormatedDate'

const History = ({ item }) => {
  const { showHistory, reversedHistory, handleShowHistory } = useShowHistory(item)
  const { formatedDate, getDays } = useFormatedDate()

  return (
    <div>
      {item.shopHistory && item.shopHistory.length >= 1 && <h1 className='text-center font-bold text-2xl md:text-3xl'>Apariciones en Tienda</h1>}
      {
        !item.shopHistory
          ? null
          : item.shopHistory.length > 1
            ? (
              <>
                <Date days={getDays(reversedHistory[0])} />
                <div className={`flex flex-row justify-center items-center flex-wrap m-auto text-center ${showHistory && reversedHistory.length >= 7 ? 'overflow-y-scroll h-48 scrollHistory' : ''} h-auto w-[260px] md:w-[280px]`}>
                  {item.shopHistory.length === 2
                    ? <Date fullDate={formatedDate(reversedHistory[1])} days={getDays(reversedHistory[1])} />
                    : (
                      <>
                        <Date fullDate={formatedDate(reversedHistory[1])} days={getDays(reversedHistory[1])} />
                        <Date fullDate={formatedDate(reversedHistory[2])} days={getDays(reversedHistory[2])} />
                        {
                       showHistory && reversedHistory.slice(3).map(el =>
                         <Date key={el} fullDate={formatedDate(el)} days={getDays(el)} />
                       )
                      }
                      </>
                      )}
                </div>
                {item.shopHistory?.length > 3 && <button className=' h-8 font-bold block mt-4 mb-4 rounded-md text-center m-auto md:text-2xl' onClick={handleShowHistory}>{showHistory ? 'Ocultar historial' : 'Ver todo el historial'}</button>}
              </>
              )
            : (
              <>
                <h2 className='font bold text-center md:text-2xl'>Nuevo en Fortnite</h2>
                <Date days={reversedHistory[0]} />
              </>
              )
    }
    </div>
  )
}

export default History
