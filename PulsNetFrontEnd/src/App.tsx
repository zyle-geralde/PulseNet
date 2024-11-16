import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { Suspense } from 'react';

//when you import a components, it will consume a significant portion of size.
//Lazy allows you to load components only when needed to reduce the size consumed
const LogIn = React.lazy(() => import('./LogInAndRegistration/pages/logInPage'));
const SignUpPage = React.lazy(() => import('./LogInAndRegistration/pages/signUpPage'));

function App() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/signUp' element={<SignUpPage/>}/>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
