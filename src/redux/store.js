import { configureStore } from "@reduxjs/toolkit";
import inputTextReducer from "./slices/inputTextSlice.js";
import filterReducer from "./slices/filterSlice.js";

const store = configureStore({
  reducer: {
    inputText: inputTextReducer,
    filter: filterReducer,
  },
});

export default store;
