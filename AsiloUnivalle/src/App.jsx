import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegisterForm from './Views/SingUp/SingUpAsilo'

import { BrowserRouter } from 'react-router-dom';
import Routing from './components/Routes/routing'
import Login from './Views/Login/Login';

import './index.css'; 

function App() {
  return (
    <BrowserRouter>
     
      <Routing />
     
    </BrowserRouter>
  );
}

export default App;
