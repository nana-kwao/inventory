import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getStocksService from "../services/getStocksService";

//fect products
export const getStocksFromDB = createAsyncThunk(
  "products/fetchStocks",
  async (userid, { rejectWithValue }) => {
    try {
      const response = await getStocksService(userid);
      if (response.success) {
        return response.data.stocks;
      } else {
        return rejectWithValue(response.message || "Error fetching products");
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  stocks: [],
  status: "idle",
  error: null,
};

const StockSlice = createSlice({
  name: "Stocks",
  initialState,
  reducers: {
    setStocks(state, action) {
      state.stocks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStocksFromDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStocksFromDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stocks = action.payload;
      })
      .addCase(getStocksFromDB.rejected, (state, action) => {
        state.status = "failed";
        state.error - action.payload;
      });
  },
});

export const { setStocks } = StockSlice.actions;
export default StockSlice.reducer;
