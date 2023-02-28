import React from "react";
import { BeatLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-[100vh] bg-primary-black ">
      <h2
        className="text-secondary-white text-4xl font-bold uppercase tracking-wider"
        style={{ fontFamily: "Qualittle" }}
      >
        <p>Sneakers</p>
      </h2>
      <BeatLoader size={23} color="#d0d0d0" />
    </div>
  );
};

export default LoadingScreen;
