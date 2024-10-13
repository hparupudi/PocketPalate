import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import PageLayout from './PageLayout';

function LandingPage() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phrases = [
    "Generate a recipe for classic margherita pizza",
    "Generate a recipe for spicy garlic shrimp pasta",
    "Generate a recipe for chicken tikka masala"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 2000); // Change phrase every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/login');
  };

  const recipeNav = () => {
    navigate('/recipes');
  };

  return (
    <div className="landing-page">
      <PageLayout navbar={<Navbar />}></PageLayout>
      <div className="landing-page">
        <h1 className="h1-text">Your Personalized AI Chef</h1>
        <h2 className="changing-text">{phrases[phraseIndex]}</h2>
        <button className="get-started-button" onClick={recipeNav}>Get Started</button>
        <h2> Discover Recipes You Love </h2>
        <div className="food-images">
          <div className="scroll-container">
            <img src="image.png" alt="Food Image 1" />
            <img src="image1.png" alt="Food Image 2" />
            <img src="image2.png" alt="Food Image 3" />
            <img src="image3.jpg" alt="Food Image 4" />
            <img src="image4.jpg" alt="Food Image 5" />
            <img src="image5.jpg" alt="Food Image 6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
