import { createSlice } from "@reduxjs/toolkit";

const authSice = createSlice({
  name: "auth",
  initialState: {
    profile: JSON.parse(localStorage.getItem("_profile")),
  },
  reducers: {
    setCredentials: (state, action) => {
      localStorage.setItem("_profile", JSON.stringify(action.payload.user));
      state.profile = action.payload.user;
    },
    logout: (state, action) => {
      state.profile = {};
      localStorage.removeItem("_profile");
    },
  },
});

export default authSice.reducer;
export const { setCredentials, logout } = authSice.actions;

export const selectCurrentUser = (state) => state.auth.profile;
