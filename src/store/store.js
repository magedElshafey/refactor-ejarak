import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import authSlice from "./auth";
import uploadSlice from "./uploadSlice";
const store = configureStore({
  reducer: {
    filterSlice,
    authSlice,
    uploadSlice,
  },
});
export default store;
