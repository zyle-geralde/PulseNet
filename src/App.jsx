import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LogInCont from './components/LogInSignUpComponents/LogInCont'
import LogInImageCont from './components/LogInSignUpComponents/LogInImageCont'


function App() {
    return(
        <>
            <LogInImageCont></LogInImageCont>
            <LogInCont></LogInCont>
        </>
    )
}

export default App
