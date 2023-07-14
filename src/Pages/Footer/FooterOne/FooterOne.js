import React from "react";
import styles from "./FooterOne.css"
// img
import Logo from "../../../assets/image/logo.png";
import call from "../../../assets/icon/Call-2.svg";
import whatsapp from "../../../assets/icon/Media/ant-design_whats-app-outlined.svg";

import FooterOneMedia from "./FooterOneMedia/FooterOneMedia";
function FooterOne() {
  return (
    <div className="FooterOne ">
      <div className="FooterOne-Contact container">
        <img src={Logo} className="FooterOne-Contact-Logo" alt=""></img>
        <div className="FooterOne-Contact-div-ContactUs">
          <span className="FooterOne-Contact-span-ContactUs">Contact Us</span>


          <div className="FooterOne-Contact-ContactUs-Media">
            <img src={whatsapp} alt="whatsapp"></img>
            <div >
              <span>Whats App</span>
              <span>+1 202-918-2132</span>
            </div>
          </div>

          <div  className="FooterOne-Contact-ContactUs-Media">
            <img src={call} alt="call"></img>
            <div>
              <span>Call Us</span>
              <span>+1 202-918-2132</span>
            </div>
          </div>


        </div>
      </div>

<div className="FooterOneMedia-lg container">

      <FooterOneMedia />
</div>
    </div>
  );
}

export default FooterOne;
