import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../context/Theme';

const CountDown = () => {
    // const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const { DarkTheme } = useContext(ThemeContext)

    const deadline = new Date();

    if (deadline.getHours() >= 18) {
        deadline.setDate(deadline.getDate() + 1);
        window.location.reload()
    }
    deadline.setHours(18, 0, 0, 0);
    // Set time to 11am;

    // console.info(deadline)
    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();

        // setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        setInterval(() => getTime(deadline), 1000);
    }, []);


    return (
        <div className={` ${DarkTheme ? 'text-white' : 'text-[#2c2c2c]'} font-bold m-auto text-center`}>Siguiente Tienda: <span className='block'>      {hours} horas, {minutes} minutos, {seconds} segundos   </span > </div>)
}

export default CountDown