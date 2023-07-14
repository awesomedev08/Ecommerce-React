import React from "react";

import style from "./error.css";
import errorSvg from "../../assets/image/error/error.svg";
import { Link } from "react-router-dom";
function Error() {
  return (
    <div className="error">
      <img src={errorSvg} alt="errorSvg" />
      <Link to={"/"}>Go Home Page</Link>
    </div>
  );
}

export default Error;
