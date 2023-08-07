import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ setSelectedMeal }) => {
  const [search, setSearch] = useState("");
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  

  const searchMeal = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedMeal(data.meals ? data.meals[0] : null);
      });
  };

  useEffect(() => {
    if (search.trim()) {
      // Fetch autocomplete suggestions from the MealDB API
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.meals) {
            const mealNames = data.meals.map((meal) => meal.strMeal);
            setAutocompleteOptions(mealNames);
          }
        })
        .catch((error) => {
          console.error("Error fetching autocomplete suggestions:", error);
        });
    } else {
      setAutocompleteOptions([]);
    }
  }, [search]);

  const handleKeyPress = (evt) => {
    if (evt.key === "Enter") {
      searchMeal();
    }
  };

  const handleSelectOption = (option) => {
    setSearch(option);
    setAutocompleteOptions([]);
  };

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    setSearch(value);
    if (!value) {
      setSelectedMeal(null); // Reset the selected meal when the search input is empty
      setAutocompleteOptions([]);
    }
  };



  return (
    <div className="nav-container">
      <div className="nav-left">
        <Link to="/">
          <img
            alt="q-logo"
            className="logo"
            src="https://img.freepik.com/free-vector/hand-drawn-let-s-cook-typography_53876-115087.jpg?w=740&t=st=1691158694~exp=1691159294~hmac=9b5fbafb2fafca8bf54f970d62f22f83c36b044cb40fb1220006dce522e7c210"
          />
        </Link>
      </div>
      <div className="nav-right">
        <div className="search-box">
          <button className="btn-search" onClick={searchMeal}>
            <i className="fas fa-search"></i>
          </button>
          <input
            type="text"
            className="input-search"
            placeholder="Search a recipe..."
            onChange={handleInputChange}
            value={search}
            onKeyPress={handleKeyPress}
          />
          {autocompleteOptions.length > 0 && (
            <div className="autocomplete-dropdown">
              {autocompleteOptions.map((option) => (
                <div
                  key={option}
                  className="autocomplete-option"
                  onClick={() => handleSelectOption(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
