import { Numbers } from "@mui/icons-material";
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
        item.Quantity += parseFloat(action.payload.Quantity);
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
    },
    minusQuantity: (state, action) => {
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // console.log(item);
      if (item) {
        item.Quantity -= parseFloat(action.payload.Quantity);
      }
    },
    replaceQuantity: (state, action) => {
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // console.log(item);
      if (item) {
        item.Quantity = parseFloat(action.payload.Quantity);
      }
    },
  },
});

export const {
  addToCart,
  removeItem,
  restCart,
  minusQuantity,
  replaceQuantity,
} = CartReducer.actions;

export default CartReducer.reducer;
