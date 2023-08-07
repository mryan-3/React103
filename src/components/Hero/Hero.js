import React, { useEffect, useState } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper/core";

// Import Swiper styles if you haven't done that already
import "swiper/swiper-bundle.css";

SwiperCore.use([Pagination, Navigation]);

const Hero = ({ selectedMeal }) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (selectedMeal) {
      setMeals([selectedMeal]);
    } else {
      // Fetch three random meals from the MealDB API
      Promise.all([
        fetch("https://www.themealdb.com/api/json/v1/1/random.php"),
        fetch("https://www.themealdb.com/api/json/v1/1/random.php"),
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      ])
        .then((responses) =>
          Promise.all(responses.map((response) => response.json()))
        )
        .then((data) => {
          setMeals(data.map((item) => item.meals[0]));
        })
        .catch((error) => {
          console.error("Error fetching random meals:", error);
        });
    }
  }, [selectedMeal]);

  const meal1 = meals[0];
  const meal2 = meals[1];
  const meal3 = meals[2];

  return (
    <div className="hero">
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="slide-container"
      >
        {meal1 && (
          <SwiperSlide key={meal1.idMeal}>
            <div className="slide-content">
              <div className="card-wrapper">
                <div className="card">
                  <div className="image-content">
                    <span className="overlay"></span>
                    <div className="card-image">
                      <img
                        className="card-img"
                        src={meal1.strMealThumb}
                        alt="cimage"
                      />
                    </div>
                  </div>

                  <div className="card-content">
                    <h2 className="name">{meal1.strMeal}</h2>
                    <p className="description">
                      Origin: {meal1.strArea} | Category: {meal1.strCategory}
                    </p>
                    <Link to={`/meal/${meal1.idMeal}`} className="button">
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )}

        {meal2 && (
          <SwiperSlide key={meal2.idMeal}>
            <div className="slide-content">
              <div className="card-wrapper">
                <div className="card">
                  <div className="image-content">
                    <span className="overlay"></span>
                    <div className="card-image">
                      <img
                        className="card-img"
                        src={meal2.strMealThumb}
                        alt="cimage"
                      />
                    </div>
                  </div>

                  <div className="card-content">
                    <h2 className="name">{meal2.strMeal}</h2>
                    <p className="description">
                      Origin: {meal2.strArea} | Category: {meal2.strCategory}
                    </p>
                    <Link to={`/meal/${meal2.idMeal}`} className="button">
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )}

        {meal3 && (
          <SwiperSlide key={meal3.idMeal}>
            <div className="slide-content">
              <div className="card-wrapper">
                <div className="card">
                  <div className="image-content">
                    <span className="overlay"></span>
                    <div className="card-image">
                      <img
                        className="card-img"
                        src={meal3.strMealThumb}
                        alt="cimage"
                      />
                    </div>
                  </div>

                  <div className="card-content">
                    <h2 className="name">{meal3.strMeal}</h2>
                    <p className="description">
                      Origin: {meal3.strArea} | Category: {meal3.strCategory}
                    </p>
                    <Link to={`/meal/${meal3.idMeal}`} className="button">
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Hero;
