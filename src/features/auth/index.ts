import { RootState } from "@/app/rootReducer";
import { User } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  sessionId: string | null;
};
const initialState = {
  user: null,
  isAuthenticated: false,
  sessionId: null,
} as AuthState;

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem("session_id");

      localStorage.setItem("accountId", payload.id);
    },
  },
});

export const { setUser } = authSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default authSlice.reducer;
