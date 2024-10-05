import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../features/auth/authSlice";
import sidebarReducer from "../features/ui/sidebarSlice";


const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,

  auth: authReducer,
  sidebar: sidebarReducer,
});

export default rootReducer;
