import React, { useEffect, useRef, useState } from "react";

import style from "./product.css";
import img1 from "../../assets/Rectangle.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartReducer";
function Product({ price, offerprice, Rating, id, img, name, desc }) {
  //console.log(name.substring(0,30));
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  let productsBtn = useRef();

  let [addToCartH, setAddToCart] = useState({
    text: "Add to Cart",
    href: window.location.pathname,
  });

  function checkAddToCart() {
    let href = window.location.pathname;
    let text = "Add to Cart";
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === parseInt(id)) {
        href = "/Cart";
        text = "Go to Cart";
        break;
      }
    }
    setAddToCart({ text, href });
  }

  useEffect(() => {
    checkAddToCart();
  }, [products]);

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
  //console.log(price, offerprice);

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
          //console.log(!isDragging && !isMouseDown);
        }}
      >
        <img src={img} alt={name}></img>
        <h4>{name.substring(0, 30)}</h4>

        <div className="product-One">
          {" "}
          <div className="priceDiv">
            {offerprice ? (
              <span className="offerPrice">{offerprice}$</span>
            ) : (
              ""
            )}
            <span className={offerprice ? "price" : "offerPrice"}>
              {price}$
            </span>
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
        ref={productsBtn}
        to={addToCartH.href}
        className="AddToCart"
        onClick={(element) => {
          dispatch(
            addToCart({
              id: id,
              name: name,
              desc: desc,
              img: img,
              price: price,
              offerprice: offerprice,
              quantity: 1,
            })
          );

          checkAddToCart();
        }}
      >
        {addToCartH.text}
      </Link>
    </div>
  );
}

export default Product;
