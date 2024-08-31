import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Capitador from './pages/capitador';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Cadastro/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/capitador' element={<Capitador/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


