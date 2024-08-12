import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import LogMain from './components/LogInSignUpComponents/LogInMainCont'


function App() {
    return (
        <Routes>
            <Route path='/' element = {LogMain()}/>
            <Route path='/LogIn' element = {LogMain()}/>
        </Routes>
    )
}

export default App
