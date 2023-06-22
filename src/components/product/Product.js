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

  let [AddtoCart, setAddtoCart] = useState("Add to Cart");
  let AddtoCartUrl = "";
  let AddtoCartOK = products.map((product) => product.id === parseInt(id));

  let productsBtn = useRef();

  useEffect(() => {
    // console.log(productsBtn.current);
    productsBtn.current.addEventListener("click", () => {
      AddtoCartOK.map((product) => {
        console.log(product);
        if (product === true) {
          AddtoCartUrl = "/cart";
          setAddtoCart("Go to Cart");
        } else {
          setAddtoCart("Add to Cart");
          AddtoCartUrl = "";
        }
      });
    });
  }, []);
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
            <span className="price">{price}$</span>
            {offerprice ? <span className="offerPrice">{offerprice}$</span> : "" }
            
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
        to={AddtoCartUrl}
        className="AddToCart"
        onClick={(element) => {
          element.preventDefault();
        
      
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
        }}
      >
        {AddtoCart}
      </Link>
    </div>
  );
}

export default Product;
