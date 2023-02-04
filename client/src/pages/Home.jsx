import React from "react";
import Footer from "../components/Footer";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div
      className="absolute top-0
     w-full h-full scroll-smooth snap-y"
    >
      <Slider />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
