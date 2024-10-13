import React, { useState } from 'react';
import axios from 'axios';
// import { FaStar } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';


import Navbar from './NavBar';
import PageLayout from './PageLayout';
import { MdDensityMedium } from 'react-icons/md';

function Recipes() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const [post, setPost] = useState(null)
  const [showSpinner, setShowSpinner] = useState(false);

  let [prompt, setPrompt] = useState("");
  const [recipes, setRecipes] = useState("");

  const[recipeName, setRecipeName] = useState("")
  const[ingredients, setIngredients] = useState([])
  const [steps, setSteps] = useState([])

  const [calories, setCalories] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [protein, setProtein] = useState(0)
  const [fat, setFat] = useState(0);

  const [rating, setRating] = useState(null);

  const[displayRating, setDisplayRating] = useState(false)

  const [values, setValues] = useState({
    red: 0,
    green: 0,
    blue: 0
  })

  const [color, setColor] = useState({
    menu1: ['grey', 'grey', 'grey', 'grey'],
    menu2: ['grey', 'grey', 'grey', 'grey']});

  const [health, setHealth] = useState("");

  const prepOptions = ["15-30 min", "30-60 min", "1-2 hours", "2+ hours"]
  const dietOptions = ["Vegetarian", "Vegan", "Nut-Free", "Gluten-Free"]

  const handleClick = async (index, menu) => {
    const newColor = [...menu];
    const menu_val = Object.keys(color).find(key => color[key] === menu)
    if (menu[index] == "grey")  {
      newColor[index] = "blue"
      setColor(currState => ({
        ...currState,
        [menu_val]: newColor
      }));
    }
    else {
      newColor[index] ='grey';
      setColor(currState => ({
        ...currState,
        [menu_val]: newColor
      }));
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSpinner(true);
      handleSubmit();
    }
  };

  const loginNav = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    const logout_response = await axios.get('/api/logout')
    console.log(logout_response.data)
    navigate('/');
  };

  const handleSubmit = async () => {

     setRecipeName("")
     setIngredients([])
     setSteps([])
     setRating(null)
     setDisplayRating(false)
     setIsChecked(false)

     let cookTime = "Total cooking time should take ";
     let diet = "The recipe should only contain ingredients that are "
     let counters = [0, 0];
     const health_start = "The recipe should only use ingredients that a person with "
     const health_end = " can eat."

     for (let i = 0; i < 4; i++) {
        if (color.menu1[i] == 'blue') {
          cookTime += prepOptions[1] + " ";
          counters[0] = counters[0] + 1;
        }

        if (color.menu2[i] == 'blue') {
          diet += dietOptions[i] + " ";
          counters[1] = counters[1] + 1;
        }
     }

     try {

      if (counters[0] > 0) {
        prompt += cookTime;
      }

      if (counters[1] > 0) {
        prompt += diet;
      }

      prompt = prompt + health_start + health + health_end;
      console.log(prompt)
      const response = await axios.post('/api/recipes', { prompt })
      console.log(response)
      
      setRecipes(response.data)
      setPost(response.data)
      setShowSpinner(false)

      const recipe_lines = String(response.data).toLowerCase();

      const recipeStart = recipe_lines.indexOf('name: ') + 5;
      const recipeEnd = recipe_lines.indexOf('ingredients:')
      const recipeName = recipe_lines.slice(recipeStart, recipeEnd)
      let newRecipeName = "";

      for (let i = 1; i < recipeName.length; i++) {
        if (recipeName.charAt(i-1) === (" ")) {
          newRecipeName = newRecipeName + 
          recipeName.charAt(i-1) + recipeName.charAt(i).toUpperCase();
        }
        else {
          newRecipeName += recipeName.charAt(i);
        }
      }
    
      setRecipeName(newRecipeName)
      
      const ingredientsStart = recipe_lines.indexOf('ingredients:') + 12;
      const ingredientsEnd = recipe_lines.indexOf('steps:')
      const ingredients = recipe_lines.slice(ingredientsStart, ingredientsEnd)
      const ingredientsArray = ingredients.split('-').filter(item => item.trim())
      .map(item => item.trim())
      .map(item => item.charAt(0).toUpperCase() + item.slice(1))

      setIngredients(ingredientsArray)

      const stepsStart = recipe_lines.indexOf('steps:') + 6;
      const stepsEnd = recipe_lines.indexOf('nutrition');
      const steps = recipe_lines.slice(stepsStart, stepsEnd);
      const stepsArray = steps
        .split(/\d+\.\s*/)
        .filter(step => step.trim())
        .map(step => step.trim())
        .map(item => item.charAt(0).toUpperCase() + item.slice(1))
      setSteps(stepsArray);


      console.log(recipe_lines)
      let nutritionStart = ""
      if (recipe_lines.includes("nutrition info")) {
        nutritionStart = recipe_lines.indexOf('nutrition info:') + 15;
      }
      else {
        nutritionStart = recipe_lines.indexOf('nutrition:') + 10;
      }
      const nutrition = recipe_lines.slice(nutritionStart, recipe_lines.length)

      const calStart = nutrition.indexOf('calories') + 9;
      const calEnd = nutrition.indexOf('carbohydrates')
      const calories = nutrition.slice(calStart, calEnd);
      setCalories(calories);

      const carbStart = nutrition.indexOf('carbohydrates') + 14;
      const carbEnd = nutrition.indexOf('g\nprotein')
      const carbs = nutrition.slice(carbStart, carbEnd);
      setCarbs(carbs);

      const proteinStart = nutrition.indexOf('protein') + 8;
      const proteinEnd = nutrition.indexOf('g\nfats')
      const protein = nutrition.slice(proteinStart, proteinEnd);
      setProtein(protein);

      const fatStart = nutrition.indexOf('fats') + 5;
      const fat = nutrition.slice(fatStart);
      setFat(fat);

      setDisplayRating(true)
      console.log(nutrition)
      console.log(calories)
      console.log(carbs)
      console.log(protein)
      console.log(fat)

      values.red = carbs / calories * 360;
      values.blue = protein / calories * 360;
      values.green = 360 - values.red - values.blue;

     }

     catch (error) {
      console.log("error:", error)
     }
  }

  const gradient = `conic-gradient(
    red 0deg ${values.red}deg,
    green ${values.red}deg ${values.red + values.green}deg,
    blue ${values.red + values.green}deg 360deg
  )`;

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    if(!isChecked){
      setIsChecked(true);
    }
    const email = axios.get('/api/save')
    console.log(email.data);
  };

  return (
    <div>
   <header>
        <a href="/">
          <img className="logo" src="newLogo2.png" alt="Pocket Palate Logo"/>
        </a>
        <nav>
            <a href="/recipes">Generate</a>
            <a href="/">Pricing</a>
        </nav>
        {(!state || state.logged_in === false) && (
        <button className="login-button" onClick={loginNav}>Log In</button>
      )}
         {state && state.logged_in === true && (
        <button className="login-button" onClick={handleLogout}>Log Out</button>
        )}
      </header>
      <h1 className="big-text">What do you want to make today?</h1>
      <input
        className="input-box"
        placeholder="Enter recipe"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Popup trigger={
      <button className="edit-button"><img className="edit" src="edit.png"></img></button>}
      modal nested>
      {
        close => (
          <div className='modal'>
            <div className='content'>
              <h1>Enter your preferences.</h1>
              <h3>Cooking Time</h3>
              <ul>
              {prepOptions.map((option, index) => (
                <div className="button-display">
                <li key={index} className="listItem">
                <button style={{"backgroundColor": color.menu1[index]}}onClick={() => handleClick(index, color.menu1)} className="option-button">{option}</button>
                </li>
                </div>))}

              </ul>
              <h3>Dietary Preferences</h3>
              <ul>

                {dietOptions.map((option, index) => (
                <div className="button-display">
                <li key={index} className="listItem">
                <button style={{"backgroundColor": color.menu2[index]}} onClick={() => handleClick(index, color.menu2)} className="option-button">{option}</button>
                </li>
                </div>))}

              </ul>
              <h3>Health Conditions</h3>
              <input 
              className="health-input" 
              type="text" 
              placeholder="Eg. High cholesterol, diabetes, etc"
              value={health}
              onChange={e => setHealth(e.target.value)}>
              </input>
            </div>
            <div>
              <button className="login-button"onClick={() => close()}>
              Done
              </button>
            </div>
          </div>
        )
      }
      </Popup>
    <div>
      {showSpinner && 
      <div>
      <p>Creating delicious recipe...</p>
      <RotatingLines
        height={80}
        width={80}
        strokeColor="#CA6566"
        ariaLabel="oval-loading"
        secondaryColor="#CA6566"
        strokeWidth={2}
        strokeWidthSecondary={2}
        visible={true}/>
        </div>}
      </div>
     
      <div className="container">
      {recipeName && <div className="recipe-details">
        <h1>{recipeName}</h1>
        {displayRating && <h2>Ingredients</h2>}
        <ul>
          {ingredients.map((ingredient, index) => (
            <li className="listItem" key={index}>
              <div className="recipe-display">
              <input type="checkbox"/>
              <p className="ingredient">{ingredient}</p>
              </div>
            </li>
          ))}
        </ul>
        {displayRating && <h2>Steps</h2>}
        <ol>
          {steps.map((step, index) => (
            <li className="orderedList" key={index}>{step}</li>
          ))}
        </ol>
        {displayRating && <div className="heart-checkbox-container">
        <label className="heart-checkbox">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
          />
          <span className={`heart ${isChecked ? 'checked' : ''}`}></span>
          <span className="label">Save Recipe</span>
        </label>
      </div>}
      </div>}

      {recipeName && <div className="circle" style={{background: gradient}}>
        <div className='inner-circle'>
          <div className='text-container'>
            <h2>{calories} Calories</h2>
            <p style={{color:'red'}}>{carbs}g Carbs</p>
            <p style={{color:'blue'}}>{protein}g Protein</p>
            <p style={{color:'green'}}>{fat} fat</p>
          </div>
        </div>
      </div>}
      </div>
    </div>
  );
}


export default Recipes;
