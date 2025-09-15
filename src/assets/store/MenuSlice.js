import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuItemText: true,
};

const MenuSlice = createSlice({
  name: "Menu",
  initialState,
  reducers: {
    setMenuItemText(state, action) {
      state.menuItemText = action.payload;
    },
  },
});

export const { setMenuItemText } = MenuSlice.actions;
export default MenuSlice.reducer;
