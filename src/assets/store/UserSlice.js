import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "",
  message: "",
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    resetUser(state) {
      state.user = null;
    },
    resetMessage(state) {
      state.message = "";
    },
  },
});

export const { setUser, setStatus, setMessage, resetUser, resetMessage } =
  UserSlice.actions;
export default UserSlice.reducer;
