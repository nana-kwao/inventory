import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice.js";
import MenuSlice from "./MenuSlice.js";

const store = configureStore({
  reducer: {
    User: UserReducer,
    Menu: MenuSlice,
  },
});

export default store;
