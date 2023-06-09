import React from "react";
import logo from "../../assets/image/logo.png";
import Location from "../../assets/icon/Location.svg";
import css from "./HeaderOne.css";
function HeaderOne() {
  return (
    <>
      <img className="logo" src={logo} alt={"logo"}></img>
      <div className="Deliver-to">
        <img src={Location} alt=""></img>
        <div className="Deliver-to-span">
          <span>Deliver to</span>
          <span>Australia</span>
        </div>
      </div>
    </>
  );
}

export default HeaderOne;
