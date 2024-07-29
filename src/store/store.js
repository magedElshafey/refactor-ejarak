import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import authSlice from "./auth";
const store = configureStore({
  reducer: {
    filterSlice,
    authSlice,
  },
});
export default store;
