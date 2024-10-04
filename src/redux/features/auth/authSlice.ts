import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../../store";
import { IAuthState } from "@/types/auth.type";

const initialState: IAuthState = {
  isLoggedIn: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<IAuthState>) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    logout(state) {
      Cookies.remove("token");
      Cookies.remove("user");
      state.isLoggedIn = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      window.location.reload();
    },

    updateToken: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string | null;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { login, logout, updateToken } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
