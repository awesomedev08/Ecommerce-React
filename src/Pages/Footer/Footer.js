import React from "react";
import FooterOne from "./FooterOne/FooterOne";
import FooterTow from "./FooterTow/FooterTow";

import styles from "./Footer.css";
import FooterOneMedia from "./FooterOne/FooterOneMedia/FooterOneMedia";
function Footer() {
  return (<>
    <div className="FooterTop">
      <div className="Footer container">
        <FooterOne />
        <FooterTow />
      </div>{" "}
      <div className="FooterTowMedia-sm">
        <FooterOneMedia />
      </div>
    </div>
    <div className="FooterBottom"></div>
  </>
  );
}

export default Footer;
