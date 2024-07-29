import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ img }) => {
  return (
    <Link to="/">
      <img alt="logo" src={img} loading="lazy" className=" h-10" />
    </Link>
  );
};

export default Logo;
