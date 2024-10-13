import React, { useState } from 'react'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import Navbar from './NavBar';
import PageLayout from './PageLayout';

function Signup() {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async () => {
    const user = {
      "name": name,
      "email": email,
      "password": password
    }

    try {
      const response = await axios.post('/api/signup', qs.stringify(user))
      console.log(response.data)
      if (!(response.data.error)) {
        navigate('/login')
      }
    } 

    catch (error) {
      console.log("error", error.response.data)
    }
  }

  return (
    <>
    <PageLayout navbar={<Navbar />}></PageLayout>
    <div className='signup-container'> 
        <h2>Create your account to get started! </h2>
        <div className='form-group'><input placeholder="Name"
        value={name} onChange={(e) => setName(e.target.value)}/></div>
        <div className='form-group'><input className="email-input" placeholder="Email" type="email"
        value={email} onChange={(e) => setEmail(e.target.value)}/></div>
        <div className='form-group'><input className="email-input" placeholder="Password" type="password"
        value={password} onChange={(e) => setPassword(e.target.value)}/></div>
        <button onClick={handleSubmit} type='submit' className="login-button">Submit</button>
    </div>
    </>
  )
}

export default Signup;