import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import Navbar from './NavBar';
import PageLayout from './PageLayout';

function Login({ onLogin  }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isGlowing, setIsGlowing] = useState(false);

  const createAcc = () => {
    navigate('/signup', { state: {logged_in: true}})
  }

  const handleSubmit = async () => {
    try {
    const user = {
      "email": email,
      "password": password
    }

      const response = await axios.post('/api/login', qs.stringify(user))
      console.log(response.data)
      navigate('/recipes', { state: {logged_in: true}})
    } 

    catch (error) {
      console.log(error);
      setError('Invalid username or password.');
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 1000); // 1000ms = 1s
    }
  }

  return (
    <>
    <div className='LoginPage1'>
    <div className="login-container">
        <h2>Login</h2>
        {error && <p className={isGlowing ? 'glow' : ''} style={{ color: 'red' }}>{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="login-button-1">Welcome Back</button>
      <a href="" onClick={createAcc}>Don't have an account? Signup!</a>
    </div>
    </div>
    </>
  )
}

export default Login;