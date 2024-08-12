import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import LogMain from './components/LogInSignUpComponents/LogInMainCont'
import SignMainCont from './components/LogInSignUpComponents/SignInMainCont';


function App() {
    return (
        <Routes>
            <Route path='/' element = {LogMain()}/>
            <Route path='/LogIn' element = {LogMain()}/>
            <Route path='/SignUp' element = {SignMainCont()}/>
        </Routes>
    )
}

export default App
