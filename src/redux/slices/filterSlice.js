import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  str: "all",
};

const filterSlice = createSlice({
  name: "fiter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.str = action.payload;
    },
  },
});

export const selectFilter = (state) => state.filter.str;
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
