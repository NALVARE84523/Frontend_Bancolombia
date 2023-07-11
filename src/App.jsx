import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
/* import Login from './pages/LoginDeprecate'; */
import Login from './pages/Login';
/* import Register from './pages/RegisterDeprecate'; */
import Register from './pages/Register';
import TasksProcess from './pages/TasksProcess';
import {ToastContainer} from 'react-toastify';
import './App.css';
import { SkillsProvider } from './context/skills';
import TasksFinalized from './pages/TasksFinalized';

function App() {
  return (
    <>
      <ToastContainer theme='colored'></ToastContainer>
      <BrowserRouter>
      <SkillsProvider>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          {/* <Route path='/register' element={<Register/>}></Route> */}
          <Route path='/' element={<Home/>}></Route>
          <Route path='/tasksProcess' element={<TasksProcess/>}></Route>
          <Route path='/tasksFinalized' element={<TasksFinalized/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </SkillsProvider>
      </BrowserRouter>
    </>
  )
}

export default App
