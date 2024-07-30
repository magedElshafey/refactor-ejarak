import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  ejarakLogin: JSON.parse(window.localStorage.getItem("auth")) || false,
  userData: JSON.parse(localStorage.getItem("user")) || null,
  token: JSON.parse(localStorage.getItem("token")) || null,
};
const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.ejarakLogin = true;
      window.localStorage.setItem("auth", JSON.stringify(state.ejarakLogin));
      state.userData = action.payload;
      localStorage.setItem("user", JSON.stringify(state.userData));
    },
    update: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("user", JSON.stringify(state.userData));
    },
    logout: (state) => {
      state.ejarakLogin = false;
      state.token = null;
      state.userData = null;
      window.localStorage.setItem("auth", JSON.stringify(state.ejarakLogin));
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    },
    addToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(state.token));
    },
  },
});
export const userToken = (state) => {
  console.log("state", state);
};
export const { login, logout, update, addToken } = authSlice.actions;
export default authSlice.reducer;
