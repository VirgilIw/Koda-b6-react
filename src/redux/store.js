import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PERSIST,
  persistCombineReducers,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import productReducer from "./slice/product.slice";
import orderReducer from "./slice/order.slice";
import authReducer from "./slice/auth.slice";
import metaReducer from "./slice/meta.slice";
import cartReducer from "./slice/cart.slice";

const persistConfig = {
  key: "data",
  storage,
  whitelist: ["auth"],
};


const persistedReducer = persistCombineReducers(persistConfig, {
  auth: authReducer,
  product: productReducer,
  order: orderReducer,
  meta: metaReducer, 
  cart: cartReducer,
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [PERSIST, REHYDRATE, FLUSH, REGISTER, PURGE],
      },
    }),
});

export const persistedStore = persistStore(store);
export default store;