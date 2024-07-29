import React from "react";

const Hero = ({ img, children, hasoverlay }) => {
  return (
    <div
      className="hero-img relative"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      {hasoverlay ? (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Hero;
