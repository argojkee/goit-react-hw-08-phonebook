import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi";

const initialState = {
  user: { name: null, email: null },
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: builder => {
    builder

      .addMatcher(
        baseApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.user.name = action.payload.user.name;
          state.user.email = action.payload.user.email;
          state.token = action.payload.token;
        }
      )
      .addMatcher(baseApi.endpoints.logIn.matchFulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.token = action.payload.token;
      })

      .addMatcher(baseApi.endpoints.logOut.matchFulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
      })

      .addMatcher(
        baseApi.endpoints.fetchCurrentUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        }
      )
      .addMatcher(baseApi.endpoints.fetchCurrentUser.matchRejected, state => {
        state.token = null;
      });
  },
});

export default authSlice.reducer;
