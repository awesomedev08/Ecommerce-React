import React, { useEffect, useState } from "react";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import style from "./Wish.css";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import {
  addToWish,
  removeItemWish,
  restWish,
} from "../../../redux/WishReducer";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart } from "../../../redux/CartReducer";

function Wish() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.wish.productsWish);
  const UserInfo = useSelector((state) => state.user.User);
  // const products = useSelector(state => state.cart.products);
  let [total, setTotal] = useState(0);

  useEffect(() => {
    if (products !== undefined) {
      setTotal(
        products.reduce((accumulator, product) => {
          if (product.Quantity > 1) {
            return accumulator + parseFloat(product.price) * product.Quantity;
          } else {
            return accumulator + parseFloat(product.price);
          }
        }, 0)
      );
    }

    if (!UserInfo.jwt) {
      window.location.pathname = "/SignUp";
    }
  }, [products]);

  const handlePayment = () => {
    products.map((product) => {
      dispatch(addToCart(product));
    });
  };
  return (
    <div className="container">
      <h2 className="Wishcart-h2"> Shopping Wish </h2>
      <div className="Wishcart-p">
        <span>You have {products.length} item in your Wish</span>
      </div>

      <div className="Wishcart">
        <div className="Wishcart-total-product">
          <div className="Wishcart-products">
            {products.map((e) => (
              <div key={e.id} className="Wishcart-product-top">
                <div className="Wishcart-product-img-top">
                  <img className="Wishcart-product-img" src={e.img} alt="" />
                </div>
                <div key={e.id} className="Wishcart-product">
                  <div className="Wishcart-product-h4-p">
                    <h4>{e.name}</h4>
                    <p>{e.dec}</p>
                  </div>{" "}
                  <div className="Wish-add-delete">
                    <div
                      onClick={() => {
                        dispatch(
                          addToCart({
                            id: e.id,
                            name: e.name,
                            dec: e.desc,
                            img: e.img,
                            price: e.offerprice || e.price,
                            Quantity: 1,
                          })
                        );
                        enqueueSnackbar(`Product added to cart. 1 items.`, {
                          variant: "success",
                        });
                      }}
                    >
                      <AddShoppingCartIcon />
                    </div>

                    <div
                      onClick={() => {
                        dispatch(
                          removeItemWish({
                            id: e.id,
                          })
                        );

                        enqueueSnackbar(`Item removed from Wish.`, {
                          variant: "success",
                        });
                      }}
                    >
                      <DeleteOutlineIcon className="WishDeleteOutlineIcon" />
                    </div>
                  </div>
                </div>
              </div>
            ))}{" "}
            <div
              className="Wishreset-cart-mobile"
              onClick={() => {
                dispatch(restWish());

                enqueueSnackbar(`Cart Wish.`, {
                  variant: "success",
                });
              }}
            >
              <DeleteForeverOutlinedIcon /> Reset Wish
            </div>
          </div>

          <div className="Wishcart-total-top">
            <div className="Wishcart-total">
              <span className="Wishcart-total-text">Total</span>{" "}
              <span className="Wishcart-total-price">${total}</span>
            </div>
            <button className="WishcartCheckout" onClick={handlePayment}>
              <span>${total}</span>
              <span>add all to cart</span>
              <ArrowRightAltIcon sx={{ color: "#fff" }} />{" "}
            </button>
          </div>
        </div>
        <div
          className="Wishreset-cart"
          onClick={() => {
            dispatch(restWish());
            enqueueSnackbar(`Cart Wish.`, {
              variant: "success",
            });
          }}
        >
          {" "}
          <DeleteForeverOutlinedIcon /> Reset Wish
        </div>
      </div>
    </div>
  );
}

export default Wish;
