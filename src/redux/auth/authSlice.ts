import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi";

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
  reducers: {
    // setToken: (state, action: PayloadAction<string>) => {
    //   return {
    //     ...state,
    //     token: action.payload,
    //   };
    // },
    // resetToken: state => {
    //   return {
    //     ...state,
    //     token: null,
    //   };
    // },
    setUser: (
      state,
      action: PayloadAction<{
        user: {
          name: string;
          email: string;
        };
        token: string;
      }>
    ) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    },

    resetUser: state => {
      return {
        ...state,
        user: {
          name: null,
          email: null,
        },
        token: null,
      };
    },
  },
  // extraReducers: builder => {
  //   builder

  //     .addMatcher(
  //       baseApi.endpoints.register.matchFulfilled,
  //       (state, action) => {
  //         state.user.name = action.payload.user.name;
  //         state.user.email = action.payload.user.email;
  //         state.token = action.payload.token;
  //       }
  //     )
  //     .addMatcher(baseApi.endpoints.logIn.matchFulfilled, (state, action) => {
  //       state.user.name = action.payload.user.name;
  //       state.user.email = action.payload.user.email;
  //       state.token = action.payload.token;
  //     })

  //     .addMatcher(baseApi.endpoints.logOut.matchFulfilled, state => {
  //       state.user = { name: null, email: null };
  //       state.token = null;
  //     })

  //     .addMatcher(
  //       baseApi.endpoints.fetchCurrentUser.matchFulfilled,
  //       (state, action) => {
  //         state.user = action.payload;
  //       }
  //     )
  //     .addMatcher(baseApi.endpoints.fetchCurrentUser.matchRejected, state => {
  //       state.token = null;
  //     });
  // },
});

export const { setUser, resetUser } = authSlice.actions;
export default authSlice.reducer;
