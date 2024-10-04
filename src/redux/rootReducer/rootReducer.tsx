import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";


const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,

//   auth: authReducer,
});

export default rootReducer;
