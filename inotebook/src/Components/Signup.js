import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const navigate = useNavigate()
  const[credential,setCredential]= useState({name:"",email:"",password:"",cpassword:""})

  const handleClick = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/api/auth/createuser"
    // const {name,email,password} = credential
    const response = await fetch(url, {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name:credential.name, email: credential.email, password: credential.password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //redirect
      localStorage.setItem('token', json.authToken)
      navigate('/')
      props.showAlert("Account created successfully","success")
    }else{
      props.showAlert("Invalid credentials","danger")
    }
  }

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }


  return (
    <div className='container my-5 w-50'>
      <h4 style={{fontFamily:"sans-serif", backgroundColor:"c5aa6a"}} className='text-center my-3'>Not regsitred? Signup Now</h4>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="Username" className="form-label">Username</label>
          <input type="text" className="form-control" id="Username" name='name' onChange={onChange}/>
        </div>
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
