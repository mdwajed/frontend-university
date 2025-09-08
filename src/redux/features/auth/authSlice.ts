import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
export interface TUser {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}
interface IAuthInitialState {
  user: TUser | null;
  token: string | null;
}

const initialState: IAuthInitialState = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      (state.user = user), (state.token = token);
    },
    logOut: (state) => {
      (state.user = null), (state.token = null);
    },
  },
});
export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
