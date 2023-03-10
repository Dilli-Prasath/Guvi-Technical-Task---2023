import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes,Route,Link,useNavigate } from 'react-router-dom';

const Header=()=>{

  const [user,setUser]=useState('');
  let navigate = useNavigate(); // Use for Navigate on Previous
  useEffect(()=>{
    var userName = localStorage.getItem('userName');
    setUser(userName);
  },
  [])
  
  const LogOut = ()=>{
    localStorage.removeItem('email');
    localStorage.clear();
    navigate(`/login`);
  }
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to="/"  class="nav-link active">Home</Link>
        </li>
        <li class="nav-item">
        <Link to="/register"  class="nav-link active">Register</Link>
        </li>
        <li class="nav-item">
        <Link to="/login"  class="nav-link active">Login</Link>
        </li>
        <li class="nav-item">
        <Link to="/profile"  class="nav-link active">Profile</Link>
        </li>
      </ul>
      <span class="navbar-text">
      Welcome:  {user} |  <Link to='' onClick={LogOut}>LogOut</Link> 
      
      </span>
    </div>
  </div>
</nav>
    )
}

export default Header;