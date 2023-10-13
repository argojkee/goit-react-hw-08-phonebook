import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../baseApi';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isLoadingAuthUser: false,
  isPending: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addMatcher(baseApi.endpoints.register.matchPending, state => {
        state.isPending = true;
      })
      .addMatcher(
        baseApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.user.name = action.payload.user.name;
          state.user.email = action.payload.user.email;
          state.token = action.payload.token;
          state.isLoggedIn = true;
          state.isPending = false;
        }
      )
      .addMatcher(baseApi.endpoints.register.matchRejected, state => {
        state.isPending = false;
      })
      .addMatcher(baseApi.endpoints.logIn.matchPending, state => {
        state.isPending = true;
      })
      .addMatcher(baseApi.endpoints.logIn.matchFulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isPending = false;
      })
      .addMatcher(baseApi.endpoints.logIn.matchRejected, state => {
        state.isPending = false;
      })
      .addMatcher(baseApi.endpoints.logOut.matchPending, state => {
        state.isPending = true;
      })
      .addMatcher(baseApi.endpoints.logOut.matchFulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isPending = false;
      })
      .addMatcher(baseApi.endpoints.logOut.matchRejected, state => {
        state.isPending = false;
      })
      .addMatcher(baseApi.endpoints.fetchCurrentUser.matchPending, state => {
        state.isLoadingAuthUser = true;
      })
      .addMatcher(
        baseApi.endpoints.fetchCurrentUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.isLoadingAuthUser = false;
          state.isPending = false;
        }
      )
      .addMatcher(baseApi.endpoints.fetchCurrentUser.matchRejected, state => {
        state.isLoadingAuthUser = false;
        state.token = null;
        state.isPending = false;
      });
  },
});

export default authSlice.reducer;
