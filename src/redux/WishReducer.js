import { Numbers } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

export const WishReducer = createSlice({
  name: "Wish",
  initialState: {
    productsWish: [],
  },
  reducers: {
    addToWish: (state, action) => {
      const item = state.productsWish.find(
        (product) => product.id === action.payload.id
      );
      // console.log(item);
      if (item) {
        item.Quantity += parseFloat(action.payload.Quantity);
      } else {
        //console.log(action.payload);
        state.productsWish.push(action.payload);
      }
    },

    removeItemWish: (state, action) => {
      state.productsWish = state.productsWish.filter(
        (item) => item.id !== action.payload.id
      );
    },
    restWish: (state) => {
      state.productsWish = [];
    },
    minusQuantityWish: (state, action) => {
      const item = state.productsWish.find(
        (product) => product.id === action.payload.id
      );
      // console.log(item);
      if (item) {
        item.Quantity -= parseFloat(action.payload.Quantity);
      }
    },
    replaceQuantityWish: (state, action) => {
      const item = state.productsWish.find(
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
  addToWish,
  removeItemWish,
  restWish,
  minusQuantityWish,
  replaceQuantityWish,
} = WishReducer.actions;

export default WishReducer.reducer;
