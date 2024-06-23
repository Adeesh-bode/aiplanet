import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

import { IoSunnyOutline } from "react-icons/io5";
import { GiNightSleep } from "react-icons/gi";
import { useAppContext } from './utils/AppContext';

const App: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useAppContext();   

    return (
        <div>
            <button onClick={toggleDarkMode} className=' absolute bottom-20 md:bottom-6 right-3 bg-primary p-3 rounded-full text-white '>
                {isDarkMode ? <IoSunnyOutline size={35} className='h-5 w-5 md:h-full ' /> : <GiNightSleep size={35} className='h-5 w-5 md:h-full ' />}
            </button>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
