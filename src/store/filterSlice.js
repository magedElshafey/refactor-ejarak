import { createSlice } from "@reduxjs/toolkit";
import { getParse } from "../utils/getParse";
import { addToLocalStorage } from "../utils/addToLocalStorage";
const initialState = {
  openFilter: false,
  categoryId: "",
  subCategoryId: [],
  lat: localStorage.getItem("currentLat")
    ? JSON.parse(localStorage.getItem("currentLat"))
    : 35.86166,
  lng: localStorage.getItem("currentLng")
    ? JSON.parse(localStorage.getItem("currentLng"))
    : 104.195397,
  highPrice: "",
  lowPrice: "",
  roomNumbers: "",
  bathrooms: "",
  area: "",
  priceCreate: "",
  review: "",
  latest: "",
  location: localStorage.getItem("location")
    ? JSON.parse(localStorage.getItem("location"))
    : null,
  name: "",
  sortCreate: "",
  sort: "",
  cityId: "",
};

const filterSlice = createSlice({
  initialState,
  name: "filterSlice",
  reducers: {
    handleOpenFilter: (state) => {
      state.openFilter = true;
    },
    closeFilter: (state) => {
      state.openFilter = false;
    },
    changeLat: (state, action) => {
      state.lat = action.payload;
      addToLocalStorage("currentLat", action.payload);
    },
    changeLng: (state, action) => {
      state.lng = action.payload;
      addToLocalStorage("currentLng", action.payload);
    },
    changeLocation: (state, action) => {
      state.location = action.payload;
      addToLocalStorage("location", action.payload);
    },
    changeCategoryId: (state, action) => {
      state.categoryId = action.payload;
      state.subCategoryId = [];
    },
    changeSubCategoryId: (state, action) => {
      let newIDS;
      if (state.subCategoryId.includes(action.payload)) {
        newIDS = state.subCategoryId.filter((id) => id !== action.payload);
        state.subCategoryId = newIDS;
      } else {
        state.subCategoryId.push(action.payload);
      }
    },
    changeHighPrice: (state, action) => {
      state.highPrice = action.payload;
    },
    changeLowPrice: (state, action) => {
      state.lowPrice = action.payload;
    },
    changeRoomNumbers: (state, action) => {
      state.roomNumbers = action.payload;
    },
    changeBathRooms: (state, action) => {
      state.bathrooms = action.payload;
    },
    changeArea: (state, action) => {
      state.area = action.payload;
    },
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changePriceCreateHigh: (state) => {
      state.priceCreate = "desc";
      state.sortCreate = "";
      state.sort = "";
    },
    changePriceCreateLow: (state) => {
      state.priceCreate = "asc";
      state.sortCreate = "";
      state.sort = "";
    },
    changeSortHigh: (state) => {
      state.priceCreate = "";
      state.sortCreate = "";
      state.sort = "desc";
    },
    changeSortLow: (state) => {
      state.priceCreate = "";
      state.sortCreate = "";
      state.sort = "asc";
    },
    changeSortCreateHigh: (state) => {
      state.priceCreate = "";
      state.sortCreate = "desc";
      state.sort = "";
    },
    changeSortCreateLow: (state) => {
      state.priceCreate = "";
      state.sortCreate = "asc";
      state.sort = "";
    },
    changeCityId: (state, action) => {
      state.cityId = action.payload;
    },
    resetFilter: (state) => {
      state.categoryId = "";
      state.subCategoryId = [];
      state.highPrice = "";
      state.lowPrice = "";
      state.roomNumbers = "";
      state.bathrooms = "";
      state.area = "";
      state.priceCreate = "";
      state.review = "";
      state.latest = "";
      state.name = "";
      state.sort = "";
      state.sortCreate = "";
      state.cityId = "";
    },
  },
});
export const {
  handleOpenFilter,
  closeFilter,
  changeLat,
  changeLng,
  changeLocation,
  changeCategoryId,
  changeSubCategoryId,
  changeLowPrice,
  changeHighPrice,
  changeRoomNumbers,
  changeBathRooms,
  changeArea,
  resetFilter,
  changeName,
  changePriceCreateHigh,
  changePriceCreateLow,
  changeSortHigh,
  changeSortLow,
  changeSortCreateHigh,
  changeSortCreateLow,
  changeCityId,
} = filterSlice.actions;
export default filterSlice.reducer;
