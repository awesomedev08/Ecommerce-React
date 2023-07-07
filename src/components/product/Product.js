import React, { useEffect, useRef, useState } from "react";

import style from "./product.css";
import img1 from "../../assets/Rectangle.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartReducer";
import { enqueueSnackbar } from "notistack";
function Product({ price, offerprice, Rating, id, img, name, desc, Discount }) {
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
        {Discount ? (
          <span className="productSale-top">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="87"
              height="59"
              viewBox="0 0 87 59"
              fill="none"
            >
              <path
                d="M1.09968 44.7253C1.49968 50.3253 4.93301 55.7253 6.59968 57.7253C7.09975 52.2253 19.5996 48.7253 22.0996 48.7253C24.0996 48.7253 37.9329 44.7253 44.5996 42.7253C53.9329 39.7253 75.0996 32.6254 85.0996 28.2254C88.5996 10.7254 79.0996 -0.774631 78.5996 1.22537C78.1996 2.82537 65.7663 7.55868 59.5996 9.72535C47.4329 14.2253 21.0996 23.5253 13.0996 24.7253C5.09961 25.9253 2.43299 28.892 2.09968 30.2253C1.59968 32.7253 0.69968 39.1253 1.09968 44.7253Z"
                fill="#EF2B2D"
                stroke="#EF2B2D"
              />
            </svg>{" "}
            <span className="productSale">Sale</span>
          </span>
        ) : (
          ""
        )}
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
          if (addToCartH.text !== "Go to Cart") {
            dispatch(
              addToCart({
                id: id,
                name: name,
                dec: desc,
                img: img,
                price: price || offerprice,
                Quantity: 1,
              })
            );
            enqueueSnackbar(`Product added to cart. 1 items.`, {
              variant: "success",
            });
          }
          checkAddToCart();
        }}
      >
        {addToCartH.text}
      </Link>
    </div>
  );
}

export default Product;
