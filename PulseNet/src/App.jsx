import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import LogMain from './components/LogInSignUpComponents/LogInMainCont'
import SignMainCont from './components/LogInSignUpComponents/SignInMainCont';
import showWelcome from './components/mainPageComponents/trypage';


function App() {
    return (
        <Routes>
            <Route path='/' element = {LogMain()}/>
            <Route path='/LogIn' element = {LogMain()}/>
            <Route path='/signUp' element = {SignMainCont()}/>
            <Route path='/welcome' element = {showWelcome()}/>
        </Routes>
    )
}

export default App
