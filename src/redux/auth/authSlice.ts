import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "redux/baseApi";
import { EndpointType } from "../baseApi";

type State = {
  user: {
    name: null | string;
    email: null | string;
  };
  token: null | string;
};
const initialState: State = {
  user: { name: null, email: null },
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      (baseApi.endpoints as EndpointType).logIn.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
    builder.addMatcher(
      (baseApi.endpoints as EndpointType).register.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
    builder.addMatcher(
      (baseApi.endpoints as EndpointType).logOut.matchFulfilled,
      state => {
        state.user = { name: null, email: null };
        state.token = null;
      }
    );

    builder.addMatcher(
      (baseApi.endpoints as EndpointType).fetchCurrentUser.matchFulfilled,
      (state, action) => {
        console.log(action);
        state.user = action.payload;
      }
    );

    builder.addMatcher(
      (baseApi.endpoints as EndpointType).fetchCurrentUser.matchRejected,
      state => {
        state.token = null;
      }
    );
  },
});

export default authSlice.reducer;
