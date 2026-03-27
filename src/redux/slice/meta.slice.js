import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  variants: [],
  sizes: [],
};

const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setVariants: (state, action) => {
      state.variants = action.payload;
    },
    setSizes: (state, action) => {
      state.sizes = action.payload;
    },
  },
});

export const { setVariants, setSizes } = metaSlice.actions;
export default metaSlice.reducer;