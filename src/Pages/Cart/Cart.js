import React from "react";

import style from "./Cart.css";
import { useSelector } from "react-redux";
function Cart() {
  const products = useSelector((state) => state.cart.products);
  // const products = useSelector(state => state.cart.products);
  return (
    <div>
      {products.map((e) => (
        <h3 key={e.id}>{e.name}</h3>
      ))}
    </div>
  );
}

export default Cart;
