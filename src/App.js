// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Recipe from "./routes/Recipe";
import "./styles.css";


export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:mealId" element={<Recipe />} />
      </Routes>
    </div>
  );
}
