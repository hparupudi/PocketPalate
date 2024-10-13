import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage.js'
import Recipes from './components/Recipes.js'
import Signup from './components/Signup.js'
import Login from './components/Login.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/recipes" element={<Recipes/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}


export default App;
