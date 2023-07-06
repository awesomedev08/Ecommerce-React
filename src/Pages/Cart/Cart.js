import React, { useEffect, useState } from "react";
import increased from "../../assets/icon/increased-Vector.png";
import increased2 from "../../assets/icon/increased2-Vector.svg";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import style from "./Cart.css";
import img1 from "../../assets/image/cart/Rectangle 19.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  minusQuantity,
  removeItem,
  replaceQuantity,
  restCart,
} from "../../redux/CartReducer";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
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
  }, [products]);

  const stripePromise = loadStripe(
    "pk_test_51NQGlbDkQuRyrh55KHZh0M5BJ6PqCgiaqCGMBL8wC7DodnSDefhvJxsU8OVUAw8y1nYD2ulZLdY2AXWLcKPufYJN00VayKSIa1"
  );

  const handlePayment = async () => {
    try {
      enqueueSnackbar(
        "Please wait, you will be redirected to the payment page to complete your purchase upon checkout.",
        {
          variant: "success",
        }
      );
      const stripe = await stripePromise;

      const res = await axios.post(
        "http://localhost:1337/api/orders",
        {
          products,
          email: UserInfo.user.email,
          userId: UserInfo.user.id,
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjg4NTEyMzI1LCJleHAiOjE2OTExMDQzMjV9.aHmLxPyKFCZjaScC4y9jmISXP4DS87LDwOuR1WXk4Jc`,
          },
        }
      );
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      enqueueSnackbar(
        "An error has occurred. Please contact us for assistance.",
        {
          variant: "error",
        }
      );
      console.log(err);
    }
  };
  return (
    <div className="container">
      <h2 className="cart-h2"> Shopping cart </h2>
      <div className="cart-p">
        <span>You have {products.length} item in your cart</span>
      </div>

      <div className="cart">
        <div className="cart-total-product">
          <div className="cart-products">
            {products.map((e) => (
              <div key={e.id} className="cart-product-top">
                <div className="cart-product-img-top">
                  <img className="cart-product-img" src={e.img} alt="" />
                </div>
                <div key={e.id} className="cart-product">
                  <div className="cart-product-h4-p">
                    <h4>{e.name}</h4>
                    <p>{e.dec}</p>
                  </div>

                  <div className="ProductDetails-Quantity-price-Delete">
                    <div className="cart-product-Quantity">
                      <div className="cart-ProductDetails-Quantity">
                        <span
                          className="cart-ProductDetails-Quantity-increased"
                          onClick={() => {
                            if (e.Quantity > 1) {
                              dispatch(
                                minusQuantity({
                                  id: e.id,
                                  Quantity: 1,
                                })
                              );
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
                          onChange={(event) => {
                            //
                            // setQuantity(parseFloat(event.target.value));

                            console.log(parseFloat(event.target.value));
                            dispatch(
                              replaceQuantity({
                                id: e.id,
                                Quantity: parseFloat(event.target.value),
                              })
                            );
                          }}
                          type="number"
                          placeholder="1"
                          value={e.Quantity}
                        ></input>{" "}
                        <span
                          className="cart-ProductDetails-Quantity-decreased"
                          onClick={(event) => {
                            // setQuantity((unm) => (unm += 1));
                            // console.log(Quantity);
                            dispatch(
                              addToCart({
                                id: e.id,
                                Quantity: 1,
                              })
                            );
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
                    </div>
                    <span className="cart-product-price">${e.price}</span>
                    <div
                      onClick={() => {
                        dispatch(
                          removeItem({
                            id: e.id,
                          })
                        );

                        enqueueSnackbar(`Item removed from cart.`, {
                          variant: "success",
                        });
                      }}
                    >
                      <DeleteOutlineIcon className="DeleteOutlineIcon" />
                    </div>
                  </div>
                </div>
              </div>
            ))}{" "}
            <div
              className="reset-cart-mobile"
              onClick={() => {
                dispatch(restCart());

                enqueueSnackbar(`Cart reset.`, {
                  variant: "success",
                });
              }}
            >
              <DeleteForeverOutlinedIcon /> Reset Cart
            </div>
          </div>

          <div className="cart-total-top">
            <div className="cart-total">
              <span className="cart-total-text">Total</span>{" "}
              <span className="cart-total-price">${total}</span>
            </div>
            <button className="cartCheckout" onClick={handlePayment}>
              <span>${total}</span>
              <span>Checkout</span>
              <ArrowRightAltIcon sx={{ color: "#fff" }} />{" "}
            </button>
          </div>
        </div>
        <div
          className="reset-cart"
          onClick={() => {
            dispatch(restCart());
            enqueueSnackbar(`Cart reset.`, {
              variant: "success",
            });
          }}
        >
          {" "}
          <DeleteForeverOutlinedIcon /> Reset Cart
        </div>
      </div>
    </div>
  );
}

export default Cart;
