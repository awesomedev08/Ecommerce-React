import React, { useEffect, useState } from "react";

import style from "./ProductDetails.css";

import img1 from "../../assets/image/ProductDetails/Rectangle 134.png";
import img2 from "../../assets/image/ProductDetails/Rectangle 136.png";
import img3 from "../../assets/image/ProductDetails/Rectangle 137.png";
import img4 from "../../assets/image/ProductDetails/Rectangle 138.png";
import minus from "../../assets/icon/Vector-minus.svg";
import increased from "../../assets/icon/increased-Vector.png";
import increased2 from "../../assets/icon/increased2-Vector.svg";

import Star from "../../components/star/Star";

import Facebook from "../../assets/icon/Media/Facebook-logo.svg";
import Instagram from "../../assets/icon/Media/Instagram.svg";
import github from "../../assets/icon/Media/github.svg";
import Linkedin from "../../assets/icon/Media/Linkedin.svg";
import Youtube from "../../assets/icon/Media/Youtube.svg";
import { Link, useParams } from "react-router-dom";
import ProductDetailsTabs from "./tabs/ProductDetailsTabs";
import ProductGroup from "../../components/productGroup/ProductGroup";
import axios from "axios";
import ProductGroupScroallLeft from "../../components/productGroupScroallLeft/ProductGroupScroallLeft";

function ProductDetails() {
  const params = useParams();
  const [Mydata, setMyData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(false);
    // console.log(Paramsapi);
    axios
      .get(
        `${process.env.REACT_APP_URL_API}categoties/2/?populate=prodects.image`
      )
      .then(function (response) {
        //  console.log(response.data.data);
        setMyData(response.data);
      })
      .then(() => {
        setloading(true);
        //    console.log(Mydata);
      })
      .catch(function (error) {
        console.log(error);
      });

    //  console.log(Mydata);
  }, [params.key]);

  const [Quantity, setQuantity] = useState(1);
  return (
    <>
      <div className="container ProductDetails">
        <h3 className="ProductDetails-title-mobile">Related Products</h3>
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

          <div className="ProductDetails-Rating">
            <span className="product-Rating">{<Star number={5} />}</span>
            <span className="product-Rating-star">(4.5)</span>
          </div>

          <div className="ProductDetails-Categories">
            Categories: <span>Furniture</span>
          </div>

          <div className="ProductDetails-Quantity">
            <span
              className="ProductDetails-Quantity-increased"
              onClick={() => {
                if (Quantity > 1) {
                  setQuantity((unm) => (unm -= 1));
                }
              }}
            >
              <img
                src={increased}
                onClick={(event) => {
                  event.preventDefault();
                }}
                alt=""
              ></img>
            </span>
            <input
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              placeholder="1"
              value={Quantity}
            ></input>{" "}
            <span
              className="ProductDetails-Quantity-decreased"
              onClick={(event) => {
                setQuantity((unm) => (unm += 1));
                console.log(Quantity);
              }}
            >
              <img
                src={increased}
                onClick={(event) => {
                  event.preventDefault();
                }}
                alt=""
              ></img>
              <img
                src={increased2}
                alt=""
                onClick={(event) => {
                  event.preventDefault();
                }}
              ></img>
            </span>
          </div>

          <div className="ProductDetails-Share">
            <span>Share</span>
            <div className="ProductDetails-Share-imgs">
              <Link to="">
                <img src={Facebook} alt="Facebook"></img>
              </Link>
              <Link to="">
                <img src={Instagram} alt="Instagram"></img>
              </Link>
              <Link to="">
                <img src={github} alt="github"></img>
              </Link>
              <Link to="">
                <img src={Linkedin} alt="Linkedin"></img>
              </Link>
              <Link to="">
                <img src={Youtube} alt="Youtube"></img>
              </Link>
            </div>

            {/* ProductDetails-Quantity mobile */}
            <div className="ProductDetails-Quantity-mobile">
              <span
                className="ProductDetails-Quantity-increased-mobile"
                onClick={() => {
                  if (Quantity > 1) {
                    setQuantity((unm) => (unm -= 1));
                  }
                }}
              >
                <img
                  src={increased}
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                  alt=""
                ></img>
              </span>
              <input
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                placeholder="1"
                value={Quantity}
              ></input>{" "}
              <span
                className="ProductDetails-Quantity-decreased-mobile"
                onClick={(event) => {
                  setQuantity((unm) => (unm += 1));
                  console.log(Quantity);
                }}
              >
                <img
                  src={increased}
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                  alt=""
                ></img>
                <img
                  src={increased2}
                  alt=""
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                ></img>
              </span>
            </div>

            {/* ==ProductDetails-Quantity mobile== */}
          </div>

          <div className="ProductDetails-Add">
            <button className="ProductDetails-AddCart">Add To cart</button>
            <button className="ProductDetails-AddWish">Add To wish</button>
          </div>
        </div>
      </div>
      {/* ProductDetailsInstTow */}
      <div className="ProductDetailsInstTowTop">
        <div className="container ProductDetailsInstTow">
          <ProductDetailsTabs />
        </div>
      </div>
      {/* ==ProductDetailsInstTow== */}

      <div className=" ProductDetails-RelatedProducts">
        <div className="container">
          <h3>Related Products</h3>
        </div>
        <ProductGroupScroallLeft data={Mydata} doneLoading={loading} />
      </div>
    </>
  );
}

export default ProductDetails;
