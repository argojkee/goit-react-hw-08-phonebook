import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./authOperations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isLoadingAuthUser: false,
  isPending: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(authOperations.register.pending, (state) => {
        state.isPending = true;
      })
      .addCase(authOperations.register.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isPending = false;
      })
      .addCase(authOperations.register.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(authOperations.logIn.pending, (state) => {
        state.isPending = true;
      })
      .addCase(authOperations.logIn.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isPending = false;
      })
      .addCase(authOperations.logIn.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(authOperations.logOut.pending, (state) => {
        state.isPending = true;
      })
      .addCase(authOperations.logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isPending = false;
      })
      .addCase(authOperations.logOut.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(authOperations.fetchCurrentUser.pending, (state) => {
        state.isLoadingAuthUser = true;
      })
      .addCase(authOperations.fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoadingAuthUser = false;
        state.isPending = false;
      })
      .addCase(authOperations.fetchCurrentUser.rejected, (state) => {
        state.isLoadingAuthUser = false;
        state.token = null;
        state.isPending = false;
      });
  },
});

export default authSlice.reducer;
