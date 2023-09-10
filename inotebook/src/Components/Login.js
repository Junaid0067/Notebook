import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

export default function Login(props) {
    const navigate = useNavigate()
    const[credential,setCredential]= useState({email:"",password:""})
    const handleClick = async (e) =>{
        e.preventDefault();
        const url = "https://notebook-1r4s.onrender.com/api/auth/login"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            
            },
            body: JSON.stringify({email: credential.email,password: credential.password})
          });
          const json = await response.json()
          console.log("here", json);
          if(json.success){
              //redirect
              localStorage.setItem('token',json.authToken)
              props.showAlert("Logged in Successfully","success")
              navigate('/')
              
          }else{
              props.showAlert("Invalid credentials","danger")
              
          }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-5 w-50 card p-5'>
            <h4 style={{fontFamily:"sans-serif", backgroundColor:"c5aa6a"}} className='text-center my-3'>Login to continue to iNote</h4>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value = {credential.email} id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value = {credential.password} id="password" name='password' onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>

        </div>
    )
}
