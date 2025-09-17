import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice.js";
import MenuSlice from "./MenuSlice.js";
import ProductSlice from "./ProductSlice.js";
import StockSlice from "./StocksSlice.js";

const store = configureStore({
  reducer: {
    User: UserReducer,
    Menu: MenuSlice,
    Products: ProductSlice,
    Stocks: StockSlice,
  },
});

export default store;
