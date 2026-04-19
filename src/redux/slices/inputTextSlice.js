import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "купить молоко",
};

const inputTextSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    change: (state, action) => {
      state.text = action.payload;
    },
    clearInput: (state) => {
      state.text = "";
    },
  },
});

export const { change, clearInput } = inputTextSlice.actions;
export default inputTextSlice.reducer;
