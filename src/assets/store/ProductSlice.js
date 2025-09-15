import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getProductsService from "../services/getProducts";

//fect products
export const getProductsFromDB = createAsyncThunk(
  "products/fetchProducts",
  async (userid, { rejectWithValue }) => {
    try {
      const response = await getProductsService(userid);
      if (response.success) {
        return response.data.products;
      } else {
        return rejectWithValue(response.message || "Error fetching products");
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

const ProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsFromDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsFromDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProductsFromDB.rejected, (state, action) => {
        state.status = "failed";
        state.error - action.payload;
      });
  },
});

export const { setProducts } = ProductsSlice.actions;
export default ProductsSlice.reducer;
