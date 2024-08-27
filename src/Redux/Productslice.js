import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

let headers = {
  token: localStorage.getItem("userToken"),
};
export let getcat = createAsyncThunk("products/getcat", async function () {
  let response = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/categories`
  );
  console.log(response.data);

  return response.data;
});

//add product to wishlist Done
export let Addproducttowishlist = createAsyncThunk(
  "products/Addproducttowishlist",
  async function (id) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: id },
        { headers }
      );
      toast.success(response.data.message);
      console.log(response.data);
      console.log(response.data.data.length + "added");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

//get product to Display in wishlist Done
export let getproducttowishlist = createAsyncThunk(
  "products/getproducttowishlist",
  async function () {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers }
      );

      console.log(response.data.data);

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

//Delete from wishlist
export let Removeproductfromwishlist = createAsyncThunk(
  `products/Removeproductfromwishlist`,
  async function (id) {
    try {
      let response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers }
      );
      console.log("the rest after delete" + response.data.data);
      toast.success("Delete item suceesfully", {
        icon: "😭",
        style: {
          borderRadius: "10px",
          backgroundColor: "black",
          color: "white",
        },
      });
      return response.data;
    } catch (error) {
      error.toast("Error Apear in delete " + error);
    }
  }
);

let initialState = {
  categories: [],
  Wish: [],
};
let productslice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getcat.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(Addproducttowishlist.fulfilled, (state, action) => {
        state.Wish.push(action.payload.data);
        console.log(state);
      })
      .addCase(getproducttowishlist.fulfilled, (state, action) => {
        state.Wish = action.payload.data;
        console.log(state.Wish.length + " products in wish list");
      })
      .addCase(Removeproductfromwishlist.fulfilled, (state, action) => {
        state.Wish = state.Wish.filter((item) => item.id !== action.payload.id);
      });
  },
});

export const productReducer = productslice.reducer;
export const { increment1, increment2 } = productslice.actions;
