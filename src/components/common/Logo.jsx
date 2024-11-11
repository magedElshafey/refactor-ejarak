import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ img, isFooter }) => {
  return (
    <Link to="/">
      <img
        alt="logo"
        src={img}
        loading="lazy"
        className={`${isFooter ? " h-28" : "h-20"}`}
      />
    </Link>
  );
};

export default Logo;
