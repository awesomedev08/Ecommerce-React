import { createSlice } from "@reduxjs/toolkit";

export const CartReducer = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
     // console.log(item);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        //console.log(action.payload);
        state.products.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
    restCart: (state) => {
      state.products = [];
    }
  },
});

export const { addToCart, removeItem, restCart } = CartReducer.actions;

export default CartReducer.reducer;
