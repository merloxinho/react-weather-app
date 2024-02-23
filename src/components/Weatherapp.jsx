import React from 'react'
import { useState } from 'react'

const api = import.meta.env.VITE_API;

const Weatherapp = () => {

    const [active, setActive] = useState(false);
    const [error, setError] = useState(false);

    const handleButton = async () => {
        try{
            const city = document.getElementById('user-input').value;
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`);

            if (!response.ok) {
                setActive(false);
                setError(true);
                throw new Error('Weather data not found');
            }

            setActive(true);
            setError(false);


            const data = await response.json();
            let temperature = Math.floor(data.main.temp - 273.15);
            document.getElementById('app-temp').textContent = temperature + '°C';
            document.getElementById('app-humidity').textContent = data.main.humidity + '%';
            document.getElementById('app-weather').textContent = data.weather[0].main;
            document.getElementById('app-city').textContent = data.name;
        } catch (error) {
            console.error('Error fetching weather data: ', error)
        }
    }
  return (
    <div className='z-2 w-screen h-screen flex flex-col align-middle text-center justify-center gap-6'>
        <div className='md:drop-shadow-md flex flex-col gap-4 py-12 px-6 rounded-lg bg-white w-max my-auto mx-auto'>
            <div className='flex gap-2 mx-auto p-4'>
                <input type="text" id="user-input" placeholder='Enter a city' className='w-5/6 placeholder:text-slate-400 border-2 border-slate-700 text-slate-700 focus:outline-none bg-white drop-shadow-md p-2 rounded-lg font-medium' />
                <button onClick={handleButton} className='h-10 rounded-full aspect-square font-medium bg-slate-700 drop-shadow-md text-white'><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className={active ? 'flex flex-col gap-4' : 'hidden'}>
                <div className='aspect-square w-36 flex justify-center align-middle rounded-full m-auto'>
                    <i className="fa-solid fa-cloud-bolt text-slate-700 drop-shadow-lg m-auto text-8xl"></i>
                </div>
                <div className='mt-4'>
                    <h1 id='app-city' className='text-slate-700 font-bold text-5xl'>Polkowice</h1>
                </div>
                <div>
                    <h3 className='font-medium text-2xl text-slate-600'>Temperature</h3>
                    <p id='app-temp' className='text-slate-400'>12 &#8451;</p>
                </div>
                <div>
                    <h3 className='font-medium text-2xl text-slate-600'>Weather</h3>
                    <p id='app-weather' className='text-slate-400 text-sm'>Thunder</p>
                </div>
                <div>
                    <h3 className='font-medium text-2xl text-slate-600'>Humidity</h3>
                    <p id='app-humidity' className='text-slate-400'>64%</p>
                </div>
            </div>
        </div>
        <div className={error ? 'mx-auto top-0 text-center flex justify-center bg-red-500 w-screen h-16 absolute align-middle ease-in-out duration-300' : 'top-[-100%]'}>
            <h1 className='text-white mx-auto my-auto'><span className='font-bold'>Error:</span> City not found</h1>
        </div>
    </div>
  )
}

export default Weatherapp