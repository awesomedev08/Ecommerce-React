import React from "react";
import { Link } from "react-router-dom";
import Facebooklogo from "../../../../assets/icon/Media/Facebook-logo.svg";
import Instagram from "../../../../assets/icon/Media/Instagram.svg";
import github from "../../../../assets/icon/Media/github.svg";
import Linkedin from "../../../../assets/icon/Media/Linkedin.svg";
import Youtube from "../../../../assets/icon/Media/Youtube.svg";

import style from "./FooterOneMedia.css"
function FooterOneMedia() {
  return (
    <div className="FooterOneMedia">
      <span>Follow us</span>
      <div className="FooterOneMedia-div-in">
        <Link to={""}>
          <img src={Facebooklogo} alt=""></img>
        </Link>
        <Link to={""}>
          <img src={Instagram} alt=""></img>
        </Link>
        <Link to={github}>
          <img src="" alt=""></img>
        </Link>
        <Link to={""}>
          <img src={Linkedin} alt=""></img>
        </Link>
        <Link to={""}>
          <img src={Youtube} alt=""></img>
        </Link>
      </div>
    </div>
  );
}

export default FooterOneMedia;
