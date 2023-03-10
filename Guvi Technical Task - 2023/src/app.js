import logo from './assets/logo.svg';

import './app.css';
import Header from './jsx/header';
import Home from './jsx/home';
import Dashboard from './jsx/dashboard';
import Login from './jsx/login';
import Register from './jsx/register';
import Profile from './jsx/profile';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'; 
function App() {
  return (
     <Router>
  <div className='container'>
      <Header/>
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/register" element={<Register/>} />
         <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/Profile" element={<Profile/>} />
      </Routes>
  </div>
  </Router>
  );
}

export default App;
