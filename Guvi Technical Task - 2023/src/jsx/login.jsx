import React, { useState } from 'react';
import $ from 'jquery';

//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../css/login.css';
import MetamaskLogo from './../js/MetamaskLogo'; // Import the MetamaskLogo component

const Login = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    $.ajax({
      url: 'http://localhost/php-react/register-login-php-simple/login.php',
      method: 'post',
      data: user,
      success: function (result) {
        if (result.Status === '200') {
          window.localStorage.setItem('email', result.email);
          window.localStorage.setItem(
            'userName',
            result.first_name + ' ' + result.first_name
          );
          navigate(`/dashboard`);
        } else {
          alert('Invalid User');
        }
      },
      error: function () {
        alert('Error occurred!');
      },
    });
  };

  return (
    <div className="main-box">
      <div className="row">
        <div className="col-md-12 text-center">
          <h1>Login Page</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">Email:</div>
        <div className="col-md-6">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={user.email}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">Password:</div>
        <div className="col-md-6">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={user.password}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          <button
            className="btn btn-success"
            onClick={handleLogin} >
            Please Login
          </button>
        </div>
      </div>
      <MetamaskLogo />
    </div>
  );
};

export default Login;
