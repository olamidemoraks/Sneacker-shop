import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { logout } from "../feature/auth/authSlice";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { isExpired } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isExpired) {
      dispatch(logout());
    }
  }, [isExpired]);

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
