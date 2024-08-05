// src/redux/uploadSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    progress: 0,
    isLoading: false,
    showMsg: false,
    msgType: "",
    msg: "",
  },
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setShowMsg: (state, action) => {
      state.showMsg = action.payload;
    },
    setMsgType: (state, action) => {
      state.msgType = action.payload;
    },
    addMsg: (state, action) => {
      state.msg = action.payload;
    },
  },
});

export const { setProgress, setLoading, setShowMsg, setMsgType, addMsg } =
  uploadSlice.actions;
export default uploadSlice.reducer;
