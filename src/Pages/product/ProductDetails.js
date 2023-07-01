import React from "react";

import style from "./ProductDetails.css";

import img1 from "../../assets/image/ProductDetails/Rectangle 134.png";
import img2 from "../../assets/image/ProductDetails/Rectangle 136.png";
import img3 from "../../assets/image/ProductDetails/Rectangle 137.png";
import img4 from "../../assets/image/ProductDetails/Rectangle 138.png";
import minus from "../../assets/icon/Vector-minus.svg";
import increased from "../../assets/icon/increased-Vector.png";
import increased2 from "../../assets/icon/increased2-Vector.svg";
import Star from "../../components/star/Star";
import { Link } from "react-router-dom";
function ProductDetails() {
  return (
    <div className="container ProductDetails">
      <div className="ProductDetailsImg">
        <img src={img1} alt=""></img>
        <img src={img2} alt=""></img>
        <img src={img3} alt=""></img>
      </div>
      <div className="ProductDetailsImgPremier">
        <img src={img4} alt=""></img>
      </div>
      <div className="ProductDetailsAction">
        <h1>Playwood arm chair </h1>

        <div>
          <span className="product-Rating">
            <span className="product-Rating-star">
              {<Star number={5} />} (4.5)
            </span>
          </span>
        </div>

        <div>
          Categories: <span>Furniture</span>
        </div>

        <div className="ProductDetails-Quantity">
          <span>
            <img src={increased}></img>
          </span>
          <input type="number"></input>{" "}
          <span>
            <img src={increased}></img>
            <img src={increased2}></img>
          </span>
        </div>

        <div>
          <span>Share</span>
          <div>
            <Link to="">
              <img></img>
            </Link>
            <Link to="">
              <img></img>
            </Link>
            <Link to="">
              <img></img>
            </Link>
            <Link to="">
              <img></img>
            </Link>
            <Link to="">
              <img></img>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
