import React, { useState } from "react";

import style from "./product.css";
import img1 from "../../assets/Rectangle.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartReducer";
function Product({ price, offerPrice, Rating, id }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  let AddtoCart = "Add to Cart";
  let AddtoCartUrl = "";
  let AddtoCartOK = products.map((product) => product.id === parseInt(id));

  if (AddtoCartOK[0]) {
    AddtoCart = "Go to Cart";
    AddtoCartUrl = "/cart";
  } else {
    AddtoCart = "Add to Cart";
    AddtoCartUrl = "";
  }

  let isDragging = false;
  let isMouseDown = false;
  let startTime = 0;
  const handleMouseDown = () => {
    isMouseDown = true;
    startTime = Date.now();
  };

  const handleMouseMove = () => {
    if (isMouseDown) {
      const millis = Date.now() - startTime;
      if (millis > 300) {
        isDragging = false;
        isMouseDown = false;
      } else {
        isDragging = true;
        isMouseDown = true;
      }
    }
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      isDragging = true;
      isMouseDown = true;
    }, 100);
  };

  return (
    <div
      className="product"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Link
        to={"/product/" + id}
        onClick={(event) => {
          if (!isDragging && !isMouseDown) {
            event.preventDefault();
          }
          console.log(!isDragging && !isMouseDown);
        }}
      >
        <img src={img1} alt=""></img>
        <h4>Jean Shorts</h4>

        <div className="product-One">
          {" "}
          <div className="priceDiv">
            <span className="price">350$</span>
            <span className="offerPrice">200$</span>
          </div>
          <div>
            {" "}
            <span className="product-Rating">
              (4.5) <span className="product-Rating-star">⭐</span>
            </span>
          </div>
        </div>
      </Link>
      <Link
        to={AddtoCartUrl}
        className="AddToCart"
        onClick={(element) => {
          element.preventDefault();
          dispatch(
            addToCart({
              id: 1,
              name: "Jean Shorts",
              desc: " Jean Shortsdsf sd s s ",
              img: img1,
              price: 350,
              quantity: 1,
            })
          );
        }}
      >
        {AddtoCart}
      </Link>
    </div>
  );
}

export default Product;
