import { Numbers } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

export const UserReducer = createSlice({
  name: "User",
  initialState: {
    User: {},
  },
  reducers: {
    addUser: (state, action) => {
      state.User = action.payload;
      // console.log(item);
    },

    removeUser: (state, action) => {
      state.User = {};
    },
  },
});

export const { addUser, removeUser } = UserReducer.actions;

export default UserReducer.reducer;
