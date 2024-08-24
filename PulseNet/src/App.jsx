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

/*import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from Laravel API
        axios.get('http://localhost:8000/api/register') // Update URL if necessary
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []); // Empty dependency array means this effect runs once after initial render

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div>
            <h1>Custom Data from Laravel API</h1>
            <ul>
                {data.map(item => (
                  <li>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;*/
