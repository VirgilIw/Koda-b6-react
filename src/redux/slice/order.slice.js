import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (prevState, action) => {
      prevState.orders.push(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;

// cartSlice        → keranjang user
// orderSlice       → history pesanan
// productSlice     → produk (admin manage)
// authSlice        → login & role
