import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice.js";

const store = configureStore({
  reducer: {
    User: UserReducer,
  },
});

export default store;
