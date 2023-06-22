import React, { useEffect, useState } from "react";

import style from "./Specialoffer.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Specialoffer() {
  const [Mydata, setMyData] = useState([]);
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL_API +
          "home?populate=specialoffer.prodect.image.url"
      )
      .then(function (response) {
        //   console.log(response.data.data.attributes.specialoffer[0]);
        setMyData(response.data.data.attributes.specialoffer[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(Mydata);
  return (
    <div className="SpecialofferTOP container">
      <div className="Specialoffer">
        <div className="FirstCircle"></div>
        <div className="FirstCircleIn1"> </div>
        <div className="FirstCircleIn3"> </div>
        <div className="triangle">
          <div className="triangle-inst"></div>
        </div>
      </div>

      <div className="FirstCircleDIvTow"></div>

      <div className="FirstCircleDIvTow-triangle">
        <div className="FirstCircleDIvTow-triangle-inst"></div>
        <div className="FirstCircleDIvTow-triangle-inst-right"></div>
        <div className="FirstCircleDIvTow-triangle-inst-left"></div>
      </div>

      <div className="Specialoffer-2">
        <span className="Specialoffer-2-text1"></span>
        <Link to={"product" + Mydata.prodect?.data.id}>
          <img
            src={
              Mydata.prodect?.data?.attributes?.image?.data[0]?.attributes.url
            }
            alt=""
          ></img>
        </Link>
      </div>
    </div>
  );
}

export default Specialoffer;
