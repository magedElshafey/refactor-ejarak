import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ img, isFooter }) => {
  return (
    <Link to="/">
      <img
        alt="logo"
        src={img}
        loading="lazy"
        className={`w-16 md:w-auto object-contain ${
          isFooter ? " h-28" : "h-20"
        }`}
      />
    </Link>
  );
};

export default Logo;
