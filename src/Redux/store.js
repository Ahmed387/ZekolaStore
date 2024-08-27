import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./Productslice";

export const store = configureStore({
  reducer: {
    productRed: productReducer,
  },
});
