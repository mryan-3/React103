import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);

  return (
    <>
      <Navbar setSelectedMeal={setSelectedMeal} />
      <Hero selectedMeal={selectedMeal} />
      <Footer />
    </>
  );
};

export default Home;
