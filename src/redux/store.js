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
const stripe = require("stripe")(
  "sk_test_51NQGlbDkQuRyrh55Th67xB7CZMDchivwGUbTHBDlJVjQqejLoAAreVKBmHqYzN8OXcFRaDbob5u4wdDOsM6ul1gM00qXKVPj34"
);

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, CartReducer);
const persistedReducerUser = persistReducer(persistConfig, UserReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    user: persistedReducerUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
