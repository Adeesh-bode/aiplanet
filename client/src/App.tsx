import React, { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

import { IoSunnyOutline } from "react-icons/io5";
import { GiNightSleep } from "react-icons/gi";



const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div>
            <button onClick={toggleDarkMode} className='absolute bottom-7 right-7 bg-secondary p-3 rounded-full ' >
                {isDarkMode? <IoSunnyOutline   />: <GiNightSleep  />}
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
