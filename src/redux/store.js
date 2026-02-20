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

const persistConfig = {
  key: "data",
  storage,
};

const persistedReducer = persistCombineReducers(persistConfig, {
  product: productReducer,
  order: orderReducer,
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
