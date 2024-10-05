
import { IGetUserDetailsRes } from "@/types/auth.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserState {
  id: number | undefined;
  userName: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
}

const initialState: IUserState = {
  id: undefined,
  userName: undefined,
  email: undefined,
  avatar: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IGetUserDetailsRes>) => {
      const { id, userName, email, avatar } = action.payload;
      console.log(action.payload);
      state.id = id;
      state.userName = userName;
      state.email = email;
      state.avatar = avatar;
    },
    clearUser: (state) => {
      state.id = undefined;
      state.userName = undefined;
      state.email = undefined;
    },
  },
});

// Exporting the action creators
export const { setUser, clearUser } = userSlice.actions;

// Exporting the reducer
export default userSlice.reducer;
