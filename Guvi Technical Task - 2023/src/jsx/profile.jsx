import React, { useState } from "react";
import $ from 'jquery';
import MetamaskLogo from "./../js/MetamaskLogo";
import './../css/profile.css';

const Profile = (props) => {

  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
    age: ""
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const submitForm = (e) => {
    e.preventDefault();
    const sendData = {
      name: data.name,
      email: data.email,
      contact: data.contact,
      dob: data.dob,
      age: data.age,
    }

    $.ajax({
        url: "http://localhost/php-react/register-login-php-simple/Profile.php",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            if (result.data.status === 'valid') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('name', data.name);
                localStorage.setItem('email', data.email);
                window.location.href = "/dashboard";
            } else {
                alert('Invalid User');
            }
        }
    });
  }

  return (
    <div className="main-box">
      <MetamaskLogo />
      <form  onSubmit={submitForm}>
        <div className="row">
         <div className="col-md-12 text-center"><h1>User Profile</h1></div>
        </div>
            <div className="row">
                <div className="col-md-6">Name</div>
                <div className="col-md-6">
                    <input type="text" name="name" className="form-control"
                    onChange={handleChange} value={data.name}
                     />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">Email</div>
                <div className="col-md-6">
                    <input type="email" name="email" className="form-control"
                     onChange={handleChange} value={data.email}
                     />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">Contact</div>
                <div className="col-md-6">
                    <input type="text" name="contact" className="form-control" 
                        onChange={handleChange} value={data.contact}
                    />
                </div>
            </div>



            <div className="row">
                <div className="col-md-6">DOB</div>
                <div className="col-md-6">
                    <input type="text" name="dob" className="form-control" 
                         onChange={handleChange} value={data.dob}

                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">Age</div>
                <div className="col-md-6">
                    <input type="age" name="age" className="form-control" 
                         onChange={handleChange} value={data.age}

                    />
                </div>
            </div>

            <div className="row">
              
                <div className="col-md-12 text-cener">
                    <input type="submit" name="submit" value="Submit" className="btn btn-success" />
                </div>
            </div>
            </form>
        </div>
  )
}

export default Profile;