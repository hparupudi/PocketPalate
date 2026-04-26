import React from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css';

function Navbar() {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/login');
      };
  return (
    <header>
        <a href="/">
        <img className="logo" src="newLogo2.png" alt="Pocket Palate Logo"/>
        </a>
        <nav>
            <a href="/recipes">Generate</a>
            <a href="/">Pricing</a>
        </nav>
        <button class="login-button" onClick={handleSubmit}>Log In</button>
    </header>
  );
}

export default Navbar;