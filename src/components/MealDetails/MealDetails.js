import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { useParams, Link } from "react-router-dom";
import "./RecipeDetails.css";

const MealDetails = () => {
  const { mealId } = useParams();
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    // Fetch meal details from the MealDB API using the provided mealId
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals && data.meals.length > 0) {
          setMealDetails(data.meals[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching meal details:", error);
      });
  }, [mealId]);

  if (!mealDetails) {
    return <div>Loading...</div>;
  }

  const {
    strMeal,
    strMealThumb,
    strInstructions,
    // Dynamically get all the ingredients
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8
    // Add more ingredients as needed
  } = mealDetails;

  // Create an array with all the ingredients
  const ingredients = [
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8
    // Add more ingredients as needed
  ];

  // Filter out empty ingredient values
  const filteredIngredients = ingredients.filter(Boolean);
  const instructionsList = strInstructions.split("\r\n");

  return (
    <>
      <div>
        <Link to="/">
          <img
            alt="q-logo"
            className="logo"
            src="https://img.freepik.com/free-vector/hand-drawn-let-s-cook-typography_53876-115087.jpg?w=740&t=st=1691158694~exp=1691159294~hmac=9b5fbafb2fafca8bf54f970d62f22f83c36b044cb40fb1220006dce522e7c210"
          />
        </Link>
      </div>
      <div className="meal-details">
        <h2>{strMeal}</h2>
        <img src={strMealThumb} alt={strMeal} />
        <div className="ingredients">
          <h3>Ingredients</h3>
          <ul>
            {filteredIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="instructions">
          <h3>Instructions</h3>
          <ol>
            {instructionsList.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MealDetails;
