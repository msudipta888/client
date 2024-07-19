import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Regis from '../pages/Regis.js';
import Login from '../pages/Login.js';
import TodoApp from '../pages/TodoApp.js';
import PrivateRoute from '../pages/PrivateRoute.js';
import Logout from '../pages/Logout.js';
const Router = () => {
  const [userEmail,setUserEmail] =useState('');
  return (
    <div>
    <Routes>
    <Route path='/register' element={<Regis/>}/>
    <Route path="/login" element={<Login setUserEmail={setUserEmail}/>}/>
    <Route path="/" element={<PrivateRoute><TodoApp/></PrivateRoute>} /> 
    <Route path='/logout' element={<Logout email={userEmail}/>}/>
    </Routes>
    </div>
  )
}

export default Router
