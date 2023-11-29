import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "redux/baseApi";
import { ExndpointType } from "../baseApi";

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
      (baseApi.endpoints as ExndpointType).logIn.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
    builder.addMatcher(
      (baseApi.endpoints as ExndpointType).register.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
    builder.addMatcher(
      (baseApi.endpoints as ExndpointType).logOut.matchFulfilled,
      state => {
        state.user = { name: null, email: null };
        state.token = null;
      }
    );

    builder.addMatcher(
      (baseApi.endpoints as ExndpointType).fetchCurrentUser.matchFulfilled,
      (state, action) => {
        console.log(action);
        state.user = action.payload;
      }
    );

    builder.addMatcher(
      (baseApi.endpoints as ExndpointType).fetchCurrentUser.matchRejected,
      state => {
        state.token = null;
      }
    );
  },
});

export default authSlice.reducer;
