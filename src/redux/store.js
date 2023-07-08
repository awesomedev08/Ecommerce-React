import CartReducer from "./CartReducer";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserReducer from "./UserReducer";
import WishReducer from "./WishReducer";


const persistConfig = {
  key: "root",
  version: 2,
  storage,
};

const persistedReducer = persistReducer(persistConfig, CartReducer);
const persistedReducerUser = persistReducer(persistConfig, UserReducer);
const persistedWishReducer = persistReducer(persistConfig, WishReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    user: persistedReducerUser,
    wish: persistedWishReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
