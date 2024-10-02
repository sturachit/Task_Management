import React from 'react';
import Login from './Pages/Login';
import Register from './Pages/Registration';
import { Route, Routes } from 'react-router-dom';
import UserTask from './Task Management/UserTask';
import Category from './Task Management/Category';
import Admin from './Task Management/Admin';

export default function App() {
  return (
    <div>
      <Routes>
     <Route path='/' element={<Register/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='/task' element={<UserTask/>}/>
     <Route path='/category' element={<Category/>}/>
     <Route path='/admin' element={<Admin/>}/>


      </Routes>
    
    </div>
  )
}