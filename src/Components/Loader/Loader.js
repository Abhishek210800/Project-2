// src/Components/Loader/Loader.js
import React, { memo } from "react";
import Lottie from "lottie-react";
import { useLoading } from "../../Context/LoadingContext";
import "./Loader.css";

const Loader = memo(() => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loader-container">
      <div className="loader-content">
        <Lottie
          animationData={require("./loader-animation.json")}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
});

export default Loader;
